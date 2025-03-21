import { FC } from "react";
import { useNavigate } from "react-router";
import Button from "../../components/Button/Button";

const Placeholder: FC = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  }

  return (
    <>
      <Button onClick={handleClick}>Back</Button>
    </>
  );
};

export default Placeholder;