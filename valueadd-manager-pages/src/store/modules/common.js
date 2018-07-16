import {
    SHOW_LOADING,
    HIDE_LOADING,
    REQUEST_FAILURE,
    SET_OPERTE_RESULT
} from '../mutation-types';


const state = {
    showLoading: false,
    systemError: "",
    operateResult: ""
};

const mutations = {
    [SHOW_LOADING](state) {
        state.showLoading = true;
    },
    [HIDE_LOADING](state) {
        state.showLoading = false;
    },
    [REQUEST_FAILURE](state, error) {
        state.systemError = error;
    },
    [SET_OPERTE_RESULT](state, msg) {
        state.operateResult = msg;
    }
};
export default {
    state,
    mutations
};
