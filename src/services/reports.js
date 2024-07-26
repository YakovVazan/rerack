import { consts } from "../config/constants";
import { localStorageToken } from "../config/localStorage";

export const fetchReports = async (userId) => {
  const response = await fetch(`${consts.baseURL}/users/${userId}/reports`, {
    headers: {
      Authorization: `Bearer ${localStorageToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.msg);
    error.msg = data.msg || response.statusText;
    throw error;
  }

  return data;
};

export const fetchAllReports = async () => {
  const response = await fetch(`${consts.baseURL}/users/reports`, {
    headers: {
      Authorization: `Bearer ${localStorageToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.msg);
    error.msg = data.msg;
    throw error;
  }

  return data;
};

export const getCurrentReport = async (reportId) => {
  const response = await fetch(`${consts.baseURL}/users/reports/${reportId}`, {
    headers: {
      Authorization: `Bearer ${localStorageToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.msg);
    error.msg = data.msg;
    throw error;
  }

  return data;
};

export const sendReport = async (reportData) => {
  const response = await fetch(`${consts.baseURL}/users/reports/report`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorageToken}`,
    },
    body: JSON.stringify(reportData),
  });

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.msg);
    error.msg = data.msg;
    throw error;
  }

  return data;
};

export const sendReply = async (reportData) => {
  const response = await fetch(
    `${consts.baseURL}/users/reports/${location.pathname
      .split("/")
      .filter((segment) => segment !== "")
      .at(-1)}/reply`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageToken}`,
      },
      body: JSON.stringify(reportData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.msg);
    error.msg = data.msg;
    throw error;
  }

  return data;
};
