import axios from 'axios';

export const baseURL = 'http://localhost:3000/user';

const instance = axios.create({
    baseURL,
});

export const getVacations = (path: string) => 
    instance.get(path);
