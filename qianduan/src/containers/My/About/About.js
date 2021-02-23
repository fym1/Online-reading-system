import React, { Component } from 'react'
import { NavBar,Accordion, Icon,Grid,List,Drawer} from 'antd-mobile';
const Item = List.Item;
export default class About extends Component {
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
                    >关于我们
                </NavBar>
                <Accordion  className="my-accordion" onChange={this.onChange}>
                    <Accordion.Panel header="项目简介" className="pad">
                    &nbsp;&nbsp;&nbsp;&nbsp; 随着互联网技术的发展，纸质版期刊读物的出版发行方式发生了深刻变革。为了方便用户的阅读，基于Web的图文期刊在线阅读系统App应运而生。基于Web的图文期刊在线阅读系统App是一款为用户提供最全面期刊读物，最真实用户阅读感受体验的APP。用户可以在APP上通过打卡每日任务换取O币，并使用O币免费阅读期刊读物，还可以进行在线阅读、订阅、发表评论等操作。
                    </Accordion.Panel>
                    
                    <Accordion.Panel header="郑尚姿（开发工程师）" className="pad">
                        Email：1643613240@qq.com&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Github：https://github.com/zhengshangzi
                    </Accordion.Panel>
                    <Accordion.Panel header="范钰敏（开发工程师）" className="pad">
                        Email：1668576168@qq.com&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Github：https://github.com/fym1
                    </Accordion.Panel>
                    
                </Accordion>
            </div>
        )
    }
}
