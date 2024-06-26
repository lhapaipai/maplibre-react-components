import ReactDOM from "react-dom/client";

import App from "./App.tsx";

import "~/shared/tailwind.css";
/*
 <React.StrictMode>
    <App />
  </React.StrictMode>
*/

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);
