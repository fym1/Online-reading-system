import React, { Component } from 'react'
import {NavBar,Carousel,SearchBar,Button,Grid} from 'antd-mobile';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
import 'antd/dist/antd.css';
import './market.css'
import { Tabs } from 'antd';
import Qikan from './Qikan';
import Magazine from './Magazine';
import Vision from './Vision';
import Humanities from './Humanities';
import Life from './Life';
import Money from './Money';
import Entertain from './Entertain';
const { TabPane } = Tabs;
export default class Shelf extends Component {
  constructor(props){
    super(props);
    this.state = {
      tabKey:'',
      xiaoxi:[
        {feng:'./images/1.jpg',tit:'评论1',username:'用户名1',tou:'./images/3.jpg'},
        {feng:'./images/2.jpg',tit:'评论2',username:'用户名2',tou:'./images/4.jpg'},
        {feng:'./images/2.jpg',tit:'评论3',username:'用户名3',tou:'./images/4.jpg'},
        {feng:'./images/1.jpg',tit:'评论4',username:'用户名4',tou:'./images/3.jpg'},
        {feng:'./images/1.jpg',tit:'评论1',username:'用户名1',tou:'./images/3.jpg'},
        {feng:'./images/2.jpg',tit:'评论2',username:'用户名2',tou:'./images/4.jpg'},
        {feng:'./images/2.jpg',tit:'评论3',username:'用户名3',tou:'./images/4.jpg'},
        {feng:'./images/1.jpg',tit:'评论4',username:'用户名4',tou:'./images/3.jpg'},
      ],
      lunbo:['1','2','3','4'],
      tui:[],
      tui1:[]
    }
  }
  jump(value){
    this.props.history.push(value)
  }
  jump1(value){
    this.props.history.push({pathname:value,query:{page:this.state.page,shelf:'/market'}})
  }
  onTabChanged = (key) => {
    this.setState({tabKey:key});
    this.props.history.replace({pathname:'/market/' + key, state:{
        tabKey: key
    }});
  }
  changeCity = (e) => {
    window.location.href='http://localhost:3000/search';
  }
  componentDidMount(){
    if(sessionStorage.getItem('last') != null && sessionStorage.getItem('last') != '/'){
      console.log('执行这里了')
      this.props.history.replace({pathname:`${sessionStorage.getItem('last')}`, state:{
        tabKey: sessionStorage.getItem('last').substr(8)
      }});
    }    
    else{
      console.log('上一页')
    }
    var logif =  sessionStorage.getItem("logif");
    console.log(logif);
    fetch('http://127.0.0.1:3001/users/all')
      .then((res)=>res.json())
      .then((res)=>{
        var tuijian = [];
        var tuijian1 = [];
        for(var i = 0;i<3;i++){
          tuijian[i] = res[i];
        }
        for(var k = 3;k<6;k++){
          tuijian1[k-3] = res[k];
        }
        this.setState({
          tui:tuijian,
          tui1:tuijian1
        })
        console.log(this.state.tui1)
        console.log(this.state.tui)

      })
  }
  render() {
    let {url} = this.props.match;
    console.log(this.props.match);
    return (
      <div style={{width:'100%',backgroundColor:'#fff',height:'100%'}}>
        <NavBar
          mode="dark"
          style={{backgroundColor:'#EEE3E1',color:'#000',height:'60px'}}
        >
          书城
        </NavBar>
        <div style={{position:"fixed",zIndex:'999',background:'#EEE3E1',paddingTop:'7px',bottom:"0",width:"100%",height:"60px",borderTop:'1px grey solid'}}>
          <div className="bottom">
            <div onClick={() => this.jump('/')} className="kuai">
              <div className="iconfont icon-wodeshujia" ></div>
              <p style={{marginTop:'2px',fontSize:'15px'}}>书架</p>
            </div>
          </div>
          <div className="bottom">
            <div onClick={() => this.jump('/market')} className="kuai">
              <div className="iconfont icon-icon_fuben" style={{color:'#F54577'}}></div>
              <p style={{marginTop:'2px',fontSize:'15px',color:'#F54577'}}>书城</p>
            </div>
          </div>
          <div className="bottom">
            <div onClick={() => this.jump('/news')} className="kuai">
              <div className="iconfont icon-xiaoxi" ></div>
              <p style={{marginTop:'2px',fontSize:'15px'}}>消息</p>
            </div>
          </div>
          <div className="bottom">
            <div onClick={() => this.jump('/my')} className="kuai">
              <div className="iconfont icon-wode" ></div>
              <p style={{marginTop:'2px',fontSize:'15px'}}>我的</p>
            </div>
          </div>
        </div>
        <div style={{width:'100%',height:'60px',background:'#EEE3E1',borderTop:'1px #bbb solid',borderBottom:'1px #fff solid',padding:'3% 15px 3% 15px'}}>
          <SearchBar 
            style={{width:'80%',height:'100%',background:'white',borderRadius:'15px',float:'left'}}
            placeholder="搜索" 
            // onSubmit={this.changeCity}
            onFocus={this.changeCity}
          /> 
          <Button style={{width:'15%',height:'100%',float:'left',borderRadius:'15px',marginLeft:'5%'}} onClick={() => this.jump('/all')}>
            <p style={{textAlign:'center',fontSize:'15px',marginTop:'-7px'}}>全部</p>
          </Button>
        </div>
        <Tabs 
          activeKey={(this.props.location.state && this.props.location.state.tabKey) ? this.props.location.state.tabKey : ''} 
          onChange={this.onTabChanged}
          className='tabstyle'
        >
          <TabPane tab="推荐" key="">
            <Carousel
              autoplay={true}
              infinite
            >
              {this.state.lunbo.map(val => (
                  <img
                    src={'../images/lunbo'+val+'.jpg'}
                    alt={val}
                    style={{ width: '100%', verticalAlign: 'top' }}
                    key={val}
                  />
              ))}
            </Carousel>
            <div style={{width:'100%',height:'200px',borderTop:'1px grey solid',marginTop:'10px'}}>
              <div style={{width:'100%',height:'35px',borderLeft:'3px #F54577 solid',marginTop:'5px'}}>
                <p style={{fontSize:'20px',color:'#F54577',marginLeft:'5px'}}>主编推荐</p>
              </div>
              <div style={{width:'100%',height:'155px',marginTop:'10px'}}>
                <Grid data={this.state.tui}
                  columnNum={3}
                  hasLine={false}
                  itemStyle={{backgroundColor:'#EEE3E1'}}
                  renderItem={dataItem=>(
                    <img src={dataItem.bookImage} style={{width:'85%',height:'155px'}} onClick={() => this.jump1(`/xiangxi/${dataItem.bookId}`)}/>
                  )}
                />
              </div>
            </div>
            <div style={{width:'100%',height:'200px',borderTop:'1px grey solid',marginTop:'10px',marginBottom:'80px'}}>
              <div style={{width:'100%',height:'35px',borderLeft:'3px #F54577 solid',marginTop:'5px'}}>
                <p style={{fontSize:'20px',color:'#F54577',marginLeft:'5px'}}>经典图书</p>
              </div>
              <div style={{width:'100%',height:'155px',marginTop:'10px'}}>
                <Grid data={this.state.tui1}
                  columnNum={3}
                  hasLine={false}
                  itemStyle={{backgroundColor:'#EEE3E1'}}
                  renderItem={dataItem=>(
                    <img src={dataItem.bookImage} style={{width:'85%',height:'155px'}} onClick={() => this.jump1(`/xiangxi/${dataItem.bookId}`)}/>
                  )}
                />
              </div>
            </div>
          </TabPane>
          <TabPane tab="期刊" key="qikan">
            <Route exact path={`${url}/qikan`} component={Qikan}/>
          </TabPane>
          <TabPane tab="杂志" key="magazine">
            <Route exact path={`${url}/magazine`} component={Magazine}/>
          </TabPane>
          <TabPane tab="vision" key="vision">
            <Route exact path={`${url}/vision`} component={Vision}/>
          </TabPane>
          <TabPane tab="人文" key="humanities">
            <Route exact path={`${url}/humanities`} component={Humanities}/>
          </TabPane>
          <TabPane tab="生活" key="life">
            <Route exact path={`${url}/life`} component={Life}/>
          </TabPane>
          <TabPane tab="经济" key="money">
            <Route exact path={`${url}/money`} component={Money}/>
          </TabPane>
          <TabPane tab="娱乐" key="entertain">
            <Route exact path={`${url}/entertain`} component={Entertain}/>
          </TabPane>
        </Tabs>
      </div>
    )
  }
}