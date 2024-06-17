let localStorageId = localStorage.getItem("rerackId");
let localStorageView = localStorage.getItem("rerackView");
let localStorageOrder = localStorage.getItem("rerackOrder");
let localStorageToken = localStorage.getItem("rerackToken");
let localStorageIsOwner = localStorage.getItem("rerackIsOwner");
let localStorageIsVerified = localStorage.getItem("rerackIsVerified");
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
if (!localStorageIsVerified) {
  localStorageIsVerified = 0;
  localStorage.setItem("rerackIsVerified", localStorageIsVerified);
}

function localStorageLogin(token, id, isOwner, isVerified) {
  localStorage.setItem("rerackId", id);
  localStorage.setItem("rerackToken", token);
  localStorage.setItem("rerackIsOwner", isOwner);
  localStorage.setItem("rerackIsVerified", isVerified);

  localStorageId = localStorage.getItem("rerackId");
  localStorageToken = localStorage.getItem("rerackToken");
  localStorageIsOwner = localStorage.getItem("rerackIsOwner");
  localStorageIsVerified = localStorage.getItem("rerackIsVerified");
}

function localStorageLogout() {
  localStorageToken = null;
  localStorageId = null;
  localStorageIsOwner = null;
  localStorageIsVerified = null;

  localStorage.removeItem("rerackId");
  localStorage.removeItem("rerackToken");
  localStorage.removeItem("rerackIsOwner");
  localStorage.removeItem("rerackIsVerified");
}

function setLocalStorageAccountPageSubRouteIndex(index) {
  localStorageAccountPageSubRouteIndex = index;
  localStorage.setItem("rerackAccountPageSubRouteIndex", index);
}

function setLocalStorageToken(newToken) {
  localStorageToken = newToken["token"];
  localStorage.setItem("rerackToken", localStorageToken);
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
  setLocalStorageToken
};
