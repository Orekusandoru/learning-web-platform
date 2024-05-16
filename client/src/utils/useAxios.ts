import axios from "axios";
import  { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";


interface DecodedToken {
  exp: number; 

}
interface UserInfo {
  id: number;
  username: string;
  email: string;
  role: string; 
}



const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const baseURL = `${BACKEND_URL}/backend`;

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens } = useContext(AuthContext);

  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` }
  });

  axiosInstance.interceptors.request.use(async req => {
    const decodedToken = jwtDecode(authTokens.access) as DecodedToken;
    const isExpired = dayjs.unix(decodedToken.exp).diff(dayjs()) < 1;

    if (!isExpired) return req;

    const response = await axios.post(`${baseURL}/token/refresh/`, {
      refresh: authTokens.refresh
    });
    localStorage.setItem("authTokens", JSON.stringify(response.data));
    localStorage.setItem("authTokens", JSON.stringify(response.data));

    setAuthTokens(response.data);
    const newUser = jwtDecode(response.data.access) as UserInfo; 
    setUser(newUser);

    req.headers.Authorization = `Bearer ${response.data.access}`;
    return req;
  });

  return axiosInstance;
};
  
  export default useAxios;