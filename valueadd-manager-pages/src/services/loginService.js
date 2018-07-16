/**
 * Created by sen.hu on 2018/1/25.
 */

import getRequestPromise from '../utils/getRequestPromise';

const requestUrl = {
  login: "/logon",//此处是node 对外接口
};

export default {
  login(loginName, password) {

    var params = {
      loginName: loginName,
      password: password
    };

    var options = {
      url: requestUrl.login,
      data: {
        ...params
      }
    };

    return getRequestPromise(options);
  }
}
