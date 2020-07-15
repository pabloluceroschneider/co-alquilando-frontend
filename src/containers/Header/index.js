import React from 'react';
import 'antd/dist/antd.css';
import '../../styles/Header.css'
import '../../assets/Icons/Icon/styles.css'
import logo from '../../assets/images/Logomenu.jpg'
import { Layout, Menu, Breadcrumb,Dropdown} from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined,DownOutlined } from '@ant-design/icons';


const Header = () => {
  
  
  const { SubMenu } = Menu;
  const { Header, Content, Footer, Sider } = Layout;

   const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
          Perfil
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
          Propiedades
        </a>
      </Menu.Item>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
          Otra cosa que pinte
        </a>
      </Menu.Item>
      <Menu.Item danger>Cerrar Sesion</Menu.Item>
    </Menu>)


 return(
  <Layout>
    <Header className="header">
      <div className="logo">
        <img src={logo} className="imglogo" ></img>
      </div>
      <Dropdown overlay={menu}>
    <a className="ant-dropdown-link drop" onClick={e => e.preventDefault()}>
      <label className="icon-align-justify menu"/>
    </a>
     </Dropdown>
    </Header>
  </Layout>
  
  )
}

export default Header;

