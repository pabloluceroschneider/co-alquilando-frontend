import React from 'react';
import 'antd/dist/antd.css';
import { Menu } from 'antd';
import './index.css'
const { SubMenu } = Menu;

class App extends React.Component {
  state = {
    current: 'mail',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };

  render() {
    const { current } = this.state;
    return (
      <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
        <Menu.Item key="Inicio">
        <a href="/" rel="noopener noreferrer">
            Inicio
          </a>
        </Menu.Item>
        <Menu.Item key="login">
          <a href="/login"  rel="noopener noreferrer">
            Iniciar Sesion
          </a>
        </Menu.Item>
        <Menu.Item key="Sing-in">
        <a href="/sign-in"  rel="noopener noreferrer">
            Registrate
          </a>
        </Menu.Item>
        {/* <SubMenu title="Navigation Three - Submenu">
          <Menu.ItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </Menu.ItemGroup>
        </SubMenu> */}
      </Menu>
    );
  }
}

export default App;