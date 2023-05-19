import React from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { SocketProvider } from './context/SocketContext';
import Router from './route/Router';

function App() {
  return (
    <SocketProvider>
      <div className="App w-screen h-screen">
        <RouterProvider router={Router} />
      </div>
    </SocketProvider>
  );
}

export default App;
