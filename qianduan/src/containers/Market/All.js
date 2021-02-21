import React, { Component } from 'react'
import {NavBar, Grid} from 'antd-mobile';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import Xiangxi from './../common/Xiangxi';
const height=document.querySelector('body').offsetHeight;

export default class All extends Component {
  constructor(props){
    super(props);
    this.state = {
      data1:[],
      classes:[
        {label:'期刊',value:'期刊'},
        {label:'杂志',value:'杂志'},
        {label:'vision',value:'vision'},
        {label:'人文',value:'人文'},
        {label:'生活',value:'生活'},
        {label:'经济',value:'经济'},
        {label:'娱乐',value:'娱乐'}

      ],
      menu:(
        <Menu>
          <Menu.Item>
            <p style={{height:'10px'}} onClick={() => this.classes('期刊')}>
            期刊
            </p>
          </Menu.Item>
          <Menu.Item>
            <p style={{height:'10px'}} onClick={() => this.classes('杂志')}>
              杂志
            </p>
          </Menu.Item>
          <Menu.Item>
            <p style={{height:'10px'}} onClick={() => this.classes('vision')}>
              vision
            </p>
          </Menu.Item>
          <Menu.Item>
            <p style={{height:'10px'}} onClick={() => this.classes('人文')}>
              人文
            </p>
          </Menu.Item><Menu.Item>
            <p style={{height:'10px'}} onClick={() => this.classes('生活')}>
              生活
            </p>
          </Menu.Item><Menu.Item>
            <p style={{height:'10px'}} onClick={() => this.classes('经济')}>
              经济
            </p>
          </Menu.Item><Menu.Item>
            <p style={{height:'10px'}} onClick={() => this.classes('娱乐')}>
              娱乐
            </p>
          </Menu.Item>
        </Menu>
      ),
    }
  }
  componentDidMount(){
    fetch('http://127.0.0.1:3001/users/all')
      .then((res)=>res.json())
      .then((res)=>{
        for(var i = 0;i<res.length;i++){
          if(res[i].bookWriter.indexOf('0') != -1 || res[i].bookWriter.indexOf('元') != -1|| res[i].bookWriter.indexOf('\n') != -1){
            res[i].bookWriter="无"
          }
          else{
            console.log('true');
          }
        }
          this.setState({
            data1:res
          })
          console.log(res.length);
      })
  }
  class(){
    console.log('111')
  }
  classes(value){
    let page = this.props.match.params.id;
    let text = {bookType:value} //获取数据
    let send = JSON.stringify(text);   //重要！将对象转换成json字符串
    fetch(`http://127.0.0.1:3001/users/market/bookType`,{   //Fetch方法y
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: send
    })
    .then(res => res.json())
    .then(
      data => {
        console.log(data);
        this.setState({
          data1:data
        })
      }
    )
  }
  render() {
    return (
      <div style={{width:'100%',height:height,backgroundColor:'#fff'}}>
        <NavBar
          mode="dark"
          leftContent="&lt;"
          onLeftClick={()=>window.location.href='/market'}
          style={{backgroundColor:'#EEE3E1',color:'#000',height:'60px'}}
          >全部期刊
        </NavBar>
        <div style={{width:'100%',height:'60px',padding:'10px'}}>
          <div style={{border:'1px gray solid',width:'90px',height:'40px',padding:'7px 10px 7px 10px',borderRadius:'5px',backgroundColor:'#fff',float:'left',marginLeft:'10px'}}>
            <Dropdown overlay={this.state.menu} trigger={['click']}>
              <a className="ant-dropdown-link" onClick={this.class.bind(this)}>
                点我分类<DownOutlined />
              </a>
            </Dropdown>
          </div>
        </div>
        <Grid data={this.state.data1}
          columnNum={1}
          itemStyle={{height:'150px',width:'100%',backgroundColor:'#EEE3E1'}}
          renderItem={dataItem=>(
            <Link to={`/xiangxi/${dataItem.bookId}`}>
              <div style={{marginTop:'0px',backgroundColor:'#fff',width:'100%',height:'100%'}}>
                <div style={{width:'30%',float:'left',height:'100%'}}>
                  <img src={dataItem.bookImage} style={{width:'80%',height:'80%',marginLeft:'5%',marginTop:'10%'}}/>
                </div>
                <div style={{width:'60%',float:'left',height:'100%'}}>
                  <p className='word2'>{dataItem.bookName}</p>
                  <p className='word1'>作者：{dataItem.bookWriter}</p>
                  <p className='word1'>类别：{dataItem.bookType}</p>
                  <p className='word1'>上线日期：{dataItem.bookDate}</p>
                </div>
              </div>
            </Link>
          )}
        />
      </div>
    )
  }
}
