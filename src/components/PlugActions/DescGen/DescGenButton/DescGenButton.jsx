import { useContext } from "react";
import SvgAi from "../../../svg/SvgAi/SvgAi";
import Context from "../../../../context/Context";
import { consts } from "../../../../config/constants";
import { localStorageToken } from "../../../../config/localStorage";
import "./DescGenButton.css";

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
      if (!res.ok) {
        contextData["setToastVisibility"](true);
        contextData["setToastMessage"](response?.msg);
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
