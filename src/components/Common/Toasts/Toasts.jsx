import { useEffect } from "react";
import "./Toasts.css";

const Toast = ({ toastMessage, toastVisibility, setToastVisibility }) => {
  useEffect(() => {
    let timeoutId;

    if (toastVisibility) {
      document
        .querySelector(".toast-container")
        .classList.remove("hidden-toast");
      timeoutId = setTimeout(() => {
        document
          .querySelector(".toast-container")
          .classList.add("hidden-toast");
        setToastVisibility(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [toastVisibility]);

  return (
    <div className="toast-container hidden-toast">
      <div
        className={`toast ${toastVisibility && "show"}`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <strong>Rerack</strong>
          <button
            type="button"
            className="btn-close"
            onClick={() => setToastVisibility(false)}
          ></button>
        </div>
        <div className="toast-body">{toastMessage}</div>
      </div>
    </div>
  );
};

export default Toast;
