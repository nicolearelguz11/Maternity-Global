import React from "react";
import { createRoot } from "react-dom/client";
import "../../app/globals.css";
import VphPage from "../../app/vph/page";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode><VphPage /></React.StrictMode>
);
