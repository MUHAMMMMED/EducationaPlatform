// // // // // // import axios from 'axios';
// // // // // // import dayjs from 'dayjs';
// // // // // // import jwtDecode from 'jwt-decode';


// // // // // // let accessToken = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : ""
// // // // // // let refresh_token = localStorage.getItem('refresh_token') ? JSON.parse(localStorage.getItem('refresh_token')) : ""

// // // // // // const baseURL = 'http://localhost:8000/api/Users'

// // // // // // const AxiosInstance = axios.create({
// // // // // //    baseURL: baseURL,
// // // // // //    'Content-type': 'application/json',
// // // // // //    headers: { Authorization: localStorage.getItem('token') ? `Bearer ${accessToken}` : "" },
// // // // // // });

// // // // // // AxiosInstance.interceptors.request.use(async req => {
// // // // // //    if (accessToken) {
// // // // // //       //  accessToken=localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null
// // // // // //       req.headers.Authorization = localStorage.getItem('token') ? `Bearer ${accessToken}` : ""
// // // // // //       const user = jwtDecode(accessToken)
// // // // // //       // alert(user?.email,);
// // // // // //       alert(user?.user_type,);
// // // // // //       // alert(user?.full_name);


// // // // // //       const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1
// // // // // //       if (!isExpired) return req
// // // // // //       const resp = await axios.post(`${baseURL}/token/refresh/`, {
// // // // // //          refresh: refresh_token
// // // // // //       })
// // // // // //       localStorage.setItem('token', JSON.stringify(resp.data.access))
// // // // // //       req.headers.Authorization = `Bearer ${resp.data.access}`
// // // // // //       return req
// // // // // //    } else {
// // // // // //       req.headers.Authorization = localStorage.getItem('token') ? `Bearer ${JSON.parse(localStorage.getItem('token'))}` : " "



// // // // // //       return req
// // // // // //    }

// // // // // // })

// // // // // // export default AxiosInstance;




// // // // // import axios from 'axios';
// // // // // import dayjs from 'dayjs';
// // // // // import jwtDecode from 'jwt-decode';

// // // // // // Get tokens from local storage
// // // // // let accessToken = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : "";
// // // // // let refreshToken = localStorage.getItem('refresh_token') ? JSON.parse(localStorage.getItem('refresh_token')) : "";

// // // // // const baseURL = 'http://localhost:8000/api/Users';

// // // // // const AxiosInstance = axios.create({
// // // // //    baseURL: baseURL,
// // // // //    headers: { Authorization: accessToken ? `Bearer ${accessToken}` : "" },
// // // // // });

// // // // // AxiosInstance.interceptors.request.use(async req => {
// // // // //    if (accessToken) {
// // // // //       req.headers.Authorization = `Bearer ${accessToken}`;
// // // // //       const user = jwtDecode(accessToken);
// // // // //       alert(`User Type: ${user.user_type}`);

// // // // //       const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
// // // // //       if (!isExpired) return req;

// // // // //       try {
// // // // //          const resp = await axios.post(`${baseURL}/token/refresh/`, { refresh: refreshToken });
// // // // //          const newAccessToken = resp.data.access;
// // // // //          localStorage.setItem('token', JSON.stringify(newAccessToken));
// // // // //          req.headers.Authorization = `Bearer ${newAccessToken}`;
// // // // //          const newUser = jwtDecode(newAccessToken);
// // // // //          alert(`User Type: ${newUser.user_type}`);

// // // // //          return req;
// // // // //       } catch (error) {
// // // // //          console.error('Token refresh failed:', error);
// // // // //          return Promise.reject(error);
// // // // //       }
// // // // //    } else {
// // // // //       req.headers.Authorization = "";
// // // // //       return req;
// // // // //    }
// // // // // });

// // // // // export default AxiosInstance;


// // // // import axios from 'axios';
// // // // import dayjs from 'dayjs';
// // // // import jwtDecode from 'jwt-decode';

// // // // // Get tokens from local storage
// // // // let accessToken = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : "";
// // // // let refreshToken = localStorage.getItem('refresh_token') ? JSON.parse(localStorage.getItem('refresh_token')) : "";

