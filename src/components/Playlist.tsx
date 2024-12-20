import { useState } from "react";
import { useSearchParams } from "react-router";
import styled from "styled-components";
import { genPlaylistId } from "../util/genPlaylistId";
import axios from "axios";
import { VideoIdle, VideoIdleProps } from "./VideoIdle";
import { VideoNextOverlay } from "./VideoNextOverlay";

const StyledClosedPlaylist = styled.button`
  height: 50px;
  width: 50px;
  margin: 10px;

  background-color: #fc5c7d;
  border-radius: 50%;
  border: none;

  &:hover {
    scale: 1.1;
  }
  &:active {
    scale: 0.9;
  }

  transition: scale 0.2s;

  @media (max-width: 768px) {
    display: none;
  }
`;

const StyledPlaylist = styled.div`
  width: 300px;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 30px;

  background-color: rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    display: none;
  }
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const StyledButton = styled.button`
  height: 50px;
  width: 50px;

  background-color: #fc5c7d;
  border-radius: 50%;
  border: none;

  &:hover {
    scale: 1.1;
  }
  &:active {
    scale: 0.9;
  }

  transition: scale 0.2s;
`;

const StyledEmptyMessage = styled.div`
  text-align: center;
  color: rgba(255, 255, 255, 0.5);
`;

interface PlaylistProps {
  playlistId: string | null;
  videoPlaying: string | undefined;
  videos: VideoIdleProps[] | null;
}

export function Playlist({ playlistId, videos, videoPlaying }: PlaylistProps) {
  // START Data
  const [closed, setClosed] = useState(true);
  const [, setSearchParams] = useSearchParams();
  // END Data

  if (closed) {
    return (
      <StyledClosedPlaylist
        key="playlist-panel-button"
        onClick={() => {
          if (!playlistId) {
            const playlistId = genPlaylistId();
            axios
              .post("https://harbour.dev.is/api/playlists", {
                name: playlistId,
              })
              .then((response) => {
                setSearchParams((prev) => {
                  prev.set("playlist", response.data.id);
                  return prev;
                });
              });
          }
          setClosed(false);
        }}
      />
    );
  }

  if (videos === null) videos = [];

  return (
    <StyledPlaylist>
      <ButtonsWrapper>
        <StyledButton
          key="playlist-panel-button"
          onClick={() => {
            setClosed(true);
          }}
        />
        <StyledButton
          onClick={() => {
            setClosed(true);
            setSearchParams((prev) => {
              prev.delete("playlist");
              return prev;
            });
          }}
        />
        <StyledButton
          onClick={() => {
            // TODO: don't hardcode this
            navigator.clipboard
              .writeText(
                "https://MDario123.github.io/react-youtube-clone?playlist=" +
                  playlistId,
              )
              .catch(() => {
                alert("Error copying name to clipbard.");
              });
          }}
        />
      </ButtonsWrapper>
      {videos.map((video) =>
        video.id === videoPlaying ? (
          <VideoNextOverlay key={"overlay-playlist-" + video.id}>
            <VideoIdle key={"playlist-" + video.id} {...video} />
          </VideoNextOverlay>
        ) : (
          <VideoIdle key={"playlist-" + video.id} {...video} />
        ),
      )}
      {videos.length === 0 ? (
        <StyledEmptyMessage>No videos in playlist</StyledEmptyMessage>
      ) : null}
    </StyledPlaylist>
  );
}
