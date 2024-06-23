let localStorageId = localStorage.getItem("rerackId");
let localStorageView = localStorage.getItem("rerackView");
let localStorageOrder = localStorage.getItem("rerackOrder");
let localStorageToken = localStorage.getItem("rerackToken");
let localStorageIsOwner = localStorage.getItem("rerackIsOwner");
let localStorageIsVerified = localStorage.getItem("rerackIsVerified");
let localStorageHistory = localStorage.getItem("rerackHistory");
let localStorageAccountPageSubRouteIndex = localStorage.getItem(
  "rerackAccountPageSubRouteIndex"
);
let localStorageAdminPageSubRouteIndex = localStorage.getItem(
  "rerackAdminPageSubRouteIndex"
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
if (!localStorageAdminPageSubRouteIndex) {
  localStorageAdminPageSubRouteIndex = 0;
  localStorage.setItem(
    "rerackAdminPageSubRouteIndex",
    localStorageAdminPageSubRouteIndex
  );
}
if (!localStorageIsVerified) {
  localStorageIsVerified = 0;
  localStorage.setItem("rerackIsVerified", localStorageIsVerified);
}
if (!localStorageHistory) {
  localStorageHistory = ["/"];
  localStorage.setItem("rerackHistory", JSON.stringify(localStorageHistory));
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

function setLocalStorageAdminPageSubRouteIndex(index) {
  localStorageAdminPageSubRouteIndex = index;
  localStorage.setItem("rerackAdminPageSubRouteIndex", index);
}

function setLocalStorageToken(newToken) {
  localStorageToken = newToken["token"];
  localStorage.setItem("rerackToken", localStorageToken);
}

function setLocalStorageHistory(newHistory) {
  localStorageHistory = newHistory;
  localStorage.setItem("rerackHistory", localStorageHistory);
}

export {
  localStorageView,
  localStorageOrder,
  localStorageToken,
  localStorageId,
  localStorageIsOwner,
  localStorageAccountPageSubRouteIndex,
  localStorageAdminPageSubRouteIndex,
  localStorageHistory,
  localStorageLogin,
  localStorageLogout,
  setLocalStorageAccountPageSubRouteIndex,
  setLocalStorageAdminPageSubRouteIndex,
  setLocalStorageToken,
  setLocalStorageHistory,
};
