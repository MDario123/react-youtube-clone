import { useSearchParams } from "react-router";
import useSWR from "swr";
import { fetcher } from "../util/fetcher";
import { VideoIdleProps } from "../components/VideoIdle";
import axios from "axios";

function toggleVideoInPlaylist(
  videos: VideoIdleProps[],
  playlist: string | null,
) {
  return ({ id, thumbnail, title }: VideoIdleProps) => {
    const videosWithout = videos.filter((video) => video.id !== id);
    if (videosWithout.length !== videos.length) {
      axios.delete(
        `https://harbour.dev.is/api/playlists/${playlist}/videos/${id}`,
      );
    } else if (!videos.find((video) => video.id === id)) {
      const newVideo = { videoId: id, thumbnail, title };
      axios.post(
        `https://harbour.dev.is/api/playlists/${playlist}/videos`,
        newVideo,
      );
    }
  };
}

export function usePlaylist(): [
  VideoIdleProps[] | null,
  (video: VideoIdleProps) => void,
] {
  let [searchParams] = useSearchParams();

  const playlist = searchParams.get("playlist");
  const {
    data: playlistContents,
    error: playlistError,
    isLoading: playlistIsLoading,
  } = useSWR(
    playlist ? `https://harbour.dev.is/api/playlists/${playlist}` : null,
    fetcher,
    { refreshInterval: 2000 },
  );

  if (playlistIsLoading) {
    // We just wait
  } else if (playlistError) {
    throw new Error("Error loading playlist");
  } else if (playlistContents && playlistContents.videos) {
    const videos = playlistContents.videos.map((x: any) => {
      return {
        id: x.videoId,
        thumbnail: x.thumbnail,
        title: x.title,
      };
    }) as VideoIdleProps[];

    const seen = new Set();
    const uniqueArray = videos.filter((obj) => {
      if (seen.has(obj.id)) {
        return false;
      } else {
        seen.add(obj.id);
        return true;
      }
    });
    return [uniqueArray, toggleVideoInPlaylist(uniqueArray, playlist)];
  }

  return [null, (_: VideoIdleProps) => {}];
}
