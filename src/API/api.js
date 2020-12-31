import axios from 'axios';

export const API = axios.create({
    baseURL: 'http://localhost:8080/api/',
    headers: {
      Accept: '*/*',
    //  AccessControlAllowOrigin: 'https://localhost:8090/',
      Allow: 'GET, POST, PUT, DELETE',
      AcceptEncoding:'gzip,deflate'
  
  
  }
  })