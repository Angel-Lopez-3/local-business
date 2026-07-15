import { createContext, useContext, useEffect, useState } from "react";

import {
  loginRequest,
  registerRequest,
  logoutRequest,
  meRequest,
} from "../api/authApi";

import { ROLES } from "../utils/roles";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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

  const login = async (credentials) => {
    await loginRequest(credentials);
    return await checkAuth();
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

  useEffect(() => {
    checkAuth();
  }, []);

  const isAdmin = user?.role?.name === ROLES.ADMIN;
  const isBusiness = user?.role?.name === ROLES.BUSINESS;

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
        isAdmin,
        isBusiness,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
