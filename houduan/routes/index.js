var express = require('express');
var mysql = require('mysql');
var router = express.Router();
var dbconfig=require('../config/dbconfig.json');
var manager ='';
var login = false;
var con = mysql.createConnection(dbconfig);
con.connect();
/*index欢迎页面 */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Online Reading Management System' });
});
//登录
router.get('/login', function(req, res, next) {
  res.render('login', { title: 'login' });
});
//注册
/*注册页 */
router.get('/resign', function(req, res, next) {
  res.render('resign', { title: 'resign' });
});
/**注册管理员 */
router.post('/resign', function(req, res, next) {
  var data = req.body;
  var phone = data.adminPhone;
  var pwd1 = data.adminPwd1;
  var pwd2 = data.adminPwd2;
  con.query("select * from adminlist",function(err,result){
    if(err){
      console.log(err);
    }
    else{
      if(result.length==0){
        con.query("insert into adminlist(adminPhone,adminPwd) values(?,?)",[phone,pwd1],function (err,result) {
          if(err){
            console.log(err);
          }else{  
            con.query("insert into admininflist(adminPhone) values(?)",[phone],function (err,result) {
              if(err){
                console.log(err);
              }else{   
                res.end('success');
              }
            });
          }
        });
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
                con.query("insert into admininflist(adminPhone) values(?)",[phone],function (err,result) {
                  if(err){
                    console.log(err);
                  }else{   
                    res.end('success');
                  }
                });
              }
            });
          }
        }
      }
    } 
  })
});
/**注册成功 */
router.get('/resignsuccess', function(req, res, next) {
  res.render('resignsuccess', { title: 'resignsucccess' });
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
//首页
router.get('/home', function(req, res, next) {
  let now='';
  var time=new Date();
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var date = time.getDate();
  now = year + '-' + conver(month) + "-" + conver(date);
  function conver(s) {
      return s < 10 ? '0' + s : s;
  }
  con.query("select * from user;select * from user where userDay =?;select * from book",[now],function(err,result){
      if(err){
        console.log(err);
      }
      else{
        console.log(result[1]);
        res.render('home',{userListall:result[0],userListnew:result[1],bookList:result[2]});
      }
    })
}); 
//用户管理
/**获取用户--升序（默认） */
router.get('/user', function(req, res, next) {
  con.query("select * from user order by userId asc",function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render("User/user",{userList:result});
    }
  })
});
/**获取用户--降序 */
router.get('/userdesc', function(req, res, next) {
  con.query("select * from user order by userId desc",function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render("User/user",{userList:result});
    }
  })
});
/**删除用户 */
router.get('/deleteuser', function(req, res, next) {
  var userPhone=req.query.userPhone;
  con.query("delete from user where userPhone=?",[userPhone],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render('User/deleteUser', { title: 'deleteuser' });
    }
  })
});
/**搜索用户 */
router.post('/searchuser', function(req, res, next) {
  var userPhone=req.body.userPhone;
  con.query("select * from user where userPhone=?",[userPhone],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render('User/searchUser', { userList:result,userPhone:userPhone });
    }
  })
});
/**查看用户信息详情 */
router.get('/userIn', function(req, res, next) {
  var userPhone=req.query.userPhone;
  con.query("select * from user where userPhone=?",[userPhone],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render('User/userIn', { userList:result[0],userPhone:userPhone  });
    }
  })
});
/**订阅详情 */
router.get('/subscribe', function(req, res, next) {
  var userPhone=req.query.userPhone;
  var userName=req.query.userName;
  con.query("select * from subscribe where userPhone=?",[userPhone],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render("User/subscribe",{subList:result,userName:userName,userPhone:userPhone});
    }
  })
});
/**阅读记录 */
router.get('/record', function(req, res, next) {
  var userPhone=req.query.userPhone;
  var bookId=req.query.bookId;
  con.query("select * from record where userPhone=? and bookId=?",[userPhone,bookId],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render("User/record",{subList:result,userPhone:userPhone,bookId:bookId});
    }
  })
});
//评论管理
/**获取评论 */
router.get('/block', function(req, res, next) {
  con.query("select distinct bookId,count(postId) as num from post group by bookId ",function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render("Block/block",{blockList:result});
    }
  })
});
/**搜索某个书的所有评论 */
router.post('/searchBlock', function(req, res, next) {
  var bookId=req.body.bookId;
  con.query("select * from post where bookId=?",[bookId],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render("Block/searchblock",{blockList:result});
    }
  })
});
/**全部评论 */
router.get('/comment', function(req, res, next) {
  var bookId=req.query.bookId;
  con.query("select * from post where bookId=?",[bookId],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render("Block/comment",{CommentList:result,bookId:bookId});
    }
  })
});
/**删除评论 */
router.get('/deletecomment', function(req, res, next) {
  var postId=req.query.postId;
  var bookId=req.query.bookId;
  con.query("delete  from post where postId=?",[postId],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render('Block/deletecomment', { title: 'deletecomment',postId:postId,bookId:bookId});
    }
  });   
});
/**按评论编号搜索某本书的某个评论 */
router.post('/searchcomment', function(req, res, next) {
  var postId=req.body.postId;
  con.query("select * from post where postId=?",[postId],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render("Block/searchpost",{CommentList:result});
    }
  })
});
/**获取评论内容详情 */
router.get('/commentIn', function(req, res, next) {
  var postId=req.query.postId;
  var bookId=req.query.bookId;
  con.query("select * from post where postId=?",[postId],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render("Block/commentIn",{commentInList:result,postId:postId,bookId:bookId});
    }
  })
});
/**获取回复内容 */
router.get('/reply', function(req, res, next) {
  var postId=req.query.postId;
  var bookId=req.query.bookId;
  con.query("select * from reply where postId=?",[postId],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render("Block/reply",{ReplyList:result,postId:postId,bookId:bookId});
    }
  })
});

