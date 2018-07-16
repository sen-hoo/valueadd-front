import {
    SET_USER_INFO,
    LOGIN_OUT
} from "../mutation-types";

const state = {
    loginName: "",
    token: "",
    realName: "",
    isTimeOut: false
};
const mutations = {
    [SET_USER_INFO](state, data) {
        state.loginName = data.username;
        state.token = data.token;
        state.realName = data.realName;
    },
    [LOGIN_OUT](state) {
        state.loginName = "";
        state.token = "";
        state.realName = "";
        state.isTimeOut = true;
    }
};
export default {
    state,
    mutations
};
