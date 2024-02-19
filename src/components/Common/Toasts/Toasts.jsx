import { useEffect } from "react";

const Toast = ({ toastMessage, toastVisibility, setToastVisibility }) => {
  useEffect(() => {
    let timeoutId;

    if (toastVisibility) {
      document.querySelector(".toast-container").classList.remove("d-none");
      timeoutId = setTimeout(() => {
        setToastVisibility(false);
      }, 3000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [toastVisibility]);

  return (
    <div className="toast-container position-static d-none">
      <div
        className={`toast ${
          toastVisibility && "show"
        } position-fixed bottom-0 end-0 mb-3 me-3`}
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        style={{ position: "absolute" }}
      >
        <div className="toast-header">
          <strong className="me-auto">Rerack</strong>
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
