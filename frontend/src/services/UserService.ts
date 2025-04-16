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
    const response = await http.post<AuthResponse>("/api/auth/login", {
      email,
      password,
    });
    if (response.data.data.token) {
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
    }
    return response.data;
  } catch (error: any) {
    throw error.response?.data || { message: "An error occurred during login" };
  }
};

const register = async (
  name: string,
  userName: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await http.post<AuthResponse>("/api/auth/register", {
      name,
      userName,
      email,
      password,
    });
    if (response.data.data.token) {
      localStorage.setItem("token", response.data.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
    }
    return response.data;
  } catch (error: any) {
    throw (
      error.response?.data || {
        message: "An error occurred during registration",
      }
    );
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
