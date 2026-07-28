import React from "react";
import { createRoot } from "react-dom/client";
import "../../app/globals.css";
import ViolencePage from "../../app/violencia/page";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode><ViolencePage /></React.StrictMode>
);
