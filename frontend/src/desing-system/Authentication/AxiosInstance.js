
import axios from 'axios';
import dayjs from 'dayjs';
import jwtDecode from 'jwt-decode';

// Get tokens from local storage
let accessToken = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : "";
let refreshToken = localStorage.getItem('refresh_token') ? JSON.parse(localStorage.getItem('refresh_token')) : "";

const baseURL = 'https://www.aborashad.com/api/Users';

const AxiosInstance = axios.create({
   baseURL: baseURL,
   headers: { Authorization: accessToken ? `Bearer ${accessToken}` : "" },
});

AxiosInstance.interceptors.request.use(async req => {
   if (accessToken) {
      req.headers.Authorization = `Bearer ${accessToken}`;
      try {
         const user = jwtDecode(accessToken);

         // Ensure user_type is correctly retrieved
         console.log('Decoded Token Data:', user);
         const userType = user.user_type || 'User type not available';
         console.log(`User Type: ${userType}`);
         console.log(`Full Name: ${user.full_name}`);
         console.log(`Is Active: ${user.is_active}`);

         const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
         if (!isExpired) return req;

         const resp = await axios.post(`${baseURL}/token/refresh/`, { refresh: refreshToken });
         const newAccessToken = resp.data.access;
         localStorage.setItem('token', JSON.stringify(newAccessToken));
         req.headers.Authorization = `Bearer ${newAccessToken}`;
         const newUser = jwtDecode(newAccessToken);

         console.log('Decoded Token Data:', newUser);
         console.log(`User Type: ${newUser.user_type}`);
         console.log(`Full Name: ${newUser.full_name}`);
         console.log(`Is Active: ${newUser.is_active}`);

         return req;
      } catch (error) {
         console.error('Token decoding failed:', error);
         return Promise.reject(error);
      }
   } else {
      req.headers.Authorization = "";
      return req;
   }
});

export default AxiosInstance;

