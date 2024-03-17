import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h2 className="not-found-title">404 - Not Found</h2>
        <p className="not-found-text">
          Oops! It seems like you&lsquo;ve gotten yourself unplugged.
        </p>
        <Link to="/" className="not-found-link">
          Plug yourself in
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
