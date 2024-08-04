import { Fragment, useContext, useEffect } from "react";
import ListItem from "./ListItem/ListItem.jsx";
import Context from "../../../context/Context.jsx";
import ListHeader from "./ListHeader/ListHeader.jsx";
import { consts } from "../../../config/constants.js";
import Spinner from "../../Common/Spinner/Spinner.jsx";
import useFetchData from "../../../hooks/useFetchData.jsx";
import Scroller from "../../Common/Scroller/Scroller.jsx";
import "./List.css";

const List = () => {
  const { isLoading } = useFetchData();
  const {
    orderedData,
    searchBoxValue,
    typeFilterValue,
    companyFilterValue,
    view,
    orderBy,
  } = useContext(Context);
  const shouldWait = isLoading || orderedData.length === 0;

  const initials = Array.from(
    new Set(
      orderedData.map((piece) => {
        if (orderBy === "name") {
          if (/^\d+/.test(piece[orderBy])) return "#";
          else return piece[orderBy][0];
        } else {
          return piece[orderBy];
        }
      })
    )
  );

  let currentInitial = initials[0];
  let previousInitial = currentInitial;

  const isSubHeaderCompatible = (plug) => {
    return (
      searchBoxValue === "" &&
      companyFilterValue === consts.companyDropDownInitialValue &&
      typeFilterValue === consts.typeDropDownInitialValue &&
      view === "list" &&
      ((orderBy === "name" &&
        /^\d+/.test(plug["name"][0]) &&
        currentInitial === "#") ||
        plug["name"][0] === currentInitial ||
        plug[orderBy] === currentInitial)
    );
  };

  // control 'no plugs found' message
  useEffect(() => {
    if (shouldWait) return;

    const hiddenElements = Array.from(
      document.querySelectorAll(".d-none")
    ).length;

    if (
      (view === "list" && hiddenElements === orderedData.length) ||
      (view === "gallery" && hiddenElements === orderedData.length * 2)
    ) {
      document.querySelector("#items-container").style.display = "none";
      document.querySelector("#none-found-message").style.display = "block";
    } else {
      document.querySelector("#none-found-message").style.display = "none";
      document.querySelector("#items-container").style.display = "flex";
    }
  }, [isLoading, searchBoxValue, typeFilterValue, companyFilterValue]);

  return (
    <>
      {shouldWait ? (
        <Spinner />
      ) : (
        <>
          <ul
            id="items-container"
            className={view === "list" ? "list-group" : "gallery-ul"}
          >
            {orderedData.map((plug, index) => {
              if (isSubHeaderCompatible(plug)) {
                // pick headers from initials array
                initials.shift();
                previousInitial = currentInitial;
                currentInitial = initials[0];

                return (
                  <Fragment key={index}>
                    <ListHeader previousInitial={previousInitial} />
                    <ListItem plug={plug} index={index} />
                  </Fragment>
                );
              } else {
                return <ListItem plug={plug} index={index} key={index} />;
              }
            })}

            {/* scroller injection */}
            <Scroller parentContainerSelector={"#main-container"} />
          </ul>
          <span id="none-found-message">
            Nothing to see here, try another search query.
          </span>
        </>
      )}
    </>
  );
};

export default List;
