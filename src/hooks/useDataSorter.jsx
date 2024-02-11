import { useContext, useEffect } from "react";
import Context from "../context/Context";
import useFetchData from "./useFetchData";

const useDataSorter = () => {
  const { orderBy, orderedData, setOrderedData } = useContext(Context);
  const { data, isLoading } = useFetchData();

  useEffect(() => {
    if (!isLoading) {
      let sorted;
      if (orderBy === "name") {
        sorted = [...data].sort((a, b) => a.name.localeCompare(b.name));
      } else {
        sorted = [...data].sort((a, b) => {
          if (a[orderBy] === b[orderBy]) {
            return a.name.localeCompare(b.name);
          }
          return a[orderBy].localeCompare(b[orderBy]);
        });
      }
      setOrderedData(sorted);
    }
  }, [isLoading, orderBy]);

  return orderedData;
};

export default useDataSorter;
