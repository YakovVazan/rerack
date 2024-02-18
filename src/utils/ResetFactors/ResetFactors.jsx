import { consts } from "../../config/constants";

export const ResetAllFactors = () => {
  // reset search box value
  document
    .querySelectorAll(".plugins-filter-input")
    .forEach((element) => (element.value = ""));

  ResetTypeValue(consts.typeDropDownInitialValue);
  ResetCompanyValue(consts.companyDropDownInitialValue);
};

export const ResetTypeValue = (typeName) => {
  document.querySelectorAll(".inner-button-text-type").forEach((element) => {
    element.innerHTML = typeName;
  });
};

export const ResetCompanyValue = (companyName) => {
  document
    .querySelectorAll(".inner-button-text-company")
    .forEach((element) => (element.innerHTML = companyName));
};
