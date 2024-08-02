import { localStorageId, localStorageToken } from "../config/localStorage";

const baseURL = import.meta.env.VITE_BASE_URL;

export const getSavedPlugins = async (id) => {
  try {
    return await fetch(
      `${baseURL}/users/${id || localStorageId}/saved`,
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

export const unsavePlugin = async (plugId) => {
  try {
    return await fetch(`${baseURL}/plugs/save/${plugId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageToken}`,
      },
      body: JSON.stringify({
        needsToBeAdded: false,
      }),
    });
  } catch (error) {
    return error;
  }
};
