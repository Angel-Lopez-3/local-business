import { createContext, useContext, useEffect, useState } from "react";

import {
  loginRequest,
  registerRequest,
  logoutRequest,
  meRequest,
} from "../api/authApi";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  const login = async (credentials) => {
    await loginRequest(credentials);

    await checkAuth();
  };

  const register = async (userData) => {
    return await registerRequest(userData);
  };

  const logout = async () => {
    try {
      await logoutRequest();
    } catch (error) {
      console.error(error);
    }

    setUser(null);
  };

  const checkAuth = async () => {
    try {
      const response = await meRequest();

      setUser(response.data.data);

      return response.data.data;
    } catch (error) {
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        register,
        logout,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};