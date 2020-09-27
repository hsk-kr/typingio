import React from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

export type ButtonType = 'default';

interface Props {
  children: string | React.ReactNode;
  onClick: () => void;
  color?: ButtonType;
  disabled?: boolean;
  width?: number | string;
}

const cx = classNames.bind(styles);

const Button: React.FC<Props> = ({
  children,
  onClick,
  disabled,
  width,
  color = 'default',
}) => {
  return (
    <div
      className={cx('button', disabled, color)}
      onClick={onClick}
      style={{ width }}
    >
      {children}
    </div>
  );
};

export default Button;
