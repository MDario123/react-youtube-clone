import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Route, Routes } from "react-router";

const basePath = "/react-youtube-clone";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={basePath}>
      <Routes>
        <Route path=":videoId?" element={<App />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
