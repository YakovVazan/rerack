import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer id="footer-container">
        <Link to={"privacy_policy"}>Privacy Policy</Link>
      </footer>
    </>
  );
};

export default Footer;
