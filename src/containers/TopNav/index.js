import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'antd';
// const { SubMenu } = Menu;
import Login from '../../components/Login';
import Auth from '../../util/Auth';

const TopNav = props => {
	const { signout } = props
	const [ current, setCurrent ] = useState('Inicio');

	const handleSignOut = async () => {
		await Auth.signOut();
		signout();
		localStorage.removeItem('user');
	};

	return (
		<div className="container topnav">
			<Menu onClick={ e => setCurrent(e.key) } selectedKeys={[ current ]} mode="horizontal">
				<Menu.Item key="Inicio">
					<a href="/" rel="noopener noreferrer">
						Inicio
					</a>
				</Menu.Item>
				<Menu.Item key="Sing-in">
					<a href="/sign-in" rel="noopener noreferrer">
						Registrate
					</a>
				</Menu.Item>
				{props.user ? (
					<Menu.Item key="Sign-out">
						<div onClick={handleSignOut}>Log out</div>
					</Menu.Item>
					) : (
					<Menu.Item key="Login">
						<Login />
					</Menu.Item>
				)}
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

const mapStateToProps = (state) => ({
	user: state.user
});

const mapDispatchToProps = (dispatch) => ({
	signout() {
		dispatch({
			type: 'SIGN_OUT',
			payload: null
		});
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
