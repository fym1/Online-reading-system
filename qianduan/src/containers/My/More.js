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
        fetch('http://localhost:8001/more')
        .then((res)=>res.json())
        .then((res)=>{
            this.setState({
                scores:res
            })
            console.log(res);
        })
        
    }
    render() {
        return (
            <div>
                <NavBar
                    mode="dark"
                    leftContent="&lt;"
                    onLeftClick={()=>window.history.back()}
                    style={{backgroundColor:'#EEE3E1',color:'#000',height:'60px'}}
                    >积分明细
                </NavBar>
                {
                    this.state.scores.map((item)=>{   
                        return(
                            <List className="my-list" key={item}>
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
