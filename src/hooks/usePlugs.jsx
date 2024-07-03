import { useContext, useEffect, useState } from "react";
import useFetchData from "./useFetchData";
import Context from "../context/Context";

const usePlugs = ({ plugId }) => {
  const contextData = useContext(Context);
  const { data, isLoading } = useFetchData();
  const [plugsIds, setPlugsIds] = useState([]);
  const [plugsNames, setPlugsNames] = useState([]);
  const [currentPlug, setCurrentPlug] = useState({});

  useEffect(() => {
    if (!isLoading) {
      Object.keys(data).forEach((key) => {
        setPlugsNames((prevPlugsNames) => [
          ...prevPlugsNames,
          data[key].name.replace(/ /g, "_").toLowerCase(),
        ]);

        setPlugsIds((prevPlugsNames) => [...prevPlugsNames, data[key].id]);

        if (data[key].id === +plugId) setCurrentPlug(data[key]);
      });
    }
  }, [isLoading]);

  useEffect(() => {
    setCurrentPlug(contextData["currentPlug"]);
  }, [contextData["currentPlug"]]);

  return { plugsNames, plugsIds, currentPlug };
};

export default usePlugs;
