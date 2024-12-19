import useSWR from "swr";
import "./App.css";
import { SearchBar } from "./components/SearchBar";
import { useSearchParams, useParams } from "react-router";
import { fetcher } from "./util/fetcher";
import { ReactNode, useEffect, useState } from "react";
import styled from "styled-components";
import { VideosLayout } from "./components/VideosLayout";

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin: 20px clamp(20px, 30% - 250px, 220px);
`;

function App({ children }: { children?: ReactNode }) {
  let [searchParams, setSearchParams] = useSearchParams();
  const [q, _] = useState(
    searchParams.get("q") ||
      (Math.random() < 0.1 ? "rickroll" : "Harbour Space"),
  );

  const { videoId } = useParams();

  const { data, error, isLoading } = useSWR(
    `https://harbour.dev.is/api/search?q=${q}`,
    fetcher,
  );

  // Remove focus on Escape key down
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        const activeElement = document.activeElement as HTMLElement | null;
        if (activeElement && activeElement.blur) {
          activeElement.blur();
        }
      }
    };

    // Add the event listener when the component mounts
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const onSubmit = (e: any) => {
    setSearchParams({ q: e.search });
  };

  let videos = null;
  if (isLoading) {
    //TODO: probably text that says it's loading
  } else if (error) {
    //TODO: probably text that says there has been an error
  } else if (data && data.map) {
    videos = data.map((item: any) => {
      return {
        id: item.id.videoId,
        thumbnail: item.snippet.thumbnails.url,
        title: item.title,
      };
    });
    videos = <VideosLayout videos={videos} videoPlaying={videoId} />;
  } else {
    //TODO: probably text that says there has been an error
  }

  return (
    <StyledApp>
      {children}
      <SearchBar onSubmit={onSubmit} written={q} />
      {videos}
    </StyledApp>
  );
}

export default App;
