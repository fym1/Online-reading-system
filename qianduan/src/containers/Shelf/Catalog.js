import React, { Component } from 'react'
import { Popover, NavBar, Icon,Grid,List} from 'antd-mobile';
const Item = List.Item;
let height=document.querySelector('body').offsetHeight;
let id = '';
let time = '';
export default class Catalog extends Component {
  constructor(props){
    super(props);
    this.state = {
      data:[],
    }
  }
  componentDidMount(){
    id = this.props.match.params.id;
    time = this.props.match.params.time;
    let text1 = {bookId:id,bookTime:time} //获取数据
    let send1 = JSON.stringify(text1);   //重要！将对象转换成json字符串
    fetch(`http://127.0.0.1:3001/users/getcatalog`,{   //Fetch方法y
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: send1
    })
    .then(res => res.json())
    .then(
      data => {
        console.log(data);
        let data1=[];
        for(var i = 0;i<data.length;i++){
          if(data[i].bookChapter != null){
            data1.push(data[i]);
          }
        }
        this.setState({
          data:data1
        })
      }
    )
  }
  goMore(value,page){
    console.log(value);
    this.props.history.push({pathname:value,query:{page:page,last:this.props.match.url}});
    sessionStorage.setItem('page',page);
    sessionStorage.setItem('time',time);
    sessionStorage.setItem('bookid',id);
  }
  render() {
    return (
      <div style={{width:'100%',height:height,backgroundColor:'#fff'}}>
        <NavBar
          mode="dark"
          leftContent="&lt;"
          onLeftClick={()=>window.history.back()}
          style={{backgroundColor:'#EEE3E1',color:'#000',height:'60px'}}
          >目录
        </NavBar>
        <Grid data={this.state.data}
          columnNum={1}
          hasLine={false}
          itemStyle={{height:'50px'}}
          renderItem={dataItem => (
            // <div style={{width:'100%',height:'100%',backgroundColor:'#fff',borderBottom:'1px #eee solid'}} onClick={() => this.goMore(`/content/${id}/${time}`,dataItem.bookPage)}>
            //   <p style={{fontSize:'15px',textAlign:'left',marginLeft:'10px'}}>{dataItem.bookChapter}</p>    
            // </div>
            <List  className="my-list">
              <Item extra={`第${dataItem.bookPage}页`} onClick={() => this.goMore(`/content/${id}/${time}`,dataItem.bookPage)}>{dataItem.bookChapter}</Item>
            </List>
          )}
        />
      </div>
    )
  }
}
