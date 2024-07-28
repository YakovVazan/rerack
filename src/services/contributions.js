import { consts } from "../config/constants";
import { localStorageToken } from "../config/localStorage";

export const getUserContributions = async () => {
  try {
    return await fetch(
      `${consts.baseURL}/users/${
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
    return await fetch(`${consts.baseURL}/users/activity`, {
      headers: {
        Authorization: `Bearer ${localStorageToken}`,
      },
    });
  } catch (error) {
    return error;
  }
};
