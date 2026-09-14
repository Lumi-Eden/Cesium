// src/printMain.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import PrintApp from './PrintApp';
import "./App.css"; // Tailwind styling

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrintApp />
  </React.StrictMode>
);