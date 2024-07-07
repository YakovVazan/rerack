import { useEffect, useState } from "react";
import useFetchData from "./useFetchData";

const useTypes = () => {
  const { data, isLoading } = useFetchData();
  const [typesList, setTypesList] = useState([]);

  useEffect(() => {
    if (!isLoading)
      setTypesList([...new Set(data.map((plug) => plug.type))].sort());
  }, [isLoading]);

  return { typesList };
};

export default useTypes;