/**获取回复内容详情 */
router.get('/replyIn', function(req, res, next) {
  var replyId=req.query.replyId;
  var bookId=req.query.bookId;
  var postId=req.query.postId;
  con.query("select * from reply where replyId=?",[replyId],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render("Block/replyIn",{ReplyInList:result,replyId:replyId,bookId:bookId,postId:postId});
    }
  })
});
/**删除回复内容*/
router.get('/deletereply', function(req, res, next) {
  var replyId=req.query.replyId;
  var bookId=req.query.bookId;
  var postId=req.query.postId;
  con.query("delete  from reply where replyId=?",[replyId],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render('Block/deletereply', { title: 'deletereply',bookId:bookId,postId:postId});
    }
  });   
});
//期刊管理
/**获取期刊--升序（默认） */
router.get('/book', function(req, res, next) {
  con.query("select * from book order by bookId asc",function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render('Book/book', {bookList:result});
     }
  })
});
/**获取期刊--降序 */
router.get('/bookdesc', function(req, res, next) {
  con.query("select * from book order by bookId desc",function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render('Book/book', {bookList:result});
    }
  })
});
/**按编号搜索某本期刊 */
router.post('/searchbookId', function(req, res, next) {
  var bookId=req.body.bookId;
  con.query("select * from book where bookId=?",[bookId],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render('Book/searchBook', { bookList:result,bookId:bookId});
    }
  })
});
/**按分类搜索某本期刊 */
router.post('/searchbookType', function(req, res, next) {
  var bookType=req.body.bookType;
  con.query("select * from book where bookType=?",[bookType],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render('Book/searchBook', { bookList:result,bookType:bookType});
    }
  })
});
/**添加期刊 */
router.post('/addbook', function(req, res, next) {
  var bookName=req.body.bookName;
  var bookWriter=req.body.bookWriter;
  var bookType=req.body.bookType;
  var bookApi=req.body.bookApi;
  var bookIntro=req.body.bookIntro;
  var bookImage=req.body.bookImage;
  let now='';
  var time=new Date();
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var date = time.getDate();
  now = year + '-' + conver(month) + "-" + conver(date);
  function conver(s) {
      return s < 10 ? '0' + s : s;
  }
  con.query("insert into book( bookName,bookWriter,bookType,bookApi,bookIntro,bookDate,bookImage) values(?,?,?,?,?,?,?)",[bookName,bookWriter,bookType,bookApi,bookIntro,now,bookImage],function (err,result) {
    if(err){
      console.log(err);
    }else{      
      con.query("select * from book order by bookId asc",function(err,result){
        if(err){
          console.log(err);
        }
        else{
          res.render('Book/book', {bookList:result});
         }
      })
    }
  });
});
/**获取期刊详情 */
router.get('/bookIn', function(req, res, next) {
  var bookId=req.query.bookId;
  con.query("select * from book where bookId=?",[bookId],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render("Book/bookIn",{bookInList:result[0],bookId:bookId});
    }
  })
});
/**编辑某本期刊详情*/
router.post('/editbook', function(req, res, next) {
  var bookId=req.body.bookId;
  var bookName=req.body.bookName;
  var bookWriter=req.body.bookWriter;
  var bookType=req.body.bookType;
  var bookApi=req.body.bookApi;
  var bookIntro=req.body.bookIntro;
  var bookImage=req.body.bookImage;
  var updatetime=new Date();
  con.query("update book set bookName=?,bookWriter=?,bookType=?,bookApi=?,bookIntro=?,bookUpdateTime=?,bookImage=? where bookId=?",[bookName,bookWriter,bookType,bookApi,bookIntro,updatetime,bookImage,bookId],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      con.query("select * from book where bookId=?",[bookId],function(err,result){
        if(err){
          console.log(err);
        }
        else{
          res.render("Book/bookIn",{bookInList:result[0],bookId:bookId});
        }
      })
    }
  });
});
/**删除某本期刊 */
router.get('/book/deletebook', function(req, res, next) {
  var bookId=req.query.bookId;
  con.query("delete from book where bookId=?",[bookId],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render('Book/deleteBook', { title: 'bookId' });
    }
  })
});
/**某本期刊的所有期*/
router.get('/bookJournal', function(req, res, next) {
  var bookId=req.query.bookId;
  con.query("select distinct bookTime from bookContent where bookId=?;",[bookId],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render("Book/bookJournal",{bookJList:result,bookId:bookId});
    }
  })
});
/**添加某本期刊的某一期 */
router.post('/addbookTime', function(req, res, next) {
  var bookId=req.body.bookId;
  var bookTime=req.body.bookTime;
  var bookPage=1;
  var updatetime=new Date();
  console.log(bookTime);
  con.query("insert into bookcontent( bookId,bookTime,bookPage) values(?,?,?)",[bookId,bookTime,bookPage],function (err,result) {
    if(err){
      console.log(err);
    }else{  
      con.query("update book set bookUpdateTime=? where bookId=?",[updatetime,bookId],function (err,result) {
        if(err){
          console.log(err);
        }else{
          con.query("select distinct bookTime from bookContent where bookId=?;",[bookId],function(err,result){
            if(err){
              console.log(err);
            }
            else{
              res.render("Book/bookJournal",{bookJList:result,bookId:bookId});
            }
          })        
        }
      });
    }
  });
});
/**删除某本期刊的某一期 */
router.get('/deletebookTime', function(req, res, next) {
  var bookId=req.query.bookId;
  var bookTime=req.query.bookTime;
  var updatetime=new Date();
  con.query("delete  from bookcontent where bookId=?&&bookTime=?",[bookId,bookTime],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      con.query("update book set bookUpdateTime=? where bookId=?",[updatetime,bookId],function (err,result) {
        if(err){
          console.log(err);
        }else{
          con.query("select distinct bookTime from bookContent where bookId=?;",[bookId],function(err,result){
            if(err){
              console.log(err);
            }
            else{
              res.render("Book/bookJournal",{bookJList:result,bookId:bookId});
            }
          })
        }
      });
    }
  });   
});
/**某本期刊的谋一期的所有页 */
router.get('/bookJIn', function(req, res, next) {
  var bookId=req.query.bookId;
  var bookTime=req.query.bookTime;
  console.log(bookTime,bookId);
  con.query("select * from bookcontent where bookId=? and bookTime=? order by bookPage desc",[bookId,bookTime],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render("Book/bookJIn",{bookJList:result,bookId:bookId,bookTime:bookTime});
    }
  })
});
/**添加某本期刊的谋一期的某一页 */
router.post('/addbookJIn', function(req, res, next) {
  var bookId=req.body.bookId;
  var bookTime=req.body.bookTime;
  var bookContentApi=req.body.bookContentApi;
  var bookChapter=req.body.bookChapter;
  var bookPage=req.body.bookPage;
  var updatetime=new Date();
  con.query("insert into bookcontent( bookId,bookTime,bookContentApi,bookChapter,bookPage) values(?,?,?,?,?)",[bookId,bookTime,bookContentApi,bookChapter,bookPage],function (err,result) {
    if(err){
      console.log(err);
    }else{  
      con.query("update book set bookUpdateTime=? where bookId=?",[updatetime,bookId],function (err,result) {
        if(err){
          console.log(err);
        }else{
          res.end('success');
        }
      });
      res.render('Book/addbookJIn', { title: 'addbookJIn',bookId:bookId,bookTime:bookTime});
    }
  });
});
/**删除某本期刊的谋一期的某一页 */
router.get('/deletebookJIn', function(req, res, next) {
  var bookContentApi=req.query.bookContentApi;
  var bookId=req.query.bookId;
  var bookTime=req.query.bookTime;
  var updatetime=new Date();
  con.query("delete  from bookcontent where bookContentApi=?",[bookContentApi],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      con.query("update book set bookUpdateTime=? where bookId=?",[updatetime,bookId],function (err,result) {
        if(err){
          console.log(err);
        }else{
          res.end('success');
        }
      });
      res.render('Book/deletebookJIn', { title: 'deletebookJIn',bookId:bookId,bookTime:bookTime});
    }
  });   
});
/**获取某本期刊的谋一期的某一页的编辑页面 */
router.get('/editbookJIn', function(req, res, next) {
  var bookId=req.query.bookId;
  var bookTime=req.query.bookTime;
  var bookContentApi=req.query.bookContentApi;
  con.query("select * from bookcontent where bookId=? and bookTime=? order by bookPage desc;select * from bookcontent where bookContentApi=?",[bookId,bookTime,bookContentApi],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render("Book/editbookJIn",{bookJList:result[0],bookId:bookId,bookTime:bookTime,editdata:result[1][0]});
    }
  })
});
/**编辑某本期刊的谋一期的某一页 */
router.post('/editbookJIn', function(req, res, next) {
  var bookId=req.body.bookId;
  var bookTime=req.body.bookTime;
  var bookContentApi=req.body.bookContentApi;
  var bookChapter=req.body.bookChapter;
  var bookPage=req.body.bookPage;
  var updatetime=new Date();
  console.log(bookContentApi);
  con.query("update bookcontent set bookContentApi=?, bookChapter=? where bookId=?&&bookTime=?&&bookPage=?",[bookContentApi,bookChapter,bookId,bookTime,bookPage],function (err,result) {
    if(err){
      console.log(err);
    }else{
      con.query("update book set bookUpdateTime=? where bookId=?",[updatetime,bookId],function (err,result) {
        if(err){
          console.log(err);
        }else{
          res.end('success');
        }
      });    
    }
  });
});
/**某本期刊的谋一期的某一页详情 */
router.get('/bookJInI', function(req, res, next) {
  var bookContentApi=req.query.bookContentApi;
  con.query("select * from bookcontent where bookContentApi=?;",[bookContentApi],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render("Book/bookJInI",{bookInList:result[0],bookContentApi:bookContentApi});
    }
  })
});
//积分管理
router.get('/score', function(req, res, next) {
  res.render('Score/score', { title: 'score' });
});
//积分表管理
/**获取积分总表 */
router.get('/score/list', function(req, res, next) {
  con.query("select * from score order by sum desc",function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render("Score/list",{scoreList:result});
    }
  })
});
/**获取个人积分明细表 */
router.get('/score/slist', function(req, res, next) {
  sum=[];
  var sum0=0;
  var userPhone=req.query.userPhone;
  var userName=req.query.userName;
  con.query("select * from slist where userPhone=?",[userPhone],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      for(var i = 0 ; i < result.length; i++) {
        if(i==0){
          sum[i]=parseInt(result[i].taskScore)
        }
        else{
          sum[i]=parseInt(result[i].taskScore)+sum[i-1]
        }
      }
      res.render("Score/listIn",{slistList:result,userName:userName,userPhone:userPhone,sum:sum});
    }
  })
});
/**搜索用户积分 */
router.post('/searchuserscore', function(req, res, next) {
  var userPhone=req.body.userPhone;
  con.query("select * from score where userPhone=?",[userPhone],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render('Score/searchUserScore', { scoreList:result,userPhone:userPhone});
    }
  })
});
//积分任务管理
/**获取任务 */
router.get('/score/task', function(req, res, next) {
  con.query("select * from task",function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render('Score/task', {taskList:result});
     }
  })
});
/**删除任务 */
router.get('/score/deletetask', function(req, res, next) {
  var taskId=req.query.taskId;
  con.query("delete from task where taskId=?",[taskId],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render('Score/deleteTask', { title: 'deletetask' });
    }
  })
});
/**搜索任务 */
router.post('/score/searchtask', function(req, res, next) {
  var taskId=req.body.taskId;
  con.query("select * from task where taskId=?",[taskId],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render("Score/searchtask",{taskList:result});
    }
  })
});
/**添加任务 */
router.post('/score/addtask', function(req, res, next) {
  var score=req.body.score;
  var content=req.body.content;
  console.log(score);
  console.log(content);
  con.query("insert into task(taskContent,taskScore) values(?,?)",[content,score],function (err,result) {
    if(err){
      console.log(err);
    }else{  
      res.render('Score/addTask', { title: 'addtask'});
    }
  });
});
let taskId=0;
/**编辑任务 */
router.get('/score/edit', function(req, res, next) {
  taskId=req.query.taskId;
  console.log(taskId);
  con.query("select * from task;select * from task where taskId=?",[taskId],function (err,result) {
    if(err){
      console.log(err);
    }else{
      res.render("Score/editTask",{taskList:result[0],editdata:result[1][0]});  
    }
  });
});
router.post('/score/edit', function(req, res, next) {
  var taskContent=req.body.taskContent;
  var taskScore=req.body.taskScore;
  console.log(taskScore)
  con.query("update task set taskContent=?,taskScore=? where taskId=?",[taskContent,taskScore,taskId],function (err,result) {
    if(err){
      console.log(err);
    }else{
      res.end('success');
    }
  });
});
/**编辑搜索任务 */
router.get('/score/edit1', function(req, res, next) {
  taskId=req.query.taskId;
  console.log(taskId);
  con.query("select * from task where taskId=?",[taskId],function (err,result) {
    if(err){
      console.log(err);
    }else{
      res.render("Score/editTask1",{taskList:result,editdata:result[0]});

    }
  });
});
//系统管理
/**系统管理 */
router.get('/sys', function(req, res, next) {
  con.query("select * from admininflist",function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render('System/sys', {title:'list'});   
    }
  });
});
/*显示管理员信息*/
router.get('/system', function(req, res, next) {
  con.query("select * from admininflist where adminPhone=?",[manager],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render('System/system', { manager: result[0] });   
    }
  });
});
router.get('/syslist', function(req, res, next) {
  con.query("select * from admininflist ",function(err,result){
    if(err){
      console.log(err);
    }
    else{
      res.render('System/syslist', { sysList:result });   
    }
  });
});
/*编辑管理员信息*/
router.post('/system', function(req, res, next) {
  var data = req.body; 
  var username = data.username;
  var name = data.name;
  var sex = data.sex;
  var email = data.email;
  con.query("update admininflist set adminUsername=?,adminName=?,adminSex=?,adminEmail=? where adminPhone=?",[username,name,sex ,email,manager],function(err,result){
    if(err){
      console.log(err);
    }
    else{
      con.query("select * from admininflist where adminPhone=?",[manager],function(err,result){
        if(err){
          console.log(err);
        }
        else{
          login == false
          res.render('System/system', { manager: result[0] });   
        }
      });   
    }
  });
});
module.exports = router;
