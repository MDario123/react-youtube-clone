import { useSearchParams } from "react-router";
import { NavLink } from "react-router";
import styled from "styled-components";

const StyledVideoIdle = styled.div`
  width: 100%;
  aspect-ratio: 1.5;

  border-radius: 10px;
`;

const StyledThumbnail = styled.img`
  border-radius: 10px;
  height: 90%;
  width: 100%;
`;

const StyledTitle = styled.div`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export interface VideoIdleProps {
  id: string;
  thumbnail: string;
  title: string;
}

export function VideoIdle({ id, thumbnail, title }: VideoIdleProps) {
  const [searchParams, _] = useSearchParams();

  return (
    <StyledVideoIdle>
      <NavLink to={`/${id}?${searchParams.toString()}`}>
        <StyledThumbnail src={thumbnail} />
      </NavLink>
      <StyledTitle>{title}</StyledTitle>
    </StyledVideoIdle>
  );
}
