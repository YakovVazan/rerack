import { consts } from "../config/constants";
import { localStorageToken } from "../config/localStorage";

export const getAllPlugins = async () => {
  try {
    return await fetch(`${consts.baseURL}/plugs`);
  } catch (error) {
    return error;
  }
};

export const addNewPlug = async (newPlug) => {
  try {
    return await fetch(`${consts.baseURL}/plugs/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageToken}`,
      },
      body: JSON.stringify(newPlug),
    });
  } catch (error) {
    return error;
  }
};

export const editPlug = async (upToDatePlug) => {
  try {
    return await fetch(`${consts.baseURL}/plugs/edit/${upToDatePlug.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageToken}`,
      },
      body: JSON.stringify(upToDatePlug),
    });
  } catch (error) {
    return error;
  }
};

export const generateDescription = async (currentPlug) => {
  try {
    return await fetch(`${consts.baseURL}/plugs/generate/description`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageToken}`,
      },
      body: JSON.stringify({
        name: currentPlug["name"],
        type: currentPlug["type"],
        company: currentPlug["company"],
      }),
    });
  } catch (error) {
    return error;
  }
};

export const submitSelections = async (
  type,
  plugId,
  alreadyFavorited,
  alreadySaved
) => {
  try {
    return await fetch(`${consts.baseURL}/plugs/${type}/${plugId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageToken}`,
      },
      body: JSON.stringify({
        needsToBeAdded: type === "favor" ? !alreadyFavorited : !alreadySaved,
      }),
    });
  } catch (error) {
    return error;
  }
};
