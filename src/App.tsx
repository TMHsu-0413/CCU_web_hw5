import React from 'react';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import { SocketProvider } from './context/SocketContext';
import { UserProvider } from './context/UserContext';
import Router from './route/Router';

function App() {
  return (
    <UserProvider>
      <SocketProvider>
        <div className="App w-screen h-screen">
          <RouterProvider router={Router} />
        </div>
      </SocketProvider>
    </UserProvider>
  );
}

export default App;
