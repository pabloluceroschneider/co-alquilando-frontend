import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import '../../styles/SideNav.css'
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout className="LO">
        <Sider className="Slide" collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<TeamOutlined/>}>
              Conversaciones
            </Menu.Item>
            <SubMenu key="sub1" icon={<DesktopOutlined/>} title="Iniciar busqueda">
              <Menu.Item key="3">Buscar compañeros</Menu.Item>
              <Menu.Item key="4">Vivir solo</Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<DesktopOutlined/>} title="Propiedades">
              <Menu.Item key="5">Mis propiedades</Menu.Item>
              <Menu.Item key="6">Nueva propiedad</Menu.Item>
            </SubMenu>
  
          </Menu>
        </Sider>
      </Layout>
    );
  }
}

export default SiderDemo;