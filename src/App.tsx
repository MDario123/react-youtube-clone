import useSWR from "swr";
import "./App.css";
import { SearchBar } from "./components/SearchBar";
import { useSearchParams, useParams, useNavigate } from "react-router";
import { fetcher } from "./util/fetcher";
import { useEffect } from "react";
import styled from "styled-components";
import { VideosLayout } from "./components/VideosLayout";
import { VideoPlayer } from "./components/VideoPlayer";

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin: 20px clamp(30px, 30% - 250px, 220px);
`;

function App() {
  let [searchParams, setSearchParams] = useSearchParams();
  if (!searchParams.get("q")) {
    searchParams.set("q", Math.random() < 0.1 ? "rickroll" : "Harbour Space");
  }
  const q = searchParams.get("q");

  const { videoId } = useParams();
  const navigate = useNavigate();

  const { data, error, isLoading } = useSWR(
    `https://harbour.dev.is/api/search?q=${q}`,
    fetcher,
  );

  // Remove focus on Escape key down
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        const activeElement = document.activeElement as HTMLElement | null;
        if (activeElement && activeElement.blur) {
          activeElement.blur();
        }
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const onSubmit = (e: any) => {
    setSearchParams({ q: e.search });
  };

  let onEnd = () => {};

  let videos = null;
  if (isLoading) {
    // We just wait
  } else if (error) {
    //TODO: probably text that says there has been an error
  } else if (data && data.map) {
    videos = data.map((item: any) => {
      return {
        id: item.id.videoId,
        thumbnail: item.snippet.thumbnails.url,
        title: item.title,
      };
    });

    if (videoId) {
      let nextVideoIndex = Math.floor(Math.random() * videos.length);
      nextVideoIndex =
        videos[nextVideoIndex].id === videoId
          ? (nextVideoIndex + 1) % videos.length
          : nextVideoIndex;
      const randomNonPlayingVideo = videos[nextVideoIndex].id;

      onEnd = () => {
        navigate(`/${randomNonPlayingVideo}?${searchParams.toString()}`);
      };

      videos = (
        <VideosLayout
          videos={videos}
          videoPlaying={videoId}
          videoNext={randomNonPlayingVideo}
        />
      );
    } else {
      videos = <VideosLayout videos={videos} videoPlaying={videoId} />;
    }
  }

  return (
    <StyledApp>
      {videoId && <VideoPlayer onEnd={onEnd} />}
      <SearchBar onSubmit={onSubmit} written={q} />
      {videos}
    </StyledApp>
  );
}

export default App;
