import { useEffect } from "react";
import useFetchData from "../../../hooks/useFetchData";
import SvgScroller from "../../svg/SvgScroller/SvgScroller";
import "./Scroller.css";

const Scroller = () => {
  const { isLoading } = useFetchData();
  const parentContainer = document.querySelector("#main-container");

  useEffect(() => {
    if (!parentContainer || isLoading) return;

    function handleScroll() {
      const scroller = document.querySelector("#scroller");

      if (parentContainer.scrollTop > 400) {
        scroller.style.bottom = "30px";
      } else {
        scroller.style.bottom = "-54px";
      }
    }

    parentContainer.addEventListener("scroll", handleScroll);

    return () => {
      parentContainer.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading, parentContainer]);

  function handleClick() {
    parentContainer.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div id="scroller-container">
      <div id="scroller" onClick={handleClick}>
        <SvgScroller />
      </div>
    </div>
  );
};

export default Scroller;
