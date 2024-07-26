import { useContext } from "react";
import Context from "../context/Context";

const useToasts = () => {
  const contextData = useContext(Context);

  const showToast = (msg) => {
    contextData["setToastVisibility"](true);
    contextData["setToastMessage"](msg.charAt(0).toUpperCase() + msg.slice(1));
  };

  return showToast;
};

export default useToasts;
