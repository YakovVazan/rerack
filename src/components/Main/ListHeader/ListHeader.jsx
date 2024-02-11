import "./ListHeader.css";

const ListHeader = ({ previousInitial }) => {
  const reference = previousInitial.toLowerCase().replace(/[' ',/]/g, "_");

  return (
    <a className="initials-header" href={`#${reference}`}>
      <span id={`${reference}`}>{previousInitial}</span>
    </a>
  );
};

export default ListHeader;
