import { useContext, useEffect, useState } from "react";
import Context from "../context/Context";
import { getAllusers } from "../services/users";

const useUsers = () => {
  const { users, setUSers } = useContext(Context);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    setIsLoading(true);

    try {
      const res = await getAllusers();

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

  return { users, isLoading, error, fetchUsers };
};

export default useUsers;
