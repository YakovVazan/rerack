import { useParams } from "react-router-dom";
import { consts } from "../config/constants";
import { localStorageId, localStorageToken } from "../config/localStorage";

const useSavedPlugs = () => {
  const { id } = useParams();

  const getAllSaved = async () => {
    const res = await fetch(
      `${consts.baseURL}/users/${id || localStorageId}/saved`,
      {
        headers: {
          Authorization: `Bearer ${localStorageToken}`,
        },
      }
    );

    return (await res.json()) || [];
  };

  return getAllSaved;
};

export default useSavedPlugs;
