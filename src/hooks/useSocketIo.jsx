import { Link } from "react-router-dom";
import { useEffect, useContext } from "react";
import socketIOClient from "socket.io-client";
import useToasts from "./useToasts";
import Context from "../context/Context";
import { consts } from "../config/constants";
import { localStorageToken } from "../config/localStorage";

const useSocketIo = () => {
  const showToast = useToasts();
  const { setSocket } = useContext(Context);

  useEffect(() => {
    const newSocket = socketIOClient(consts.baseURL, {
      auth: { token: localStorageToken },
      transports: ["websocket"],
    });

    newSocket.on("admin_report", (msg) => {
      showToast(
        <span>
          New <Link to={`users/dashboard/inbox/${msg.id}`}>report</Link>{" "}
          available
        </span>
      );
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [localStorageToken]);
};

export default useSocketIo;
