import React, { Component } from 'react'
import {Grid} from 'antd-mobile';
import 'antd/dist/antd.css';
import './new.css'

export default class Third extends Component {
  constructor(props){
    super(props);
    this.state = {
      tabKey:'firstTab',
      xiaoxi:[
        {feng:'../images/5.jpg',date:'5小时前',new:'每日签到可领10分积分哦~~'},
        {feng:'../images/5.jpg',date:'1天前',new:'恭喜今日阅读时长已达1小时！'},
        {feng:'../images/5.jpg',date:'2天前',new:'1.0.2版本已更新'},
      ]
    }
  }
  render() {
    return (
      <div>
        <div style={{backgroundColor:'#EEE3E1',width:'100%',height:'100%'}}>
          <Grid data={this.state.xiaoxi}
            columnNum={1}
            hasLine={false}
            itemStyle={{backgroundColor:'#EEE3E1',height:'100px'}}
            renderItem={dataItem => (
              <div style={{width:'100%',height:'100px',backgroundColor:'#fff',marginTop:'3px'}}>
                <img src={dataItem.feng} style={{width:'80px',height:'80px',float:'left',marginLeft:'5%',marginTop:'5px'}} alt="" />
                <div style={{height:'15%',width:'100%',backgroundColor:'#fff'}}>
                  <p style={{float:'left',marginLeft:'5%',fontSize:'15px',marginTop:'3%'}}>{dataItem.new}</p>   
                  <p style={{float:'right',marginRight:'5%',fontSize:'15px',marginTop:'8%'}}>{dataItem.date}</p>               
                </div>                    
              </div>
            )}
          />
        </div>
        <div style={{width:'100%',height:'300px'}}></div>
      </div>
    )
  }
}
