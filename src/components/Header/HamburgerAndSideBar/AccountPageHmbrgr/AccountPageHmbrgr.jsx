import SvgHamburger from "../../../svg/SvgHamburger/SvgHamburger";
import AccountCenterPageCtrls from "../../../Aside/AccountCenterPageCtrls/AccountCenterPageCtrls";

const AccountPageHmbrgr = () => {
  return (
    <>
      <div
        className="btn customed-svg"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <SvgHamburger />
      </div>

      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h3 className="offcanvas-title" id="offcanvasRightLabel">
            <strong>Controls</strong>
          </h3>
          <button
            type="button"
            className="btn-close customed-close-button"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <AccountCenterPageCtrls/>
        </div>
      </div>
    </>
  );
};

export default AccountPageHmbrgr;
