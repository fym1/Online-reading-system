import React, { Component } from 'react'
import { NavBar ,Progress, List,InputItem,DatePicker,ImagePicker, WingBlank, SegmentedControl,Picker } from 'antd-mobile';
import {createBrowserHistory} from 'history'
const his = createBrowserHistory();
const sex = [
    {
      label:'男',
      value: '男',
    },
    {
      label:'女',
      value: '女',
    }
  ];
export default class Update extends Component {
    constructor(props){
        super(props);
        this.state = {
            userSex: ['男'],
            percent: 0,
            disabled: false,
            users:
                {userName:'',
                userImage:'',
                userBir:'',
                userSign:'',
                userPhone:'',
                userSex: ['男']
            },
            multiple: false,
            files: []
            
        };
        this.nameChange = this.nameChange.bind(this);
        this.sexChange = this.sexChange.bind(this);
        this.birthdayChange = this.birthdayChange.bind(this);
        this.signChange = this.signChange.bind(this);
    }
    componentDidMount(){
        fetch('http://127.0.0.1:3001/users/updateuser')
        .then((res)=>res.json())
        .then((res)=>{
            var data={};
            console.log(res);
            console.log(res[0])
            for(var key in res[0]){
                if(res[0][key]=='-'){
                    data[key]=''
                }else{
                    data[key]=res[0][key];
                }
            }
            console.log(data);
            console.log(typeof(data.userBir))
            let tupian = '';
            (data.userImage=='-')?tupian="http://img2.3png.com/eebe5ef277285d150546fd77d248786d2a9e.png":tupian=data.userImage
            this.setState({
                userSex:[data.userSex],
                users:{
                    userName:data.userName,
                    userImage:data.userImage,
                    userSex:data.userSex,
                    userBir:new Date(data.userBir.slice(0,10)),
                    userSign:data.userSign,
                    userPhone:data.userPhone
                }
            })
        })
    }
    nameChange(e){
        let data=Object.assign({},this.state.users,{userName:e})
        this.setState({
            users:data
        })
    }
    sexChange(e){
        let data=Object.assign({},this.state.users,{userSex:e})
        this.setState({
            users:data
        })
    }
    birthdayChange(e){
        let data=Object.assign({},this.state.users,{userBir:e})
        this.setState({
            users:data
        })
    }
    signChange(e){
        let data=Object.assign({},this.state.users,{userSign:e})
        this.setState({
            users:data
        })
    }
    //图片选择
    onChange = (files, type, index) => {
        console.log(files);
        let data=Object.assign({},this.state.users,{userImage:files[0].url})
        console.log(data);
        this.setState({
            users:data,
            files,
        })
      }
    onSegChange = (e) => {
    const index = e.nativeEvent.selectedSegmentIndex;
    this.setState({
        multiple: index === 1,
    });
    }
    getConnect=()=>{  //api请求函数
        let data=Object.assign({},this.state.users)
        this.setState({
            users:data
        })
        var data1={};
        for(var key in this.state.users){
            if(this.state.users[key]==''){
                data1[key]='-'
            }else{
                data1[key]=this.state.users[key];
            }
        }
        let text = {
            userName:data1.userName,
            userImage:data1.userImage,
            userSex:data1.userSex,
            userBir:data1.userBir,
            userSign:data1.userSign,
            userPhone:data1.userPhone
        }
        let send = JSON.stringify(text);   //重要！将对象转换成json字符串
        console.log(text);
        fetch(`http://127.0.0.1:3001/users/updateuser`,{   //Fetch方法y
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            body: send
            
        })
        .then(res => res.json())
        .then(
            data => {
                if(data.success){
                    window.alert('修改成功');
                }
                else{
                    window.alert('验证失败，用户名或密码错误')
                }
            }
        )
    }
    onChangeColor = (color) => {
        var data = this.state.users;
        data.userSex = color;
        console.log(data);
        this.setState({
            userSex:color,
            users:data
        })
      };
    render() {
        const { files } = this.state;
        return (
            <div style={{width:'100%',height:'736px',backgroundColor:'#fff'}}>
                <NavBar
                mode="dark"
                leftContent="&lt;"
                onLeftClick={()=>window.history.back()}
                style={{backgroundColor:'#EEE3E1',color:'#000',height:'60px'}}
                >编辑资料
                </NavBar>
                <WingBlank>
                    <div style={{width:'100%',height:'100px',margin:'0 auto'}}>
                        <ImagePicker
                            name='userImage'
                            files={files}
                            onChange={this.onChange}
                            onImageClick={(index, fs) => console.log(index, fs)}
                            selectable={files.length < 1}
                            multiple={this.state.multiple}                        
                        />
                    </div>  
                </WingBlank>
                <List style={{marginTop:'20px'}}>
                    <InputItem
                        name='userName'
                        id='userName'
                        title="昵称"
                        placeholder="用户名"
                        clear
                        value={this.state.users.userName}
                        onChange={this.nameChange}
                    >昵称</InputItem>
                    <Picker
                    data={sex}
                    value={this.state.userSex}
                    cols={1}
                    onChange={this.onChangeColor}
                    >
                    <List.Item arrow="horizontal">性别</List.Item>
                    </Picker>
                    <DatePicker
                        mode="date"
                        title="Select Date"
                        // extra={this.state.users.userBir}
                        value={this.state.users.userBir}
                        onChange={this.birthdayChange}
                        >
                        <List.Item arrow="horizontal" name='userBir' id='userBir'>生日</List.Item>
                    </DatePicker>
                    <InputItem
                        name='userSign'
                        id='userSign'
                        title="签名"
                        clear
                        placeholder="介绍下自己吧"
                        value={this.state.users.userSign}
                        onChange={this.signChange}
                    >签名</InputItem>
                </List>
                <button style={{height:'30px',width:'50%',borderRadius:'5px',display: 'block',margin: '0 auto',marginTop:'20px',backgroundColor:'#EEE3E1',border:'none'}} onClick={this.getConnect}>确认</button>
            </div>
        )
    }
}

