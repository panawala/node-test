var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var request = require('request');
var qiniu = require('qiniu');
var fs = require('fs');
var uuid = require('node-uuid');

qiniu.conf.ACCESS_KEY = 'xxx';
qiniu.conf.SECRET_KEY = 'yyy';

bucket_name = 'pan2';
upload_url = 'http://up.qiniu.com/';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer({dest: '/tmp/'}));

app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return next();
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/plays', function (req, res) {
    console.log(req.query)
    res.json([
        {id: 11111, name: '场次1 from node'},
        {id: 11112, name: '场次2 from node'},
        {id: 11113, name: '场次3 from node'},
        {id: 11114, name: '场次4 from node'}
    ]);
});

app.get('/prices', function (req, res) {
    console.log(req.query)
    res.json([
        {id: 11111, price: 100},
        {id: 11112, price: 200},
        {id: 11113, price: 300},
        {id: 11114, price: 400}
    ]);
});

app.post('/api/photos', function (req, res) {
    console.log(req.body);
    console.log(req.files);
    //res.json(req.files);
    //console.log(req.body.avatar);
    //var buf = new Buffer(req.body.avatar, 'base64');

    var r = request.post(upload_url, function optionalCallback(err, httpResponse, body) {
        console.log(err);
        console.log(httpResponse.body);
        console.log(JSON.parse(httpResponse.body));
        http://7xjfrz.com1.z0.glb.clouddn.com/104b8140-08fd-11e5-8841-c96ac78eb2dc.png
            var file_url = "http://7xjfrz.com1.z0.glb.clouddn.com/" + JSON.parse(httpResponse.body).key;
        console.log(file_url);
        res.json({'file_url': file_url});
    });
    var form = r.form();
    file_name = uuid.v1() + '.png';
    form.append('token', new qiniu.rs.PutPolicy(bucket_name).token());
    form.append('key', file_name);
    //form.append('file', buf, {filename: file_name});
    form.append('file', fs.createReadStream(req.files['file']['path']), {filename: file_name});
    //console.log(JSON.stringify(req.files));
});

var server = app.listen(8000, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});
