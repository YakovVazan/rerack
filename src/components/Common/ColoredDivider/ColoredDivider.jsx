import "./ColoredDivider.css";

const ColoredDivider = ({
  margin = "1rem 0",
  width = "auto",
  rotate = 0,
  alignSelf = "",
}) => {
  return (
    <span
      id="colored-divider"
      style={{
        margin: margin,
        width: width,
        transform: `rotate(${rotate}deg)`,
        alignSelf: alignSelf,
      }}
    ></span>
  );
};

export default ColoredDivider;
