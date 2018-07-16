import {
    SET_USER_INFO,
    LOGIN_OUT
} from "../mutation-types";

let localStorage = window.localStorage;

let storeUserInfo = (data) => {
    localStorage.setItem('userInfo', JSON.stringify(data))
};

export const getUserInfo = ({ commit }) => {
    if (localStorage.getItem('userInfo')) {
        let data = JSON.parse(localStorage.getItem('userInfo'))
        commit(SET_USER_INFO, data);
    }
};

export const setUserInfo = ({ commit }, userInfo) => {
    storeUserInfo(userInfo);
    commit(SET_USER_INFO, userInfo);
};

export const loginOut = ({ commit }, userInfo) => {
    // localStorage.removeItem('userInfo');
    window.localStorage.clear();
    commit(LOGIN_OUT, userInfo);
};