// // // // const baseURL = 'http://localhost:8000/api/Users';

// // // // const AxiosInstance = axios.create({
// // // //    baseURL: baseURL,
// // // //    headers: { Authorization: accessToken ? `Bearer ${accessToken}` : "" },
// // // // });

// // // // AxiosInstance.interceptors.request.use(async req => {
// // // //    if (accessToken) {
// // // //       req.headers.Authorization = `Bearer ${accessToken}`;
// // // //       try {
// // // //          const user = jwtDecode(accessToken);
// // // //          // Check if user_type exists in the token payload
// // // //          const userType = user.user_type ? user.user_type : 'User type not available';
// // // //          alert(`User Type: ${userType}`); // Display user_type for debugging

// // // //          const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
// // // //          if (!isExpired) return req;

// // // //          const resp = await axios.post(`${baseURL}/token/refresh/`, { refresh: refreshToken });
// // // //          const newAccessToken = resp.data.access;
// // // //          localStorage.setItem('token', JSON.stringify(newAccessToken));
// // // //          req.headers.Authorization = `Bearer ${newAccessToken}`;
// // // //          const newUser = jwtDecode(newAccessToken);
// // // //          const newUserType = newUser.user_type ? newUser.user_type : 'User type not available';
// // // //          alert(`New User Type: ${newUserType}`); // Display new user_type for debugging
// // // //          return req;
// // // //       } catch (error) {
// // // //          console.error('Token decoding failed:', error);
// // // //          return Promise.reject(error);
// // // //       }
// // // //    } else {
// // // //       req.headers.Authorization = "";
// // // //       return req;
// // // //    }
// // // // });

// // // // export default AxiosInstance;


// // // import axios from 'axios';
// // // import dayjs from 'dayjs';
// // // import jwtDecode from 'jwt-decode';

// // // // Get tokens from local storage
// // // let accessToken = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : "";
// // // let refreshToken = localStorage.getItem('refresh_token') ? JSON.parse(localStorage.getItem('refresh_token')) : "";

// // // const baseURL = 'http://localhost:8000/api/Users';

// // // const AxiosInstance = axios.create({
// // //    baseURL: baseURL,
// // //    headers: { Authorization: accessToken ? `Bearer ${accessToken}` : "" },
// // // });

// // // AxiosInstance.interceptors.request.use(async req => {
// // //    if (accessToken) {
// // //       req.headers.Authorization = `Bearer ${accessToken}`;
// // //       try {
// // //          const user = jwtDecode(accessToken);

// // //          // Ensure user_type is correctly retrieved
// // //          const userType = user.user_type || 'User type not available';
// // //          // alert(`User Type: ${userType}`); // Display user_type for debugging
// // //          // alert(`is_active: ${user.full_name}`); // Display full_name for debugging
// // //          // alert(`is_active: ${user.is_active}`); // Display is_active for debugging


// // //          const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
// // //          if (!isExpired) return req;

// // //          const resp = await axios.post(`${baseURL}/token/refresh/`, { refresh: refreshToken });
// // //          const newAccessToken = resp.data.access;
// // //          localStorage.setItem('token', JSON.stringify(newAccessToken));
// // //          req.headers.Authorization = `Bearer ${newAccessToken}`;
// // //          const newUser = jwtDecode(newAccessToken);

// // //          // Ensure newUser.user_type is correctly retrieved
// // //          const newUserType = newUser.user_type || 'User type not available';
// // //          alert(`New User Type: ${newUserType}`); // Display new user_type for debugging
// // //          return req;
// // //       } catch (error) {
// // //          console.error('Token decoding failed:', error);
// // //          return Promise.reject(error);
// // //       }
// // //    } else {
// // //       req.headers.Authorization = "";
// // //       return req;
// // //    }
// // // });

// // // export default AxiosInstance;



// // import axios from 'axios';
// // import dayjs from 'dayjs';
// // import jwtDecode from 'jwt-decode';

// // // Get tokens from local storage
// // let accessToken = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : "";
// // let refreshToken = localStorage.getItem('refresh_token') ? JSON.parse(localStorage.getItem('refresh_token')) : "";

// // const baseURL = 'http://localhost:8000/api/Users';

