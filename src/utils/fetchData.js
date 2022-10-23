import axios from "axios";
const link = "http://localhost:5000/";
export const getDataAPI = async (url, token) => {
  const res = await axios.get(`${link}api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};
export const postDataAPI = async (url, post, token) => {
  const res = await axios.post(`${link}api/${url}`, post, {
    withCredentials: true,
    headers: {
      Authorization: token,
      ContentType: "application/json",
      Accept: "application/json",
    },
  });
  return res;
};
export const putDataAPI = async (url, post, token) => {
  const res = await axios.post(`${link}api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};
export const patchDataAPI = async (url, post, token) => {
  const res = await axios.post(`${link}api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};
export const deleteDataAPI = async (url, token) => {
  const res = await axios.post(`${link}api/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};
