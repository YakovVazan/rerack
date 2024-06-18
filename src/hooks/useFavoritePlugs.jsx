import { consts } from "../config/constants";
import { localStorageId, localStorageToken } from "../config/localStorage";

const useFavoritePlugs = () => {
  const getAllFavorites = async () => {
    const res = await fetch(
      `${consts.baseURL}/users/${localStorageId}/favorites`,
      {
        headers: {
          Authorization: `Bearer ${localStorageToken}`,
        },
      }
    );

    return await res.json();
  };

  return getAllFavorites;
};

export default useFavoritePlugs;
