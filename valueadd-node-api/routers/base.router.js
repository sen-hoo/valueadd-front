'use strict';
const express = require('express');
const router = express.Router();
var url = require('url');
var httpUtil = require('../utils/httpUtil');

//测试nodejs
router.get('/test', function(req, res, next) {
    var queryArgs = url.parse(req.url, true).query;
    console.log('parmas: name:' + queryArgs.name) //获取一个url参数
    console.log('login -------' + JSON.stringify(queryArgs));
    res.json(JSON.parse("{\"test\": 200}"));
});

//登陆模块调用
router.post("/login", function (req, res, next) {
    console.log('------------------- call login --------------');
    var relativePath = '/login';
    var args = req.body;
    var params = args;
    httpUtil.postData(relativePath, params, res);
});

//退出模块调用
router.get("/logout", function (req, res, next) {
    res.json(JSON.parse("{\"test\": 200}"));
});

module.exports = router;