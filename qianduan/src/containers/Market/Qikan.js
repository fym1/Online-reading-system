import React, { Component } from 'react'
import {NavBar,Grid} from 'antd-mobile';
import {BrowserRouter as Link} from 'react-router-dom';
export default class Qikan extends Component {
  constructor(props){
    super(props);
    this.state = {
      books:[]
    }
  }
  componentDidMount(){
    let page = this.props.match.params.id;
    let text = {bookType:'期刊'} //获取数据
    let send = JSON.stringify(text);   //重要！将对象转换成json字符串
    fetch(`http://127.0.0.1:8001/market/bookType`,{   //Fetch方法y
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: send
    })
    .then(res => res.json())
    .then(
      data => {
        console.log(data);
        this.setState({
          books:data
        })
      }
    )
  }
  jump(value){
    this.props.history.push(value);
    // this.props.history.push({pathname:value,query:{last1:this.props.match.path}})
  }
  render() {
    return (
      <div>
        <div style={{backgroundColor:'#EEE3E1',width:'100%',height:'100%'}}>
          <Grid data={this.state.books}
            columnNum={2}
            hasLine={false}
            itemStyle={{backgroundColor:'#EEE3E1',height:'230px'}}
            renderItem={dataItem => (
              <div style={{width:'80%',height:'100%',margin:'0 auto',borderRadius:'10px',overflow:'hidden'}} onClick={() => this.jump(`/xiangxi/${dataItem.bookId}`)}>
                <img src={dataItem.bookImage} style={{ width: '100%', height: '85%' }} alt="" />
                <div style={{height:'15%',width:'100%',backgroundColor:'#fff'}}>          
                  <p style={{fontSize:'15px',color:'#000',textAlign:'center'}}>{dataItem.bookName}</p>
                </div>            
              </div>
            )}
          />
        </div>
      </div>
    )
  }
}
