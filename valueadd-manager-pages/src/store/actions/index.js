// module.exports = {
//     ...require('./commonActions'),
//     ...require('./userInfoActions')
// };
import {setEmptyResult, setEmptyError, showLoading, hideLoading} from './commonActions';
import {getUserInfo, setUserInfo, loginOut} from './userInfoActions';

export {
    setEmptyResult,
    setEmptyError,
    showLoading,
    hideLoading,
    getUserInfo,
    setUserInfo,
    loginOut
}