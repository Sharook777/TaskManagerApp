import api from "./api";

export const resetPassword = async (payload) => {
  try {
    const response = await api.post("/app/reset-password", payload);
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
