import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "~/shared/tailwind.css";
import { RMapContextProvider } from "maplibre-react-components";
const strict = true;

ReactDOM.createRoot(document.getElementById("root")!).render(
  strict ? (
    <React.StrictMode>
      <RMapContextProvider>
        <App />
      </RMapContextProvider>
    </React.StrictMode>
  ) : (
    <RMapContextProvider>
      <App />
    </RMapContextProvider>
  ),
);
