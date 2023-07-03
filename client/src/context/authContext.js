import { createContext, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  const login = async (inputs) => {
    const API = "http://localhost:3333/api/auth/login";
    try {
      const res = await axios.post(API, inputs, {
        withCredentials: true,
      });

      if (res.status === 200) {
        setCurrentUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        localStorage.setItem("token", res.data.token); // Store the token in local storage
        console.log("Logged in successfully");
      } else {
        console.log("Error during login:", res.data);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:3333/api/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );
    } catch (err) {
      console.log(err);
    }
    setCurrentUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // Remove the token from local storage
  };

  return <AuthContext.Provider value={{ currentUser, login, logout }}>{children}</AuthContext.Provider>;
};
