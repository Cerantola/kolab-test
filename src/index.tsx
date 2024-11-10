import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import './styles/tailwind.css';
import AppRoutes from "./routes";
import AppProvider from "./hooks";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
      <AppProvider>
          <AppRoutes />
      </AppProvider>
  </React.StrictMode>
);
