import "./Loader.css";
import { FC } from "react";

interface LoadingProps {
    size?: string;
}

const Loader: FC<LoadingProps> = ({ size }) => {

  return (
    <div className="loader-container">
      <div className={`${ size === 'md' ? 'loader-md': 'loader-sm' }`}></div>
    </div>
  );
};

export default Loader;