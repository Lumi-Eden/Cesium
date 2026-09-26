// src/printMain.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import PrintLinkyApp from './PrintLinkyApp';
import "./App.css"; // Tailwind styling

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrintLinkyApp />
  </React.StrictMode>
);