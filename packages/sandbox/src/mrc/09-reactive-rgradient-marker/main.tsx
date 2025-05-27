import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "~/shared/tailwind.css";

const strict = false;

ReactDOM.createRoot(document.getElementById("root")!).render(
  strict ? (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  ) : (
    <App />
  ),
);
