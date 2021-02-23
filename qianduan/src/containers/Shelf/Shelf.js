import React, { Component } from 'react'
import { Popover, NavBar,Grid,Toast} from 'antd-mobile';
import {Link,Route,Redirect} from 'react-router-dom';
export default class Shelf extends Component {
  constructor(props){
    super(props);
    const logif =  sessionStorage.getItem("logif") == 'true';
    this.state = {
      tui:['./images/tui1.jpg','./images/tui2.jpg','./images/tui3.jpg'],
      logif:logif,
      shelf:[],
      shelfempty:0,
      lastempty:0
    }
  }
  componentDidMount(){
    let userphone = sessionStorage.getItem("user");
    let text = {userPhone:userphone} //获取数据
    let send = JSON.stringify(text);   //重要！将对象转换成json字符串
    fetch(`http://127.0.0.1:3001/users/mybooks`,{   //Fetch方法y
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: send
    })
    .then(res => res.json())
    .then(
      data => {
        // var shelf1 = [];
        // for(var i = 0;i < data.length;i++){
        //   shelf1.push(data[i].bookImage);
        // }
        if(data.length==0){
          this.setState({
            shelfempty:0,
          }) 
        }
        else{
          this.setState({
            shelfempty:data.length,
          }) 
        }
        this.setState({
          shelf:data.slice(0,3),
          shelflen:data.length
        }) 
        console.log(data);
      }
    )
    let text1 = {userPhone:sessionStorage.getItem("user")} //获取数据
    let send1 = JSON.stringify(text1);   //重要！将对象转换成json字符串
    fetch(`http://127.0.0.1:3001/users/getlast`,{   //Fetch方法y
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: send1
    })
    .then(res => res.json())
    .then(
      data => {
        console.log(data);
        var result = [];
        var obj = {};
        for(var i =0; i<data.length; i++){
          if(!obj[data[i].bookId]){
            result.push(data[i]);
            obj[data[i].bookId] = true;
          }
        }
        console.log(result);
        if(result.length==0){
          this.setState({
            lastempty:0,
          }) 
        }
        else{
          this.setState({
            lastempty:result.length,
          }) 
        }
        this.setState({
          tui:result.slice(0,3),
          lastlen:result.length
        })
      }
    )
  }
  componentDidUpdate(prevProps,prevState){
    if(prevProps.match.params.id!==this.props.match.params.id){
        let page = this.props.match.params.id
        fetch('https://cnodejs.org/api/v1/topics?tab=good&page='+page)
            .then((res)=>res.json())
            .then((res)=>{
                this.setState({
                  data:res.data
                })                
            })
    }
  }
  jump(value){
    this.props.history.push(value);
    // this.props.history.push({pathname:value,query:{page:this.state.page,shelf:'/'}})
  }
  jump1(value){
    // this.props.history.push(value);
    this.props.history.push({pathname:value,query:{page:this.state.page,shelf:'/'}})
  }
  render() {
    let {url} = this.props.match
    return (
      <div style={{backgroundColor:'#fff',height:'780px'}}>
        <NavBar
          mode="dark"
          style={{backgroundColor:'#EEE3E1',color:'#000',height:'60px',borderBottom:'2px #bbb solid'}}
        >
          书架
        </NavBar>
        <div style={{position:"fixed",zIndex:'999',background:'#EEE3E1',paddingTop:'7px',bottom:"0",width:"100%",height:"60px",borderTop:'1px grey solid'}}>
          <div className="bottom">
            <div onClick={() => this.jump('/')} className="kuai">
              <div className="iconfont icon-wodeshujia" style={{color:'#F54577'}}></div>
              <p style={{marginTop:'2px',fontSize:'15px',color:'#F54577'}}>书架</p>
            </div>
          </div>
          <div className="bottom">
            <div onClick={() => this.jump('/market')} className="kuai">
              <div className="iconfont icon-icon_fuben"></div>
              <p style={{marginTop:'2px',fontSize:'15px'}}>书城</p>
            </div>
          </div>
          <div className="bottom">
            <div onClick={() => this.jump('/news')} className="kuai">
              <div className="iconfont icon-xiaoxi"></div>
              <p style={{marginTop:'2px',fontSize:'15px'}}>消息</p>
            </div>
          </div>
          <div className="bottom">
            <div onClick={() => this.jump('/my')} className="kuai">
              <div className="iconfont icon-wode"></div>
              <p style={{marginTop:'2px',fontSize:'15px'}}>我的</p>
            </div>
          </div>
        </div>
        <div>
          <div style={{width:'100%',height:'205px',borderBottom:'1px grey solid',marginTop:'10px',backgroundColor:'#EEE3E1'}}>
            <div style={{width:'100%',height:'35px',borderLeft:'3px #F54577 solid',marginTop:'5px'}}>
              <p style={{fontSize:'20px',color:'#F54577',marginLeft:'5px',width:'100px',height:'20px',float:'left'}}>最近阅读</p>
              <p className={this.state.logif?"login-yes-p":"login-yes"} onClick={() => {this.jump("/last");}}>更多></p>
            </div>
            <div style={{width:'100%',height:'155px',marginTop:'10px'}}>
              <Grid data={this.state.tui}
                columnNum={3}
                hasLine={false}
                itemStyle={this.state.logif?{backgroundColor:'#EEE3E1'}:{display:'none'}}
                renderItem={dataItem=>(
                  <img src={dataItem.bookImage} style={{width:'85%',height:'155px'}} onClick={() => this.jump1(`/xiangxi/${dataItem.bookId}`)}/>
                )}
              />
              <p className={this.state.lastempty!=0?"login-yes":"login-no"}>暂无最近阅读，去书城看看吧~~</p>
              <p className={this.state.lastempty!=0?"login-yes":"login-no"} onClick={() => this.jump('/shelf')}>去书城</p>
              <p className={this.state.logif?"login-yes":"login-no"}>登录后即可获取阅读记录哦~~</p>
              <p className={this.state.logif?"login-yes":"login-no"} onClick={() => this.jump('/login')}>去登录></p>
            </div>
          </div>
          <div style={{width:'100%',height:'205px',borderBottom:'1px grey solid',marginTop:'10px',backgroundColor:'#EEE3E1'}}>
            <div style={{width:'100%',height:'35px',borderLeft:'3px #F54577 solid',marginTop:'5px'}}>
              <p style={{fontSize:'20px',color:'#F54577',marginLeft:'5px',width:'100px',height:'20px',float:'left'}}>我的书架</p>
              <p className={this.state.logif?"login-yes-p":"login-yes"} onClick={() => {this.jump("/collect");}}>更多></p>
            </div>
            <div style={{width:'100%',height:'155px',marginTop:'10px'}}>
              <Grid data={this.state.shelf}
                columnNum={3}
                hasLine={false}
                itemStyle={this.state.logif?{backgroundColor:'#EEE3E1'}:{display:'none'}}
                renderItem={dataItem=>(
                  // <Link to={`/xiangxi/${dataItem.bookId}`}>
                    <img src={dataItem.bookImage} style={{width:'85%',height:'155px'}} onClick={() => this.jump1(`/xiangxi/${dataItem.bookId}`)}/>
                  // </Link>
                )}
              />
              <p className={this.state.shelfempty!=0?"login-yes":"login-no"}>书架中暂无书籍，去书城看看吧~~</p>
              <p className={this.state.shelfempty!=0?"login-yes":"login-no"} onClick={() => this.jump('/shelf')}>去书城</p>
              <p className={this.state.logif?"login-yes":"login-no"}>登录后即可建立书架哦~~</p>
              <p className={this.state.logif?"login-yes":"login-no"} onClick={() => this.jump('/login')}>去登录></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
