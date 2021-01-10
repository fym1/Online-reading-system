import React, { Component } from 'react'
import { List, InputItem, WingBlank, WhiteSpace, Button, Toast,NavBar } from 'antd-mobile';
import {createBrowserHistory} from 'history'
import './my.css'
// import {con} from './context'
const his = createBrowserHistory();
export default class Login extends Component {
    constructor(props){
        super(props);
        this.state = {
            phone:'',
            password:'',
        }
    }
    register(){
        console.log(this.props);
        //跳转到注册页面
        this.props.history.push('/register')
    }
    handleChange(key, val) {
        this.setState({
            [key]: val
        })
    }

    submit(){
        // this.getConnect();
        this.props.history.push('/shelf')
    }

    // getConnect(){  //api请求函数
    //     let text = {phone:this.state.phone,password:this.state.password} //获取数据
    //     let send = JSON.stringify(text);   //重要！将对象转换成json字符串
    //     fetch(`http://127.0.0.1:8001/login`,{   //Fetch方法y
    //         method: 'POST',
    //         headers: {'Content-Type': 'application/json; charset=utf-8'},
    //         body: send
    //     })
    //     .then(res => res.json())
    //     .then(
    //         data => {
    //             if(data.success){
    //                 sessionStorage.setItem("user",text.phone);
    //                 sessionStorage.setItem("logif",true);
    //                 Toast.success('登录成功，即将跳转到我的页面', 1);
    //                 his.push('/my')
    //                 window.location.reload();
    //             }
    //             else{
    //                 Toast.fail('手机号或密码错误，请重新登录', 1);
    //             }
    //         }
    //     )
    // }
    componentDidMount(){
        sessionStorage.setItem("logif",false);
    }
    ifshow=()=>{
        var submitObj = document.getElementById('password');
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
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <div style={{backgroundColor:"#fff",width:'75%',margin:'0 auto',overflow:'auto',opacity:'0.7',borderRadius:'20px',border:'1px #000 solid',marginTop:'170px'}}> 
                    <List style={{width:'90%',float:'left'}}>
                        <InputItem onChange={value => this.handleChange('phone', value)} type='text' name='phone' id='phone'>用户名：</InputItem>
                    </List>                
                </div>
                <div style={{backgroundColor:"#fff",width:'75%',margin:'0 auto',overflow:'auto',opacity:'0.7',borderRadius:'20px',border:'1px #000 solid',marginTop:'20px'}}> 
                    <List style={{width:'90%',float:'left'}}>
                        <InputItem onChange={value => this.handleChange('password', value) }type='password' name="password" id="password">密码：</InputItem>                       
                    </List>                
                </div>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <WingBlank>
                    <Button type="primary" onClick={this.submit.bind(this)} style={{backgroundColor:"#000",width:'50%',margin:'0 auto',overflow:'auto',opacity:'0.5',borderRadius:'15px',border:'1px #000 solid'}}>
                        登录
                    </Button>
                </WingBlank>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <p onClick={this.register.bind(this)} style={{marginLeft:'20%',float:'left'}}>去注册</p>
                <p onClick={this.register.bind(this)} style={{marginRight:'20%',float:'right'}}>忘记密码</p>
                
            </div>
        )
    }
}

