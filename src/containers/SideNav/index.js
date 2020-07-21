import React, { useState } from 'react';
import 'antd/dist/antd.css';
import '../../styles/SideNav.css'
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  TeamOutlined,
} from '@ant-design/icons';

const {Sider} = Layout;
const { SubMenu } = Menu;

const SiderDemo = props => {
  const { setContent } = props;
  const [ collapsed, setCollapsed ] = useState(false);

  return (
    <div className="LO">
    <Sider className="Slide" collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1" icon={<TeamOutlined/>} onClick={() => setContent("")}>
          Conversaciones
        </Menu.Item>
        <SubMenu key="sub1" icon={<DesktopOutlined/>} title="Iniciar busqueda">
          <Menu.Item key="3" onClick={() => setContent("matchUsers")}>Buscar compañeros</Menu.Item>
          <Menu.Item key="4" onClick={() => setContent("")}>Vivir solo</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<DesktopOutlined/>} title="Propiedades">
          <Menu.Item key="5" onClick={() => setContent("")}>Mis propiedades</Menu.Item>
          <Menu.Item key="6" onClick={() => setContent("")}>Nueva propiedad</Menu.Item>
        </SubMenu>

      </Menu>
    </Sider> 
     
   </div>
  )

}

export default SiderDemo;