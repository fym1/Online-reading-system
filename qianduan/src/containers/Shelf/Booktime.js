import React, { Component } from 'react'
import { Popover, NavBar, Icon,Grid,List} from 'antd-mobile';
import { BackTop,Collapse } from 'antd';
const Item = List.Item;
const { Panel } = Collapse;
let height=document.querySelector('body').offsetHeight;
let id = '';
export default class Booktime extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:[],
      bookName:'',
      booktime:[],
      len:[],
      values:[],
      0:[],
      1:[]
    }
  }
  componentDidMount(){
    id = this.props.match.params.id;
    console.log(id)
    let text = {bookId:id} //获取数据
    let send = JSON.stringify(text);   //重要！将对象转换成json字符串
    fetch(`http://127.0.0.1:3001/users/xiangxi`,{   //Fetch方法y
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: send
    })
    .then(res => res.json())
    .then(
      data => {
        console.log(typeof(data));
        this.setState({
          bookName:data[0].bookName
        })
      }
    )
    fetch(`http://127.0.0.1:3001/users/getdate`,{   //Fetch方法y
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: send
    })
    .then(res => res.json())
    .then(
      data => {
        console.log(data.length);
        var aa = [];
        for(var i = 0;i<data.length;i++){
          aa[i] = i;
        }
        this.setState({
          booktime:data,
          len:aa
        })
      }
    )
    fetch(`http://127.0.0.1:3001/users/getall`,{   //Fetch方法y
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: send
    })
    .then(res => res.json())
    .then(
      data => {
        let data1=[];
        for(var i = 0;i<data.length;i++){
          if(data[i].bookChapter != null){
            data1.push(data[i]);
          }
        }
        console.log(data1);
        this.setState({
          values:data1
        })
      }
    )
  }
  goMore(value){
    console.log(value);
    this.props.history.push(value)
  }
  render() {
    return (
      <div style={{width:'100%',height:height,backgroundColor:'#fff'}}>
        <NavBar
          mode="dark"
          leftContent="&lt;"
          onLeftClick={()=>window.history.back()}
          style={{backgroundColor:'#EEE3E1',color:'#000',height:'60px'}}
          >{this.state.bookName}
        </NavBar>
        <Grid data={this.state.booktime}
          columnNum={1}
          hasLine={false}
          itemStyle={{height:'50px'}}
          renderItem={dataItem => (
            <List  className="my-list">
              <Item extra={'详细目录>'} onClick={() => this.goMore(`/catalog/${id}/${dataItem.bookTime}`)}>{dataItem.bookTime}</Item>
            </List>
          )}
        />
        <BackTop>
          <div style={{height:'40px',width:'40px',lineHeight:'40px',borderRadius:'4px',backgroundColor:'#1088e9',color:'#fff',textAlign:'center',fontSize:'14px'}}>UP</div>
        </BackTop>
      </div>
    )
  }
}
