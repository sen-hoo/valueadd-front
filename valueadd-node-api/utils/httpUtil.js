const request = require('request');
var apiConfig = require('../common/apiConfig');
module.exports = {
    postData: function (url, params, res) {

        function callBack(error, response, data) {//post 回调函数
            if (!error && response.statusCode === 200) {
                console.log('---------------------call sucess:' + url + '-------------------------');
                console.log(data);
                res.json(JSON.parse(data));
            } else {
                if (error) {
                    console.log('error:' + error.message);
                }
                if (response) {
                    console.log('error:' + error.message);
                    if (data) {
                        console.log(data);
                    }
                }
            }
        }

        var url = apiConfig.managerApiUrl + url;
        request.post(url, callBack).form(params);

    }
}