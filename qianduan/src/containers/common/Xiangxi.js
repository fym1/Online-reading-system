import React, { Component } from 'react'
import {NavBar, Grid,Button,Toast} from 'antd-mobile';
import './common.css'
const height=document.querySelector('body').offsetHeight;
let id = '';
export default class Xiangxi extends Component {
  constructor(props){
    super(props);
    this.state = {
      data1:[],
      intro:'',
      xiaoxi:[],
      v:'',
      booktime:'',
      len:[],
      ifan:true,
      lei:'',
      page:1,
      progress:'未读'
    }
  }
  handleInput = (e)=>{
    //绑定this，事件处理函数写成箭头函数，或者bind
    if(e.keyCode===13){
        this.props.add(e.target.value);
    }
  }
  handleChange=(e)=>{
    console.log(e.target.value);
    this.setState({
      v:e.target.value
    })
  }
  componentDidMount(){
    var logif =  sessionStorage.getItem("logif");
    console.log(logif);
    if(logif == null || logif == false){
      this.setState({
        ifan:true,
      })
      console.log(this.state.ifan);
    }
    else{
      this.setState({
        ifan:false,
      })
      console.log(this.state.ifan);
    }
    id = this.props.match.params.id;
    let text = {bookId:id} //获取数据
    let send = JSON.stringify(text);   //重要！将对象转换成json字符串
    fetch(`http://127.0.0.1:3001/users/xiangxi`,{   //Fetch方法y
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: send
    })
    .then(res => res.json())
    .then(
      data => {
        console.log(data);
        if(this.props.location.query != undefined){
          console.log(this.props.location.query.shelf)
          this.setState({
            lei:this.props.location.query.shelf
          })
        }
        else if(data[0].bookType == '期刊'){
          this.setState({
            lei:'/market/qikan'
          })
        }
        else if(data[0].bookType == '杂志'){
          this.setState({
            lei:'/market/magazine'
          })
        }
        else if(data[0].bookType == 'vision'){
          this.setState({
            lei:'/market/vision'
          })
        }
        else if(data[0].bookType == '人文'){
          this.setState({
            lei:'/market/humanities'
          })
        }
        else if(data[0].bookType == '生活'){
          this.setState({
            lei:'/market/life'
          })
        }
        else if(data[0].bookType == '经济'){
          this.setState({
            lei:'/market/money'
          })
        }
        else if(data[0].bookType == '娱乐'){
          this.setState({
            lei:'/market/entertain'
          })
        }
        this.setState({
          data1:data,
          intro:data[0].bookIntro
        })
        sessionStorage.setItem("last",this.state.lei)
      }
    )
    //如果没有记录
    fetch(`http://127.0.0.1:3001/users/getdate`,{   //Fetch方法y
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: send
    })
    .then(res => res.json())
    .then(
      data => {
        console.log(data);
        var aa = [];
        for(var i = 0;i<data.length;i++){
          aa[i] = i;
        }
        if(data.length == 0){
          this.setState({
            len:aa,
            page:1
          })
        }
        else{
          this.setState({
            booktime:data[0].bookTime,
            len:aa,
            page:1
          })
        }
      }
    )
    fetch(`http://127.0.0.1:3001/users/getpost`,{   //Fetch方法y
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: send
    })
    .then(res => res.json())
    .then(
      res => {
        console.log(res);
        var d0 = [];
        for(var i = 0;i<res.length;i++){
          (res[i].userImage==null)?res[i].userImage="http://img2.3png.com/eebe5ef277285d150546fd77d248786d2a9e.png":res[i].userImage=res[i].userImage
          d0[i] = res[i];
        }
        console.log(d0)
        this.setState({
          xiaoxi:d0
        })
      }
    )
    //如果有记录
    let text1 = {bookId:id,userPhone:sessionStorage.getItem("user")} //获取数据
    let send1 = JSON.stringify(text1);   //重要！将对象转换成json字符串
    fetch(`http://127.0.0.1:3001/users/getrecord`,{   //Fetch方法y
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: send1
    })
    .then(res => res.json())
    .then(
      data => {
        if(data.length != 0){
          console.log('如果有记录');
          var progress = data[0].readProgress*100;
          progress = String(progress).substr(0,5);
          progress = progress+'%'
          this.setState({
            booktime:data[0].bookTime,
            page:data[0].bookPage,
            progress:progress
          })
        }
        console.log(data);
      }
    )
  }
  goMore(value){
    console.log(value);
    this.props.history.push({pathname:value,query:{page:this.state.page,last:this.props.match.url}})
  }
  goTime(value,booktime){
    this.props.history.push(value)
  }
  addbook(){
    if(sessionStorage.getItem("user") == null){
      console.log(sessionStorage.getItem("user"));
      console.log('未登录')
    }
    else{
      id = this.props.match.params.id;
      let userphone = sessionStorage.getItem("user");
      let text = {bookId:id,userPhone:userphone} //获取数据
      let send = JSON.stringify(text);   //重要！将对象转换成json字符串
      fetch(`http://127.0.0.1:3001/users/addshelf`,{   //Fetch方法y
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        body: send
      })
      .then(res => res.json())
      .then(
        data => {
          if(data.success){
            Toast.success('已加入书架', 1);
          }
          else{
            Toast.fail('该书已加入书架', 1);
          }
        }
      )
    }
  }
  addpost(content){
    if(sessionStorage.getItem("user") == null){
      console.log(sessionStorage.getItem("user"));
      console.log('未登录')
    }
    else{
      console.log(content);
      let text = {bookId:id,userPhone:sessionStorage.getItem('user'),postContent:content} //获取数据
      let send = JSON.stringify(text);   //重要！将对象转换成json字符串
      fetch(`http://127.0.0.1:3001/users/addpost`,{   //Fetch方法y
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        body: send
      })
      .then(res => res.json())
      .then(
        data => {
          if(data.success){
            Toast.success('发表评论成功', 1);
            window.location.reload()
          }
          else{
            Toast.fail('发表评论失败', 1);
          }
        }
      )
    }
  }
  render() {
    return (
      <div style={{width:'100%',height:height,backgroundColor:'#EEE3E1'}}>
        <NavBar
          mode="dark"
          leftContent="&lt;"
          onLeftClick={()=>window.location.href=`${this.state.lei}`}
          style={{backgroundColor:'#EEE3E1',color:'#000',height:'60px',borderBottom:'1px gray solid'}}
          >详情
        </NavBar>
        <Grid data={this.state.data1}
          columnNum={1}
          itemStyle={{height:'200px',width:'100%',backgroundColor:'#EEE3E1'}}
          renderItem={dataItem=>(
              <div style={{backgroundColor:'#fff',width:'100%',height:'100%'}}>
                <div style={{width:'30%',float:'left',height:'100%'}}>
                  <img src={dataItem.bookImage} style={{width:'80%',height:'80%',marginLeft:'5%',marginTop:'10%',border:'1px gray solid',borderRadius:'5px'}}/>
                </div>
                <div style={{width:'60%',float:'left',height:'100%',marginLeft:'10px'}}>
                  <p className='word6'>{dataItem.bookName}</p>
                  <p className='word5'>作者：{dataItem.bookWriter?dataItem.bookWriter:'暂无'}</p>
                  <p className='word5'>类别：{dataItem.bookType}</p>
                  <p className='word5'>上线日期：{dataItem.bookDate}</p>
                  <p className='word5'>阅读情况：{this.state.progress}</p>
                  {/* <button style={{height:'30px',width:'50%',borderRadius:'5px',display: 'block',margin: '0 auto',marginTop:'20px',backgroundColor:'#EEE3E1',border:'none'}} onClick={() => this.goMore(`/contents/${dataItem.bookId}`)}>开始阅读</button> */}
                  <Button style={{width:'60%',height:'20%',borderRadius:'10px',backgroundColor:'#EEE3E1',marginTop:'5%',border:'1px gray solid'}} onClick={() => this.goMore(`/content/${dataItem.bookId}/${this.state.booktime}`)}>
                    <p style={{textAlign:'center',fontSize:'15px',marginTop:'-5px'}}>开始阅读</p>
                  </Button>
                </div>
              </div>
          )}
        />
        <div className='kuai2'>
          <p>简介：{this.state.intro}</p>
        </div>
        <div className='block11'>
          <Button style={{width:'40%',height:'80%',borderRadius:'10px',backgroundColor:'#EEE3E1',marginTop:'1%',border:'1px gray solid',float:'left'}} onClick={() => this.goTime(`/booktime/${id}`,this.state.booktime)}>
            <p style={{textAlign:'center',fontSize:'15px',marginTop:'-5px'}}>查看目录</p>
          </Button>
          <Button style={{width:'40%',height:'80%',borderRadius:'10px',backgroundColor:'#EEE3E1',marginTop:'1%',border:'1px gray solid',float:'left',marginLeft:'18%'}} onClick={() => this.addbook()} disabled={this.state.ifan}>
            <p style={{textAlign:'center',fontSize:'15px',marginTop:'-5px'}}>加入书架</p>
          </Button>
        </div>
        <div style={{width:'100%',height:'35px',borderLeft:'3px #F54577 solid',marginTop:'5px'}}>
          <p style={{fontSize:'20px',color:'#F54577',marginLeft:'5px'}}>评论</p>
        </div>
        <Grid data={this.state.xiaoxi}
          columnNum={1}
          hasLine={false}
          itemStyle={{backgroundColor:'#EEE3E1',height:'90px'}}
          renderItem={dataItem => (
            <div style={{width:'100%',height:'100%',float:'left',backgroundColor:'#fff'}}>
              <div style={{width:'20%',height:'100%',backgroundColor:'#fff',float:'left'}}>
                <img src={dataItem.userImage} style={{width:'50px',height:'50px',marginLeft:'20%',marginTop:'5px'}} alt="" />
                <div style={{fontSize:'10px',marginTop:'0%',textAlign:'left',marginLeft:'15%'}}>{dataItem.postTime.slice(0,10)}</div>               
              </div>
              <div style={{width:'70%',height:'100%',float:'left'}}>
                <p style={{float:'left',marginLeft:'5%',fontSize:'15px',color:'#ffaa33',width:'100%',textAlign:'left',height:'15px'}}>{dataItem.userName}</p>
                <div style={{float:'left',marginLeft:'5%',fontSize:'13px',marginTop:'0%',height:'50%',overflow:'hidden',textAlign:'left',display:'-webkit-box',WebkitLineClamp:'2',WebkitBoxOrient:'vertical'}}>{dataItem.postContent}</div>
              </div>
              {/* <div style={{width:'30%',height:'100%',backgroundColor:'#blue',float:'left'}}>
                <p style={{float:'right',marginRight:'5%',fontSize:'15px',marginTop:'8%'}}>{dataItem.postTime}</p>               
              </div>                 */}
            </div>
          )}
        />
        <div style={{width:'100%',height:'60px',backgroundColor:'#EEE3E1'}}></div>
        <div style={{width:'100%',height:'60px',padding:'10px',position:'fixed',bottom:'0px',backgroundColor:'#EEE3E1',borderTop:'1px #bbb solid'}}>
          <input className='input1'
            value={this.state.v}
            type='text'
            onKeyDown={this.handleInput}
            // maxLength='10px'
            onChange={this.handleChange}
            style={{width:'70%',height:'40px',border:'1px solid #888888',borderRadius:'5px',marginLeft:'15px',float:'left'}}
          />
          <button style={{width:'20%',borderRadius:'5px',border:'1px solid #888888',paddingTop:'0px',height:'40px',marginLeft:'3%',float:'left'}} onClick={() => this.addpost(this.state.v)}>发送</button>
        </div>
      </div>
    )
  }
}
