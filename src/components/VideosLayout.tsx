import styled from "styled-components";
import { VideoIdle, VideoIdleProps } from "./VideoIdle";

const StyledVideosLayout = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(325px, 1fr));
  gap: 30px;
  justify-items: center;
`;

export function VideosLayout({
  videos,
  videoPlaying,
}: {
  videos: VideoIdleProps[];
  videoPlaying: string | undefined;
}) {
  return (
    <StyledVideosLayout>
      {videos.map((video) =>
        video.id === videoPlaying ? null : (
          <VideoIdle key={video.id} {...video} />
        ),
      )}
    </StyledVideosLayout>
  );
}
