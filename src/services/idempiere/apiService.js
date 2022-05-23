const idempiereConfig = require("../../config/idempiereEnv");
const axios = require("axios");

exports.getAllByPartnerts = async () => {
  try {
    const url = `${idempiereConfig.API_URL}/partners`;
    const response = await axios.get(url, headerAxios);

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

exports.getPayments = async () => {
  try {
    const url = `${idempiereConfig.API_URL}/posPayments`;
    const response = await axios.get(url, headerAxios);

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

const headerAxios = () => {
  return {
    headers: {
      "content-type": "application/json",
    },
  };
};
