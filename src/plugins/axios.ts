import axios from 'axios'

const Axios = axios.create();

// Add a response interceptor
Axios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response.status === 401) {
    window.location.href = '/account/login'
    return
  }
  return Promise.reject(error);
});

export default Axios;