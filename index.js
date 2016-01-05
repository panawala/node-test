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

app.get('/feeds/96/plays', function (req, res) {
    console.log(req.query)
    res.json({
        "status": "success",
        "data": {
            "address_id": 49,
            "plays": [{"id": 117, "desc": "aaaaaaa"}, {"id": 119, "desc": "ccccc"}, {"id": 120, "desc": "ddddd"}],
            "extra": []
        }
    });
});

app.get('/prices', function (req, res) {
    console.log(req.query)
    res.json({
        "status": "success",
        "data": {
            "shipping_type_list": [0, 1],
            "price_list": [
                {"status": true, "remark": "", "allow_num": 86, "price": "1", "max_buy": 1111, "id": 130},
                {"status": true, "remark": "", "allow_num": 86, "price": "2", "max_buy": 11, "id": 13}
            ]
        }
    });
});

app.get('/feeds', function (req, res) {
    console.log(req.query)
    var feed = {
        "created_at": "2015-12-22 16:50:41",
        "f_show_privilege": 3,
        "action_type_2": 1,
        "liked": false,
        "covers": [
            {
                "url": "http://7tszlo.com1.z0.glb.clouddn.com/5dc73992-aad2-11e5-a653-00163e002e64.jpg",
                "thumbnail": "http://7tszlo.com1.z0.glb.clouddn.com/5dc73992-aad2-11e5-a653-00163e002e64.jpg",
                "desc": "沉浸在草莓的香甜世界 | 亲手采摘良心无公害草莓带回家"
            },
            {
                "url": "http://7tszlo.com1.z0.glb.clouddn.com/fde51b20-a888-11e5-a653-00163e002e64.jpg",
                "thumbnail": "http://7tszlo.com1.z0.glb.clouddn.com/fde51b20-a888-11e5-a653-00163e002e64.jpg",
                "desc": "沉浸在草莓的香甜世界 | 亲手采摘良心无公害草莓带回家"
            },
            {
                "url": "http://7tszlo.com1.z0.glb.clouddn.com/05d7a014-a889-11e5-a653-00163e002e64.jpg",
                "thumbnail": "http://7tszlo.com1.z0.glb.clouddn.com/05d7a014-a889-11e5-a653-00163e002e64.jpg",
                "desc": "沉浸在草莓的香甜世界 | 亲手采摘良心无公害草莓带回家"
            },
            {
                "url": "http://7tszlo.com1.z0.glb.clouddn.com/71f71c66-aad2-11e5-a653-00163e002e64.jpg",
                "thumbnail": "http://7tszlo.com1.z0.glb.clouddn.com/71f71c66-aad2-11e5-a653-00163e002e64.jpg",
                "desc": "沉浸在草莓的香甜世界 | 亲手采摘良心无公害草莓带回家"
            },
            {
                "url": "http://7tszlo.com1.z0.glb.clouddn.com/0493ebea-a889-11e5-a653-00163e002e64.jpg",
                "thumbnail": "http://7tszlo.com1.z0.glb.clouddn.com/0493ebea-a889-11e5-a653-00163e002e64.jpg",
                "desc": "沉浸在草莓的香甜世界 | 亲手采摘良心无公害草莓带回家"
            },
            {
                "url": "http://7tszlo.com1.z0.glb.clouddn.com/02a26e1a-a889-11e5-a653-00163e002e64.jpg",
                "thumbnail": "http://7tszlo.com1.z0.glb.clouddn.com/02a26e1a-a889-11e5-a653-00163e002e64.jpg",
                "desc": "沉浸在草莓的香甜世界 | 亲手采摘良心无公害草莓带回家"
            },
            {
                "url": "http://7tszlo.com1.z0.glb.clouddn.com/0949ec48-a889-11e5-a653-00163e002e64.jpg",
                "thumbnail": "http://7tszlo.com1.z0.glb.clouddn.com/0949ec48-a889-11e5-a653-00163e002e64.jpg",
                "desc": "沉浸在草莓的香甜世界 | 亲手采摘良心无公害草莓带回家"
            },
            {
                "url": "http://7tszlo.com1.z0.glb.clouddn.com/72d7dcd2-a88a-11e5-a653-00163e002e64.jpg",
                "thumbnail": "http://7tszlo.com1.z0.glb.clouddn.com/72d7dcd2-a88a-11e5-a653-00163e002e64.jpg",
                "desc": "沉浸在草莓的香甜世界 | 亲手采摘良心无公害草莓带回家"
            },
            {
                "url": "http://7tszlo.com1.z0.glb.clouddn.com/6ef25868-a88a-11e5-a653-00163e002e64.jpg",
                "thumbnail": "http://7tszlo.com1.z0.glb.clouddn.com/6ef25868-a88a-11e5-a653-00163e002e64.jpg",
                "desc": "沉浸在草莓的香甜世界 | 亲手采摘良心无公害草莓带回家"
            }
        ],
        "tag_image_url": "http://7tszlo.com1.z0.glb.clouddn.com/50b64936-73d3-11e5-8e2f-00163e002e64.png",
        "likes": 181,
        "price2": 0,
        "price1": 100,
        "id": 2572,
        "addresses": [
            {
                "name": "周师傅草莓园",
                "cover": "",
                "address": "白鹤镇白石公路2571号(近税务中心)",
                "lat": "31.25465",
                "lng": "121.085451",
                "id": 1310
            }
        ],
        "category": 1,
        "title": "沉浸在草莓的香甜世界 | 亲手采摘良心无公害草莓带回家",
        "f_go_text": "报名",
        "is_go_show": 1,
        "followers": 0,
        "reason_text": "良心坚持30载，只为提供每颗健康、美味、放心的草莓。",
        "sub_categories": [
            "主题活动"
        ],
        "notices": [
            "活动时间：2016.01.10 周日 13:00-16:00￥请提前15分钟到场，活动准时开始",
            "活动地点：周师傅草莓园 青浦区￥白鹤镇白石公路2571号",
            "有巴士统一接送￥集合地点：莘庄地铁站北一口",
            "人数：14人",
            "本次活动非亲子类活动，儿童不宜参加",
            "如无法参加活动，请提前5天联系退款，￥否则概不退票或更换场次",
            "图片仅供参考"
        ],
        "type": 1,
        "ambassador_url": "http://7tszlo.com1.z0.glb.clouddn.com/b0f42d04-1f05-11e5-9ed5-00163e002e64.png",
        "business": {
            "city": "上海",
            "id": 21178945,
            "name": "周师傅草莓园"
        },
        "time": "本周日开始",
        "introduction": "https://m.xmonster.cn/projects/2572",
        "feed_type": 1,
        "action_text": "售完",
        "f_cover_list": "[\"http://7tszlo.com1.z0.glb.clouddn.com/5dc73992-aad2-11e5-a653-00163e002e64.jpg\", \"http://7tszlo.com1.z0.glb.clouddn.com/fde51b20-a888-11e5-a653-00163e002e64.jpg\", \"http://7tszlo.com1.z0.glb.clouddn.com/05d7a014-a889-11e5-a653-00163e002e64.jpg\", \"http://7tszlo.com1.z0.glb.clouddn.com/71f71c66-aad2-11e5-a653-00163e002e64.jpg\", \"http://7tszlo.com1.z0.glb.clouddn.com/0493ebea-a889-11e5-a653-00163e002e64.jpg\", \"http://7tszlo.com1.z0.glb.clouddn.com/02a26e1a-a889-11e5-a653-00163e002e64.jpg\", \"http://7tszlo.com1.z0.glb.clouddn.com/0949ec48-a889-11e5-a653-00163e002e64.jpg\", \"http://7tszlo.com1.z0.glb.clouddn.com/72d7dcd2-a88a-11e5-a653-00163e002e64.jpg\", \"http://7tszlo.com1.z0.glb.clouddn.com/6ef25868-a88a-11e5-a653-00163e002e64.jpg\"]",
        "desc": "",
        "action_enabled": false,
        "name": "",
        "action_type": 0,
        "f_head_pic_url": "http://7tszlo.com1.z0.glb.clouddn.com/5dc73992-aad2-11e5-a653-00163e002e64.jpg",
        "brief_info": "如今市面上的草莓大多是经由草莓贩子流通到市场，大棚直接零售的草莓越来越少，也更难见到新鲜采摘的草莓。而在周师傅这里，你将沉浸在草莓的香甜世界——参观了解草莓种植，品尝新鲜草莓并亲手采摘带回家。个大味甜惹人爱，你会惊叹，原来草莓这样好吃！",
        "price_type": 5,
        "has_ambassador": true,
        "f_share_url": "",
        "provider_type": "self_goods",
        "category_desc": "走起独家"
    }
    res.json({
        status: 'success',
        data: feed
    })
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
