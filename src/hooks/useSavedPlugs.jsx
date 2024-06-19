import { consts } from "../config/constants";
import { localStorageId, localStorageToken } from "../config/localStorage";

const useSavedPlugs = () => {
  const getAllSaved = async () => {
    const res = await fetch(
      `${consts.baseURL}/users/${localStorageId}/saved`,
      {
        headers: {
          Authorization: `Bearer ${localStorageToken}`,
        },
      }
    );

    return await res.json() || [];
  };

  return getAllSaved;
};

export default useSavedPlugs;
