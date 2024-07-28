import { consts } from "../config/constants";
import { localStorageToken } from "../config/localStorage";

export const fetchDownload = async () => {
  try {
    return await fetch(`${consts.baseURL}/download`, {
      headers: {
        Authorization: `Bearer ${localStorageToken}`,
      },
    });
  } catch (error) {
    return error;
  }
};
