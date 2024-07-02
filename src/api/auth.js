const baseURL = import.meta.env.VITE_BASE_URL;

export const register = async (formData) => {
  try {
    const response = await fetch(`${baseURL}/auth/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Registration failed");
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, msg: error.message };
  }
};

export const login = async (formData) => {
  try {
    const response = await fetch(`${baseURL}/auth/token/obtain/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Login failed");
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, msg: error.message };
  }
};
