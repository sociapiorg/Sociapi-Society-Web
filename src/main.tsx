import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// @ts-ignore: CSS import declarations not available in this project setup
import "./index.css";
import App from "./App";

const rootElement = document.getElementById("root")!;
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Production routes contain build-time rendered HTML. Hydrate that markup so
// it remains the initial UI instead of clearing it and rendering the page again.
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  // The Vite development shell has an empty root and still needs a client render.
  createRoot(rootElement).render(app);
}
