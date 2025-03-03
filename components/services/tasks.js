import api from "./api";

export const getTasks = async () => {
  try {
    const response = await api.get("/app/tasks");
    return {
      success: true,
      data: response.data?.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

export const getTask = async (id) => {
  try {
    const response = await api.get(`/app/task/${id}`);
    return {
      success: true,
      data: response.data?.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

export const addTask = async (payload) => {
  try {
    const response = await api.post("/app/task", payload);
    return {
      success: true,
      data: response.data?.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

export const updateTask = async (id, payload) => {
  try {
    const response = await api.put(`/app/task/${id}`, payload);
    return {
      success: true,
      data: response.data?.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await api.delete(`/app/task/${id}`);
    return {
      success: true,
      data: response.data?.data,
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
