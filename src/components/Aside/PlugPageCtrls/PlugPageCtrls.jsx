import { useState } from "react";
import Spinner from "../../Common/Spinner/Spinner";
import EditButton from "../../PlugActions/Editing/EditButton/EditButton";
import DeleteButton from "../../PlugActions/Deleting/DeleteButton/DeleteButton";
import DescGenButton from "../../PlugActions/DescGen/DescGenButton/DescGenButton";
import TransparentDivider from "../../Common/TransparentDivider/TransparentDivider";
import "./PlugPageCtrls.css";

const PlugPageCtrls = ({ currentPlug }) => {
  const [loadingDescription, setLoadingDescription] = useState(false);
  const [description, setDescription] = useState("");

  const content = () => {
    return isLoading()
      ? ["--", "--", "--"]
      : [currentPlug["name"], currentPlug["type"], currentPlug["company"]];
  };

  const isLoading = () => {
    return currentPlug.name === null;
  };

  return (
    <>
      <div id="upper-plug-aside">
        <div>
          <div>
            <u>Name:</u>
            {" " + content()[0]}
          </div>
          <div>
            <u>Type:</u>
            {" " + content()[1]}
          </div>
          <div>
            <u>Company:</u>
            {" " + content()[2]}
          </div>
        </div>
        <TransparentDivider />
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
