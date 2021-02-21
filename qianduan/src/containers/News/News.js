import React, { Component } from 'react'
import {NavBar,Grid} from 'antd-mobile';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import './new.css'
import { Tabs } from 'antd';
import Second from './Second';
import Third from './Third';
const { TabPane } = Tabs;
const height=document.querySelector('body').offsetHeight;

export default class News extends Component {
  constructor(props){
    super(props);
    this.state = {
      tabKey:'',
      xiaoxi:[
        {feng:'./images/1.jpg',tit:'评论1',username:'用户名1',tou:'./images/3.jpg'},
        {feng:'./images/2.jpg',tit:'评论2',username:'用户名2',tou:'./images/4.jpg'},
        {feng:'./images/2.jpg',tit:'评论3',username:'用户名3',tou:'./images/4.jpg'},
        {feng:'./images/1.jpg',tit:'评论4',username:'用户名4',tou:'./images/3.jpg'},
        {feng:'./images/1.jpg',tit:'评论1',username:'用户名1',tou:'./images/3.jpg'},
        {feng:'./images/2.jpg',tit:'评论2',username:'用户名2',tou:'./images/4.jpg'},
        {feng:'./images/2.jpg',tit:'评论3',username:'用户名3',tou:'./images/4.jpg'},
        {feng:'./images/1.jpg',tit:'评论4',username:'用户名4',tou:'./images/3.jpg'},
      ]
    }
  }
  // componentDidMount(){
  //   fetch('http://localhost:8001/updatebook')
  //     .then((res)=>res.json())
  //     .then((res)=>{
  //       console.log(res);
  //       // this.setState({
  //       //   data2:d0
  //       // })
  //     })
  // }

  jump(value){
    this.props.history.push(value)
  }
  onTabChanged = (key) => {
    this.setState({tabKey:key});
    this.props.history.replace({pathname:'/news/' + key, state:{
        tabKey: key
    }});
  }
  render() {
    return (
      <div style={{width:'100%',backgroundColor:'#fff',height:height}}>
        <NavBar
          mode="dark"
          style={{backgroundColor:'#EEE3E1',color:'#000',height:'60px',borderBottom:'1px grey solid'}}
        >
          消息
        </NavBar>
        <div style={{position:"fixed",zIndex:'999',background:'#EEE3E1',paddingTop:'7px',bottom:"0",width:"100%",height:"60px",borderTop:'1px grey solid'}}>
          <div className="bottom">
            <div onClick={() => this.jump('/')} className="kuai">
              <div className="iconfont icon-wodeshujia" ></div>
              <p style={{marginTop:'2px',fontSize:'15px'}}>书架</p>
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
              <div className="iconfont icon-xiaoxi" style={{color:'#F54577'}}></div>
              <p style={{marginTop:'2px',fontSize:'15px',color:'#F54577'}}>消息</p>
            </div>
          </div>
          <div className="bottom">
            <div onClick={() => this.jump('/my')} className="kuai">
              <div className="iconfont icon-wode" ></div>
              <p style={{marginTop:'2px',fontSize:'15px'}}>我的</p>
            </div>
          </div>
        </div>
        <Tabs 
          activeKey={(this.props.location.state && this.props.location.state.tabKey) ? this.props.location.state.tabKey : ''} 
          onChange={this.onTabChanged}
          className='tabstyle'
        >
          {/* <TabPane tab="消息评论" key="" forceRender>
            <div style={{backgroundColor:'#EEE3E1',width:'100%',height:'100%'}}>
              <Grid data={this.state.xiaoxi}
                columnNum={2}
                hasLine={false}
                itemStyle={{backgroundColor:'#EEE3E1',height:'230px'}}
                renderItem={dataItem => (
                  <div style={{width:'80%',height:'100%',margin:'0 auto',borderRadius:'10px',overflow:'hidden'}}>
                    <img src={dataItem.feng} style={{ width: '100%', height: '85%' }} alt="" />
                    <div style={{backgroundColor:'#000',opacity:'0.5',width:'100%',height:'25px',marginTop:'-25px'}}>
                      <p style={{color:'#fff'}}>{dataItem.tit}</p>
                    </div>
                    <div style={{height:'15%',width:'100%',backgroundColor:'#fff'}}>          
                        <img src={dataItem.tou} style={{float:'left',height:'100%',marginLeft:'8%'}}/>
                        <p style={{float:'left',marginLeft:'10%',fontSize:'10%',color:'#686868',marginTop:'3%'}}>{dataItem.username}</p>
                    </div>                    
                  </div>
                )}
              />
            </div>
            <div style={{width:'100%',height:'70px'}}></div>
          </TabPane> */}
          <TabPane tab="书籍更新" key="" forceRender>
            <Route exact path="/news" component={Second}/>
          </TabPane>
          <TabPane tab="系统通知" key="thirdTab" forceRender>
            <Route exact path="/news/thirdTab" component={Third}/>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}