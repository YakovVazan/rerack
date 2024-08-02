import { localStorageToken } from "../config/localStorage";

const baseURL = import.meta.env.VITE_BASE_URL;

export const getAllPlugins = async () => {
  try {
    return await fetch(`${baseURL}/plugs`);
  } catch (error) {
    return error;
  }
};

export const addNewPlug = async (newPlug) => {
  try {
    return await fetch(`${baseURL}/plugs/add`, {
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
    return await fetch(`${baseURL}/plugs/edit/${upToDatePlug.id}`, {
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
    return await fetch(`${baseURL}/plugs/generate/description`, {
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
    return await fetch(`${baseURL}/plugs/${type}/${plugId}`, {
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
