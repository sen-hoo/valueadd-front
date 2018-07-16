'use strict'
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const domain = require('domain');
const ipv4 = require('ipv4');

var routers = require('./routers');

let app = express();
let port = process.env.port || 13015;

//增加body对url编码
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(express.static(path.join(__dirname, '/dist')));

//增加express router路由
routers.forEach(function (router) {
    app.use(router);
});
//增加domain控制
app.use(function (req, res, next) {
    let d = domain.create();
    d.on('error', function (err) {
        console.log('in domain');
        res.statusCode = 500;
        res.json({ 'success': false, 'message': 'domain error' })
    })
    d.add(req);
    d.add(res);
    d.run(next);
})

//server开启
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('listening http://%s:%s', host, port);
});