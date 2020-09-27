import React, { useCallback } from 'react';
import classNames from 'classnames/bind';
import styles from './InputBox.module.scss';

interface Props {
  onChange: (value: string) => void;
  onEnter?: () => void;
  value: string;
  width?: string | number;
  placeholder?: string;
}

const cx = classNames.bind(styles);

const InputBox: React.FC<Props> = ({
  onChange,
  onEnter,
  value,
  width,
  placeholder,
}) => {
  const handleKeyUp = useCallback(
    (e) => {
      if (e.key.toUpperCase() === 'ENTER' && onEnter) {
        onEnter();
      }
    },
    [onEnter]
  );

  return (
    <div className={cx('container')} style={{ width }}>
      <input
        type="text"
        onKeyUp={handleKeyUp}
        onChange={(e) => onChange(e.target.value)}
        value={value}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputBox;
