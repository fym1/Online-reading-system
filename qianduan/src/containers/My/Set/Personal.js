import React, { Component } from 'react'
import { NavBar,Accordion, Icon,Grid,List,Drawer} from 'antd-mobile';
export default class Personal extends Component {
    render() {
        return (
            <div style={{marginBottom:'100px'}}>
                <NavBar
                    mode="dark"
                    leftContent="&lt;"
                    onLeftClick={()=>window.history.back()}
                    style={{backgroundColor:'#EEE3E1',color:'#000',height:'60px'}}
                    >隐私
                </NavBar>
                <div style={{textAlign:'left',padding:'0 10px'}}>
                <h2 style={{textAlign:'center'}}>隐私保护协议 </h2> 
                <h4>&nbsp;&nbsp;&nbsp;&nbsp;非常重视对您隐私的保护，在您使用提供的服务前，请您仔细阅读如下声明。 </h4>
                <h4>&nbsp;&nbsp;&nbsp;&nbsp;为了给您提供更准确、更有针对性的服务，可能会以如下方式，使用您提供的个人信息。  </h4>
                <h4>您提供的相关信息  </h4>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;会在您自愿选择服务或提供信息的情况下收集您的个人信息，将这些信息进行整合并对这些信息进行专业的分析、利用，以便向您提供更好的用户服务。请您在注册时及时、详尽及准确地提供个人资料，并不断更新注册资料，符合及时、详尽、准确的要求。如果因注册信息不真实而引起的问题，由您自行承担相应的后果。请您不要将您的帐号、密码转让或出借予他人使用。如您发现您的帐号遭他人非法使用，应立即通知。因黑客行为或用户的保管疏忽导致帐号、密码遭他人非法使用，不承担法律责任。</p>  
                <h4>您的使用操作  </h4>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;当您使用的服务时，服务器会自动记录一些信息，包括URL、IP地址、浏览器的类型和使用的语言以及访问日期和时间等。</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;会以高度负责的态度对待这些信息，在未征得您许可的情况下，绝不会将这些信息对外公开或向第三方提供，但下列情况除外： </p> 
                <p>&nbsp;&nbsp;&nbsp;&nbsp;(1)事先获得您的授权;  </p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;(2)只有透露您的个人资料，才能提供你所要求的产品和服务; </p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;(3)根据有关的法律法规要求;  </p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;(4)按照相关政府主管部门的要求; </p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;(5)为维护的合法权益。  </p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;(6)可能会与第三方合作向用户提供相关的网络服务，在此情况下，如该第三方同意承担与同等的保护用户隐私的责任，则可将用户的注册资料等提供给该第三方。  </p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;(7)我们需要向代表我们提供产品或服务的公司提供资料(除非我们另行向您请求并获得您的同意，否则这些公司无权使用)  </p>
                <h4>隐私权政策的修订  </h4>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;可能会对隐私权政策进行修改，以便于提供更优质可靠的服务。 </p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;问题与建议  如果您还有其他问题和建议，请告知我们。致力保护您的隐私，竭诚为您提供高品质服务</p>
                </div>
            </div>
        )
    }
}
