var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var dbconfig=require('../config/dbconfig.json');
var manager = '';
var login = false;
var con = mysql.createConnection(dbconfig);
con.connect();

/*index欢迎页面 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Online Reading Management System' });
});
/*登录页 */
router.get('/login', function(req, res, next) {
  res.render('login', { title: '登录' });
});
/*注册页 */
router.get('/resign', function(req, res, next) {
  res.render('resign', { title: '注册' });
});
/**注册管理员 */
router.post('/addadmin', function(req, res, next) {
  var data = req.body;
  var phone = data.adminPhone;
  var pwd1 = data.adminPwd1;
  var pwd2 = data.adminPwd2;
  con.query("select * from adminlist",function(err,result){
    if(err){
      console.log(err);
    }
    else{
      for(var i=0;i<result.length;i++){
          if(phone == result[i].adminPhone){
            res.end('phone-error');
            break;
          }
          else if(pwd1!=pwd2){
            res.end('pwd-error');
            break;
          }
          else if(pwd1==""||pwd2==""){
            res.end('pwd-null');
            break;
          }
          else if(phone==""){
            res.end('phone-null');
            break;
          }
          else{
            con.query("insert into adminlist(adminPhone,adminPwd) values(?,?)",[phone,pwd1],function (err,result) {
              if(err){
                console.log(err);
              }else{  
                res.end('success');
              }
            });
          }
        }
    } 
  })
});
/*验证身份 */
router.post('/home', function(req, res, next) {
  var data = req.body;
  var phone = data.adminPhone;
  var pwd = data.adminPwd;
  var code = data.code;
  var getcode = data.getcode; 
  manager = phone;
  con.query("select * from adminlist",function(err,result){
    if(err){
      console.log(err);
    }
    else{
      for(var i=0;i<result.length;i++){
        if(phone == result[i].adminPhone && pwd == result[i].adminPwd){
          login = true;
          if(code == getcode){
            res.end('success');
          }
          else{
            res.end('code-error');
          }
          break;
        }
        else{
          continue;
        }
      }
      if(login == false){
        res.end('error');
      }
    }
  });
});
/*首页*/
router.get('/home', function(req, res, next) {
  res.render('home', { title: '首页' });
});
//用户管理
/**获取用户--升序（默认） */
router.get('/user', function(req, res, next) {
  res.render('User/user', { title: '用户管理' });
});
/**删除用户 */
router.get('/deleteuser', function(req, res, next) {
  res.render('User/deleteUser', { title: 'deleteuser' });
 
});
//积分管理
router.get('/score', function(req, res, next) {
  res.render('Score/score', { title: 'score' });
});
router.get('/system', function(req, res, next) {
  res.render('System/system', { title: '系统管理' });
});
module.exports = router;
