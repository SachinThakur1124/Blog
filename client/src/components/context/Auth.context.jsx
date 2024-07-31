import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [auth, setAuth] = useState({
    user: null,
    isAuthenticated: null,
  });

  const checkAuth = async () => {
    const res = await axios.get("/api/v1/auth/verifyToken", {
      headers: { "x-auth-token": localStorage.getItem("token") },
    });
    console.log(res);
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const login = async () => {
    try {
      const res = await axios.post("/api/v1/auth/login", {
        email: formData.email,
        password: formData.password,
      });
      console.log(res);
      const { token } = res.data;
      localStorage.setItem("token", token);

      if (res.data.success) {
        alert("Logged in Successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, formData, setFormData }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
