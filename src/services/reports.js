import { consts } from "../config/constants";
import { localStorageToken } from "../config/localStorage";

export const fetchReports = async (userId) => {
  return await fetch(`${consts.baseURL}/users/${userId}/reports`, {
    headers: {
      Authorization: `Bearer ${localStorageToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export const getCurrentReport = async (reportId) => {
  return await fetch(`${consts.baseURL}/users/reports/${reportId}`, {
    headers: {
      Authorization: `Bearer ${localStorageToken}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
};

export const sendReport = async (reportData) => {
  const response = await fetch(`${consts.baseURL}/users/reports/add`, {
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
