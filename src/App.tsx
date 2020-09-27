import React from 'react';
import { SocketProvider } from 'context/SocketContext';
import Router from 'router';

function App() {
  return (
    <SocketProvider>
      <Router />
    </SocketProvider>
  );
}

export default App;
