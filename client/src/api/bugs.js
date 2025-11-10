import axios from "axios";

const API_URL = "http://localhost:5000/api/posts"; // adjust if your backend URL is different

// Get all bugs
export const getBugs = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching bugs:", error);
    return [];
  }
};

// Add a new bug
export const addBug = async (bugData) => {
  try {
    const response = await axios.post(API_URL, bugData);
    return response.data;
  } catch (error) {
    console.error("Error adding bug:", error);
    throw error;
  }
};

// Update a bug's status
export const updateBugStatus = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error updating bug:", error);
    throw error;
  }
};

// Delete a bug
export const deleteBug = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting bug:", error);
    throw error;
  }
};
