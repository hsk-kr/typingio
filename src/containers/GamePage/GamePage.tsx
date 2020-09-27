import React, { useState, useCallback, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { SocketContext } from 'context/SocketContext';

const GamePage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const { gameClient, nickname } = useContext(SocketContext);
  const history = useHistory();

  useEffect(() => {
    gameClient
      .enterGame(nickname)
      .then(() => {
        gameClient.reqGameInfo().then((info: any) => {
          const { cycle, tick, sent } = info;
          setCycle(cycle);
          setTick(tick);
          setTargetSentence(sent);
          setLoading(false);
          console.log(info);
        });
      })
      .catch(() => {
        history.push('/');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [cycle, setCycle] = useState<number>(0);
  const [tick, setTick] = useState<number>(0);
  const [targetSentence, setTargetSentence] = useState<string>('');
  const [sentence, setSentence] = useState<string>('');

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      남은시간:<label>{tick}</label>
      <br />
      문장:<label>{targetSentence}</label>
      <br />
      입력:{' '}
      <input
        type="text"
        value={sentence}
        onChange={(e) => setSentence(e.target.value)}
      />
      <button type="button">전송</button>
      <br />
      이전 우승자:<label></label>
      <br />
    </div>
  );
};

export default GamePage;
