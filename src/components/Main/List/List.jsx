import { Fragment, useContext, useEffect } from "react";
import ListItem from "../ListItem/ListItem.jsx";
import ListHeader from "../ListHeader/ListHeader.jsx";
import Spinner from "../../Common/Spinner/Spinner.jsx";
import Scroller from "../../Common/Scroller/Scroller.jsx";
import Context from "../../../context/Context.jsx";
import useFetchData from "../../../hooks/useFetchData.jsx";
import { consts } from "../../../config/constants.js";
import "./List.css";

const List = () => {
  const contextData = useContext(Context);
  const orderedData = contextData["orderedData"];
  const searchBoxValue = contextData["searchBoxValue"];
  const typeFilterValue = contextData["typeFilterValue"];
  const companyFilterValue = contextData["companyFilterValue"];
  const view = contextData["view"];
  const { isLoading } = useFetchData();
  const shouldWait = isLoading || orderedData.length === 0;

  const initials = Array.from(
    new Set(
      orderedData.map((piece) => {
        if (contextData["orderBy"] === "name") {
          return piece["name"][0];
        } else {
          return piece[contextData["orderBy"]];
        }
      })
    )
  );

  let currentInitial = initials[0];
  let previousInitial = currentInitial;

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
              const itsHeaderCompliance =
                contextData["searchBoxValue"] === "" &&
                contextData["companyFilterValue"] ===
                  consts.companyDropDownInitialValue &&
                contextData["typeFilterValue"] ===
                  consts.typeDropDownInitialValue &&
                view === "list" &&
                ((contextData["orderBy"] === "name" &&
                  plug["name"][0] === currentInitial) ||
                  plug[contextData["orderBy"]] === currentInitial);

              if (itsHeaderCompliance) {
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
          </ul>
          <Scroller />
          <span id="none-found-message">
            Nothing to see here, try another search query.
          </span>
        </>
      )}
    </>
  );
};

export default List;
