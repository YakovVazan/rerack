import { useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import socketIOClient from "socket.io-client";
import useUsers from "./useUsers";
import useToasts from "./useToasts";
import Context from "../context/Context";
import useNavigation from "./useNavigation";
import { localStorageToken, localStorageLogin } from "../config/localStorage";
import { getCurrentReport } from "../services/reports";

const useSocketIo = () => {
  const showToast = useToasts();
  const navigate = useNavigate();
  const { fetchUsers } = useUsers();
  const baseURL = import.meta.env.VITE_BASE_URL;
  const { setSocket, setCurrentReport } = useContext(Context);
  const { isReportURL, isAdminURL, urlToArray } = useNavigation();

  useEffect(() => {
    const newSocket = socketIOClient(baseURL, {
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

    newSocket.on("report_replied", async (msg) => {
      if (isReportURL(location.pathname))
        setCurrentReport(
          await getCurrentReport(urlToArray(location.pathname).at(-1))
        );
      showToast(
        <span>
          Your{" "}
          <Link to={`users/${msg.reporterId}/reports/${msg.reportId}`}>
            report
          </Link>{" "}
          was replied
        </span>
      );
    });

    newSocket.on("admin_status_change", (msg) => {
      const { payload } = msg;

      localStorageLogin(
        payload.token,
        +payload.id,
        payload.isAdmin,
        payload.isOwner,
        payload.isVerified
      );

      if (payload.isAdmin) {
        showToast(
          <span>
            You were added as <Link to={"users/dashboard"}>admin!</Link>
          </span>
        );
      } else {
        showToast("You were remove from administration");
        if (isAdminURL(location.pathname)) navigate("/");
      }
    });

    newSocket.on("user_registered", (msg) => {
      fetchUsers();
      showToast(
        <span>
          A new <Link to={`users/${msg.userId}`}>user</Link> just registared
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
