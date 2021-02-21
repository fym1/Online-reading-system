import React, { Component } from 'react'
import {Grid} from 'antd-mobile';
import 'antd/dist/antd.css';
import './new.css'

export default class Second extends Component {
  constructor(props){
    super(props);
    this.state = {
      tabKey:'firstTab',
      xiaoxi:[
        {feng:'../images/6.jpg',date:'2021-1-17'},
        {feng:'../images/7.jpg',date:'2021-1-16'},
        {feng:'../images/6.jpg',date:'2021-1-15'},
        {feng:'../images/7.jpg',date:'2021-1-14'},
        {feng:'../images/6.jpg',date:'2021-1-13'},
        {feng:'../images/7.jpg',date:'2021-1-12'},
        {feng:'../images/6.jpg',date:'2021-1-11'},
        {feng:'../images/7.jpg',date:'2021-1-10'},
      ]
    }
  }
  componentDidMount(){
    fetch('http://localhost:8001/updatebook')
      .then((res)=>res.json())
      .then((res)=>{
        console.log(res);
        this.setState({
          xiaoxi:res
        })
      })
  }
  render() {
    return (
      <div>
        <div style={{backgroundColor:'#EEE3E1',width:'100%',height:'100%'}}>
          <Grid data={this.state.xiaoxi}
            columnNum={2}
            hasLine={false}
            itemStyle={{backgroundColor:'#EEE3E1',height:'230px'}}
            renderItem={dataItem => (
              <div style={{width:'80%',height:'100%',margin:'0 auto',borderRadius:'10px',overflow:'hidden'}}>
                <img src={dataItem.bookImage} style={{ width: '100%', height: '85%' }} alt="" />
                <div style={{height:'15%',width:'100%',backgroundColor:'#fff'}}>
                  <p style={{float:'left',marginLeft:'10%',fontSize:'15px',marginTop:'3%'}}>{dataItem.bookDate}</p>   
                  <p style={{float:'right',marginRight:'10%',fontSize:'15px',marginTop:'3%'}}>更新</p>               
                </div>                    
              </div>
            )}
          />
        </div>
        <div style={{width:'100%',height:'70px'}}></div>
      </div>
    )
  }
}
