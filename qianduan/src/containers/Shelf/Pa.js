import React, { Component } from 'react'
import { Item } from 'rc-menu';
import {NavLink,Link} from 'react-router-dom';
export default class Pa extends Component {
    constructor(){
        super();
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        let page = this.props.match.params.id;
        console.log('222')
        fetch('http://39.96.77.250/view/readBook?&bookId=2960&chapterId=1')
            .then((res)=>res.json())
            .then((res)=>{
                console.log('111');
                this.setState({
                    data:res.data
                })  
                console.log(res.data)          
            })
            
    }
    更新完毕之后执行
    componentDidUpdate(prevProps,prevState){
        if(prevProps.match.params.id!==this.props.match.params.id){
            let page = this.props.match.params.id
            fetch('https://cnodejs.org/api/v1/topics?page='+page)
                .then((res)=>res.json())
                .then((res)=>{
                    this.setState({
                        data:res.data
                    })                
                })
        }
    }
    render() {
        var list=[];
        for(var i = 1;i<11;i++){
            var j = i-1;
            list[j] = i;
        }
        let {url} = this.props.match
        return (
             <div>
                 <p>全部</p>
                 <div className='all'>
                    {
                        // this.state.data.map((item)=>(
                        //     <div key={item.id} style={{width:'100%',height:'50px',borderTop:'1px solid gray',padding:'10px'}}>
                        //         <img src={item.author.avatar_url} className='img1'/>
                        //         <p className='second'>{item.reply_count}/{item.visit_count}</p>
                        //         <div className='jing'>全部</div>
                        //         <Link to={`/fym/${item.id}`} className='first'>{item.title}</Link>
                        //         {/* <p className='first'>{item.title}</p> */}
                        //         <br></br>
                        //         <p className='third'>1小时前</p>   
                        //         <img src={item.author.avatar_url} className='img2'/>
                        //         <div>

                        //         </div>
                        //     </div>
                        // ))
                    }
                 </div>                
                 <div className='page'>
                    {
                        // list.map((item)=>(
                        //     <div key={item} style={{float:'left',width:'30px',height:'30px',border:'1px #ddd solid',padding:'4px',textAlign:'center',backgroundColor:'transparent'}}>
                        //         <NavLink activeStyle={
                        //             {background:'red',
                        //             color:'#fff'}
                        //         } to={'/home/all/'+item}>{item}</NavLink>
                        //     </div>
                        // ))
                    }
                 </div>
                 
                
             </div>
        );
    }
}
