import SvgMore from "../../svg/SvgMore/SvgMore";

const MoreButton = () => {
  return (
    <div
      className="btn customed-svg-button"
      data-bs-toggle="dropdown"
      title="more"
    >
      <SvgMore />
    </div>
  );
};

export default MoreButton;
