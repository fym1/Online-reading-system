import React, { Component } from 'react'
import {NavBar,Grid} from 'antd-mobile';
import {BrowserRouter as Route} from 'react-router-dom';
import 'antd/dist/antd.css';
import './new.css'
import { Tabs } from 'antd';
import Second from './Second';
import Third from './Third';
const { TabPane } = Tabs;
export default class News extends Component {
  constructor(props){
    super(props);
    this.state = {
      tabKey:'firstTab',
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
  jumpShelf() {
    this.props.history.push('/shelf')
  }
  jumpMarket() {
    this.props.history.push('/market')
  }
  jumpNews() {
    this.props.history.push('/news')
  }
  jumpMy() {
    this.props.history.push('/my')
  }
  onTabChanged = (key) => {
    this.setState({tabKey:key});
    this.props.history.replace({pathname:'/news/' + key, state:{
        tabKey: key
    }});
  }
  render() {
    return (
      <div style={{backgroundColor:'#fff',width:'100%',height:'100%'}}>
        <NavBar
          mode="dark"
          style={{backgroundColor:'#EEE3E1',color:'#000',height:'60px'}}
        >
          消息
        </NavBar>
        <div style={{position:"fixed",zIndex:'999',background:'#EEE3E1',paddingTop:'7px',bottom:"0",width:"100%",height:"60px",borderTop:'2px #BBBBBB solid'}}>
          <div className="bottom">
            <div onClick={this.jumpShelf.bind(this)} className="kuai">
              <div className="iconfont icon-wodeshujia"></div>
              <p style={{marginTop:'2px',fontSize:'15px'}}>书架</p>
            </div>
          </div>
          <div className="bottom">
            <div onClick={this.jumpMarket.bind(this)} className="kuai">
              <div className="iconfont icon-icon_fuben"></div>
              <p style={{marginTop:'2px',fontSize:'15px'}}>书城</p>
            </div>
          </div>
          <div className="bottom">
            <div onClick={this.jumpNews.bind(this)} className="kuai">
              <div className="iconfont icon-xiaoxi" style={{color:'#F54577'}}></div>
              <p style={{marginTop:'2px',fontSize:'15px',color:'#F54577'}}>消息</p>
            </div>
          </div>
          <div className="bottom">
            <div onClick={this.jumpMy.bind(this)} className="kuai">
              <div className="iconfont icon-wode"></div>
              <p style={{marginTop:'2px',fontSize:'15px'}}>我的</p>
            </div>
          </div>
        </div>
        {/* <Tabs 
          activeKey={(this.props.location.state && this.props.location.state.tabKey) ? this.props.location.state.tabKey : 'firstTab'} 
          onChange={this.onTabChanged}
          className='tabstyle'
        >
          <TabPane tab="消息评论" key="firstTab">
            <Route exact path="/news/firstTab" component={First}/>
          </TabPane>
          <TabPane tab="书籍更新" key="secondTab">
            <Route exact path="/news/secondTab" component={Second}/>
          </TabPane>
          <TabPane tab="系统通知" key="thirdTab">
            <Route exact path="/news/thirdTab" component={Third}/>
          </TabPane>
        </Tabs> */}
        <Tabs 
          activeKey={(this.props.location.state && this.props.location.state.tabKey) ? this.props.location.state.tabKey : ''} 
          onChange={this.onTabChanged}
          className='tabstyle'
        >
          <TabPane tab="消息评论" key="firstTab">
            <div style={{backgroundColor:'#EEE3E1',width:'100%',height:'100%'}}>
              <Grid data={this.state.xiaoxi}
                columnNum={2}
                hasLine={false}
                itemStyle={{backgroundColor:'#EEE3E1',height:'230px'}}
                renderItem={dataItem => (
                  <div style={{width:'80%',height:'100%',backgroundColor:'red',margin:'0 auto',borderRadius:'10px',overflow:'hidden'}}>
                    <img src={dataItem.feng} style={{ width: '100%', height: '85%' }} alt="" />
                    <div style={{height:'15%',width:'100%'}}>          
                      <div style={{backgroundColor:'#fff',width:'100%',height:'100%'}}>
                        <img src={dataItem.tou} style={{float:'left',height:'100%',marginLeft:'8%'}}/>
                        <p style={{float:'left',marginLeft:'10%',fontSize:'10%',color:'#686868',marginTop:'3%'}}>{dataItem.username}</p>
                      </div>                  
                    </div>                    
                  </div>
                )}
              />
            </div>
            <div style={{width:'100%',height:'70px'}}></div>
          </TabPane>
          <TabPane tab="书籍更新" key="secondTab">
            <Route exact path="/news/secondTab" component={Second}/>
          </TabPane>
          <TabPane tab="系统通知" key="thirdTab">
            <Route exact path="/news/thirdTab" component={Third}/>
            <div style={{backgroundColor:'#EEE3E1',width:'100%',height:'100%'}}>
              <Grid data={this.state.xiaoxi}
                columnNum={2}
                hasLine={false}
                itemStyle={{backgroundColor:'#EEE3E1',height:'230px'}}
                renderItem={dataItem => (
                  <div style={{width:'80%',height:'100%',backgroundColor:'red',margin:'0 auto',borderRadius:'10px',overflow:'hidden'}}>
                    <img src={dataItem.feng} style={{ width: '100%', height: '85%' }} alt="" />
                    <div style={{height:'15%',width:'100%'}}>          
                      <div style={{backgroundColor:'#fff',width:'100%',height:'100%'}}>
                        <img src={dataItem.tou} style={{float:'left',height:'100%',marginLeft:'8%'}}/>
                        <p style={{float:'left',marginLeft:'10%',fontSize:'10%',color:'#686868',marginTop:'3%'}}>{dataItem.username}</p>
                      </div>                  
                    </div>                    
                  </div>
                )}
              />
            </div>
            <div style={{width:'100%',height:'70px'}}></div>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}