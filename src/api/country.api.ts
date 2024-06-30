import axios from "axios";

const BASE_URL = "https://restcountries.com/v3.1/all";

export const countyAPI = async () => {
  try {
    const response = await axios.get(BASE_URL);
    const data = response.data;

    return data;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
};
