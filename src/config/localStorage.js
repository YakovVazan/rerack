let localStorageView = localStorage.getItem("rerackView");
let localStorageOrder = localStorage.getItem("rerackOrder");
let localStorageToken = localStorage.getItem("rerackToken");
let localStorageId = localStorage.getItem("rerackId");

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

function localStorageLogin(token, id) {
  localStorage.setItem("rerackToken", token);
  localStorage.setItem("rerackId", id);

  localStorageToken = localStorage.getItem("rerackToken");
  localStorageId = localStorage.getItem("rerackId");
}

function localStorageLogout() {
  localStorage.removeItem("rerackToken");
  localStorage.removeItem("rerackId");
}

export {
  localStorageView,
  localStorageOrder,
  localStorageToken,
  localStorageId,
  localStorageLogin,
  localStorageLogout,
};
