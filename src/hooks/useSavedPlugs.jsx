import { useParams } from "react-router-dom";
import { getSavedPlugins } from "../services/saved";

const useSavedPlugs = () => {
  const { id } = useParams();

  const getAllSaved = async () => {
    try {
      const res = await getSavedPlugins(id);

      return (await res.json()) || [];
    } catch (error) {
      console.error(error);
    }
  };

  return getAllSaved;
};

export default useSavedPlugs;
