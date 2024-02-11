export const ResetAllFactors = () => {
  // reset search box value
  document
    .querySelectorAll(".plugins-filter-input")
    .forEach((element) => (element.value = ""));

  ResetTypeValue("");
  ResetCompanyValue("");
};

export const ResetTypeValue = (typeName) => {
  document.querySelectorAll(".inner-button-text-type").forEach((element) => {
    element.innerHTML = typeName !== "" ? typeName : "type";
  });
};

export const ResetCompanyValue = (companyName) => {
  document
    .querySelectorAll(".inner-button-text-company")
    .forEach(
      (element) => (element.innerHTML = companyName !== "" ? companyName : "company")
    );
};
