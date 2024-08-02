import { localStorageToken } from "../config/localStorage";

const baseURL = import.meta.env.VITE_BASE_URL;

export const userSessionIsValid = async () => {
  try {
    if (!localStorageToken) throw new Error("Unauthorized");
    return await fetch(`${baseURL}/users/tokens/check_session`, {
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
    return await fetch(`${baseURL}/users/tokens/check_role`, {
      headers: {
        Authorization: `Bearer ${localStorageToken}`,
      },
    });
  } catch (error) {
    return error;
  }
};
