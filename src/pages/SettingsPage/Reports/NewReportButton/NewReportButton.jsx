import { useContext } from "react";
import SvgPlus from "../../../../components/svg/SvgPlus/SvgPlus";
import Context from "../../../../context/Context";
import "./NewReportButton.css";

const NewReportButton = () => {
  const { token } = useContext(Context);

  return (
    <div
      data-bs-toggle={token && "modal"}
      data-bs-target={token && "#reportModal"}
      data-bs-dismiss="offcanvas"
      className="btn customed-button new-report-button-container"
    >
      <SvgPlus />
      <span>New Report</span>
    </div>
  );
};

export default NewReportButton;
