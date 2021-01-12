import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import Shelf from '../containers/Shelf/Shelf';
import My from '../containers/My/My';
import Market from './../containers/Market/Market';
import News from './../containers/News/News';
import Login from '../containers/My/Login'
import Register from '../containers/My/Register'
export default class Bottom extends Component {
  render() {
    return (
      <Router>
        {/* <div style={{position:"fixed",zIndex:'999',background:'#EEE3E1',paddingTop:'15px',bottom:"0",width:"100%",height:"70px"}}>
          <div className="bottom">
            <Link to="/shelf">
              <div className="iconfont icon-wodeshujia"></div>
              <p>书架</p>
            </Link>
          </div>
          <div className="bottom">
            <Link to="/market">
              <div className="iconfont icon-icon_fuben"></div>
              <p>书城</p>
            </Link>
          </div>
          <div className="bottom">
            <Link to="/news">
              <div className="iconfont icon-xiaoxi"></div>
              <p>消息</p>
            </Link>
          </div>
          <div className="bottom">
            <Link to="/my">
              <div className="iconfont icon-wode"></div>
              <p>我的</p>
            </Link>
          </div>
        </div> */}
        <Route exact path='/' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/shelf' component={Shelf}/>
        <Route path='/news' component={News}/>
        <Route path='/market' component={Market}/>
        <Route path='/my' component={My}/>
      </Router>
    )
  }
}

