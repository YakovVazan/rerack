import { useContext } from "react";
import SvgAi from "../../../svg/SvgAi/SvgAi";
import Context from "../../../../context/Context";
import useForceAuth from "../../../../hooks/useForceAuth";
import { generateDescription } from "../../../../services/plugins";
import "./DescGenButton.css";

const DescGenButton = ({ setDescription, setLoadingDescription }) => {
  const contextData = useContext(Context);
  const forceAuth = useForceAuth();
  const currentPlug = contextData["currentPlug"];

  async function generate() {
    try {
      setLoadingDescription(true);
      setDescription("");

      const res = await generateDescription(currentPlug);

      const response = await res.json();
      if (!res.ok) {
        contextData["token"] = "";
        forceAuth();
      } else {
        setDescription(response?.msg);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingDescription(false);
    }
  }

  return (
    <div
      id="desc-gen-button"
      className={`btn btn-outline-primary ${
        currentPlug.name === undefined && "disabled"
      }`}
      title="Description generator (ai)"
      onClick={generate}
    >
      <p>Ask AI</p>
      <SvgAi />
    </div>
  );
};

export default DescGenButton;
