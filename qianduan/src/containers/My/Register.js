import React, {Component} from 'react'
import {List, InputItem, WingBlank, WhiteSpace, Button, Toast,NavBar} from 'antd-mobile'
import {createBrowserHistory} from 'history';
const his = createBrowserHistory();
class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            phone:'',
            password:'',
            repwd: '', // 确认密码
            type: 'worker', // 用户类型 默认求职者
            trueNum:"",
            checkNum:"点击输入验证码"
        }
    }
     /*
    *     去登录
    * */
   handleGoLogin() {
    this.props.history.push('/')
    }
    /*
    *     绑定表单值
    * */
    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }
    /**
     * 登录验证
     */
    submit(){
        this.getConnect();
        // window.alert(this.state.phone)
        // window.alert(this.state.password)
    }
    componentDidMount(){
        var myDate = new Date();
        console.log(myDate);
    }
    getConnect(){ //api请求函数
        var myDate = new Date();
        console.log(myDate);       
        let text = {phone:this.state.phone,password:this.state.password,repwd:this.state.repwd,Uday:myDate} //获取数据
        let send = JSON.stringify(text);   //重要！将对象转换成json字符串
        console.log(this.state.checkNum);
        if(this.state.checkNum==""){
            Toast.fail('验证码不能为空', 1);
        }else if(this.state.checkNum == this.state.trueNum){
            fetch(`http://127.0.0.1:8001/register`,{   //Fetch方法y
                method: 'POST',
                headers: {'Content-Type': 'application/json; charset=utf-8'},
                body: send
            })
            .then(res => res.json())
            .then(
                data => {
                    if(data.success==true){                    
                        Toast.success('注册成功，即将跳转到登录页面', 1);
                        his.push('/login');
                        window.location.reload();
                    }
                    else if(data.success==false){
                        Toast.fail('两次输入密码不一致或该用户已存在', 1);
                    }
                }
            )
        }
    }
    getcode(){
        console.log('111');
        function random(max,min){
          return Math.round(Math.random()*(max-min)+min);
        }
        var strData = "";
        for(var i=0;i<5;i++){
          var num = random(0,9);//生成0-9的随机数
          var az = String.fromCharCode(random(97,122));//生成a-z
          strData = strData + num + az
        }
        //从随机字符库中随机取4个
        var str = "";
        for(var i=0;i<4;i++){
          str = str + strData[random(0,strData.length-1)];
        }
        console.log(str);
        this.setState({
          checkNum:str
        })
    }
    ifshow=()=>{
        var submitObj = document.getElementById('password');
        if(submitObj.type=='password'){
            submitObj.type = 'text'
        }else if(submitObj.type=='text'){
            submitObj.type = 'password'
        }
        
    }
    ifshow1=()=>{
        var submitObj = document.getElementById('repwd');
        if(submitObj.type=='password'){
            submitObj.type = 'text'
        }else if(submitObj.type=='text'){
            submitObj.type = 'password'
        }
        
    }
    render() {
        return (
            <div className="page-register">
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                {/* <div style={{backgroundColor:"#fff",width:'90%',margin:'0 auto',overflow:'auto',opacity:'0.7'}}>
                    <List style={{width:'90%',float:'left'}}>
                        <InputItem onChange={value => this.handleChange('phone', value)} type='text' name='phone' id='phone'>手机号</InputItem>
                        <InputItem onChange={value => this.handleChange('password', value) }type='password' name="password" id="password">密码</InputItem>
                        <InputItem onChange={value => this.handleChange('repwd', value)} type='password' name='repwd' id='repwd'>确认</InputItem>
                        <InputItem onChange={value => this.handleChange('username', value)} type='text' name='username' id='username'>用户名</InputItem>
                        <InputItem onChange={value => this.handleChange('checkNum', value)} type='password' name='yanzheng' id='yanzheng'>验证码</InputItem>
                    </List>
                    <i className='icon-changyongicon- iconfont' style={{height:'30px',width:'30px',float:'left',marginTop:'55px'}} onClick={this.ifshow}></i>
                    <i className='icon-changyongicon- iconfont' style={{height:'30px',width:'30px',float:'left',marginTop:'15px'}} onClick={this.ifshow1}></i>
                </div> */}
                <div style={{backgroundColor:"#fff",width:'75%',margin:'0 auto',overflow:'auto',opacity:'0.7',borderRadius:'20px',border:'1px #000 solid',marginTop:'50px'}}> 
                    <List style={{width:'90%',float:'left'}}>
                        <InputItem onChange={value => this.handleChange('username', value)} type='text' name='username' id='username'>用户名</InputItem>
                    </List>                
                </div>
                <div style={{backgroundColor:"#fff",width:'75%',margin:'0 auto',overflow:'auto',opacity:'0.7',borderRadius:'20px',border:'1px #000 solid',marginTop:'20px'}}> 
                    <List style={{width:'90%',float:'left'}}>
                        <InputItem onChange={value => this.handleChange('password', value) }type='password' name="password" id="password">密码</InputItem>
                    </List>                
                </div>
                <div style={{backgroundColor:"#fff",width:'75%',margin:'0 auto',overflow:'auto',opacity:'0.7',borderRadius:'20px',border:'1px #000 solid',marginTop:'20px'}}> 
                    <List style={{width:'90%',float:'left'}}>
                        <InputItem onChange={value => this.handleChange('repwd', value)} type='password' name='repwd' id='repwd'>确认</InputItem>
                    </List>                
                </div>
                <div style={{backgroundColor:"#fff",width:'75%',margin:'0 auto',overflow:'auto',opacity:'0.7',borderRadius:'20px',border:'1px #000 solid',marginTop:'20px'}}> 
                    <List style={{width:'90%',float:'left'}}>
                        <InputItem onChange={value => this.handleChange('phone', value)} type='text' name='phone' id='phone'>手机号</InputItem>
                    </List>                
                </div>
                <div style={{backgroundColor:"#fff",width:'75%',margin:'0 auto',overflow:'auto',opacity:'0.7',borderRadius:'20px',border:'1px #000 solid',marginTop:'20px'}}> 
                    <List style={{width:'90%',float:'left'}}>
                        <InputItem onChange={value => this.handleChange('checkNum', value)} type='password' name='yanzheng' id='yanzheng'>验证码</InputItem>
                    </List>                
                </div>
                <div style={{backgroundColor:"#fff",width:'75%',margin:'0 auto',overflow:'auto',opacity:'0.7',borderRadius:'20px',border:'1px #000 solid',marginTop:'20px'}}> 
                    <Button onClick={this.getcode.bind(this)}>{this.state.checkNum}</Button>
                </div>
                <WingBlank> 
                    <Button type="primary" onClick={this.handleGoLogin.bind(this)} style={{backgroundColor:"#000",width:'30%',float:'left',overflow:'auto',opacity:'0.5',borderRadius:'15px',border:'1px #000 solid',marginTop:'20px',marginLeft:'10%'}}>返回</Button>
                </WingBlank>
                <WingBlank> 
                    <Button type="primary" onClick={this.handleGoLogin.bind(this)} style={{backgroundColor:"#000",width:'30%',float:'right',overflow:'auto',opacity:'0.5',borderRadius:'15px',border:'1px #000 solid',marginTop:'20px',marginRight:'10%'}}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}

export default Register