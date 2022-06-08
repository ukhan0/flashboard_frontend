import axios from 'axios';
import { get } from 'lodash';
// import { refreshToken } from '../utils/helpers';
export default {
  initalise: () => {
    axios.defaults.baseURL = get(process.env, 'REACT_APP_APIURL', '');
    // Request Interceptor. All Request pass from here
    axios.interceptors.request.use(
      axiosConfig => {
        const authToken = localStorage.getItem('auth_token');
        if (authToken) {
          axiosConfig.headers['Authorization'] = `Bearer ${localStorage.getItem('auth_token')}`;
        }
        axiosConfig.headers['Content-Type'] = 'application/json';
        return axiosConfig;
      },
      error => {
        Promise.reject(error);
      }
    );

    /*
				Response Interceptor
				Responsibilities:
				1- If api sends new token then change the store auth token with new token
				2- If api sends 401 token then send user to login page
			*/

    axios.interceptors.response.use(
      response => {
        return response;
      },
      function(error) {
        if (get(error, 'response.status', '') === 401) {
          //let res = get(error, 'response.data', '');
          //if (res['invalidToken']) {
            localStorage.removeItem('auth_token');
            if (window.location.pathname !== '/PagesRegister') {
              window.location.href = '/PagesRegister';
            }

            // redirect to login page
          //}

          //if (res['TokenExpired']) {
            //refreshToken();
            // refresh user token
          //}
        } else {
          return Promise.reject(error);
        }
      }
    );
  }
};
