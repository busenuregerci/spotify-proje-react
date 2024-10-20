
import { createContext, useState } from "react";
import AuthService from "../services/AuthService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(
    !!JSON.parse(localStorage.getItem("usertoken")) // Token varsa true, yoksa false
  );

  const login = async (username, password) => {
    try {
      const response = await AuthService.login(username, password);

      if (response.access_token) {
        // Token'ı localStorage'a kaydediyoruz
        localStorage.setItem("usertoken", JSON.stringify(response.access_token));
        setAuthenticated(true); // Giriş başarılı
      }
    } catch (error) {
      setAuthenticated(false); // Hatalı giriş
      throw new Error(error);
    }
  };

  const logout = () => {
    AuthService.logout();
    localStorage.removeItem("usertoken"); // Token'ı temizliyoruz
    setAuthenticated(false); // Çıkış yapıldı
  };

  return (
    <AuthContext.Provider value={{ login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
