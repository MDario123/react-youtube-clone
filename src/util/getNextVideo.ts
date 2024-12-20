import { VideoIdleProps } from "../components/VideoIdle";

function _getNextVideo(videos: any, videoId: string) {
  const videoIndex = videos.findIndex((video: any) => video.id === videoId);
  if (videoIndex !== -1 && videoIndex + 1 < videos.length) {
    return videos[videoIndex + 1].id;
  }
  return null;
}

export function getNextVideo(
  videosFromSearch: any,
  videosFromPlaylist: VideoIdleProps[] | null,
  videoId: string | null | undefined,
) {
  if (!videoId) return null;

  if (videosFromPlaylist) {
    const nextVideoFromPlaylist = _getNextVideo(videosFromPlaylist, videoId);
    if (nextVideoFromPlaylist) {
      return nextVideoFromPlaylist;
    }
  }

  if (videosFromSearch && videosFromSearch.length > 0) {
    const nextVideoFromSearch = _getNextVideo(videosFromSearch, videoId);
    if (nextVideoFromSearch) {
      return nextVideoFromSearch;
    }

    return videosFromSearch[0].id;
  }

  return null;
}
