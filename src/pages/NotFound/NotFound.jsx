import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h2 className="not-found-title">404 - Not Found</h2>
        <p className="not-found-text">
          Oops! The plug you are looking for might be in another galaxy.
        </p>
        <Link to="/" className="not-found-link">
          Go back to Earth
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
