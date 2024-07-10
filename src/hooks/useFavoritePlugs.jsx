import { consts } from "../config/constants";
import { useParams } from "react-router-dom";
import { localStorageId, localStorageToken } from "../config/localStorage";

const useFavoritePlugs = () => {
  const { id } = useParams();

  const getAllFavorites = async () => {
    try {
      const res = await fetch(
        `${consts.baseURL}/users/${id || localStorageId}/favorites`,
        {
          headers: {
            Authorization: `Bearer ${localStorageToken}`,
          },
        }
      );

      return (await res.json()) || [];
    } catch (error) {
      console.error(error);
    }
  };

  return getAllFavorites;
}; // try catch!!!!!!!!!!!!!!!!!

export default useFavoritePlugs;
