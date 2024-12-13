import { useParams } from "react-router";
import styled from "styled-components";

const StyledEmbed = styled.iframe`
  width: 100%;
  max-height: 80vh;
  aspect-ratio: 1.5;
  border-radius: 10px;
`;

export function VideoPlayer() {
  const { videoId } = useParams();
  const iFrameSrc = `https://www.youtube.com/embed/${videoId}`;
  const queryParams = new URLSearchParams({ autoplay: "1" });

  return (
    <StyledEmbed
      src={iFrameSrc + "?" + queryParams.toString()}
      frameborder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    />
  );
}
