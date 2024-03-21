import axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios';

const apiBaseRoute = 'https://kickadmin.onrender.com';

export function postWithoutHeaderRequestAPI({ url = '', data = {} }) {
    return postRequestWithoutHeaderCall(url, data);
}
function postRequestWithoutHeaderCall(path: string, data: any, options?: AxiosRequestConfig) {
    return new Promise((resolve, reject) => {
        axios.post(`${apiBaseRoute}${path}`, data).then((response: any) => {
            resolve(response.data);
        }).catch((error: any) => {
            reject(error.message);
        });
    });
}

export function postWithTokenRequestAPI({url = '', data = {}, token = ''}) {
    return postRequestWithToken(url, data, token);
}


function postRequestWithToken(path: string, data: any, token: string, options?: AxiosRequestConfig) {
  const authOptions: AxiosRequestConfig = {
    ...options,
    headers: {
      ...options?.headers,
      'Authorization': `Bearer ${token}` 
    }
  };

  return new Promise((resolve, reject) => {
    axios.post(`${apiBaseRoute}${path}`, data, authOptions).then(response => {
      resolve(response.data);
    }).catch((error: AxiosError) => {
      reject(error.message);
    });
  });
}
