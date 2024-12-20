import { ReactNode } from "react";
import styled from "styled-components";

const StyledOverlay = styled.div`
  width: 100%;
  opacity: 0.3;
`;

export function VideoNextOverlay({ children }: { children?: ReactNode }) {
  return <StyledOverlay>{children}</StyledOverlay>;
}
