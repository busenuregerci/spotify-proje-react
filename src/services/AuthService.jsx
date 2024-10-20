import axios from "axios";


const AuthService = {
    login: async (username, password) => {
      const url = "https://api.escuelajs.co/api/v1/auth/login";
      
        const response = await axios.post(url, {
          email: username,
          password,
        });
  
        if (response.data.access_token) {
          localStorage.setItem("userToken", JSON.stringify(response.data));
        }
        return response.data;
      // } catch (error) {
      //   console.error("AuthService login error:", error.response.data);
      //   throw new error; // Bu hatayı dışarı fırlat
      // }
    
      },
    logout: () => {
      localStorage.removeItem("userToken");
    }
  };
  
  export default AuthService;
  