import SvgInfo from "../../svg/SvgInfo/SvgInfo";

const InfoButton = () => {
  return (
    <div
      className="btn btn-outline-secondary"
      data-bs-toggle="dropdown"
      title="info"
    >
      <SvgInfo />
    </div>
  );
};

export default InfoButton;
