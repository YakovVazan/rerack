import { consts } from "../config/constants";

export const register = async (data) => {
  try {
    return await fetch(`${consts.baseURL}/users/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    return error;
  }
};

export const login = async (data) => {
  try {
    return await fetch(`${consts.baseURL}/users/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    return error;
  }
};

export const fetchNewPassword = async (givenEmail) => {
  try {
    return await fetch(`${consts.baseURL}/users/get_new_password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: givenEmail }),
    });
  } catch (error) {
    return error;
  }
};

export const postNewPassword = async (givenEmail, givenPassword, hash) => {
  try {
    return await fetch(`${consts.baseURL}/users/reset_password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: givenEmail,
        password: givenPassword,
        hash: hash,
      }),
    });
  } catch (error) {
    return error;
  }
};
