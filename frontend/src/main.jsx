import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

import("./App.jsx")
  .then(({ default: App }) => {
    root.render(<React.StrictMode><App /></React.StrictMode>);
  })
  .catch((error) => {
    console.error("Failed to start website:", error);
    const message = error.message?.startsWith("Missing Supabase configuration:")
      ? error.message
      : "The website could not start. Please try again later.";
    root.render(
      <div role="alert" className="max-w-2xl mx-auto px-6 py-16 text-gray-800">
        <h1 className="text-2xl font-bold text-navy">Website configuration error</h1>
        <p className="mt-3">{message}</p>
      </div>,
    );
  });
