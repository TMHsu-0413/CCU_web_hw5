import React from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { SocketProvider } from './context/SocketContext';
import { UserProvider } from './context/UserContext';
import Router from './route/Router';

function App() {
  return (
    <SocketProvider>
      <UserProvider>
        <div className="App w-screen h-screen">
          <RouterProvider router={Router} />
        </div>
      </UserProvider>
    </SocketProvider>
  );
}

export default App;
