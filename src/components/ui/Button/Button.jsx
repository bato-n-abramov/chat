import React from 'react';
import './styles.scss';

const Button = ({ children, onClick, type = 'button', variant = 'primary', disabled = false, className = '', style= {} }) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
      style={style}
    >
      {children}
    </button>
  );
};


export default Button;
