import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

// Hàm Axios GET
const fetchDataAxios = async ({ url, token = null }) => {
  try {
    const headers =
      token != null
        ? {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        : { 'Content-Type': 'application/json' };
    const response = await axios.get(`${API_URL}/${url}`, { headers });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// Hàm Axios POST
const postDataAxios = async ({ url, data, token = null }) => {
  try {
    const headers =
      token != null
        ? {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        : { 'Content-Type': 'application/json' };
    const response = await axios.post(`${API_URL}/${url}`, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

// Hàm Axios PUT
const putDataAxios = async ({ url, data, token = null }) => {
  try {
    const headers =
      token != null
        ? {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        : { 'Content-Type': 'application/json' };
    const response = await axios.put(`${API_URL}/${url}`, data, { headers });
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

const deleteDataAxios = async ({ url, data = null, token = null }) => {
  try {
    const headers =
      token != null
        ? {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        : { 'Content-Type': 'application/json' };

    const response = await axios.delete(`${API_URL}/${url}`, { data, headers });
    return response;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};
export { fetchDataAxios, postDataAxios, putDataAxios, deleteDataAxios };
