import {
    REQUEST_FAILURE,
    SET_OPERTE_RESULT,
    SHOW_LOADING,
    HIDE_LOADING
} from "../mutation-types";

export const setEmptyResult = ({ commit }) => {
    commit(SET_OPERTE_RESULT, '');
};

export const setEmptyError = ({ commit }) => {
    commit(REQUEST_FAILURE, '');
};

export const showLoading = ({ commit }) => {
    commit(SHOW_LOADING);
};

export const hideLoading = ({ commit }) => {
    commit(HIDE_LOADING);
};
