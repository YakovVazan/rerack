import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { localStorageIsAdmin } from "../../../config/localStorage";
import DownloadButton from "../../../components/Download/DownloadButton";
import "./Download.css";

const Download = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorageIsAdmin !== "true") {
      navigate("/");
      return;
    }
  });

  return (
    <div className="sub-route-wrapper">
      <div className="download-container">
        <h1>Dear Admin</h1>
        <br />
        <p>
          In this page you are granted the ability to download all of
          Rerack&lsquo;s DB content to you device for backup purposes, offline
          access and the like.
        </p>
        <br />
        <p>
          The directory downloaded is compressed to a zip file. Unzip it, inside
          are two CSV files. One contains the users&lsquo; database and the
          other the plugins&lsquo;.
        </p>
        <br />
        <p>To begin download, click the button below:</p>
        <br />
        <DownloadButton />
      </div>
    </div>
  );
};

export default Download;
