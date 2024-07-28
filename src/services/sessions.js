import { consts } from "../config/constants";
import { localStorageId, localStorageToken } from "../config/localStorage";

export const userSessionIsValid = async () => {
  const response = await fetch(
    `${consts.baseURL}/users/sessions/${localStorageId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorageToken}`,
      },
    }
  );

  return response.ok;
};

export const isUserAdmin = async () => {
  const response = await fetch(
    `${consts.baseURL}/users/sessions/admins/${localStorageId}`,
    {
      headers: {
        Authorization: `Bearer ${localStorageToken}`,
      },
    }
  );

  return response.ok;
};
