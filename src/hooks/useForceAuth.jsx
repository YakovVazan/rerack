import { useContext } from "react";
import Context from "../context/Context";
import useToasts from "./useToasts";

const useForceAuth = () => {
  const showToast = useToasts();
  const contextData = useContext(Context);

  const forceAuth = () => {
    if (!contextData["token"]) {
      showToast("You need to log in first");
      return false;
    }

    return true;
  };

  return forceAuth;
};

export default useForceAuth;
