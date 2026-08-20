import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "./plugins/axios";
import { handleError } from "./helpers/errorHelper";
import Cookies from "js-cookie";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const token = Cookies.get("token");

    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.get("/me");
      setUser(response.data.data);
    } catch (error) {
      setUser(null);
      Cookies.remove("token");
      setError(handleError(error));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const value = {
    navigate,
    loading,
    setLoading,
    error,
    setError,
    user,
    setUser,
    fetchUser,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
