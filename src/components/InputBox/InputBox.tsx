import React from 'react';
import classNames from 'classnames/bind';
import styles from './InputBox.module.scss';

interface Props {
  onChange: (value: string) => void;
  value: string;
  width?: string | number;
  placeholder?: string;
}

const cx = classNames.bind(styles);

const InputBox: React.FC<Props> = ({ onChange, value, width, placeholder }) => {
  return (
    <div className={cx('container')} style={{ width }}>
      <input
        type="text"
        onChange={(e) => onChange(e.target.value)}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputBox;
