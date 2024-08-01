import { consts } from "../config/constants";
import { localStorageToken, localStorageIsAdmin } from "../config/localStorage";

export const getAllusers = async () => {
  try {
    if (localStorageIsAdmin)
      return await fetch(`${consts.baseURL}/users`, {
        headers: {
          Authorization: `Bearer ${localStorageToken}`,
        },
      });
  } catch (error) {
    return error;
  }
};

export const getUser = async (id) => {
  try {
    return await fetch(`${consts.baseURL}/users/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorageToken}`,
      },
    });
  } catch (error) {
    return error;
  }
};

export const editUser = async (id, payload) => {
  try {
    return await fetch(`${consts.baseURL}/users/${id}/edit`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorageToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    return error;
  }
};

export const verifyUser = async (id) => {
  try {
    return await fetch(`${consts.baseURL}/users/${id}/verify`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorageToken}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return error;
  }
};
