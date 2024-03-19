import { useContext } from "react";
import Context from "../../../../context/Context";
import { consts } from "../../../../config/constants";
import { localStorageToken } from "../../../../config/localStorage";
import "../../../../styles/modals.css";

const DescGenModal = () => {
  const contextData = useContext(Context);
  const currentPlug = contextData["currentPlug"];

  async function handleDesGen() {
    try {
        contextData.setToastVisibility(true);
      contextData.setToastMessage(
        `Description being generated for ${currentPlug.name} right now. This might take a few seconds`
      );
      const res = await fetch(
        `${consts.baseURL}/plugs/edit/description/generate/${currentPlug.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorageToken}`,
          },
          body: JSON.stringify({
            name: currentPlug["name"],
            type: currentPlug["type"],
            company: currentPlug["company"],
          }),
        }
      );

      const response = await res.json();
      contextData.setToastVisibility(true);
      if (!res.ok) {
        contextData.setToastMessage(response?.msg || response.error);
      } else {
        contextData.setToastMessage(
          `Description generated for ${currentPlug.name} successfully. Reload the page to see it`
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="modal fade" id="descGenModal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          {/* header */}
          <div className="modal-header">
            <h1 className="modal-title fs-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="blue"
                className="bi bi-stars"
                viewBox="0 0 16 16"
              >
                <path d="M7.657 6.247c.11-.33.576-.33.686 0l.645 1.937a2.89 2.89 0 0 0 1.829 1.828l1.936.645c.33.11.33.576 0 .686l-1.937.645a2.89 2.89 0 0 0-1.828 1.829l-.645 1.936a.361.361 0 0 1-.686 0l-.645-1.937a2.89 2.89 0 0 0-1.828-1.828l-1.937-.645a.361.361 0 0 1 0-.686l1.937-.645a2.89 2.89 0 0 0 1.828-1.828zM3.794 1.148a.217.217 0 0 1 .412 0l.387 1.162c.173.518.579.924 1.097 1.097l1.162.387a.217.217 0 0 1 0 .412l-1.162.387A1.73 1.73 0 0 0 4.593 5.69l-.387 1.162a.217.217 0 0 1-.412 0L3.407 5.69A1.73 1.73 0 0 0 2.31 4.593l-1.162-.387a.217.217 0 0 1 0-.412l1.162-.387A1.73 1.73 0 0 0 3.407 2.31zM10.863.099a.145.145 0 0 1 .274 0l.258.774c.115.346.386.617.732.732l.774.258a.145.145 0 0 1 0 .274l-.774.258a1.16 1.16 0 0 0-.732.732l-.258.774a.145.145 0 0 1-.274 0l-.258-.774a1.16 1.16 0 0 0-.732-.732L9.1 2.137a.145.145 0 0 1 0-.274l.774-.258c.346-.115.617-.386.732-.732z" />
              </svg>
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          {/* body */}
          <div className="modal-body">
            Click to generate description using AI
            <br />
          </div>

          {/* footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-primary"
              data-bs-dismiss="modal"
              onClick={handleDesGen}
            >
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DescGenModal;
