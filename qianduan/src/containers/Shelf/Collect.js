import React, { Component } from 'react'
import { PickerView, NavBar,Grid} from 'antd-mobile';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './shelf.css'
const height=document.querySelector('body').offsetHeight;

export default class Collect extends Component {
  constructor(props){
    super(props);
    this.state = {
      value:undefined,
      classes:[
        {label:'按阅读进度分类',value:'按阅读进度分类'},
        {label:'按加入书架时间分类',value:'按加入书架时间分类'},
        {label:'按最近阅读分类',value:'按最近阅读分类'},
      ],
      ben:3,
      menu:(
        <Menu>
          <Menu.Item>
            <p style={{height:'10px'}} onClick={() => this.classes('readplan')}>
              按阅读进度分类
            </p>
          </Menu.Item>
          <Menu.Item>
            <p style={{height:'10px'}} onClick={() => this.classes('addshelf')}>
              按加入书架时间分类
            </p>
          </Menu.Item>
          <Menu.Item>
            <p style={{height:'10px'}} onClick={() => this.classes('readlast')}>
              按最近阅读分类
            </p>
          </Menu.Item>
        </Menu>
      ),
      list:[
        {bookname:'主角',feng:'./images/2.jpg',writer:'陈彦',category:'文化',wordnum:65.3,ifend:'已完结',postshelf:'2021-1-12',plan:60},
        {bookname:'主角',feng:'./images/2.jpg',writer:'陈彦',category:'文化',wordnum:65.3,ifend:'已完结',postshelf:'2021-1-12',plan:60},
        {bookname:'主角',feng:'./images/2.jpg',writer:'陈彦',category:'文化',wordnum:65.3,ifend:'已完结',postshelf:'2021-1-12',plan:60},
        {bookname:'主角',feng:'./images/2.jpg',writer:'陈彦',category:'文化',wordnum:65.3,ifend:'已完结',postshelf:'2021-1-12',plan:60},
        {bookname:'主角',feng:'./images/2.jpg',writer:'陈彦',category:'文化',wordnum:65.3,ifend:'已完结',postshelf:'2021-1-12',plan:60},
        {bookname:'主角',feng:'./images/2.jpg',writer:'陈彦',category:'文化',wordnum:65.3,ifend:'已完结',postshelf:'2021-1-12',plan:60},

      ]
    }
    this.onChange = value => {
      this.setState({
        value,
      });
    };
  }
  componentDidMount(){
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
        for(var j =0; j<data.length; j++){
          var subdate = String(data[j].subDate).slice(0,10);
          data[j].subDate = subdate;
        }
        this.setState({
          list:data,
          ben:data.length
        }) 
        console.log(data);
      }
    )
  }
  class(){
    console.log('111')
  }
  classes(value){
    console.log(value)
  }
  del(value){
    let text1 = {userPhone:sessionStorage.getItem("user"),bookId:value} //获取数据
    let send1 = JSON.stringify(text1);   //重要！将对象转换成json字符串
    fetch(`http://127.0.0.1:3001/users/delbook`,{   //Fetch方法y
      method: 'POST',
      headers: {'Content-Type': 'application/json; charset=utf-8'},
      body: send1
    })
    .then(res => res.json())
    .then(
      data => {
        console.log(data);
        window.location.reload()
      }
    )
  }
  render() {
    return (
      <div style={{width:'100%',height:height,backgroundColor:'#EEE3E1'}}>
        <NavBar
          mode="dark"
          leftContent="&lt;"
          onLeftClick={()=>window.location.href='/'}
          style={{backgroundColor:'#EEE3E1',color:'#000',height:'60px',borderBottom:'1px gray solid'}}
          >我的书架
        </NavBar>
        <div style={{width:'100%',height:'40px',padding:'0px'}}>
          {/* <div style={{border:'1px gray solid',width:'90px',height:'40px',padding:'7px 10px 7px 10px',borderRadius:'5px',backgroundColor:'#fff',float:'left',marginLeft:'10px'}}>
            <Dropdown overlay={this.state.menu} trigger={['click']}>
              <a className="ant-dropdown-link" onClick={this.class.bind(this)}>
                点我分类<DownOutlined />
              </a>
            </Dropdown>
          </div> */}
          <div style={{float:'right',marginRight:'20px',fontSize:'18px',marginTop:'5px',height:'20px'}}>共{this.state.ben}本</div>
        </div>
        <Grid data={this.state.list}
          columnNum={1}
          itemStyle={{height:'180px',width:'100%',backgroundColor:'#EEE3E1'}}
          renderItem={dataItem=>(
            <div style={{marginTop:'0px',backgroundColor:'#fff',width:'100%',height:'100%'}}>
              <div style={{width:'30%',float:'left',height:'100%'}}>
                <img src={dataItem.bookImage} style={{width:'80%',height:'80%',marginLeft:'5%',marginTop:'10%'}}/>
              </div>
              <div style={{width:'35%',float:'left',height:'100%'}}>
                <p className='word2'>{dataItem.bookName}</p>
                <p className='word1'>作者：{dataItem.bookWriter?dataItem.bookWriter:'暂无'}</p>
                <p className='word1'>类别：{dataItem.bookType}</p>
                <p className='word1'>上线日期：{dataItem.bookDate}</p>
                <p className='word1'>订阅日期：{dataItem.subDate}</p>
              </div>
              <div style={{width:'25%',float:'left',height:'100%',paddingTop:'11%'}}>
                <p className='word4'>已完结</p>
              </div>
              <div style={{width:'10%',float:'left',height:'100%'}}>
                <div className="iconfont icon-shanchu" id="del" style={{width:'100%',marginTop:'9px',marginRight:'-100%'}} onClick={() => this.del(dataItem.bookId)}></div>
              </div>
            </div>
          )}
        />
      </div>
    )
  }
}