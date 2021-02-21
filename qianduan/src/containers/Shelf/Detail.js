import React, { Component } from 'react'
import {NavBar,Grid,Button,Toast} from 'antd-mobile';
import './shelf.css'
const height=document.querySelector('body').offsetHeight;

export default class Deatil extends Component {
  constructor(props){
    super(props);
    this.handleInput=this.handleInput.bind(this);
    this.handleChange=this.handleChange.bind(this);
    this.state = {
      list:{bookname:'主角',feng:'./images/2.jpg',writer:'陈彦',category:'文化',wordnum:65.3,ifend:'已完结',postshelf:'2021-1-12',plan:60},
      intro:'《主角》是一部动人心魄的命运之书。作者叙述了秦腔名伶忆秦娥近半个世纪人生的兴衰际遇、起废沉浮，及其与秦腔及大历史的起起落落之间的复杂关联。其间各色人等于转型时代的命运遭际无不跃然纸上。作者，上承中国古典文学及思想流脉，于人世的大热闹之中，写出了千秋万岁的大静。而经由对一个人的遭遇的悉心书写，让更多人的命运涌现在他的笔下。',
      xiaoxi:[
        {feng:'../images/5.jpg',date:'5小时前',new:'每日签到可领10分积分哦~~'},
        {feng:'../images/5.jpg',date:'1天前',new:'恭喜今日阅读时长已达1小时！'},
        {feng:'../images/5.jpg',date:'2天前',new:'1.0.2版本已更新'},
      ],
      v:''
    }
  }
  jump(value){
    this.props.history.push(value)
  }
  addbook(value){
    Toast.success('已加入书架', 1);
    console.log(value);

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
  // getConnect1=(e)=>{  //api请求函数
  //   let text = {replyContent:this.state.v,postId:this.state.post.postId,userName:this.state.username} //获取数据
    
  //   let send = JSON.stringify(text);   //重要！将对象转换成json字符串
    
  //   fetch('http://localhost:8001/usermessage')
  //   .then((res)=>res.json())
  //   .then((res)=>{
  //       console.log(res);
  //       this.setState({
  //           username:res.username
  //       },()=>{
  //           var text2=text;
  //           text2.userName=this.state.username;
  //           console.log(text2);
  //           this.setState({
  //               reply:[...this.state.reply,text2]
  //           })
  //       })
  //   })
  //   fetch(`http://localhost:8001/replypost`,{   //Fetch方法y
  //       method: 'POST',
  //       headers: {'Content-Type': 'application/json; charset=utf-8'},
  //       body: send
  //   })
  //   .then(res => res.json())
  //   .then(
  //       data => {
  //       }
  //   );
  //   this.setState({
  //       v:''
  //   })
  // }
  render() {
    return (
      <div style={{width:'100%',height:height,backgroundColor:'#EEE3E1'}}>
        <NavBar
          mode="dark"
          leftContent="&lt;"
          onLeftClick={()=>window.history.back()}
          style={{backgroundColor:'#EEE3E1',color:'#000',height:'60px'}}
          >详情
        </NavBar>
        <div style={{borderTop:'1px grey solid'}}>
          <div className='block0'>
            <div className='left0'>
              <img src={this.state.list.feng} style={{width:'60%',height:'80%',marginLeft:'15%',marginTop:'10%'}}/>
            </div>
            <div className='left0'>
              <p className='word2'>{this.state.list.bookname}</p>
              <p className='word1'>作者：{this.state.list.writer}</p>
              <p className='word1'>类别：{this.state.list.category}</p>
              <p className='word1'>字数：{this.state.list.wordnum}万字</p>
              <Button style={{width:'85%',height:'20%',borderRadius:'10px',backgroundColor:'#EEE3E1',marginTop:'13%',border:'1px gray solid'}} onClick={() => this.jump('/content')}>
                <p style={{textAlign:'center',fontSize:'15px',marginTop:'-5px'}}>开始阅读</p>
              </Button>
            </div>
          </div>
          <div className='block1'>
            <Button style={{width:'40%',height:'80%',borderRadius:'10px',backgroundColor:'#EEE3E1',marginTop:'1%',border:'1px gray solid',float:'left'}} onClick={() => this.jump('/catalog')}>
              <p style={{textAlign:'center',fontSize:'15px',marginTop:'-5px'}}>查看目录</p>
            </Button>
            <Button style={{width:'40%',height:'80%',borderRadius:'10px',backgroundColor:'#EEE3E1',marginTop:'1%',border:'1px gray solid',float:'left',marginLeft:'18%'}} onClick={() => this.addbook('111')}>
              <p style={{textAlign:'center',fontSize:'15px',marginTop:'-5px'}}>加入书架</p>
            </Button>
          </div>
          <div className='kuai1'>
            <p>{this.state.intro}</p>
          </div>
          <div style={{width:'100%',height:'35px',borderLeft:'3px #F54577 solid',marginTop:'5px'}}>
            <p style={{fontSize:'20px',color:'#F54577',marginLeft:'5px'}}>评论</p>
          </div>
            {/* <div style={{width:'100%',height:'155px',marginTop:'10px'}}>
              <Grid data={this.state.tui}
                columnNum={3}
                hasLine={false}
                itemStyle={{backgroundColor:'#EEE3E1'}}
                renderItem={dataItem=>(
                  <img src={dataItem} style={{width:'85%',height:'155px'}}/>
                )}
              />
            </div> */}
          <Grid data={this.state.xiaoxi}
            columnNum={1}
            hasLine={false}
            itemStyle={{backgroundColor:'#EEE3E1',height:'90px'}}
            renderItem={dataItem => (
              <div style={{width:'100%',height:'100%',backgroundColor:'#fff'}}>
                <img src={dataItem.feng} style={{width:'60px',height:'60px',float:'left',marginLeft:'5%',marginTop:'5px'}} alt="" />
                <div style={{height:'15%',width:'100%',backgroundColor:'#fff'}}>
                  <p style={{float:'left',marginLeft:'5%',fontSize:'15px',marginTop:'3%'}}>{dataItem.new}</p>   
                  <p style={{float:'right',marginRight:'5%',fontSize:'15px',marginTop:'8%'}}>{dataItem.date}</p>               
                </div>                    
              </div>
            )}
          />
          <div style={{width:'100%',height:'60px',backgroundColor:'#EEE3E1'}}></div>
          <div style={{width:'100%',height:'60px',padding:'10px',position:'fixed',bottom:'0px',backgroundColor:'#EEE3E1',borderTop:'1px #bbb solid'}}>
            <input className='input1'
              value={this.state.v}
              type='text'
              onKeyDown={this.handleInput}
              maxLength='10px'
              onChange={this.handleChange}
              style={{width:'70%',height:'40px',border:'1px solid #888888',borderRadius:'5px',marginLeft:'15px',float:'left'}}
            />
            <button style={{width:'20%',borderRadius:'5px',border:'1px solid #888888',paddingTop:'0px',height:'40px',marginLeft:'3%',float:'left'}} onClick={this.getConnect1}>发送</button>
          </div>
        </div>
      </div>

    )
  }
}
