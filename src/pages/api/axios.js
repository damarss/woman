import axios from 'axios';

const baseURL = `${process.env.BASE_URL}/api/`;
console.log(process.env.JWT_SECRET);

export default axios.create({
    baseURL: baseURL,
});

export const axiosAuth = axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: `Bearer `,
    }
});