let localStorageId = localStorage.getItem("rerackId");
let localStorageView = localStorage.getItem("rerackView");
let localStorageOrder = localStorage.getItem("rerackOrder");
let localStorageToken = localStorage.getItem("rerackToken");
let localStorageIsOwner = localStorage.getItem("rerackIsOwner");
let localStorageAccountPageSubRouteIndex = localStorage.getItem(
  "rerackAccountPageSubRouteIndex"
);

// setting defaults
if (!localStorageView) {
  localStorageView = "list";
  localStorage.setItem("rerackView", localStorageView);
}
if (!localStorageOrder) {
  localStorageOrder = "name";
  localStorage.setItem("rerackOrder", localStorageOrder);
}
if (!localStorageId) {
  localStorageId = localStorage.getItem("rerackId");
}
if (!localStorageAccountPageSubRouteIndex) {
  localStorageAccountPageSubRouteIndex = 0;
  localStorage.setItem(
    "rerackAccountPageSubRouteIndex",
    localStorageAccountPageSubRouteIndex
  );
}

function localStorageLogin(token, id, isOwner) {
  localStorage.setItem("rerackToken", token);
  localStorage.setItem("rerackId", id);
  localStorage.setItem("rerackIsOwner", isOwner);

  localStorageToken = localStorage.getItem("rerackToken");
  localStorageId = localStorage.getItem("rerackId");
  localStorageIsOwner = localStorage.getItem("rerackIsOwner");
}

function localStorageLogout() {
  localStorageToken = null;
  localStorageId = null;
  localStorageIsOwner = null;

  localStorage.removeItem("rerackToken");
  localStorage.removeItem("rerackId");
  localStorage.removeItem("rerackIsOwner");
}

function setLocalStorageAccountPageSubRouteIndex(index) {
  localStorageAccountPageSubRouteIndex = index;
  localStorage.setItem("rerackAccountPageSubRouteIndex", index);
}

export {
  localStorageView,
  localStorageOrder,
  localStorageToken,
  localStorageId,
  localStorageIsOwner,
  localStorageAccountPageSubRouteIndex,
  localStorageLogin,
  localStorageLogout,
  setLocalStorageAccountPageSubRouteIndex,
};
