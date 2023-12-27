import axios from "axios";
import { s2sHeaderName } from "./common-constant";

export const getUserProfile = async (userId: string) => {
  try {
    const baseUrl = process.env.USER_SERVICE_BASE_URL;
    const url = `${baseUrl}/s2s/user/${userId}`;

    const { data } = await axios.get(url, {
      headers: {
        [s2sHeaderName]: process.env.S2S_TOKEN,
      },
    });

    return data?.data;
  } catch (error) {
    throw error;
  }
};
