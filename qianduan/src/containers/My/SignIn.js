import React, { Component } from 'react'
import {WhiteSpace,NavBar,Toast,Button,List} from 'antd-mobile'
import {createBrowserHistory} from 'history'
import { con } from './context';
import { is } from '@babel/types';
const his = createBrowserHistory();
const Item = List.Item;
export default class SignIn extends Component {
    constructor(props){
        super(props);
        const isClick = localStorage.getItem("click")
        this.state = {
            score:0,
            isClick:isClick,
            username:'',
            taskId:'',
            taskContent:'',
            phone:'',
            img:'',
            logif:true
        }
    }
    successToast=()=> {       
        // const isClick = this.state.isClick;
        const isClick = localStorage.getItem("click");
        localStorage.setItem("aa",false)
        localStorage.setItem("click",false)
        console.log(isClick);
        console.log(typeof(isClick));
        if (isClick=="true") {   //如果为true 开始执行
            Toast.success('签到成功，积分+10', 1);
            let s = this.state.score;
            s=s+10;
            this.setState({
                score:s,
                taskId:1,
                taskContent:'签到'    
            })
            this.setState({ isClick: false })   //将isClick 变成false，将不会执行处理事件
            const that = this   // 为定时器中的setState绑定this
            const now = new Date().getHours();
            const now1 = new Date().getMinutes();
            const now2 = new Date().getSeconds();
            const hour = (23-now)*60*60*1000;
            const minutes = (59-now1)*60*1000;
            const seconds = (60-now2)*1000;
            const time = hour+minutes+seconds;
            // localStorage.setItem('click',that.state.isClick);
            let text = {userName:this.state.username,updateTime:new Date(),taskId:1,taskContent:'签到',taskScore:10,phone:sessionStorage.getItem("user")} //获取数据
            let send = JSON.stringify(text);   //重要！将对象转换成json字符串
            fetch(`http://127.0.0.1:3001/users/getscore`,{   //Fetch方法y
                method: 'POST',
                headers: {'Content-Type': 'application/json; charset=utf-8'},
                body: send
            })
            .then(res => res.json())
            .then(
                data => {
                    if(data.success){
                        console.log('aaa')
                    }
                    else{
                        window.alert('失败')
                    }
                }
            )
            setTimeout(function () {       // 设置延迟事件，1秒后将执行
                that.setState({ isClick: true })   // 将isClick设置为true
                localStorage.setItem('click',true);
            }, time);
        }
        else{
            Toast.fail('今日已签到，明日再来叭', 1);
            // Toast.success('今日已签到，明日再来叭', 1);
        }
    }
    jump1(value){
        this.props.history.push(value);
        let s = this.state.score;
        s=s+10;
        this.setState({
            score:s 
        })
        let text = {userName:this.state.username,updateTime:new Date(),taskId:1,taskContent:'去读书',taskScore:10,phone:sessionStorage.getItem("user")} //获取数据
        console.log(text);
        let send = JSON.stringify(text);   //重要！将对象转换成json字符串
        fetch(`http://127.0.0.1:3001/users/getscore`,{   //Fetch方法y
                method: 'POST',
                headers: {'Content-Type': 'application/json; charset=utf-8'},
                body: send
            })
            .then(res => res.json())
            .then(
                data => {
                    if(data.success){
                        console.log('aaa')
                    }
                    else{
                        window.alert('失败')
                    }
                }
            )
    }
    jump2(value){
        this.props.history.push(value);
        let s = this.state.score;
        s=s+10;
        this.setState({
            score:s 
        })
        let text = {userName:this.state.username,updateTime:new Date(),taskId:1,taskContent:'去添加书籍',taskScore:10,phone:sessionStorage.getItem("user")} //获取数据
        let send = JSON.stringify(text);   //重要！将对象转换成json字符串
        fetch(`http://127.0.0.1:3001/users/getscore`,{   //Fetch方法y
                method: 'POST',
                headers: {'Content-Type': 'application/json; charset=utf-8'},
                body: send
            })
            .then(res => res.json())
            .then(
                data => {
                    if(data.success){
                        console.log('aaa')
                    }
                    else{
                        window.alert('失败')
                    }
                }
            )
    }
    componentDidMount(){
        let text1 = {userPhone:sessionStorage.getItem("user")} //获取数据
        let send1 = JSON.stringify(text1);   //重要！将对象转换成json字符串
            fetch(`http://127.0.0.1:3001/users/getmyscore`,{   //Fetch方法y
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            body: send1
        })
        .then(res => res.json())
        .then(
            res => {
                console.log(res)
                let tupian = '';
                (res[0].userImage==null)?tupian="http://img2.3png.com/eebe5ef277285d150546fd77d248786d2a9e.png":tupian=res[0].userImage
                this.setState({
                    username:res[0].userName,
                    score:res[0].sum,
                    phone:res[0].userPhone,
                    img:tupian
                })
            }
        )
    }
    render() {
        return (
            <div>
                <NavBar
                    mode="dark"
                    leftContent="&lt;"
                    onLeftClick={()=>window.history.back()}
                    style={{backgroundColor:'#EEE3E1',color:'#000',height:'60px'}}
                    >签到领O币
                </NavBar>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <div style={{float:'left',width:'20%',marginLeft:'10%'}}>
                    <div style={{width:'60px',height:'60px',borderRadius:'50%',marginLeft:'auto',marginRight:'auto'}}>
                        <img src={this.state.img} style={{width:'60px',height:'60px',borderRadius:'50%',marginLeft:'auto',marginRight:'auto',overflow:'hidden'}}/>                       
                    </div>
                    <p style={{textAlign:'center'}}>{this.state.username}</p>
                </div>  
                <div style={{marginLeft:'40%',marginTop:'20px'}}>
                    <div style={{fontSize:'20px'}}>{this.state.score}枚</div>
                    <button style={{fontSize:'8px',color:'#708090',border:'none'}} onClick={()=>window.location.href='/more'}>O币></button>
                </div>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <WhiteSpace></WhiteSpace>
                <List renderHeader={() => '每日任务'} className="my-list">
                    <div onClick={this.successToast}>
                        <Item >每日签到</Item>
                    </div>                    
                    <Item extra="去读书" arrow="horizontal" onClick={() => this.jump1('/')}>阅读期刊</Item>
                    <Item extra="去添加书籍" arrow="horizontal" onClick={() => this.jump2('/')}>添加书籍</Item>
                </List>
            </div>
        )
    }
}
