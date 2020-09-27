import React from 'react';
import classNames from 'classnames/bind';
import styles from './Sentence.module.scss';

interface Props {
  sentence: string;
}

const cx = classNames.bind(styles);

const Sentence: React.FC<Props> = ({ sentence }) => {
  return <div className={cx('sentence')}>{sentence}</div>;
};

export default Sentence;
