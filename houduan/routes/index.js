var express = require('express');
var router = express.Router();

/* GET index page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Online Reading Management System' });
});
router.get('/login', function(req, res, next) {
  res.render('login', { title: '登录' });
});
router.get('/resign', function(req, res, next) {
  res.render('resign', { title: '注册' });
});
router.get('/home', function(req, res, next) {
  res.render('home', { title: '首页' });
});
module.exports = router;
