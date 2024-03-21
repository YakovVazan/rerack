import { useEffect, useState } from "react";
import useFetchData from "./useFetchData";

const usePlugsNames = ({ name }) => {
  const { data, isLoading } = useFetchData();
  const [currentPlug, setCurrentPlug] = useState({});
  const [plugsNames, setPlugsNames] = useState([]);

  useEffect(() => {
    if (!isLoading) {
      Object.keys(data).forEach((key) => {
        setPlugsNames((prevPlugsNames) => [
          ...prevPlugsNames,
          data[key].name.replace(/ /g, "_").toLowerCase(),
        ]);

        if (data[key].name.replace(/ /g, "_").toLowerCase() === name)
          setCurrentPlug(data[key]);
      });
    }
  }, [isLoading]);

  return { plugsNames, currentPlug };
};

export default usePlugsNames;
