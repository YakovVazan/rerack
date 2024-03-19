import { useContext } from "react";
import Context from "../context/Context";

const useForceAuth = () => {
  const contextData = useContext(Context);

  const forceAuth = () => {
    if (!contextData["token"]) {
      contextData["setToastVisibility"](true);
      contextData["setToastMessage"](
        "Register & log in to contribute to Rerack"
      );
    }
  };

  return forceAuth;
};

export default useForceAuth;
