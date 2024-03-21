import { useContext } from "react";
import "./DescGenButton.css";
import Context from "../../../../context/Context";
import { consts } from "../../../../config/constants";
import { localStorageToken } from "../../../../config/localStorage";
import SvgAi from "../../../svg/SvgAi/SvgAi";

const DescGenButton = ({ setDescription, setLoadingDescription }) => {
  const contextData = useContext(Context);
  const currentPlug = contextData["currentPlug"];

  async function generate() {
    try {
      setLoadingDescription(true);
      const res = await fetch(`${consts.baseURL}/plugs/generate/description/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorageToken}`,
        },
        body: JSON.stringify({
          name: currentPlug["name"],
          type: currentPlug["type"],
          company: currentPlug["company"],
        }),
      });

      const response = await res.json();
      setDescription(response);
      if (!response.ok) {
        console.log(response?.msg || response.error);
      } else {
        console.log(response);
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
      className="btn btn-outline-primary"
      title="Description generator (ai)"
      onClick={generate}
    >
      <p>Ask AI</p>
      <SvgAi />
    </div>
  );
};

export default DescGenButton;
