import { consts } from "../config/constants";
import { localStorageToken } from "../config/localStorage";

export const userSessionIsValid = async () => {
  try {
    if (!localStorageToken) throw new Error("Unauthorized");
    return await fetch(`${consts.baseURL}/users/tokens/check_session`, {
      headers: {
        Authorization: `Bearer ${localStorageToken}`,
      },
    });
  } catch (error) {
    return error;
  }
};

export const isUserAdmin = async () => {
  try {
    if (!localStorageToken) throw new Error("Unauthorized");
    return await fetch(`${consts.baseURL}/users/tokens/check_role`, {
      headers: {
        Authorization: `Bearer ${localStorageToken}`,
      },
    });
  } catch (error) {
    return error;
  }
};
