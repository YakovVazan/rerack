import { useParams } from "react-router-dom";
import { getFavorites } from "../services/favorites";

const useFavoritePlugs = () => {
  const { id } = useParams();

  const getAllFavorites = async () => {
    try {
      const res = await getFavorites(id);

      return (await res.json()) || [];
    } catch (error) {
      console.error(error);
    }
  };

  return getAllFavorites;
};

export default useFavoritePlugs;
