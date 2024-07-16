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
          The directory downloaded is compressed to a zip file. Unzip it. Inside
          are couple of CSV files. Containing the users, plugins, saved,
          favorites and contributions tables&lsquo;s data.
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
