import { useContext } from "react";
import SvgAi from "../../../svg/SvgAi/SvgAi";
import Context from "../../../../context/Context";
import { consts } from "../../../../config/constants";
import useForceAuth from "../../../../hooks/useForceAuth";
import { localStorageToken } from "../../../../config/localStorage";
import "./DescGenButton.css";

const DescGenButton = ({ setDescription, setLoadingDescription }) => {
  const contextData = useContext(Context);
  const forceAuth = useForceAuth();
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
        console.log(res);
        contextData["token"] = ""
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
