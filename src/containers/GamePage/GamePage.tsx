import React, { useState, useCallback, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import { useHistory } from 'react-router-dom';
import { SocketContext } from 'context/SocketContext';

// Components
import Label from 'components/Label';
import InputBox from 'components/InputBox';

import styles from './GamePage.module.scss';
const cx = classNames.bind(styles);

const GamePage: React.FC = () => {
  const { gameClient, nickname } = useContext(SocketContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [cycle, setCycle] = useState<number>(0);
  const [tick, setTick] = useState<number>(0);
  const [targetSentence, setTargetSentence] = useState<string>('');
  const [sentence, setSentence] = useState<string>('');
  const history = useHistory();

  const updateInfo = useCallback((info) => {
    const { cycle, tick, sent } = info;
    setCycle(cycle);
    setTick(tick);
    setTargetSentence(sent);
    console.log(info);
  }, []);

  const handleSubmit = useCallback(() => {
    if (sentence.length <= 0) return;

    gameClient.sendSentence(sentence);
    setSentence('');
  }, [sentence, gameClient]);

  const handleCycle = useCallback(
    (info: any) => {
      updateInfo(info);
    },
    [updateInfo]
  );

  useEffect(() => {
    gameClient.onCycle = handleCycle;
    gameClient.onClose = () => history.push('/');
    gameClient.invokeEvent();

    return () => {
      gameClient.onCycle = undefined;
      gameClient.onClose = undefined;
      gameClient.invokeEvent();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleCycle]);

  useEffect(() => {
    const tmTick = setInterval(() => {
      setTick(tick + 1);
    }, 1000);

    return () => {
      clearInterval(tmTick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick]);

  useEffect(() => {
    gameClient
      .enterGame(nickname)
      .then(() => {
        gameClient.reqGameInfo().then((info: any) => {
          updateInfo(info);
          setLoading(false);
        });
      })
      .catch(() => {
        history.push('/');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div className={cx('screen')}>
      <Label>Remaining Time: {cycle - (tick % cycle)}sec</Label>
      <Label>Sentence: {targetSentence}</Label>
      <InputBox
        value={sentence}
        onChange={(value) => setSentence(value)}
        onEnter={handleSubmit}
      />
    </div>
  );
};

export default GamePage;
