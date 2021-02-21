import React, { Component } from 'react'
import { NavBar} from 'antd-mobile';
import Rate from './Rate'
import './Rate.css'

export default class Score extends Component {
    render() {
        return (
            <div className='all'>
                <NavBar
                    mode="dark"
                    leftContent="&lt;"
                    onLeftClick={()=>window.history.back()}
                    style={{backgroundColor:'#EEE3E1',color:'#000',height:'60px'}}
                    >评分
                </NavBar>
                <p style={{height:'40px',fontSize:'22px',textAlign:'center'}}>用过我们的软件，</p>
                <p style={{height:'40px',fontSize:'22px',textAlign:'center'}}>你的感受如何，</p>
                <p style={{height:'40px',fontSize:'22px',textAlign:'center'}}>请留下你最真实的感受吧！</p>
                <div style={{height:'40px',width:'80%',textAlign:'center',margin:'0 auto'}}>
                <Rate number={10} def={5} />

                </div>

            </div>
        )
    }
}
