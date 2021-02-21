import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import Shelf from '../containers/Shelf/Shelf';
import My from '../containers/My/My';
import Market from './../containers/Market/Market';
import News from './../containers/News/News';
import Search from './../containers/Market/Search';
import All from './../containers/Market/All';
import Last from './../containers/Shelf/Last';
import Collect from './../containers/Shelf/Collect';
import Detail from './../containers/Shelf/Detail';
import Content from './../containers/Shelf/Content';
import Catalog from './../containers/Shelf/Catalog';
import Login from '../containers/My/Login'
import Register from '../containers/My/Register'
import Set from './../containers/My/Set/Set';
import Score from './../containers/My/Set/Score';
import Personal from './../containers/My/Set/Personal';
import About from '../containers/My/About/About'
import Contact from '../containers/My/About/Contact'
import Introduction from '../containers/My/About/Introduction'
import More from '../containers/My/More'
import Rank from '../containers/My/Rank'
import UpdateUser from '../containers/My/Update'
import Signin from '../containers/My/SignIn'
import Help from '../containers/My/Help'
import Pa from './../containers/Shelf/Pa';
import Xiangxi from './../containers/common/Xiangxi';
import Booktime from './../containers/Shelf/Booktime';
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
        <Route exact path='/' component={Shelf}/>
        <Route path='/login' component={Login}/>
        <Route path='/register' component={Register}/>
        <Route path='/last' component={Last}/>
        <Route path='/collect' component={Collect}/>
        <Route path='/news' component={News}/>
        <Route path='/search' component={Search}/>
        <Route path='/all' component={All}/>
        <Route path='/my' component={My}/>
        <Route exact path='/updateuser' component={UpdateUser}/>
        <Route exact path='/getscore' component={Signin}/>
        <Route exact path='/setup' component={Set}/>
        <Route exact path='/about' component={About}/>
        <Route exact path='/help' component={Help}/>
        <Route exact path='/personal' component={Personal}/>
        <Route exact path='/score' component={Score}/>
        <Route exact path='/contact' component={Contact}/>
        <Route exact path='/introduction' component={Introduction}/>
        <Route exact path='/more' component={More}/>
        <Route exact path='/rank' component={Rank}/>
        <Route path='/detail' component={Detail}/>
        <Route path={`/content/:id/:time`} component={Content}/>
        <Route path='/catalog/:id/:time' component={Catalog}/>
        <Route path='/pa' component={Pa}/>
        <Route path={`/xiangxi/:id`} component={Xiangxi}/>
        <Route path={`/booktime/:id`} component={Booktime}/>
        <Route path='/market' component={Market}/>

      </Router>
    )
  }
}

