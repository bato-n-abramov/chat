import React from 'react';
import './styles.scss';

const Textarea = ({ value, onKeyDown, onChange, placeholder = '', rows = 1, className = '' }) => {
  return (
    <textarea
      className={`textarea ${className}`}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      rows={rows}
    />
  );
};

export default Textarea;
