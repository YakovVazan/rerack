import { useContext } from "react";
import { Link } from "react-router-dom";
import useToasts from "./useToasts";
import Context from "../context/Context";

const useForceAuth = () => {
  const showToast = useToasts();
  const contextData = useContext(Context);

  const forceAuth = () => {
    if (!contextData["token"]) {
      showToast(
        <span>
          You need to <Link to={"users/auth/login"}>log in</Link> first
        </span>
      );
      return false;
    }

    return true;
  };

  return forceAuth;
};

export default useForceAuth;
