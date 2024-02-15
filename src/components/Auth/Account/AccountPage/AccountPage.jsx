import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { localStorageLogout, localStorageToken } from "../../../../config/localStorage";
import Context from "../../../../context/Context";

const AccountPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const contextData = useContext(Context);
  const [userDetails, setUserDetails] = useState({});

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
          contextData["setToken"]("");
          navigate("/users/login");
        }

        const data = await res.json();
        setUserDetails(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUserDetails();
  }, [id]);

  return <div>{userDetails.name}</div>;
};

export default AccountPage;
