import { useEffect } from "react";
import "./Toasts.css";

const Toast = ({ toastMessage, toastVisibility, setToastVisibility }) => {
  useEffect(() => {
    let timeoutId;

    if (toastVisibility) {
      const toastContainer = document.querySelector(".toast-container");
      const toastElement = document.querySelector(".toast");

      toastContainer.classList.remove("hidden-toast");
      toastElement.classList.add("slide-hide");

      timeoutId = setTimeout(() => {
        toastElement.classList.remove("slide-hide");
        toastElement.classList.add("slide-show");
      }, 5);

      timeoutId = setTimeout(() => {
        toastElement.classList.remove("slide-show");
        toastElement.classList.add("slide-hide");
      }, 4000);

      setTimeout(() => {
        toastContainer.classList.add("hidden-toast");
        setToastVisibility(false);
      }, 4500);
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
        </div>
        <div className="toast-body">{toastMessage}</div>
      </div>
    </div>
  );
};

export default Toast;
