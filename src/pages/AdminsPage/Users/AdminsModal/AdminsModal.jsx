import { useContext } from "react";
import Context from "../../../../context/Context";
import useToasts from "../../../../hooks/useToasts";
import SvgX from "../../../../components/svg/SvgX/SvgX";
import { addNewAdmin, unadmin } from "../../../../services/admins";
import SvgPersonAdd from "../../../../components/svg/SvgPersonAdd/SvgPersonAdd";
import SvgPersonRemove from "../../../../components/svg/SvgPersonRemove/SvgPersonRemove";

const AdminsModal = () => {
  const showToast = useToasts();
  const { adminsModalContents, usersState, setUsersState } =
    useContext(Context);

  const handleAdmins = () => {
    if (adminsModalContents.isAdmin) removeAdmin();
    else addAdmin();
  };

  const addAdmin = async () => {
    try {
      const res = await addNewAdmin(
        adminsModalContents.userId,
        adminsModalContents.email
      );

      if (res.ok) {
        const updatedUsersState = usersState.map((user) => {
          if (user.id === adminsModalContents.userId) {
            return { ...user, isAdmin: true };
          }
          return user;
        });

        setUsersState(updatedUsersState);
        showToast(`${adminsModalContents.userName} is now admin`);
      }
    } catch (error) {
      showToast(error);
    }
  };

  const removeAdmin = async () => {
    try {
      const res = await unadmin(adminsModalContents.userId);

      if (res.ok) {
        const updatedUsersState = usersState.map((user) => {
          if (user.id === adminsModalContents.userId) {
            return { ...user, isAdmin: false };
          }
          return user;
        });

        setUsersState(updatedUsersState);
        showToast(`${adminsModalContents.userName} is no longer admin`);
      } else {
        showToast((await res.json())?.msg);
      }
    } catch (error) {
      showToast(error);
    }
  };

  return (
    <div className="modal fade" id="adminsModal" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          {/* header */}
          <div className="modal-header">
            <h1 className="modal-title fs-5">
              {adminsModalContents.isAdmin ? (
                <SvgPersonRemove />
              ) : (
                <SvgPersonAdd />
              )}
            </h1>
            <SvgX dataBsDismiss={"modal"} />
          </div>

          {/* body */}
          <div className="modal-body">
            {`Are you sure you want to ${
              adminsModalContents.isAdmin ? "remove" : "grant"
            } ${adminsModalContents.userName} ${
              adminsModalContents.isAdmin ? "from" : ""
            } administration?`}
          </div>

          {/* footer */}
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-outline-success"
              data-bs-dismiss="modal"
              onClick={handleAdmins}
            >
              {adminsModalContents.isAdmin ? "remove" : "add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminsModal;
