import React, { useState, createContext } from 'react';
import { GameClient } from 'lib/game-client';

interface Props {
  children: React.ReactNode;
}

interface ISocketContext {
  gameClient: GameClient;
  nickname: string;
  setNickname: any;
}

const SocketContext = createContext<ISocketContext>({} as ISocketContext);

const SocketProvider: React.FC = ({ children }) => {
  const [gameClient] = useState<GameClient>(new GameClient());
  const [nickname, setNickname] = useState<string>('');

  const value: ISocketContext = {
    gameClient,
    nickname,
    setNickname,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};

export { SocketProvider, SocketContext };
