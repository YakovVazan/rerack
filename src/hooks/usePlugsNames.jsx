import useFetchData from "./useFetchData";
import { useEffect, useState } from "react";

const usePlugsNames = () => {
  const { data, isLoading } = useFetchData();
  const [plugsNames, setPlugsNames] = useState([]);

  useEffect(() => {
    if (!isLoading)
      setPlugsNames(
        data.map((plug) => plug.name.replace(/ /g, "_").toLowerCase())
      );
  }, [isLoading]);

  return plugsNames;
};

export default usePlugsNames;
