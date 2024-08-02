import { localStorageToken } from "../config/localStorage";

const baseURL = import.meta.env.VITE_BASE_URL;

export const getUserContributions = async () => {
  try {
    return await fetch(
      `${baseURL}/users/${
        location.pathname.split("/")[2]
      }/contributions`,
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

export const getAllContributions = async () => {
  try {
    return await fetch(`${baseURL}/users/activity`, {
      headers: {
        Authorization: `Bearer ${localStorageToken}`,
      },
    });
  } catch (error) {
    return error;
  }
};
