import axios from "axios";

const url = "http://localhost:8080";

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
