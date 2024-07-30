import { useContext } from "react";
import Context from "../context/Context";

const useToasts = () => {
  const { setToastVisibility, setToastMessage } = useContext(Context);

  const showToast = (content) => {
    setToastVisibility(true);
    setToastMessage(content?.msg || content);
  };

  return showToast;
};

export default useToasts;
