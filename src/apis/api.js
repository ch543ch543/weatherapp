import axios from 'axios';

export default axios.create({
    baseURL: 'http://api.weatherbit.io/v2.0/forecast'
})