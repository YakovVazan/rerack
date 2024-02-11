import { useState, useEffect } from "react";

const useFetchData = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const res = await fetch("https://api-rerack.onrender.com/plugs");

      if (!res.ok) {
        throw new Error("Network error.");
      }

      const data = await res.json();

      // Set generic default photo when it's missing
      data.forEach((plug) => {
        if (plug.src === "")
          plug.src =
            "../../public/genericImage/generic_image_256x256.png";
      });

      setData(data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, isLoading, error };
};

export default useFetchData;
