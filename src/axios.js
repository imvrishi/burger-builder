import axios from 'axios';

export const axOrders = axios.create({
    baseURL: 'https://burger-builder-54b62.firebaseio.com/'
});