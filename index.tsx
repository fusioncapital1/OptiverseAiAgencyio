import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Path updated as App.tsx is now in the same src/ directory

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to for Optiverse AI");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);