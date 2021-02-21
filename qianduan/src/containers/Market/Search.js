import React, { Component } from 'react'
import { Popover, NavBar, Icon,Grid,Carousel,SearchBar} from 'antd-mobile';
import './market.css'
const height=document.querySelector('body').offsetHeight;
var hisTime;//获取搜索时间数组
var hisItem;//获取内容数组
export default class Search extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      back:'<',
      value:'',
      data1:[]
    }
  }
  componentDidMount(){
    this.input.focus()
    this.init();
    this.block();
  }
  back=()=>{
    window.history.back()
  }
  init (){	 
    console.log('初始化')
    hisTime = [];
    hisItem = [];      
    for(var i = 0; i < localStorage.length; i++){
      if(!isNaN(localStorage.key(i))){
        hisTime.push(localStorage.key(i));
      }
    }       
    if(hisTime.length > 0) {
      hisTime.sort();
      for (var y = 0; y < hisTime.length; y++) {
        localStorage.getItem(hisTime[y]).trim() && hisItem.push(localStorage.getItem(hisTime[y]));
      }
    }
    this.block();
  }  
  //在网页中展示历史搜索内容
  block(){
    this.div2.innerHTML = "";
    console.log(hisItem);
    for(var i = 0;i<localStorage.length;i++){
      var word=document.createElement('word');
      word.setAttribute("id","word");
      this.div2.appendChild(word);
      word.innerHTML = hisItem[i];
    }
  }
  isInArray(arr,value){
    for(var i = 0; i < arr.length; i++){
      if(value == arr[i]){
        return true;
      }
    }
    return false;
  }
  //清除记录功能
  del(){
    localStorage.clear();
    this.init();
  }
  handleChange(event) {
    console.log(event.target.value);
    this.setState({value: event.target.value});
  }
  inputKeyUp=(event)=>{
    console.log(event.keyCode);
    if(event.keyCode===13){
      console.log('搜索的内容: ' + this.state.value);
      event.preventDefault();
      var time = (new Date()).getTime();
      if(!this.state.value){
        console.log("您输入内容为空！！！");
        return false;
      }
      if(this.isInArray(hisItem,this.state.value) == true){
        for(var j = 0; j < localStorage.length; j++){
          if(this.state.value == localStorage.getItem(localStorage.key(j))){
            localStorage.removeItem(localStorage.key(j));
          }
        }
        localStorage.setItem(time,this.state.value);
        let text = {bookName:this.state.value} //获取数据
        let send = JSON.stringify(text);   //重要！将对象转换成json字符串
        fetch(`http://127.0.0.1:8001/search`,{   //Fetch方法y
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
            });
            if(data.length != 0){
              console.log('data非空')
              const template = `<div class='addblock'>
              <div class='tupian1'>
                <img src=${data[0].bookImage} class='tupian'/>
              </div>
              <div class='intro'>
                <p class='word2'>${data[0].bookName}</p>
                <p class='word1'>作者：${data[0].bookWriter}</p>
                <p class='word1'>类别：${data[0].bookType}</p>
                <p class='word1'>上线日期：${data[0].bookDate}</p>
              </div>
            </div>`
              let tempNode = document.createElement('div');
              tempNode.innerHTML = template;
              const container = document.getElementById('result');
              container.appendChild(tempNode);
            }
            else{
              console.log('错误')
            }
          }
        )
      }
      else{
        localStorage.setItem(time,this.state.value);
      }  
      this.init();
    }
  }
  handleSubmit=(event)=>{
    console.log('搜索的内容: ' + this.state.value);
    event.preventDefault();
    var time = (new Date()).getTime();
    if(!this.state.value){
      console.log("您输入内容为空！！！");
      return false;
    }
    if(this.isInArray(hisItem,this.state.value) == true){
      for(var j = 0; j < localStorage.length; j++){
        if(this.state.value == localStorage.getItem(localStorage.key(j))){
          localStorage.removeItem(localStorage.key(j));
        }
      }
      localStorage.setItem(time,this.state.value);
      let text = {bookName:this.state.value} //获取数据
      let send = JSON.stringify(text);   //重要！将对象转换成json字符串
      fetch(`http://127.0.0.1:8001/search`,{   //Fetch方法y
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
          });
          if(data.length != 0){
            console.log('data非空')
            const template = `<div class='addblock'>
            <div class='tupian1'>
              <img src=${data[0].bookImage} class='tupian'/>
            </div>
            <div class='intro'>
              <p class='word2'>${data[0].bookName}</p>
              <p class='word1'>作者：${data[0].bookWriter}</p>
              <p class='word1'>类别：${data[0].bookType}</p>
              <p class='word1'>上线日期：${data[0].bookDate}</p>
            </div>
          </div>`
            let tempNode = document.createElement('div');
            tempNode.innerHTML = template;
            const container = document.getElementById('result');
            container.appendChild(tempNode);
          }
          else{
            console.log('错误')
          }
        }
      )
    }
    else{
      localStorage.setItem(time,this.state.value);
    }  
    this.init();
  }
  render() {
    return (
      <div style={{width:'100%',height:height,backgroundColor:'#fff'}}>
        <NavBar
          mode="dark"
          style={{backgroundColor:'#EEE3E1',color:'#000',height:'60px'}}
        >
          <div style={{width:'100%',height:'60px',background:'#EEE3E1',borderTop:'1px #bbb solid',padding:'3% 15px 3% 15px',position:'fixed',top:'0'}}>
            <p style={{float:'left',fontSize:'23px'}} onClick={this.back}>{this.state.back}</p>
            <input ref={(input) => this.input = input} style={{width:'60%',height:'100%',background:'white',borderRadius:'15px',float:'left',marginLeft:'10%'}} value={this.state.value} id="this.state.value" onChange={this.handleChange} onKeyUp={this.inputKeyUp}/>
            <input type="submit" value="搜索" id="searchbutton" style={{width:'20%',height:'100%',background:'white',borderRadius:'15px',float:'left',marginLeft:'2%'}} onClick={this.handleSubmit}/>
          </div>
        </NavBar>
        <div style={{width:'100%',height:'55px'}}>
          <p style={{fontSize:'20px',marginTop:'5px',marginLeft:'3%',width:'50%',float:'left'}}>搜索历史</p>
          <div className="iconfont icon-shanchu" id="del" style={{width:'15%',float:'right',marginTop:'9px'}} onClick={this.del.bind(this)}></div>
        </div>
        <div ref={(args)=>this.div2 =args} style={{width:'100%',height:'100px',padding:'5px'}}></div>
        <div style={{width:'100%'}}>
          <p style={{fontSize:'20px',marginTop:'5px',marginLeft:'3%',width:'100%'}}>搜索结果</p>
        </div>
        <div style={{backgroundColor:'#fff',width:'100%',height:'150px'}} id='result'>
        </div>
      </div>
    )
  }
}
