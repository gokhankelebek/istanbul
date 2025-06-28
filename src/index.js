import { Buffer } from 'buffer';
window.Buffer = Buffer;
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import reportWebVitals, { sendToGoogleAnalytics } from './utils/webVitals';
import * as serviceWorker from './serviceWorker';
import { initSEOPerformanceMonitoring } from './utils/seoPerformanceMonitor';

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// Report web vitals for SEO performance monitoring
reportWebVitals(sendToGoogleAnalytics);

// Initialize enhanced SEO performance monitoring
initSEOPerformanceMonitoring();

// Register service worker for PWA capabilities
serviceWorker.register({
  onUpdate: registration => {
    // Show a notification when an update is available
    const waitingServiceWorker = registration.waiting;
    if (waitingServiceWorker) {
      waitingServiceWorker.addEventListener('statechange', event => {
        if (event.target.state === 'activated') {
          window.location.reload();
        }
      });
      waitingServiceWorker.postMessage({ type: 'SKIP_WAITING' });
    }
  }
});
