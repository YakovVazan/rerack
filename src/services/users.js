import { localStorageToken, localStorageIsAdmin } from "../config/localStorage";

const baseURL = import.meta.env.VITE_BASE_URL;

export const getAllusers = async () => {
  try {
    if (localStorageIsAdmin == "true")
      return await fetch(`${baseURL}/users`, {
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
    return await fetch(`${baseURL}/users/${id}`, {
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
    return await fetch(`${baseURL}/users/${id}/edit`, {
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
    return await fetch(`${baseURL}/users/${id}/verify`, {
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
