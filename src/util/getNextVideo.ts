export function getNextVideo(videos: any, videoId: any) {
  let nextVideoIndex = Math.floor(Math.random() * videos.length);
  nextVideoIndex =
    videos[nextVideoIndex].id === videoId
      ? (nextVideoIndex + 1) % videos.length
      : nextVideoIndex;
  const randomNonPlayingVideo = videos[nextVideoIndex].id;
  return randomNonPlayingVideo;
}
