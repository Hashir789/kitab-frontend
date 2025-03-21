import "./Separator.css";
import { FC } from "react";

const Separator: FC = () => {

  return (
    <div className="or-separator">
      <hr className="left-hr" />
        <span>OR</span>
      <hr className="right-hr" />
    </div>
  );
};

export default Separator;