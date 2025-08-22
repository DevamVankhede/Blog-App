import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Bugsnag from "@bugsnag/js";
import BugsnagPluginReact from "@bugsnag/plugin-react";

const BUGSNAG_API_KEY = process.env.REACT_APP_BUGSNAG_API_KEY;

if (process.env.NODE_ENV === "development") {
  console.log("Bugsnag API Key:", BUGSNAG_API_KEY);
}

let ErrorBoundary: React.ComponentType<any> | undefined;

if (BUGSNAG_API_KEY && BUGSNAG_API_KEY !== "undefined") {
  Bugsnag.start({
    apiKey: BUGSNAG_API_KEY,
    plugins: [new BugsnagPluginReact()],
    appVersion: "1.0.0",
    releaseStage: process.env.NODE_ENV || "development",
    enabledReleaseStages: ["development", "production"],
  });

  ErrorBoundary = Bugsnag.getPlugin("react")?.createErrorBoundary(React);
} else {
  console.warn(
    "⚠️ Bugsnag API key is not set. Skipping Bugsnag initialization."
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    {ErrorBoundary ? (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ) : (
      <App />
    )}
  </React.StrictMode>
);
Bugsnag.notify(new Error("Test error from deployed app"));
