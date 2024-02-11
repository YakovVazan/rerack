import { Fragment, useContext, useEffect } from "react";
import ListItem from "../ListItem/ListItem.jsx";
import ListHeader from "../ListHeader/ListHeader.jsx";
import Spinner from "../../Common/Spinner/Spinner.jsx";
import Context from "../../../context/Context.jsx";
import useFetchData from "../../../hooks/useFetchData.jsx";
import "./List.css";

const List = () => {
  const contextData = useContext(Context);
  const orderedData = contextData["orderedData"];
  const view = contextData["view"];
  const { isLoading } = useFetchData();

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
    if (isLoading) return;

    const hiddenElements = Array.from(
      document.querySelectorAll(".d-none")
    ).length;

    if (
      (!document.querySelector("#spinner-container") &&
        view === "list" &&
        hiddenElements == orderedData.length) ||
      (view === "gallery" && hiddenElements == orderedData.length * 2)
    ) {
      document.querySelector("#items-container").style.display = "none";
      document.querySelector("#none-found-message").style.display = "block";
    } else {
      document.querySelector("#none-found-message").style.display = "none";
      document.querySelector("#items-container").style.display = "flex";
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <ul
            id="items-container"
            className={view === "list" ? "list-group" : "gallery-ul"}
          >
            <>
              {orderedData.map((plug, index) => {
                const itsHeaderCompliance =
                  contextData["searchBoxValue"] === "" &&
                  contextData["companyFilterValue"] === "" &&
                  contextData["typeFilterValue"] === "" &&
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
            </>
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
