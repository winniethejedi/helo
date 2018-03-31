import { LOGIN } from './constraints';

export function login(userInfo) {
    return {
        type: LOGIN,
        payload: userInfo
    };
};