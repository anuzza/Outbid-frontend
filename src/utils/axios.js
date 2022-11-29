import axios from "axios";

const url = "https://outbid-backend-6zv1jidj8-anuzza.vercel.app";

const customAxios = axios.create({
  baseURL: url,
});

export const setAuthToken = (token) => {
  if (token) {
    customAxios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete customAxios.defaults.headers.common["Authorization"];
  }
};

export default customAxios;
