import React from 'react';
import { Menu } from 'antd';
// const { SubMenu } = Menu;
import Login from '../../components/Login';
import Auth from '../../util/Auth';

class TopNav extends React.Component {
	state = {
		current: 'mail',
		showLogin: false
	};

	handleClick = (e) => {
		this.setState({ current: e.key });
	};

	showLogin = () => {
		this.setState( { showLogin: !this.state.showLogin });
	}

	handleSignOut = async () => {
		await Auth.signOut()
	}

	render() {
		const { current } = this.state;
		return (
			<div className="container topnav">
				<Menu onClick={this.handleClick} selectedKeys={[ current ]} mode="horizontal">
					<Menu.Item key="Inicio">
						<a href="/" rel="noopener noreferrer">
							Inicio
						</a>
					</Menu.Item>
					<Menu.Item key="login">
						<Login />
					</Menu.Item>
					<Menu.Item key="Sing-in">
						<a href="/sign-in" rel="noopener noreferrer">
							Registrate
						</a>
					</Menu.Item>
					<Menu.Item key="logout">
						<div onClick={this.handleSignOut}>
							Log out
						</div>
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
			</div>
		);
	}
}

export default TopNav;
