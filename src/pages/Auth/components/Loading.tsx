import "../Auth.css";
import { FC } from "react";
import Loader from "../../../components/Loader/Loader";

const Loading: FC = () => {

  return (
    <>
      <h1 className="logo">Kitaab</h1>
      <div className="loading-container" >
        <Loader size='md' />
      </div>
    </>
  );
};

export default Loading;