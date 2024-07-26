import { useState } from "react";
import Spinner from "../../Common/Spinner/Spinner";
import ColoredDivider from "../../Common/ColoredDivider/ColoredDivider";
import EditButton from "../../PlugActions/Editing/EditButton/EditButton";
import DeleteButton from "../../PlugActions/Deleting/DeleteButton/DeleteButton";
import DescGenButton from "../../PlugActions/DescGen/DescGenButton/DescGenButton";
import TransparentDivider from "../../Common/TransparentDivider/TransparentDivider";
import "./PlugPageCtrls.css";

const PlugPageCtrls = ({ currentPlug }) => {
  const [description, setDescription] = useState("");
  const [loadingDescription, setLoadingDescription] = useState(false);

  const content = () => {
    return isLoading()
      ? ["--", "--", "--"]
      : [currentPlug["name"], currentPlug["type"], currentPlug["company"]];
  };

  const isLoading = () => {
    return Object.keys(currentPlug).length === 0;
  };

  return (
    <>
      <div id="upper-plug-aside">
        <div>
          <div className="info-container">
            <u>Name:</u>
            {" " + content()[0]}
          </div>
          <div className="info-container">
            <u>Type:</u>
            {" " + content()[1]}
          </div>
          <div className="info-container">
            <u>Company:</u>
            {" " + content()[2]}
          </div>
        </div>
        <ColoredDivider />
        <div className="actions">
          <EditButton />
          <DeleteButton />
        </div>
      </div>
      <TransparentDivider />
      <div id="lower-plug-aside">
        <div className="generated">
          {description ? (
            description
          ) : !loadingDescription ? (
            <small id="temp-msg">
              <p>
                Powered by{" "}
                <a href="https://gemini.google.com/" target="blank">
                  Gemini
                </a>
                .
              </p>
              <p>Consume responsibly.</p>
            </small>
          ) : (
            <Spinner />
          )}
        </div>
        <div className="generator">
          <DescGenButton
            setDescription={setDescription}
            setLoadingDescription={setLoadingDescription}
          />
        </div>
      </div>
    </>
  );
};

export default PlugPageCtrls;
