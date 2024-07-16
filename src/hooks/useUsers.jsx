import { useEffect, useState } from "react";
import { consts } from "../config/constants";
import { localStorageToken } from "../config/localStorage";

const useUsers = () => {
  const [users, setUSers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(`${consts.baseURL}/users`, {
        headers: {
          Authorization: `Bearer ${localStorageToken}`,
        },
      });

      if (!res.ok) throw new Error("Error fetching users.");

      const data = await res.json();

      setUSers(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, isLoading, error };
};

export default useUsers;