// // const AxiosInstance = axios.create({
// //    baseURL: baseURL,
// //    headers: { Authorization: accessToken ? `Bearer ${accessToken}` : "" },
// // });

// // AxiosInstance.interceptors.request.use(async req => {
// //    if (accessToken) {
// //       req.headers.Authorization = `Bearer ${accessToken}`;
// //       try {
// //          const user = jwtDecode(accessToken);

// //          // Ensure user_type is correctly retrieved
// //          const userType = user.user_type || 'User type not available';
// //          console.log(`User Type: ${userType}`); // Display user_type for debugging
// //          console.log(`Full Name: ${user.full_name}`); // Display full_name for debugging
// //          console.log(`Is Active: ${user.is_active}`); // Display is_active for debugging

// //          const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
// //          if (!isExpired) return req;

// //          const resp = await axios.post(`${baseURL}/token/refresh/`, { refresh: refreshToken });
// //          const newAccessToken = resp.data.access;
// //          localStorage.setItem('token', JSON.stringify(newAccessToken));
// //          req.headers.Authorization = `Bearer ${newAccessToken}`;
// //          const newUser = jwtDecode(newAccessToken);

// //          // Ensure newUser.user_type is correctly retrieved
// //          const newUserType = newUser.user_type || 'User type not available';
// //          console.log(`New User Type: ${newUserType}`); // Display new_user_type for debugging
// //          return req;
// //       } catch (error) {
// //          console.error('Token decoding failed:', error);
// //          return Promise.reject(error);
// //       }
// //    } else {
// //       req.headers.Authorization = "";
// //       return req;
// //    }
// // });

// // export default AxiosInstance;



// import axios from 'axios';
// import dayjs from 'dayjs';
// import jwtDecode from 'jwt-decode';

// // Get tokens from local storage
// let accessToken = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : "";
// let refreshToken = localStorage.getItem('refresh_token') ? JSON.parse(localStorage.getItem('refresh_token')) : "";

// const baseURL = 'http://localhost:8000/api/Users';

// const AxiosInstance = axios.create({
//    baseURL: baseURL,
//    headers: { Authorization: accessToken ? `Bearer ${accessToken}` : "" },
// });

// AxiosInstance.interceptors.request.use(async req => {
//    if (accessToken) {
//       req.headers.Authorization = `Bearer ${accessToken}`;
//       try {
//          const user = jwtDecode(accessToken);

//          // Ensure user_type is correctly retrieved
//          console.log('Decoded Token Data:', user);
//          const userType = user.user_type || 'User type not available';
//          // alert(userType);
//          console.log(`User Type: ${userType}`); // Display user_type for debugging
//          console.log(`Full Name: ${user.full_name}`); // Display full_name for debugging
//          console.log(`Is Active: ${user.is_active}`); // Display is_active for debugging
//          console.log('Decoded Token Data:', user);
//          const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;
//          if (!isExpired) return req;

//          const resp = await axios.post(`${baseURL}/token/refresh/`, { refresh: refreshToken });
//          const newAccessToken = resp.data.access;
//          localStorage.setItem('token', JSON.stringify(newAccessToken));
//          req.headers.Authorization = `Bearer ${newAccessToken}`;
//          const newUser = jwtDecode(newAccessToken);
//          // Ensure user_type is correctly retrieved
//          console.log('Decoded Token Data:', newUser);
//          console.log(`User Type: ${newUser.userType}`); // Display user_type for debugging
//          console.log(`Full Name: ${newUser.full_name}`); // Display full_name for debugging
//          console.log(`Is Active: ${newUser.is_active}`); // Display is_active for debugging

//          return req;
//       } catch (error) {
//          console.error('Token decoding failed:', error);
//          return Promise.reject(error);
//       }
//    } else {
//       req.headers.Authorization = "";
//       return req;
//    }
// });

// export default AxiosInstance;


import axios from 'axios';
import dayjs from 'dayjs';
import jwtDecode from 'jwt-decode';

// Get tokens from local storage
let accessToken = localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : "";
let refreshToken = localStorage.getItem('refresh_token') ? JSON.parse(localStorage.getItem('refresh_token')) : "";

const baseURL = 'http://localhost:8000/api/Users';

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

