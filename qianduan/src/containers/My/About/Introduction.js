import React, { Component } from 'react'
import { Popover, NavBar, Icon,Grid,List,Drawer} from 'antd-mobile';
export default class Introduction extends Component {
    render() {
        return (
            <div>
                <NavBar
                    mode="dark"
                    leftContent="&lt;"
                    onLeftClick={()=>window.history.back()}
                    style={{backgroundColor:'#EEE3E1',color:'#000',height:'60px'}}
                    >介绍
                </NavBar>
                <div>
                随着互联网技术的发展，纸质版期刊读物的出版发行方式发生了深刻变革。为了方便用户的阅读，基于Web的图文期刊在线阅读系统App应运而生。基于Web的图文期刊在线阅读系统App是一款为用户提供最全面期刊读物，最真实用户阅读感受体验的APP。用户可以在APP上通过打卡每日任务换取O币，并使用O币免费阅读期刊读物，还可以进行在线阅读、订阅、发表评论等操作。
                </div>
            </div>
        )
    }
}
