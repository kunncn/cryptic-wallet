import axiosInstance from "./api";
export const register = async (formData) => {
  try {
    const response = await axiosInstance.post("/auth/register/", formData);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      msg: error.response?.data?.message || "Registration failed",
    };
  }
};

export const login = async (formData) => {
  try {
    const response = await axiosInstance.post("/auth/token/obtain/", formData);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      msg: error.response?.data?.message || "Login failed",
    };
  }
};
