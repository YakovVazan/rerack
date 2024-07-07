import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useFetchData from "../../../hooks/useFetchData";
import SvgScroller from "../../svg/SvgScroller/SvgScroller";
import "./Scroller.css";

const Scroller = ({ parentContainerSelector }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoading } = useFetchData();
  const parentContainer = document.querySelector(parentContainerSelector);

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
    navigate(location.pathname);
    parentContainer.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div id="scroller-container">
      <span id="scroller" onClick={handleClick}>
        <SvgScroller />
      </span>
    </div>
  );
};

export default Scroller;
