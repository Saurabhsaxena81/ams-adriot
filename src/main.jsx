import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// Import the compiled Tailwind CSS file (assuming local setup)
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
