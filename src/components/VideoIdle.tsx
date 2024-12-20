import { motion } from "motion/react";
import { useSearchParams } from "react-router";
import { NavLink } from "react-router";
import styled from "styled-components";

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

export interface VideoIdleProps {
  id: string;
  thumbnail: string;
  title: string;
}

export function VideoIdle({ id, thumbnail, title }: VideoIdleProps) {
  const [searchParams, _] = useSearchParams();

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
      <NavLink to={`/video/${id}?${searchParams.toString()}`}>
        <StyledThumbnail src={thumbnail} />
        <StyledTitle>{title}</StyledTitle>
      </NavLink>
    </StyledVideoIdle>
  );
}
