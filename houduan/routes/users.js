var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var dbconfig=require('../config/dbconfig.json');
var con = mysql.createConnection(dbconfig);
con.connect();
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
// router.use(bodyParser.json());//使用body parser用于解析post的body
// router.use(bodyParser.urlencoded({ extended: true }));//使用body parser用于解析post的body

router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Access-Token");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
/**范 */
var phonenum='';
console.log(phonenum);
router.use(express.static('public'));
/**获取phone */
router.get('/my',function(req,res,next){
    var con = mysql.createConnection(dbconfig);
    con.connect();
    con.query('select * from score order by sum DESC',(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})
router.post('/my', function (req, res) {  //接收POST请求
    /**获取请求体数据 */
    let data = req.body;   //解析body中的信息
    console.log(data);
    phonenum=data.phone;
    /**连接数据库 */
    var con = mysql.createConnection(dbconfig);
    con.connect();
    con.query('select * from user where userPhone=?',[phonenum],(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
  })
/**rank */
router.get('/rank',function(req,res,next){
    var con = mysql.createConnection(dbconfig);
    con.connect();
    con.query('select * from score order by sum DESC',[phonenum],(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log("111111111")
            res.send(result);
        }
    })
})
/**more */
router.get('/more',function(req,res,next){
    var con = mysql.createConnection(dbconfig);
    con.connect();
    con.query('select * from sList where userPhone=? order by updateTime DESC',[phonenum],(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})
/**score */
router.post('/getscore', function (req, res) {  //接收POST请求
    /**获取请求体数据 */
    let data = req.body;   //解析body中的信息
    console.log(data);
    let message1 = {success:true}
    let message2 = {success:false}
    /**连接数据库 */
    var con = mysql.createConnection(dbconfig);
    con.connect();
    con.query("insert into sList(taskScore,updateTime,taskId,taskContent,userName,userPhone) values(?,?,?,?,?,?)",[data.taskScore,data.updateTime,data.taskId,data.taskContent,data.userName,data.phone],function(err,result){
      phonenum=data.phone;
      if(err){
          console.log(err);
      }
      else{
          if(result == false){
              res.send(message2);
          }
          else{           
              res.send(message1);
          }
      }
    })
    con.query("select SUM(taskScore) sumsum,userName from slist where username=?",[data.userName],function(err,result){
        if(err){
          console.log(err);
        }
        else{
          //显示到页面--渲染方法--render
            con.query("update score set sum=?,updateTime=? where userName=?",[result[0].sumsum,new Date(),data.userName],function(err,result){
            if(err){
              console.log(err);
            }
            else{
              console.log("success");
            }
          });      
        }
      })
  })
/**登录 */
var phone1='';
router.post('/', function (req, res) {  //接收POST请求
  /**获取请求体数据 */
  let data = req.body;   //解析body中的信息
  console.log(data);
  let message1 = {success:true}
  let message2 = {success:false}
  /**连接数据库 */
  phone1=data.phone;
  var con = mysql.createConnection(dbconfig);
  con.connect();
  con.query("select * from user where userPhone = ? and userPwd = ?",[data.phone,data.password],function(err,result){
    phonenum=data.phone;
    if(err){
        console.log(err);
    }
    else{
        if(result == false){
            res.send(message2);
        }
        else{           
            res.send(message1);
        }
    }
  })
})
console.log(phonenum);
/**注册 */
router.post('/register',(req,res)=>{
  /**获取请求体数据 */
  let data = req.body;
  let message1 = {success:true};
  let message2 = {success:false};
  // eslint-disable-next-line eqeqeq
  if(data.password != data.repwd){
      res.send(message2);
  } 
  else{
      var con = mysql.createConnection(dbconfig);
      con.connect();
      con.query("select * from user where userPhone=?",[data.phone],function(err,result){
          if(err){
              throw err;
          }else{
              if(result==''){
                console.log('该用户不存在');
                con.query("insert into user(userPhone,userPwd,userDay,userName) values(?,?,?,?)",[data.phone,data.password,new Date(),data.username],(err,result)=>{
                    if(err){
                        throw err;
                    }
                    else{
                        res.send(message1);
                    }
                })
                con.query("insert into score(userPhone,userName) values(?,?)",[data.phone,data.username],(err,result)=>{
                    if(err){
                        throw err;
                    }
                    else{
              
                    }
                })
              }
              else{
                console.log('该用户已存在');
                res.send(message2);
              }
          }
      })
  }
})
/**编辑资料 */
router.post('/updateuser',(req,res)=>{
    /**获取请求体数据 */
    let data = req.body;
    let message1 = {success:true};
    let message2 = {success:false};
    var con = mysql.createConnection(dbconfig);
    con.connect();
    con.query("update user set userName=?,userImage=?,userSex=?,userBir=?,userSign=? where userPhone = ?",[data.userName,data.userImage,data.userSex,data.userBir,data.userSign,phonenum],(err,result)=>{
        if(err){
            throw err;
        }
        else{
            if(result == false){
                res.send(message2);
            }else{
                res.send(message1);
            }
            
        }
    })
    con.query("update score set userName=?,userImage=? where userPhone = ?",[data.userName,data.userImage,phonenum],(err,result)=>{
        if(err){
            throw err;
        }
        else{
            if(result == false){
                console.log(message2);
            }else{
                console.log(message1);
            }
            
        }
    })
})
router.get('/updateuser',function(req,res,next){
    var con = mysql.createConnection(dbconfig);
    con.connect();
    con.query('select * from user where userPhone=?',[phonenum],(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})
router.post('/getmyscore',function(req,res,next){
    let data = req.body;
    let message1 = {success:true};
    let message2 = {success:false};
    var con = mysql.createConnection(dbconfig);
    con.connect();
    con.query('select * from score where userPhone=?',[data.userPhone],(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})

/**market */
router.post('/market/bookType', function (req, res) {  //接收POST请求
    /**获取请求体数据 */
    let data = req.body;   //解析body中的信息
    console.log(data);
    phonenum=data.phone;
    /**连接数据库 */
    var con = mysql.createConnection(dbconfig);
    con.connect();
    con.query('select * from book where bookType=?',[data.bookType],(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})
router.post('/search', function (req, res) {  //接收POST请求
    /**获取请求体数据 */
    let data = req.body;   //解析body中的信息
    console.log(data);
    phonenum=data.phone;
    /**连接数据库 */
    var con = mysql.createConnection(dbconfig);
    con.connect();
    con.query('select * from book where bookName=?',[data.bookName],(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})
router.get('/all',function(req,res,next){
    var con = mysql.createConnection(dbconfig);
    con.connect();
    con.query('select * from book',(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})
router.post('/xiangxi', function (req, res) {  //接收POST请求
    /**获取请求体数据 */
    let data = req.body;   //解析body中的信息
    console.log(data);
    phonenum=data.phone;
    /**连接数据库 */
    var con = mysql.createConnection(dbconfig);
    con.connect();
    con.query('select * from book where bookId=?',[data.bookId],(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})
router.post('/content', function (req, res) {  //接收POST请求
    /**获取请求体数据 */
    let data = req.body;   //解析body中的信息
    console.log(data);
    phonenum=data.phone;
    /**连接数据库 */
    var con = mysql.createConnection(dbconfig);
    con.connect();
    console.log(data);
    con.query('select * from bookcontent where bookId=? and bookTime=? order by bookPage ASC',[data.bookId,data.bookTime],(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
            console.log(result)
        }
    })
})
router.post('/getcatalog', function (req, res) {  //接收POST请求
    /**获取请求体数据 */
    let data = req.body;   //解析body中的信息
    console.log(data);
    phonenum=data.phone;
    /**连接数据库 */
    var con = mysql.createConnection(dbconfig);
    con.connect();
    console.log(data);
    con.query('select bookChapter,bookPage from bookcontent where bookId=? and bookTime=? order by bookPage ASC',[data.bookId,data.bookTime],(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
            console.log(result)
        }
    })
})
router.post('/getdate', function (req, res) {  //接收POST请求
    /**获取请求体数据 */
    let data = req.body;   //解析body中的信息
    console.log(data);
    phonenum=data.phone;
    /**连接数据库 */
    var con = mysql.createConnection(dbconfig);
    con.connect();
    console.log(data);
    con.query('select distinct bookTime from bookcontent where bookId=? ',[data.bookId],(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
            console.log(result)
        }
    })
})
router.post('/getall', function (req, res) {  //接收POST请求
    /**获取请求体数据 */
    let data = req.body;   //解析body中的信息
    console.log(data);
    phonenum=data.phone;
    /**连接数据库 */
    var con = mysql.createConnection(dbconfig);
    con.connect();
    console.log(data);
    con.query('select bookChapter,bookPage,bookTime from bookcontent where bookId=? group by bookTime,bookPage order by bookTime ASC',[data.bookId],(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
            console.log(result)
        }
    })
})
router.post('/addshelf', function (req, res) {  //接收POST请求
    /**获取请求体数据 */
    let data = req.body;   //解析body中的信息
    let message1 = {success:true}
    let message2 = {success:false}
    console.log(data);
    phonenum=data.phone;
    /**连接数据库 */
    var con = mysql.createConnection(dbconfig);
    con.connect();
    console.log(data);
    con.query("insert into subscribe(subDate,userPhone,bookId) values(?,?,?)",[new Date(),data.userPhone,data.bookId],(err,result)=>{
        if(err){
            res.send(message2);
        }
        else{
            res.send(message1);
        }
    })
})
router.post('/mybooks', function (req, res) {  //接收POST请求
    /**获取请求体数据 */
    let data = req.body;   //解析body中的信息
    console.log(data);
    phonenum=data.phone;
    /**连接数据库 */
    var con = mysql.createConnection(dbconfig);
    con.connect();
    console.log(data);
    con.query("select * from subscribe,book where subscribe.bookId=book.bookId and subscribe.userPhone=?",[data.userPhone],(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
            console.log(result)
        }
    })
})
router.post('/getpost', function (req, res) {  //接收POST请求
    /**获取请求体数据 */
    let data = req.body;   //解析body中的信息
    console.log(data);
    phonenum=data.phone;
    /**连接数据库 */
    var con = mysql.createConnection(dbconfig);
    con.connect();
    console.log(data);
    con.query('select * from post,user where bookId=? and user.userPhone = post.userPhone',[data.bookId],(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
            console.log(result)
        }
    })
})
router.post('/addrecord', function (req, res) {  //接收POST请求
    /**获取请求体数据 */
    let data = req.body;   //解析body中的信息
    let message1 = {success:true}
    let message2 = {success:false}
    console.log(data);
    phonenum=data.phone;
    /**连接数据库 */
    var con = mysql.createConnection(dbconfig);
    con.connect();
    console.log(data);
    con.query("insert into record(readDate,userPhone,bookId,readProgress,bookPage,bookName,bookTime) values(?,?,?,?,?,?,?)",[new Date(),data.userPhone,data.bookId,data.readProgress,data.bookPage,data.bookName,data.bookTime],(err,result)=>{
        if(err){
            res.send(message2);
        }
        else{
            res.send(message1);
        }
    })
})
router.post('/getrecord', function (req, res) {  //接收POST请求
    /**获取请求体数据 */
    let data = req.body;   //解析body中的信息
    console.log(data);
    phonenum=data.phone;
    /**连接数据库 */
    var con = mysql.createConnection(dbconfig);
    con.connect();
    console.log(data);
    con.query('select * from record where bookId=? and userPhone=? order by readDate DESC',[data.bookId,data.userPhone],(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
            console.log(result)
        }
    })
})
router.get('/all',function(req,res,next){
    var con = mysql.createConnection(dbconfig);
    con.connect();
    con.query('select * from book',(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})
router.get('/updatebook',function(req,res){
    var con = mysql.createConnection(dbconfig);
    con.connect();
    con.query('select * from book order by bookDate DESC limit 20',(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
        }
    })
})
router.post('/getlast', function (req, res) {  //接收POST请求
    /**获取请求体数据 */
    let data = req.body;   //解析body中的信息
    console.log(data);
    phonenum=data.phone;
    /**连接数据库 */
    var con = mysql.createConnection(dbconfig);
    con.connect();
    console.log(data);
    // select * from table where dateline IN ( select max(dateline) from table GROUP BY uid ) ORDER BY dateline DESC
    con.query('select * from record,book where userPhone=? and record.bookId=book.bookId  order by readDate DESC ',[data.userPhone],(err,result)=>{
        if(err){
            console.log(err);
        }
        else{
            res.send(result);
            console.log(result)
        }
    })
})
router.post('/addpost', function (req, res) {  //接收POST请求
    /**获取请求体数据 */
    let data = req.body;   //解析body中的信息
    let message1 = {success:true}
    let message2 = {success:false}
    console.log(data);
    phonenum=data.phone;
    /**连接数据库 */
    var con = mysql.createConnection(dbconfig);
    con.connect();
    console.log(data);
    con.query("insert into post(userPhone,bookId,postContent,postTime) values(?,?,?,?)",[data.userPhone,data.bookId,data.postContent,new Date(),],(err,result)=>{
        if(err){
            res.send(message2);
        }
        else{
            res.send(message1);
        }
    })
})
router.post('/getmypost', function (req, res) {  //接收POST请求
  /**获取请求体数据 */
  let data = req.body;   //解析body中的信息
  console.log(data);
  phonenum=data.phone;
  /**连接数据库 */
  var con = mysql.createConnection(dbconfig);
  con.connect();
  console.log(data);
  con.query('select * from post where userPhone = ?',[data.userPhone],(err,result)=>{
      if(err){
          console.log(err);
      }
      else{
          res.send(result);
          console.log(result)
      }
  })
})
router.post('/delbook', function (req, res) {  //接收POST请求
  /**获取请求体数据 */
  let data = req.body;   //解析body中的信息
  console.log(data);
  phonenum=data.phone;
  /**连接数据库 */
  var con = mysql.createConnection(dbconfig);
  con.connect();
  console.log(data);
  con.query('delete from subscribe where userPhone=? and bookId = ?',[data.userPhone,data.bookId],(err,result)=>{
      if(err){
          console.log(err);
      }
      else{
          res.send(result);
          console.log(result)
      }
  })
})
router.post('/dellast', function (req, res) {  //接收POST请求
  /**获取请求体数据 */
  let data = req.body;   //解析body中的信息
  console.log(data);
  phonenum=data.phone;
  /**连接数据库 */
  var con = mysql.createConnection(dbconfig);
  con.connect();
  console.log(data);
  con.query('delete from record where userPhone=? and bookId = ?',[data.userPhone,data.bookId],(err,result)=>{
      if(err){
          console.log(err);
      }
      else{
          res.send(result);
          console.log(result)
      }
  })
})
// var server = router.listen(3001, function () {
//   var host = server.address().address
//   var port = server.address().port
//   console.log("应用实例，访问地址为 http://%s:%s", host, port)
// })
  

module.exports = router;
