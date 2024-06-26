import { useState } from "react";
import useToasts from "../../hooks/useToasts";
import { consts } from "../../config/constants";
import Spinner from "../Common/Spinner/Spinner";
import { localStorageToken } from "../../config/localStorage";
import SvgDownload from "../svg/SvgDownload/SvgDownload";
import "./DownloadButton.css";

const DownloadButton = () => {
  const showToast = useToasts();
  const [isDownloading, setIsDownloading] = useState(false);

  async function download() {
    try {
      setIsDownloading(true);
      const response = await fetch(`${consts.baseURL}/download`, {
        headers: {
          Authorization: `Bearer ${localStorageToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to download: ${response.statusText}`);
      }

      downloader(await response.blob());
      showToast("DB download complete");
    } catch (error) {
      console.error("Download failed:", error);
    } finally {
      setIsDownloading(false);
    }
  }

  const downloader = (blob) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "rerack db.zip";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <span id="downloader-container" title="download db" onClick={download}>
      {isDownloading ? <Spinner /> : <SvgDownload />}
    </span>
  );
};

export default DownloadButton;
