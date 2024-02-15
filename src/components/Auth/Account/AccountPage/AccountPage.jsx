import { useParams } from "react-router-dom";
import { localStorageToken } from "../../../../config/localStorage";
import { useState, useEffect } from "react";

const AccountPage = () => {
  const { id } = useParams();
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
          return;
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
