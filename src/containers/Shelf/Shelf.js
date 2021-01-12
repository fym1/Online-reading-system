import React, { Component } from 'react'
import { Popover, NavBar, Icon,Grid,List,Drawer} from 'antd-mobile';
export default class Shelf extends Component {
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
  render() {
    return (
      <div>
        <NavBar
          mode="dark"
          style={{backgroundColor:'#EEE3E1',color:'#000',height:'60px'}}
        >
          书架
        </NavBar>
        <p>书架</p>
        <div style={{position:"fixed",zIndex:'999',background:'#EEE3E1',paddingTop:'20px',bottom:"0",width:"100%",height:"60px"}}>
          <div className="bottom">
            <div onClick={this.jumpShelf.bind(this)} className="kuai">
              <div className="iconfont icon-wodeshujia-copy" style={{color:'#F54577'}}></div>
              <p style={{marginTop:'18px',fontSize:'17px',color:'#F54577'}}>书架</p>
            </div>
          </div>
          <div className="bottom">
            <div onClick={this.jumpMarket.bind(this)} className="kuai">
              <div className="iconfont icon-icon_fuben"></div>
              <p style={{marginTop:'18px',fontSize:'17px'}}>书城</p>
            </div>
          </div>
          <div className="bottom">
            <div onClick={this.jumpNews.bind(this)} className="kuai">
              <div className="iconfont icon-xiaoxi"></div>
              <p style={{marginTop:'18px',fontSize:'17px'}}>消息</p>
            </div>
          </div>
          <div className="bottom">
            <div onClick={this.jumpMy.bind(this)} className="kuai">
              <div className="iconfont icon-wode"></div>
              <p style={{marginTop:'18px',fontSize:'17px'}}>我的</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
