import React, { Component } from 'react'
import { Popover, NavBar, Icon,Grid,List,Drawer} from 'antd-mobile';
import { returnStatement } from '@babel/types';
const Item = List.Item;
const Brief = Item.Brief;
export default class Rank extends Component {
    constructor(){
        super();
        this.state={
            scores:[]
        }
    }
    componentDidMount(){
        // 发起请求
        fetch('http://127.0.0.1:3001/users/rank')
        .then((res)=>res.json())
        .then((res)=>{
            var d0 = [];
            for(var i = 0;i<res.length;i++){
                var tupian = '';
                (res[i].userImage==null)?tupian="http://img2.3png.com/eebe5ef277285d150546fd77d248786d2a9e.png":tupian=res[i].userImage
                d0[i] = Object.assign({},res[i],{userImage:tupian})
            }
            this.setState({
                scores:d0
            })
            console.log(d0);
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
                    >O币排行榜
                </NavBar>
                <Grid data={this.state.scores}
                    columnNum={1}
                    hasLine={false}
                    itemStyle={{height:'50px'}}
                    renderItem={dataItem => (
                        <div>
                            <div style={{height:'30px',width:'30px',marginTop:'3%',borderRadius:'50%',float:"left",marginLeft:'3%',overflow:'hidden',marginLeft:'5%',marginTop:'7px'}}>
                                <img src={dataItem.userImage} alt='该用户暂时没有设置头像' style={{height:'30px',width:'30px',marginTop:'3%',borderRadius:'50%',float:"left",marginLeft:'3%',overflow:'hidden'}}/>
                            </div>
                            <p style={{float:'left',marginLeft:'10%'}}>{dataItem.userName}</p>
                            <p style={{float:'right',marginRight:'15%'}}>{dataItem.sum}分</p>
                        </div>
                    )}
                />
                
            </div>
        )
    }
}
