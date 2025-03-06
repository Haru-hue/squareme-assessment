import axios from "axios";

export const fetchTransactions = async () => {
  try {
    const response = await axios.get(
      "https://json-server-project-production-3755.up.railway.app/transactions"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchBarChartData = async () => {
  try {
    const response = await axios.get(
      "https://json-server-project-production-3755.up.railway.app/chartData"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
