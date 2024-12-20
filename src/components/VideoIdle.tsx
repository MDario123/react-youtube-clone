import { motion } from "motion/react";
import { useSearchParams } from "react-router";
import { NavLink } from "react-router";
import styled from "styled-components";
import { usePlaylist } from "../hooks/usePlaylist";

const StyledVideoIdle = styled(motion.div)`
  width: 100%;
  aspect-ratio: 1.5;

  border-radius: 10px;

  &:hover {
    scale: 1.05;
  }

  transition: scale 0.15s ease-out;
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
  color: rgba(255, 255, 255, 0.87);
`;

const StyledButton = styled.button`
  background-color: #fc5c7d;
  padding: 0 0.5em;
  border: none;

  &:hover {
    scale: 1.1;
  }
  &:active {
    scale: 0.9;
  }

  transition: scale 0.2s;
`;

const DetailsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 5px;
`;

export interface VideoIdleProps {
  id: string;
  thumbnail: string;
  title: string;
}

export function VideoIdle({ id, thumbnail, title }: VideoIdleProps) {
  const [searchParams] = useSearchParams();
  const [, toggleInPlaylist] = usePlaylist();

  return (
    <StyledVideoIdle
      initial={{
        scale: 0,
      }}
      animate={{
        scale: 1,
      }}
      transition={{
        default: {
          type: "spring",
          duration: 0.6,
          bounce: 0.5,
          delay: Math.random(),
        },
      }}
    >
      <NavLink to={`/${id}?${searchParams.toString()}`}>
        <StyledThumbnail src={thumbnail} />
      </NavLink>
      <DetailsWrapper>
        <StyledTitle>{title}</StyledTitle>
        <StyledButton
          onClick={() => toggleInPlaylist({ id, thumbnail, title })}
        >
          P
        </StyledButton>
      </DetailsWrapper>
    </StyledVideoIdle>
  );
}
