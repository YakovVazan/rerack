import Context from "../../context/Context";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  localStorageLogout,
  localStorageToken,
} from "../../config/localStorage";
import Spinner from "../../components/Common/Spinner/Spinner";

const AccountPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const contextData = useContext(Context);
  const [userDetails, setUserDetails] = useState({});
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const res = await fetch(`https://api-rerack.onrender.com/users/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorageToken}`,
          },
        });

        if (!res.ok) {
          const errorResponse = await res.json();

          console.log(errorResponse.msg || errorResponse.error);
          localStorageLogout();
          contextData.setToken("");
          navigate("/users/login");
        }

        const data = await res.json();
        setUserDetails(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingUser(false);
      }
    }

    fetchUserDetails();
  }, [id]);

  return (
    <>
      {loadingUser ? (
        <Spinner />
      ) : (
        <div style={{ alignSelf: "center" }}>{userDetails.name}</div>
      )}
    </>
  );
};

export default AccountPage;
