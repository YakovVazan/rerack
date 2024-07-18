import { useState, useEffect } from "react";

const useTimeOfDay = () => {
  const [timeWord, setTimeWord] = useState();

  useEffect(() => {
    const hour = new Date().getHours();
    setTimeWord(
      hour >= 6 && hour < 12
        ? "Good morning"
        : hour >= 12 && hour < 18
        ? "Good afternoon"
        : hour >= 18 && hour < 22
        ? "Good evening"
        : "Good night"
    );
  }, []);

  return { timeWord };
};

export default useTimeOfDay;
