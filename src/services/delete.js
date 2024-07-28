import { localStorageToken } from "../config/localStorage";

export const deleteContent = async (url) => {
  try {
    return await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageToken}`,
      },
    });
  } catch (error) {
    return error;
  }
};
