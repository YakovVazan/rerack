import SvgInfo from "../../svg/SvgInfo/SvgInfo";
import "../../../styles/buttons.css";

const InfoButton = () => {
  return (
    <div
      className="btn customed-svg-button"
      data-bs-toggle="dropdown"
      title="info"
    >
      <SvgInfo />
    </div>
  );
};

export default InfoButton;
