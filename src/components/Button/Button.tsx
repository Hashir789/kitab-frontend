import "./Button.css";
import React, { MouseEvent, useState, ReactNode } from "react";

interface RippleButtonProps {
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
  isCancel?: boolean;
  ml?: boolean;
  mr?: boolean;
  mx?: boolean;
}

const Button: React.FC<RippleButtonProps> = ({ onClick, children, disabled, isCancel, ml, mr, mx }) => {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = { x, y, id: Date.now() };
    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 1000);

    if (onClick) onClick();
  };

  return (
    <button
      type={isCancel ? "button": "submit"}
      className={`ripple-button ${isCancel ? "cancel": ""} ${ mx ? 'ml mr' : ml ? 'ml' : mr ? 'mr' : '' }`}
      onClick={handleClick}
      disabled={disabled ?? false}
    >
      {children}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple"
          style={{ left: ripple.x, top: ripple.y }}
        ></span>
      ))}
    </button>
  );
};

export default Button;