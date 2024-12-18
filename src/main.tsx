import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";
import { VideoPlayer } from "./components/VideoPlayer.tsx";

const basePath =
  import.meta.env.MODE !== "development" ? import.meta.env.VITE_BASE_PATH : "/";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={basePath}>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path=":videoId" element={<VideoPlayer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
