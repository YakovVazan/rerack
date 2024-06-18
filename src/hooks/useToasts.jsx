import { useContext } from "react";
import Context from "../context/Context";

const useToasts = () => {
  const contextData = useContext(Context);

  const showToast = (msg) => {
    contextData["setToastVisibility"](true);
    contextData["setToastMessage"](msg);
  };

  return showToast;
};

export default useToasts;
