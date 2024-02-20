import { useEffect, useState } from "react";
import useFetchData from "./useFetchData";

const useCompanies = () => {
  const { data, isLoading } = useFetchData();
  const [companiesList, setCompaniesList] = useState([]);

  useEffect(() => {
    if (!isLoading)
      setCompaniesList([...new Set(data.map((plug) => plug.company))]);
  }, [isLoading]);

  return { companiesList };
};

export default useCompanies;
