import React, { useState, useContext } from 'react';
import { SessionContext, SIGN_OUT } from '../../store'
import Login from '../../components/Login';
import Auth from '../../util/Auth';
import logo from '../../assets/images/Logomenu.jpg'
import { Layout, Menu, Dropdown } from 'antd';
import { useHistory } from 'react-router';


const Header = (props) => {
	const { state, dispatch } = useContext(SessionContext);
  const [current, setCurrent] = useState('Inicio');
  const history = useHistory();

  const handleSignOut = async () => {
    await Auth.signOut();
    dispatch( SIGN_OUT() );
    history.push("/")
  };

  const { SubMenu } = Menu;
  const { Header } = Layout;

  const menu = (
    <Menu onClick={e => setCurrent(e.key)} selectedKeys={[current]} mode="horizontal">

      {state.user ? (
        <Menu.Item key="perfil">
          <a href={`/profile/${state.user.userNickname}`} rel="noopener noreferrer">
            Perfil
      </a>
        </Menu.Item>
      ) : (
          <Menu.Item key="Sing-in">
            <a href="/sign-in" rel="noopener noreferrer">
              Registrate
      </a>
          </Menu.Item>)}
    {state.user ? (
        <Menu.Item key="Sign-out">
          <div onClick={handleSignOut}>Cerrar Sesion</div>
        </Menu.Item>
      ) : (
          <Menu.Item key="Login">
            <Login />
          </Menu.Item>
        )}

    </Menu>)


  return (
    <Layout>
      <Header className="header">
        <div onClick={()=>{history.push("/")}} className="logo">
          <img src={logo} className="imglogo" ></img>
        </div>
        {props.user ? (
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link drop" onClick={e => e.preventDefault()}>
            <label className="icon-user menu"> {props.user.userNickname}</label>
          </a>
        </Dropdown>
        ):(<Dropdown overlay={menu}>
          <a className="ant-dropdown-link drop" onClick={e => e.preventDefault()}>
            <label className="icon-user menu"></label>
          </a>
        </Dropdown>)
        }
      </Header>
    </Layout>

  )
}

export default Header;

