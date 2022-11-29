import axios from "../utils/axios";
import { getError } from "../utils/error";

export const loadUser = async (setUser, setError) => {
  try {
    const {
      data: { user, token },
    } = await axios.get("/users/me");
    setUser(user, token);
  } catch (error) {
    const err = getError(error);
    setError(err);
  }
};
