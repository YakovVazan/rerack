import { useContext } from "react";
import Context from "../../../../context/Context";
import "./ContributionsModal.css";
import "../../SubRoutes.css";

const ContributionsModal = () => {
  const { contributions } = useContext(Context);

  return (
    <div className="modal fade" id="contributionsModal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          {/* header */}
          <div className="modal-header">
            <h1 className="modal-title fs-5">{`${contributions[0]?.plugName}`}</h1>
          </div>

          {/* body */}
          <div className="modal-body">
            <ul className="contributions-list sub-route-list list-group">
              {contributions.map((item, index) => {
                return (
                  <li
                    className="list-group-item sub-route-list-item"
                    key={index}
                  >
                    {item["type"] +
                      "ed at " +
                      new Date(item["time"]).toLocaleString()}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn customed-button"
              data-bs-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContributionsModal;
