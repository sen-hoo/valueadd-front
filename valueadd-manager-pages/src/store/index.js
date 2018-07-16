import Vue from 'vue';
import Vuex from 'vuex';

//import modules
import common from './modules/common';
import userInfo from './modules/userInfo';
//import actions and getters
import * as actions from './actions';
import * as getters from './getters';


Vue.use(Vuex);

//const debug = progress.env.NODE_ENV !== 'production';
export default new Vuex.Store({
    actions,
    getters,
    modules: {
        common,
        userInfo
    },
    //strict: debug
});