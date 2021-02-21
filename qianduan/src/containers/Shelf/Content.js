import React, { Component, useState }from 'react'
import { Popover, NavBar, Icon,Grid,List} from 'antd-mobile';
import { BackTop,Affix, Button } from 'antd';
const Item = List.Item;
let height=document.querySelector('body').offsetHeight;
let id = '';
let time = '';
let top = 0;
let left = 0;
var page = sessionStorage.getItem("page");
export default class Content extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:[],
      bookName:'',
      images:[],
      page:0
    }
  }
  componentDidMount(){
    document.documentElement.addEventListener('touchmove', (e) => {
      this.timer = setTimeout((_) => {
        const postion = this.ScollPostion()
        console.log('滑动距离为：', postion)
        page = (postion.top-60)/574.34;
        console.log(page);
        this.setState({ page: page });
        sessionStorage.setItem("page",page);
        clearTimeout(this.timer)
      }, 300)
    })
    document.documentElement.addEventListener('wheel', (e) => {
      this.timer = setTimeout((_) => {
        const postion = this.ScollPostion()
        console.log('滑动距离为：', postion)
        let page = Math.ceil(postion.top/574.34);
        console.log(page);
        this.setState({ scrollHeight: postion.top })
        sessionStorage.setItem("page",page);
        clearTimeout(this.timer)
      }, 300)
    })
    id = this.props.match.params.id;
    time = this.props.match.params.time;
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
        this.setState({
          data:data,
          bookName:data[0].bookName
        })
      }
    )
    let text1 = {bookId:id,bookTime:time} //获取数据
    let send1 = JSON.stringify(text1);   //重要！将对象转换成json字符串
    fetch(`http://127.0.0.1:3001/users/content`,{   //Fetch方法y
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: send1
    })
    .then(res => res.json())
    .then(
      data => {
        console.log(data.length);
        sessionStorage.setItem("len",data.length);
        this.setState({
          images:data
        })
        if(this.props.location.query.last.indexOf('catalog') != -1){
          console.log('执行1');
          console.log(this.props.location.query.last);
          page = (this.props.location.query==undefined)?sessionStorage.getItem("page"):this.props.location.query.page;
        }
        else{
          console.log('执行2');
          page = this.props.location.query.page
        }
        sessionStorage.setItem("page",page);
        top = 574.34*Number(page-1);
        console.log(top)
        window.scrollTo({
          top: top,
          left: 0,
          behavior: 'smooth'
        })
      }
    )
  }
  ScollPostion = () => {
    var t, l, w, h
    if (document.documentElement && document.documentElement.scrollTop) {
      t = document.documentElement.scrollTop
      l = document.documentElement.scrollLeft
      w = document.documentElement.scrollWidth
      h = document.documentElement.scrollHeight
    } else if (document.body) {
      t = document.body.scrollTop
      l = document.body.scrollLeft
      w = document.body.scrollWidth
      h = document.body.scrollHeight
    }
    return {
      top: t,
      left: l,
      width: w,
      height: h,
    }
  }
  goList(value){
    console.log(value);
    this.props.history.push(value)
  }
  render() {
    return (
      <div style={{width:'100%',height:height,backgroundColor:'#fff'}}>
        <NavBar
          mode="dark"
          leftContent="&lt;"
          onLeftClick={()=>{
            var userPhone = sessionStorage.getItem('user'),
            readDate = new Date(),
            bookName = this.state.bookName,
            bookPage = sessionStorage.getItem('page'),
            readProgress = sessionStorage.getItem('page')/sessionStorage.getItem('len'),
            bookId = id;
            console.log(readProgress);
            let text = {userPhone:userPhone,bookId:bookId,readDate:readDate,bookName:bookName,bookPage:bookPage,readProgress:readProgress,bookTime:time} //获取数据
            let send = JSON.stringify(text);   //重要！将对象转换成json字符串
            fetch(`http://127.0.0.1:3001/users/addrecord`,{   //Fetch方法y
              method: 'POST',
              headers: {'Content-Type': 'application/json; charset=utf-8'},
              body: send
            })
            .then(res => res.json())
            .then(
              data => {
                console.log(data);
              }
            )
            window.location.href= `/xiangxi/${id}`;
          }}
          rightContent={
            <div className="iconfont icon-mulu" onClick={() => this.goList(`/booktime/${id}`)}></div>
          }
          style={{backgroundColor:'#EEE3E1',color:'#000',height:'40px',position:'fixed',top:'0px',zIndex:'10',width:'100%'}}
          >{this.state.bookName}
        </NavBar>
        <div style={{backgroundColor:'red',color:'#000',height:'40px'}}></div>
        <Grid data={this.state.images}
            columnNum={1}
            hasLine={false}
            itemStyle={{backgroundColor:'#EEE3E1',width:'100%',height:'574.34px'}}
            renderItem={dataItem => (
              <div style={{width:'100%',height:'574.34px'}}>
                <img src={dataItem.bookContentApi} style={{width:'100%',height:'574.34px'}} alt="" />
              </div>
            )}
          />
        <BackTop>
          <div style={{height:'40px',width:'40px',lineHeight:'40px',borderRadius:'4px',backgroundColor:'#1088e9',color:'#fff',textAlign:'center',fontSize:'14px'}}>UP</div>
        </BackTop>
      </div>
    )
  }
}
