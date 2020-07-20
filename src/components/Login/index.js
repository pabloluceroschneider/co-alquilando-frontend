import React, { useState, useEffect, useContext } from 'react';
import { SessionContext, SIGN_IN } from '../../store'
import { Modal, Form, notification } from 'antd';
import { useHistory } from 'react-router';
import Auth from '../../util/Auth';
import ApiRequest from '../../util/ApiRequest';
import CustomizedForm from '../CustomizedForm';

const loginFields = {
	name: 'login',
	layout: 'vertical',
    btnSubmit: 'Ingresar',
    className: 'login',
	fields: {
		primaries: [
			[
				{
					label: 'Usuario',
					name: 'username',
					component: 'Input',
					required: true
				}
			],
			[
				{
					label: 'Contraseña',
					name: 'password',
					component: 'Input.Password',
					required: true
				}
            ],
            [
				{
					label: 'Olvidé mi Contraseña',
                    component: 'link',
                    href: "#"
                },
                {
					label: '¿No tienes cuenta? ¡Registrate!',
                    component: 'link',
                    href:"/sign-in"
				}
			]
		]
	}
};

const CustomizedModal = (props) => {
	const { dispatch } = useContext(SessionContext);
	const { visible, toggleVisible, signin } = props;
	const history = useHistory();
	const [ form ] = Form.useForm();
	const [ authErr, setAuthErr ] = useState(null);
	const [ user, setUser ] = useState(null);

    const postSession = data => {
		setAuthErr(null)
        if (data) {
            let asyncSignIn = new Promise ( async (res,rej) => {
				try {
					let user = await Auth.signIn( data.username, data.password )
					res(user)
				}catch(e){
					rej(e)
				}
			})
			let asyncGetUser = async user => {
				try {
					let nickname = user.username
					let { data } = await ApiRequest.get(`user/${nickname}`)
					//TODO: Store user in global state
					setUser(data)
				}catch(e) {
					notification.error({
						message: 'No se pudo traer datos del usuario.',
						description: `Servidor de Coalquilando: ${e.message}`,
						placement: 'bottomLeft'
					});
				}
			}
			asyncSignIn.then( user => {
				setAuthErr(null)
				asyncGetUser(user)
			}).catch( e => {
				setAuthErr(e.message)
			})
		}
	}

    useEffect(() => {
        if(user){
			delete user.userPassword;
			dispatch( SIGN_IN(user) )
			notification.success({
				message: '¡Bienvenido a Coalquilando!',
				placement: 'bottomLeft'
			});
			history.push("/userHome")
		}
	}, [user, history, signin])
    
	return (
        <Modal 
			title="Iniciar Sesión" 
			className="loginModal"
            visible={visible} 
            onCancel={toggleVisible} 
			footer={null} 
			destroyOnClose={true}
        >
			<CustomizedForm form={form} data={loginFields} onfinish={postSession}/>
			{ authErr && <span id="authErr">{authErr}</span> }
        </Modal>
	);
};

const Login = () => {
	const [ visible, setVisible ] = useState(false);

	const toggleVisible = () => {
		setVisible(!visible);
    }
    
	return (
		<div>
			<span onClick={() => toggleVisible()}> Iniciar sesión </span>
			<CustomizedModal visible={visible} toggleVisible={toggleVisible}/>
		</div>
	);
};

export default Login;