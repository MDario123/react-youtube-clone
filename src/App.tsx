import useSWR from "swr";
import "./App.css";
import { SearchBar } from "./components/SearchBar";
import { useSearchParams, useParams, useNavigate } from "react-router";
import { fetcher } from "./util/fetcher";
import styled from "styled-components";
import { VideosLayout } from "./components/VideosLayout";
import { VideoPlayer } from "./components/VideoPlayer";
import { getNextVideo } from "./util/getNextVideo";
import { Playlist } from "./components/Playlist";
import { useFocusRemover } from "./hooks/useFocusRemover";
import { usePlaylist } from "./hooks/usePlaylist";
import { VideoIdleProps } from "./components/VideoIdle";

const CenterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  margin: 20px clamp(30px, 30% - 250px, 220px);
`;

const AppWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr min-content;
  width: 100%;
`;

function App() {
  // START Data
  let [searchParams, setSearchParams] = useSearchParams();

  const playlist = searchParams.get("playlist");

  if (!searchParams.get("q")) {
    searchParams.set("q", Math.random() < 0.1 ? "rickroll" : "Harbour Space");
  }
  const q = searchParams.get("q");
  const {
    data: searchContents,
    error: searchError,
    isLoading: searchIsLoading,
  } = useSWR(`https://harbour.dev.is/api/search?q=${q}`, fetcher);

  const { videoId } = useParams();
  const navigate = useNavigate();
  // END Data

  useFocusRemover();

  let [videosFromPlaylist, _] = usePlaylist();

  let videosFromSearch = null;
  if (searchIsLoading) {
    // We just wait
  } else if (searchError) {
    //TODO: probably text that says there has been an error
  } else if (searchContents && searchContents.map) {
    videosFromSearch = searchContents.map((item: any) => {
      return {
        id: item.id.videoId,
        thumbnail: item.snippet.thumbnails.url,
        title: item.title,
      };
    });
    // Discard the ones already in the playlist
    videosFromSearch = videosFromSearch.filter(
      (video: VideoIdleProps) =>
        !videosFromPlaylist?.find(
          (playlistVideo) => playlistVideo.id === video.id,
        ),
    );
  }

  const nextVideo = getNextVideo(videosFromSearch, videosFromPlaylist, videoId);
  const onEnd = () => {
    if (nextVideo) navigate(`/${nextVideo}?${searchParams.toString()}`);
  };

  return (
    <AppWrapper>
      <CenterWrapper>
        {videoId && <VideoPlayer onEnd={onEnd} />}
        <SearchBar
          onSubmit={({ search }) => {
            setSearchParams((prev) => {
              prev.set("q", search);
              return prev;
            });
          }}
          written={q}
        />
        {videosFromSearch && (
          <VideosLayout videos={videosFromSearch} videoPlaying={videoId} />
        )}
      </CenterWrapper>
      <Playlist
        playlistId={playlist}
        videos={videosFromPlaylist}
        videoPlaying={videoId}
      />
    </AppWrapper>
  );
}

export default App;
