import axios, { AxiosResponse } from 'axios'
import { IActivity } from "../models/activity";
import { history } from '../..';
import { toast } from 'react-toastify';
import { IUser, IUserFormValues } from "../models/user";



axios.defaults.baseURL = 'http://localhost:59409/api/';

axios.interceptors.response.use(undefined,
    error => {
        const { status, data, config } = error.response;
        if (!error.response) {
            toast.error("Server currently unavailable");
        }
        if (status === 404) {
            history.push('/notfound');
        }
        if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
            history.push('/notfound');
        }
        if (status === 500) {
            toast.error("Server error - check console for more info");
        }
        throw error;
    });

const responseBody = (response: AxiosResponse) => response.data;

const requests = {
    get: (url: string) => axios.get(url).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    del: (url: string) => axios.delete(url).then(responseBody)
}

const Activities = {
    list: (): Promise<IActivity[]> => requests.get('/activities'),
    details: (id: string): Promise<IActivity> => requests.get(`/activities/${id}`),
    create: (activity: IActivity) => requests.post("activities", activity),
    update: (activity: IActivity) => requests.put(`activities/${activity.id}`, activity),
    delete: (id: string) => requests.del(`activities/${id}`)
}

const User = {
    current: (): Promise<IUser> => requests.get('/user'),
    login: (user: IUserFormValues): Promise<IUser> => requests.post('/user/login', user),
    register: (user: IUserFormValues): Promise<IUser> => requests.post('/user/register', user)
}

export default {
    Activities,
    User
}