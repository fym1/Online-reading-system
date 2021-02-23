import React, { Component } from 'react'
import { Popover, NavBar, Icon,Grid,List,Drawer} from 'antd-mobile';
import { returnStatement } from '@babel/types';
const Item = List.Item;
const Brief = Item.Brief;
export default class More extends Component {
    constructor(){
        super();
        this.state={
            scores:[]
        }
    }
    componentDidMount(){
        // 发起请求
        let text = {userPhone:sessionStorage.getItem("user")} //获取数据
        console.log(text);
        let send = JSON.stringify(text);   //重要！将对象转换成json字符串
        fetch(`http://127.0.0.1:3001/users/more/`,{   //Fetch方法y
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            body: send
        })
        .then(res => res.json())
        .then(
            res => {
                this.setState({
                    scores:res
                })
                console.log(res);
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
                    >O币明细
                </NavBar>
                {
                    this.state.scores.map((item,index)=>{   
                        return(
                            <List className="my-list" key={index}>
                                <Item multipleLine extra="+ 10" >
                                    {item.taskContent} 
                                    <Brief>{item.updateTime.slice(0,10)}</Brief>
                                </Item>
                            </List>
                        )                    
                        
                    })
                }
                
            </div>
        )
    }
}
