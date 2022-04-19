import axios from 'axios';

const Client = axios.create();

Client.defaults.baseURL = 'http://localhost:3000/api/v1';

export default Client;
