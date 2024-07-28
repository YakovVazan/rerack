import { consts } from "../config/constants";
import { localStorageId, localStorageToken } from "../config/localStorage";

export const userSessionIsValid = async () => {
  try {
    if (!localStorageId) throw new Error("Unauthorized");
    return await fetch(`${consts.baseURL}/users/sessions/${localStorageId}`, {
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
    if (!localStorageId) throw new Error("Unauthorized");
    return await fetch(
      `${consts.baseURL}/users/sessions/admins/${localStorageId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorageToken}`,
        },
      }
    );
  } catch (error) {
    return error;
  }
};
