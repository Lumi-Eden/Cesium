// src/printMain.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import OpravaApp from './OpravaApp';
import "./App.css"; // Tailwind styling

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <OpravaApp />
  </React.StrictMode>
);