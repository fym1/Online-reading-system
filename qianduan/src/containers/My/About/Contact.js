import React, { Component } from 'react'
import {  NavBar,Accordion, List} from 'antd-mobile';
export default class Contact extends Component {
    onChange = (key) => {
        console.log(key);
      }
    render() {
        return (
            <div>
                <NavBar
                    mode="dark"
                    leftContent="&lt;"
                    onLeftClick={()=>window.history.back()}
                    style={{backgroundColor:'#EEE3E1',color:'#000',height:'60px'}}
                    >联系方式
                </NavBar>
                <Accordion  className="my-accordion" onChange={this.onChange}>
                    <Accordion.Panel header="郑尚姿（开发工程师）" className="pad">
                        Email：1643613240@qq.com
                        Github：https://github.com/zhengshangzi
                    </Accordion.Panel>
                    <Accordion.Panel header="范钰敏（开发工程师）" className="pad">
                        Email：1668576168@qq.com
                        Github：https://github.com/fym1
                    </Accordion.Panel>
                </Accordion>
            </div>
        )
    }
}
