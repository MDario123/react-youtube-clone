import { useParams } from "react-router";
import styled from "styled-components";
import YouTube, { YouTubeProps } from "react-youtube";

const StyledEmbed = styled(YouTube)`
  width: 100%;
  max-height: 80vh;
  aspect-ratio: 1.5;
  border-radius: 10px;
  border-style: none;
`;

export function VideoPlayer({ onEnd }: { onEnd?: () => void }) {
  const { videoId } = useParams();

  const opts: YouTubeProps["opts"] = {
    height: "100%",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  return <StyledEmbed videoId={videoId} opts={opts} onEnd={onEnd} />;
}
