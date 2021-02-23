import React, { Component } from 'react'
import { Popover, NavBar, Icon,Grid,List,Drawer} from 'antd-mobile';
import {createBrowserHistory} from 'history'
import './my.css'
const Item1 = List.Item;
const height=document.querySelector('body').offsetHeight;
export default class My extends Component {
  constructor(props){
    super(props);
    const logif =  sessionStorage.getItem("logif") == 'true';
    this.state = {
      visible: false,
      selected: '',
      data1:[
        {class:'iconfont icon-ziyuan',tit:'书籍',num:0,color:'#FF8E14',dan:'本'},
        {class:'iconfont icon-pinglun',tit:'评论',num:0,color:'#67E5FB',dan:'个'},
        {class:'iconfont icon-jifen',tit:'O币',num:0,color:'#DC5A80',dan:'枚'},
      ],
      // 积分排名
      data2:[],
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
  }
  componentDidMount(){
    var nowuser = sessionStorage.getItem("user");
    console.log(nowuser);
    fetch('http://127.0.0.1:3001/users/my')
      .then((res)=>res.json())
      .then((res)=>{
        console.log(res);
        var d0 = [];
        for(var i = 0;i<3;i++){
          (res[i].userImage==null)?res[i].userImage="http://img2.3png.com/eebe5ef277285d150546fd77d248786d2a9e.png":res[i].userImage=res[i].userImage
          d0[i] = res[i];
        }
        this.setState({
          data2:d0
        })
      })
    console.log(this.state.data2);
    if(nowuser==null){
      console.log('未登录');
    }
    else{
      console.log('执行2');
      let text = {phone:nowuser} //获取数据
      console.log(text);
      let send = JSON.stringify(text);   //重要！将对象转换成json字符串
      fetch(`http://127.0.0.1:3001/users/my`,{   //Fetch方法y
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        body: send
      })
      .then(res => res.json())
      .then(
        data => {
          console.log(data);
          var tupian = '';
          this.setState({
            username:data[0].userName,
            touxiang:(data[0].userImage==null)?tupian="http://img2.3png.com/eebe5ef277285d150546fd77d248786d2a9e.png":tupian=data[0].userImage,
            sign:data[0].userSign
          })
        }
      )
    }
    if(sessionStorage.getItem("user") != null || sessionStorage.getItem("logif") == true){
      let userphone = sessionStorage.getItem("user");
      let text = {userPhone:userphone} //获取数据
      let send = JSON.stringify(text);   //重要！将对象转换成json字符串
      fetch(`http://127.0.0.1:3001/users/mybooks`,{   //Fetch方法y
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        body: send
      })
      .then(res => res.json())
      .then(
        data => {
          var data1 = this.state.data1;
          data1[0].num = data.length
          this.setState({
            data1:data1
          }) 
        }
      )
      fetch(`http://127.0.0.1:3001/users/getmypost`,{   //Fetch方法y
        method: 'POST',
        headers: {'Content-Type': 'application/json; charset=utf-8'},
        body: send
      })
      .then(res => res.json())
      .then(
        data => {
          var data2 = this.state.data1;
          data2[1].num = data.length
          this.setState({
            data1:data2
          }) 
        }
      )
      let text1 = {userPhone:sessionStorage.getItem("user")} //获取数据
      let send1 = JSON.stringify(text1);   //重要！将对象转换成json字符串
          fetch(`http://127.0.0.1:3001/users/getmyscore`,{   //Fetch方法y
          method: 'POST',
          headers: {'Content-Type': 'application/json; charset=utf-8'},
          body: send1
      })
      .then(res => res.json())
      .then(
          data => {
            var data3 = this.state.data1;
            data3[2].num = data[0].sum
            this.setState({
              data1:data3
            }) 
          }
      )
    }
    else{
      console.log('未登录');
    }
  }
  onSelect = (opt) => {
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
    this.setState({ open: !this.state.open });
  }
  jump(value){
    this.props.history.push(value)
  }
  jump1(value){
    var aa = localStorage.getItem("aa");
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
  render() {
    return (
      <div style={{backgroundColor:'#fff',width:'100%',height:height}}>
        <NavBar
          mode="dark"
          style={{backgroundColor:'#EEE3E1',color:'#000',height:'60px'}}
        >
          我的
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
              <div className="iconfont icon-icon_fuben"></div>
              <p style={{marginTop:'2px',fontSize:'15px'}}>书城</p>
            </div>
          </div>
          <div className="bottom">
            <div onClick={() => this.jump('/news')} className="kuai">
              <div className="iconfont icon-xiaoxi"></div>
              <p style={{marginTop:'2px',fontSize:'15px'}}>消息</p>
            </div>
          </div>
          <div className="bottom">
            <div onClick={() => this.jump('/my')} className="kuai">
              <div className="iconfont icon-wode" style={{color:'#F54577'}}></div>
              <p style={{marginTop:'2px',fontSize:'15px',color:'#F54577'}}>我的</p>
            </div>
          </div>
        </div>
        <div className='block2'>
          <div>
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
                {/* <div style={{marginTop:'10px'}}>{this.state.sign}</div> */}
                <div style={{height:'25px',width:'50%',border:'1px #F54577 solid',marginTop:'10px',borderRadius:'3px'}}>
                  <div style={{lineHeight:'25px',textAlign:'center'}} onClick={() => this.jump('/updateuser')}>点此完善资料</div>
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
              <div className={this.state.logif?"signin":"touxiang00"}>
                <div onClick={() => this.jump1('/getscore')}>签到领O币</div>
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
                <p style={{color:`${dataItem.color}`}}>{dataItem.num}{dataItem.dan}</p>
                <div style={{color:`${dataItem.color}`}} >
                  {
                    <i className={dataItem.class}></i>
                  }
                </div>
                <p style={{marginLeft:'5%',marginTop:'10%',fontSize:'13px'}}>{dataItem.tit}</p>
              </div>
            )}
          /> 
        </div>
        <div className='block4'>
          <List style={{marginTop:'0px'}}>
            <Item1 extra="查看更多" arrow="horizontal" onClick={() => this.jump('/rank')}>O币排行榜</Item1>
          </List> 
          <Grid data={this.state.data2}
            columnNum={1}
            hasLine={false}
            itemStyle={{height:'50px'}}
            renderItem={dataItem => (
              <div>
                <div style={{height:'30px',width:'30px',borderRadius:'50%',float:"left",overflow:'hidden',marginTop:'-3px',marginLeft:'7%'}}>
                  <img src={dataItem.userImage} alt="暂无" style={{height:'30px',width:'30px',marginTop:'3%',borderRadius:'50%',float:"left",marginLeft:'3%',overflow:'hidden'}}/>
                </div>
                <p style={{float:'left',marginLeft:'20%'}}>{dataItem.userName}</p>
                <p style={{float:'right',marginRight:'15%'}}>{dataItem.sum}枚</p>
              </div>
            )}
          />
        </div>
        {/* <div className='block4'>
          <p style={{fontSize:'20px',textAlign:'center'}}>我的阅读情况</p>
          <div style={{width:'100%',height:'150px'}}>
            <div className='xian'></div>
            <div className='bing'></div>
          </div>
        </div> */}
        <div style={{marginBottom:'80px',width:'100%',height:'350px',marginTop:'20px'}}>
            <List>
              <Item1 onClick={this.logout.bind(this)}>退出登录</Item1>
              <Item1  extra={'当前版本 1.0.0'}>检查更新</Item1>
              <Item1  arrow="horizontal" onClick={() => this.jump('/score')}>去评分</Item1>
              <Item1  arrow="horizontal" onClick={() => this.jump('/personal')}>隐私</Item1>
              <Item1  arrow="horizontal" onClick={() => this.jump('/help')}>帮助反馈</Item1>
              <Item1  arrow="horizontal" onClick={() => this.jump('/about')}>关于我们</Item1>
            </List>
        </div>
      </div>
    )
  }
}
