import { useState } from "react";
import useToasts from "../../hooks/useToasts";
import Spinner from "../Common/Spinner/Spinner";
import { fetchDownload } from "../../services/download";
import SvgDownload from "../svg/SvgDownload/SvgDownload";
import "./DownloadButton.css";

const DownloadButton = () => {
  const showToast = useToasts();
  const [isDownloading, setIsDownloading] = useState(false);

  async function download() {
    try {
      setIsDownloading(true);
      const response = await fetchDownload();

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
    a.download = `Rerack's DB at ${new Date().toLocaleDateString()}.zip`;
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
