import axios from 'axios';
import { API } from '../sensitiveData/config';

export default axios.create({
    baseURL: API.url,
    withCredentials: true
});