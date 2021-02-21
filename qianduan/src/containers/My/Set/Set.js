import React, { Component } from 'react'
import { List,NavBar } from 'antd-mobile';
const Item1 = List.Item;
export default class Set extends Component {
    jump(value){
        this.props.history.push(value)
    }
    render() {
        return (
            <div>
                <NavBar
                    mode="dark"
                    leftContent="&lt;"
                    onLeftClick={()=>window.history.back()}
                    style={{backgroundColor:'#EEE3E1',color:'#000',height:'60px'}}
                    >设置
                </NavBar>
                <List>
                    <Item1  extra={'当前版本 1.0.0'}>检查更新</Item1>
                    <Item1  arrow="horizontal" onClick={() => this.jump('/score')}>去评分</Item1>
                    <Item1  arrow="horizontal" onClick={() => this.jump('/personal')}>隐私</Item1>
                </List>
            </div>
        )
    }
}
