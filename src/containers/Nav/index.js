import React, { useEffect, useContext } from 'react';
import { SessionContext, SIGN_OUT } from '../../store'
import { Menu, Avatar, Badge, Dropdown } from 'antd';
import { LogoutOutlined, BellOutlined, TeamOutlined } from '@ant-design/icons';
import Login from '../../components/Login';
import Auth from '../../util/Auth';

const Ring = () => {
	useEffect(() => { return () => { new AbortController().abort(); } })
	return (
		<Badge>
			<BellOutlined />
		</Badge>
	);
};

const Nav = () => {
	const { state, dispatch } = useContext(SessionContext);

	const image = (state.user && state.user.photos) ? 
	`http://localhost:8080/user/${state.user.id}/photos/${state.user.photos}` :
  	"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

	const profileSignedIn = (
		<Menu>
			<Menu.Item key="0">
				<a rel="noopener noreferrer" href="/my-profile">
					Mi Perfil
					</a>
			</Menu.Item>
			<Menu.Item key="1">
				<a rel="noopener noreferrer" href="/my-properties">
					Mis Propiedades
					</a>
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item key="3" onClick={async () => {
				await Auth.signOut;
				dispatch(SIGN_OUT())
			}
			}>
				<LogoutOutlined /> Cerrar Sesión
				</Menu.Item>
		</Menu>
	);

	return (
		<ul className="principalNav">
			<li>
				<a href="/">CoAlquilando</a>
			</li>
			{state?.user ? (

				<>
					<li style={{ float: 'right' }}>
						<Dropdown overlay={profileSignedIn} placement="bottomRight" trigger="click">
							<a rel="noopener noreferrer" className="ant-dropdown-link" href="/">
								<Avatar size={30} src={image} />
							</a>
						</Dropdown>
					</li>
					<li style={{ float: 'right' }}>
						<a href="/notifications">
							<Ring />
						</a>
					</li>
					<li style={{ float: 'right' }}>
						<a href="/groups">
							<TeamOutlined />
						</a>
					</li>
				</>) :
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