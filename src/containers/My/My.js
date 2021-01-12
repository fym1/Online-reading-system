import React, { Component } from 'react'
import { Popover, NavBar, Icon,Grid,List,Drawer} from 'antd-mobile';
import {createBrowserHistory} from 'history'
import './my.css'
const his = createBrowserHistory();
const Item = Popover.Item;
const myImg = src => <img src={`https://gw.alipayobjects.com/zos/rmsportal/${src}.svg`} className="am-icon am-icon-xs" alt="" />;
const Item1 = List.Item;
const times = 0;
export default class My extends Component {
  constructor(props){
    super(props);
    console.log("初始化")
    const logif =  sessionStorage.getItem("logif") == 'true';
    this.state = {
      visible: false,
      selected: '',
      data1:[
        {class:'iconfont icon-ziyuan',tit:'书籍',num:6,color:'#FF8E14',dan:'本'},
        {class:'iconfont icon-pinglun',tit:'评论',num:36,color:'#67E5FB',dan:'个'},
        {class:'iconfont icon-jifen',tit:'积分',num:100,color:'#DC5A80',dan:'分'},
      ],
      // 积分排名
      data2:[
        {class:'iconfont icon-changyongtubiao-xianxingdaochu-zhuanqu-',tit:'用户名1',img:'',score:0,color:'#A0522D '},
        {class:'iconfont icon-changyongtubiao-xianxingdaochu-zhuanqu-',tit:'用户名2',img:'',score:0,color:'#C0C0C0'},
        {class:'iconfont icon-changyongtubiao-xianxingdaochu-zhuanqu-',tit:'用户名3',img:'',score:0,color:'#F4A460'}
      ],
      //抽屉
      open: true,
      username:'',
      first:{},
      second:{},
      third:{},
      touxiang:'',
      logif:logif,
      sign:''
    };
    console.log(this.state.logif)
  }
  componentDidMount(){
    console.log(this.state.logif);
    fetch('http://localhost:8001/my')
    .then((res)=>res.json())
    .then((res)=>{
      console.log(res);
      var d0=[];
      if(res.length<=4){
        for(var i = 1;i<res.length;i++){
          var tupian = '';
          (res[i].Uimage=='-')?tupian="http://img2.3png.com/eebe5ef277285d150546fd77d248786d2a9e.png":tupian=res[i].Uimage
          d0[i-1] = Object.assign({},this.state.data2[0],{tit:res[i].userName},{score:res[i].sum},{img:tupian})
        }
      }else{
        for(var i = 1;i<4;i++){
          var tupian = '';
          (res[i].Uimage=='-')?tupian="http://img2.3png.com/eebe5ef277285d150546fd77d248786d2a9e.png":tupian=res[i].Uimage
          d0[i-1] = Object.assign({},this.state.data2[0],{tit:res[i].userName},{score:res[i].sum},{img:tupian})
        }
      }
      console.log(d0);
      var tu = '';
      (res[0].Uimage=='-')?tu="http://img2.3png.com/eebe5ef277285d150546fd77d248786d2a9e.png":tu=res[0].Uimage
      this.setState({
        username:res[0].userName,
        data2:d0,
        touxiang:tu,
        sign:res[0].Usign
      })
    })
  }
  onSelect = (opt) => {
    // console.log(opt.props.value);
    this.setState({
      visible: false,
      selected: opt.props.value,
    });
  };
  handleVisibleChange = (visible) => {
    this.setState({
      visible,
    });
  };
  onOpenChange = (...args) => {
    console.log(args);
    this.setState({ open: !this.state.open });
  }
  jump(value){
    this.props.history.push(value)
  }
  jump1(value){
    var aa = localStorage.getItem("aa");
    console.log(aa);
    var bb = aa==null?true:false
    localStorage.setItem("click",bb)
    this.props.history.push(value)
  }
  logout(){
    this.setState({logif:false})
    sessionStorage.removeItem('user');
    sessionStorage.setItem("logif",false);
    localStorage.removeItem('aa');
    localStorage.removeItem('click');
  }
  jumpShelf() {
    this.props.history.push('/shelf')
  }
  jumpMarket() {
    this.props.history.push('/market')
  }
  jumpNews() {
    this.props.history.push('/news')
  }
  jumpMy() {
    this.props.history.push('/my')
  }
  render() {
    return (
      <div style={{backgroundColor:'#fff',width:'100%',height:'100%'}}>
        <NavBar
          mode="dark"
          style={{backgroundColor:'#EEE3E1',color:'#000',height:'60px'}}
        >
          我的
        </NavBar>
        <div style={{position:"fixed",zIndex:'999',background:'#EEE3E1',paddingTop:'20px',bottom:"0",width:"100%",height:"60px"}}>
          <div className="bottom">
            <div onClick={this.jumpShelf.bind(this)} className="kuai">
              <div className="iconfont icon-wodeshujia-copy"></div>
              <p style={{marginTop:'18px',fontSize:'17px'}}>书架</p>
            </div>
          </div>
          <div className="bottom">
            <div onClick={this.jumpMarket.bind(this)} className="kuai">
              <div className="iconfont icon-icon_fuben"></div>
              <p style={{marginTop:'18px',fontSize:'17px'}}>书城</p>
            </div>
          </div>
          <div className="bottom">
            <div onClick={this.jumpNews.bind(this)} className="kuai">
              <div className="iconfont icon-xiaoxi"></div>
              <p style={{marginTop:'18px',fontSize:'17px'}}>消息</p>
            </div>
          </div>
          <div className="bottom">
            <div onClick={this.jumpMy.bind(this)} className="kuai">
              <div className="iconfont icon-wode" style={{color:'#F54577'}}></div>
              <p style={{marginTop:'18px',fontSize:'17px',color:'#F54577'}}>我的</p>
            </div>
          </div>
        </div>
        <div className='block2'>
          <div style={{width:'100%'}}>
            <div>
              <div style={{float:'left',width:'20%'}}>
                <div style={{width:'60px',height:'60px',borderRadius:'50%',marginLeft:'auto',marginRight:'auto',overflow:'hidden',float:'left'}}>
                  <div>{this.state.logif}</div>
                  <img src={this.state.touxiang} className={this.state.logif?"touxiang0":"touxiang00"}/>
                  <img src="http://img2.3png.com/eebe5ef277285d150546fd77d248786d2a9e.png" className={this.state.logif?"touxiang00":"touxiang0"}/>
                </div>
                {/* <p style={{float:'left',marginLeft:'10%'}}>{this.state.username}</p> */}
              </div>  
              <div className={this.state.logif?'personal1':'personal2'}>
                <div style={{marginTop:'5px'}}>{this.state.username}</div>
                <div style={{marginTop:'10px'}}>{this.state.sign}</div>
                <div style={{height:'20px',width:'50%',border:'1px blue solid',marginTop:'10px'}}>
                  <div style={{lineHeight:'20px'}} onClick={() => this.jump('/updateuser')}>点此完善资料</div>
                </div>
              </div>
              <div className={this.state.logif?'personal2':'personal0'}>
                <div className='deng0'>
                  <div style={{lineHeight:'20px'}} onClick={() => this.jump('/login')}>点击登录</div>
                </div>
                <div className='deng0'>
                  <div style={{lineHeight:'20px'}} onClick={() => this.jump('/register')}>点击注册</div>
                </div>
              </div>
              <div className={this.state.logif?"qiandao":"touxiang00"}>
                <div onClick={() => this.jump1('/getscore')} >签到领积分></div>
              </div>
            </div>
          </div>     
        </div>
        <div className='block3'>
          <Grid data={this.state.data1}
            columnNum={3}
            hasLine={false}
            itemStyle={{height:'100px',marginLeft:'5%'}}
            renderItem={dataItem => (
              <div>
                <p style={{marginLeft:'5%',color:`${dataItem.color}`}}>{dataItem.num}{dataItem.dan}</p>
                <div style={{marginTop:'20%',color:`${dataItem.color}`}} >
                  {
                    <i className={dataItem.class}></i>
                  }
                </div>
                <p style={{marginLeft:'5%',marginTop:'20%'}}>{dataItem.tit}</p>
              </div>
            )}
          />
        </div>
        <div className='block4'>
          <List style={{marginTop:'0px'}}>
            <Item1 extra="查看更多" arrow="horizontal" onClick={() => this.jump('/rank')}>积分排行榜</Item1>
          </List> 
          <Grid data={this.state.data2}
            columnNum={1}
            hasLine={false}
            itemStyle={{height:'50px'}}
            renderItem={dataItem => (
              <div>
                <div style={{marginTop:'3%',float:'left',color:`${dataItem.color}`,height:'30px',width:'30px'}}>
                  {
                    <i className={dataItem.class} style={{height:'30px',width:'30px',float:'left'}}></i>
                  }
                </div>
                <div style={{height:'30px',width:'30px',marginTop:'3%',borderRadius:'50%',float:"left",marginLeft:'3%',overflow:'hidden',marginLeft:'5%',marginTop:'7px'}}>
                  <img src={dataItem.img} alt="暂无" style={{height:'30px',width:'30px',marginTop:'3%',borderRadius:'50%',float:"left",marginLeft:'3%',overflow:'hidden'}}/>
                </div>
                <p style={{float:'left',marginLeft:'10%'}}>{dataItem.tit}</p>
                <p style={{float:'right',marginRight:'15%'}}>{dataItem.score}分</p>
              </div>
            )}
          />
        </div>
        <div className='block4'>
          <p style={{fontSize:'20px',textAlign:'center'}}>我的阅读情况</p>
          <img src=""/>
        </div>
        <div className='block1' style={{marginBottom:'100px'}}>
            <List>
              <Item1 onClick={this.logout.bind(this)}>退出登录</Item1>
              <Item1  arrow="horizontal" onClick={() => this.jump('/setup')}>设置</Item1>
              <Item1  arrow="horizontal" onClick={() => this.jump('/help')}>帮助反馈</Item1>
              <Item1  arrow="horizontal" onClick={() => this.jump('/about')}>关于我们</Item1>
            </List>
        </div>
      </div>
    )
  }
}
