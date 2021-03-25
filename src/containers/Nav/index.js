import React, { useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import { SessionContext, SIGN_OUT } from '../../store'
import { Menu, Avatar, Badge, Dropdown } from 'antd';
import { LogoutOutlined, BellOutlined, TeamOutlined } from '@ant-design/icons';
import Login from '../../components/Login';
import Auth from '../../util/Auth';
import logo from '../../assets/images/logonav.png'

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
	`http://localhost:8080/user/${state.user.id}/photos/${state.user.photos[0]}` :
  	"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";

	const profileSignedIn = (
		<Menu>
			<Menu.Item key="0">
				<Link to="/my-profile" replace>
					Mi Perfil
				</Link>
			</Menu.Item>
			<Menu.Item key="1">
				<Link to="/my-properties">
					Mis Propiedades
				</Link>
			</Menu.Item>
			<Menu.Item key="2">
				<Link to="/reports">
					Mis Reportes
				</Link>
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
				<Link to="/">
					<img className="logo" src={logo} alt="CoAlquilando"></img>
				</Link>
			</li>
			{state?.user ? (
				<>
					<li style={{ float: 'right' }}>
						<Dropdown overlay={profileSignedIn} placement="bottomRight" trigger="click">
							<Link to="/" >
								<div className="ant-dropdown-link">
									<span className="userName">{state?.user.userName}</span>
									<Avatar size={30} src={image} />
								</div>
							</Link>
						</Dropdown>
					</li>
					<li style={{ float: 'right' }}>
						<Link to="/notifications" >
							<Ring />
						</Link>
					</li>
					<li style={{ float: 'right' }}>
						<Link to="/groups">
							<TeamOutlined />
						</Link>
					</li>
				</>) :
				<>
					<li style={{ float: 'right' }}>
						<Login />
					</li>
				</>
			}
		</ul>
	);
};

export default Nav;