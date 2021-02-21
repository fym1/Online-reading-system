import React, { Component } from 'react'
import { Popover, NavBar, Icon,Grid,List,Drawer} from 'antd-mobile';
import './my.css'
import {createBrowserHistory} from 'history'
const his = createBrowserHistory();
export default class Help extends Component {
    a=()=>{
        his.push('/a');
        window.location.reload()
    }
    render() {
        return (
            <div>
                <NavBar
                    mode="dark"
                    leftContent="&lt;"
                    onLeftClick={()=>window.history.back()}
                    style={{backgroundColor:'#EEE3E1',color:'#000',height:'60px'}}
                    >帮助反馈
                </NavBar>
                <div className='help'  onClick={this.a.bind(this)}>
                <p style={{height:'40px',fontSize:'22px',textAlign:'center'}}>当前版本暂不支持该功能。</p>
                <p style={{height:'40px',fontSize:'22px',textAlign:'center'}}>相信你自己是可以的</p>
                <p style={{height:'40px',fontSize:'22px',textAlign:'center'}}>加油！</p>

                </div>
            </div>
        )
    }
}
