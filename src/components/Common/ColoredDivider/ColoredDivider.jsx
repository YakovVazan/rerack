import "./ColoredDivider.css";

const ColoredDivider = ({ margin }) => {
  return (
    <span
      id="colored-divider"
      style={{ margin: !margin ? "1rem 0" : margin }}
    ></span>
  );
};

export default ColoredDivider;
