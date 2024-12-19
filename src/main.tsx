import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { VideoPlayer } from "./components/VideoPlayer.tsx";

const basePath = "/react-youtube-clone";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={basePath}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route
          path="video/:videoId"
          element={
            <App>
              <VideoPlayer />
            </App>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
