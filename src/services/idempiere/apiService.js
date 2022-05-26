const idempiereConfig = require("../../config/idempiereEnv");
const axios = require("axios");

exports.getAllTaxes = async () => {
  try {
    const url = `${idempiereConfig.API_URL}/taxes`;
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

exports.getAllUoms = async () => {
  try {
    const url = `${idempiereConfig.API_URL}/uoms`;
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

exports.getAllEmployees = async () => {
  try {
    const url = `${idempiereConfig.API_URL}/employees`;
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

exports.getAllWarehouses = async () => {
  try {
    const url = `${idempiereConfig.API_URL}/warehouses`;
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

exports.getAllProducts = async () => {
  try {
    const url = `${idempiereConfig.API_URL}/products`;
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

exports.getEmployeesByOrg = async (org_id) => {
  try {
    const url = `${idempiereConfig.API_URL}/employees/org/${org_id}`;
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

exports.getWarehousesByOrg = async (org_id) => {
  try {
    const url = `${idempiereConfig.API_URL}/warehouses/org/${org_id}`;
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

exports.getProductByOrg = async (org_id) => {
  try {
    const url = `${idempiereConfig.API_URL}/products/org/${org_id}`;
    const response = await axios.get(url);

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

exports.getReturnOrder = async (data) => {
  try {
    const url = `${idempiereConfig.API_URL}/RMA`;
    const response = await axios.post(url, data);

    return response.data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

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
