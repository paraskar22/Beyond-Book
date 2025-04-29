import http from "../http-common.ts";

interface User {
  userId: string;
  email: string;
  name?: string;
  userName?: string;
  // Add other user properties as needed
}

interface AuthResponse {
  success: boolean;
  message?: string;
  data: {
    token: string;
    user: User;
  };
}

const login = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await http.post<AuthResponse>("/auth/login", {
      email,
      password,
    });

    const { token, user } = response.data.data;

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    }

    return response.data;
  } catch (error: any) {
    console.error("Login error:", error);
    throw (
      error?.response?.data || { message: "An error occurred during login" }
    );
  }
};

const register = async (
  name: string,
  username: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await http.post<AuthResponse>("/auth/register", {
      name,
      username,
      email,
      password,
    });

    if (!response.data.success) {
      throw new Error(response.data.message || "Registration failed");
    }

    const { token, user } = response.data.data;

    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
    }

    return response.data;
  } catch (error: any) {
    console.error("Registration error:", error);
    const errorMessage =
      error?.response?.data?.message ||
      error.message ||
      "An error occurred during registration";
    throw new Error(errorMessage);
  }
};

const logout = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

const getCurrentUser = (): User | null => {
  try {
    const userStr = localStorage.getItem("user");
    if (!userStr || userStr === "undefined" || userStr === "null") {
      return null;
    }
    return JSON.parse(userStr);
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};

const getToken = (): string | null => {
  return localStorage.getItem("token");
};

const isAuthenticated = (): boolean => {
  return !!getToken();
};

const UserService = {
  login,
  register,
  logout,
  getCurrentUser,
  getToken,
  isAuthenticated,
};

export default UserService;
