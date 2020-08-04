import React, { useState, useEffect, useContext } from 'react';
import { SessionContext, SIGN_OUT } from '../../store'
import { Menu, Avatar, Badge, Dropdown } from 'antd';
import { LogoutOutlined, BellOutlined, TeamOutlined } from '@ant-design/icons';
import Login from '../../components/Login';
import Auth from '../../util/Auth';

let not = [
	{ id: 1123, type: 'GROUP_SEND_INVITATION', from: 12312123213, to: 12312123123 },
	{ id: 4123, type: 'GROUP_SEND_INVITATION', from: 12312123213, to: 12312123123 },
	{ id: 5123, type: 'GROUP_SEND_INVITATION', from: 12312123213, to: 12312123123 },
	{ id: 5161, type: 'GROUP_SEND_INVITATION', from: 12312123213, to: 12312123123 },
	{ id: 2314, type: 'GROUP_SEND_INVITATION', from: 12312123213, to: 12312123123 }
];

const getNotifications = () => {
	return not.map((t) => {
		return (
			<Menu.Item key={t.id}>
				<a rel="noopener noreferrer" href="/notifications">
					{t.type}
				</a>
			</Menu.Item>
		);
	});
};
const notificationList = (
	<Menu>
		{getNotifications()}
		<Menu.Divider />
		<Menu.Item key="3">Mostrar más</Menu.Item>
	</Menu>
);



const Ring = () => {
	const [ count, setCount ] = useState(0);
	setTimeout(() => { setCount(1);}, 3000);
	useEffect( () => { return () => { new AbortController().abort();}})
	return (
		<Badge count={count}>
			<BellOutlined />
		</Badge>
	);
};

const Nav = () => {
	const { state, dispatch } = useContext(SessionContext);

	const profileSignedIn = (
		<Menu>
			<Menu.Item key="0">
					<a rel="noopener noreferrer" href="/profile">
						Mi Perfil
					</a>
				</Menu.Item> 
				<Menu.Item key="1">
					<a rel="noopener noreferrer" href="/my-properties">
						Mis Propiedades
					</a>
				</Menu.Item>
				<Menu.Divider />
				<Menu.Item key="3" onClick={ async () => {
					await Auth.signOut;
					dispatch( SIGN_OUT() )}
					}>
					<LogoutOutlined /> Cerrar Sesión
				</Menu.Item>
		</Menu>
	);

	return (
		<ul className="principalNav">
			<li>
				<a href="/">Coalquilando</a>
			</li>
			{ state?.user ? (

			<>
				<li style={{ float: 'right' }}>
					<Dropdown overlay={ profileSignedIn } placement="bottomRight" trigger="click">
						<a rel="noopener noreferrer" className="ant-dropdown-link" href="/">
							<Avatar size={30} />
						</a>
					</Dropdown>
				</li>
				<li style={{ float: 'right' }}>
					<Dropdown overlay={notificationList} placement="bottomRight" trigger="click">
						<a rel="noopener noreferrer" className="ant-dropdown-link" href="/">
							<Ring />
						</a>
					</Dropdown>
				</li>
				<li style={{ float: 'right' }}>
					<a href="/groups">
						<TeamOutlined />
					</a>
				</li>
			</>):
			<>
				<li style={{ float: 'right' }}>
					<span className="no-link">
						<Login />
					</span>
				</li>
				<li style={{ float: 'right' }}>
					<a href="/sign-in">
						Registrarse
					</a>
				</li>
			</>
			}
		</ul>
	);
};

export default Nav;