import React, { useState } from 'react';
import { connect } from 'react-redux';
import Login from '../../components/Login';
import Auth from '../../util/Auth';
import logo from '../../assets/images/Logomenu.jpg'
import { Layout, Menu, Dropdown } from 'antd';
import { useHistory } from 'react-router';


const Header = (props) => {

  const { signout } = props
  const [current, setCurrent] = useState('Inicio');
  const history = useHistory();

  const handleSignOut = async () => {
    await Auth.signOut();
    await signout();
    localStorage.removeItem('user');
    history.push("/")
  };

  const { SubMenu } = Menu;
  const { Header } = Layout;

  const menu = (
    <Menu onClick={e => setCurrent(e.key)} selectedKeys={[current]} mode="horizontal">

      {props.user ? (
        <Menu.Item key="perfil">
          <a href={`/profile/${props.user.userNickname}`} rel="noopener noreferrer">
            Perfil
      </a>
        </Menu.Item>
      ) : (
          <Menu.Item key="Sing-in">
            <a href="/sign-in" rel="noopener noreferrer">
              Registrate
      </a>
          </Menu.Item>)}
    {props.user ? (
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);

