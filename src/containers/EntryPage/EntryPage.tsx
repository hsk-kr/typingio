import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { SocketContext } from 'context/SocketContext';
import { connect } from 'socket.io-client';

const EntryPage: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { gameClient, nickname, setNickname } = useContext(SocketContext);
  const history = useHistory();

  const handleEnter = useCallback(() => {
    const _nickname = nickname.trim();
    if (_nickname.length <= 0) {
      alert('Enter nickname.');
      return;
    }

    history.push('/game');
  }, [nickname, history]);

  useEffect(() => {
    gameClient.onConnect = () => {
      console.log('connected the server.');
    };

    gameClient.onClose = () => {
      console.log('connection has been closed. retry to connect');
      gameClient.connect();
    };

    gameClient.onError = (e) => setErrorMessage('Error: ' + e);

    gameClient.connect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!errorMessage) return;
    alert(errorMessage);
    setErrorMessage(null);
  }, [errorMessage]);

  return (
    <div>
      <h1>EntryPage</h1>
      Nickname:{' '}
      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <button type="button" onClick={handleEnter}>
        Enter
      </button>
    </div>
  );
};

export default EntryPage;
