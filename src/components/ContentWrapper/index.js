import React from 'react';
import CustomHeader from '../../containers/Header';
import Footer from '../../containers/Footer';
import CustomSideNav from '../../containers/SideNav';
import { Layout} from 'antd';
import '../../styles/ContentWrapper.css'

const {Content} = Layout;

const ContentWrapper = props => {
    return (
        <Layout>

        { props.header ? <CustomHeader /> : null }
        <Layout>
        { props.sideNav ? <CustomSideNav /> : null } 
        <Content
           className="site-layout-background" >
            {props.children}
         </Content>
         
       
        </Layout>
        { props.footer ? <Footer /> : null }
        </Layout>
    )
}

export default ContentWrapper;