import "./Spinner.css";

const Spinner = () => {
  return (
    <div id="spinner-container">
      <div className="spinner-grow text-secondary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
