import { consts } from "../config/constants";
import { localStorageId, localStorageToken } from "../config/localStorage";

export const getFavorites = async (id) => {
  try {
    return await fetch(
      `${consts.baseURL}/users/${id || localStorageId}/favorites`,
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

export const unfavorPlugin = async (plugId) => {
  try {
    return await fetch(`${consts.baseURL}/plugs/favor/${plugId}`, {
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
