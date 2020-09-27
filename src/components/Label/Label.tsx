import React from 'react';
import classNames from 'classnames/bind';
import styles from './Label.module.scss';

interface Props {
  children: string | React.ReactNode;
}

const cx = classNames.bind(styles);

const Label: React.FC = ({ children }) => {
  return <div className={cx('label')}>{children}</div>;
};

export default Label;
