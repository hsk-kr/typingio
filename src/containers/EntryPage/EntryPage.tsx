import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames/bind';
import { SocketContext } from 'context/SocketContext';

// Components
import InputBox from 'components/InputBox';
import Button from 'components/Button';

import styles from './EntryPage.module.scss';
const cx = classNames.bind(styles);

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
    <div className={cx('container')}>
      <div className={cx('content')}>
        <h1 className={cx('title')}>Typing IO</h1>
        <InputBox
          width={300}
          value={nickname}
          onChange={(value) => setNickname(value)}
          placeholder="ENTER NICKNAME"
        />
        <Button width={300} onClick={handleEnter}>
          Play Game
        </Button>
      </div>
    </div>
  );
};

export default EntryPage;
