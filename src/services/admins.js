import { localStorageToken } from "../config/localStorage";

const baseURL = import.meta.env.VITE_BASE_URL;

export const addNewAdmin = async (userId, email) => {
  try {
    return await fetch(`${baseURL}/admins/${userId}/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageToken}`,
      },
      body: JSON.stringify({
        email: email,
      }),
    });
  } catch (error) {
    return error;
  }
};

export const unadmin = async (userId) => {
  try {
    return await fetch(`${baseURL}/admins/${userId}/remove`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageToken}`,
      },
    });
  } catch (error) {
    return error;
  }
};
