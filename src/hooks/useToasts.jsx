import { useContext } from "react";
import Context from "../context/Context";

const useToasts = () => {
  const contextData = useContext(Context);

  const showToast = (content) => {
    contextData["setToastVisibility"](true);
    contextData["setToastMessage"](content?.msg || content);
  };

  return showToast;
};

export default useToasts;
