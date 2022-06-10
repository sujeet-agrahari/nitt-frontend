import React from 'react';
import * as ReactDOMClient from 'react-dom/client';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOMClient.createRoot(document.getElementById('root'));

root.render(
<<<<<<< HEAD
  // <React.StrictMode>
  <AuthContextProvider>
    <App />
  </AuthContextProvider>
  // </React.StrictMode>
=======
  <React.StrictMode>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </React.StrictMode>
>>>>>>> master
);
