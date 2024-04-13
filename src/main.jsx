import React from 'react';
import ReactDOM from 'react-dom'; // Correct import statement
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { createRoot } from 'react-dom/client';


ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthContextProvider>
);
