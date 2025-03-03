import { createContext, useContext, useState, useEffect } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import api from "../services/api";

const AuthContext = createContext({
  loading: true,
  user: null,
  login: async () => {},
  logout: async () => {},
  signup: async () => {},
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      setLoading(true);
      const user = await AsyncStorage.getItem("user");
      if (user) setUser(JSON.parse(user));
      setLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await api.post("/auth/login", { email, password });
      await AsyncStorage.setItem("token", response.data?.data?.accessToken);
      await AsyncStorage.setItem(
        "user",
        JSON.stringify(response.data?.data?.user)
      );
      setUser(response.data?.data?.user);
      setLoading(false);
      return {
        success: true,
      };
    } catch (error) {
      setLoading(false);
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
  };

  const signup = async (email, password, name) => {
    try {
      await api.post("/auth/register", {
        email,
        password,
        name,
      });
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || error.message,
      };
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

export default function useAuth() {
  return useContext(AuthContext);
}
