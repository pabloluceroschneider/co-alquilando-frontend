import React, { useState, useEffect } from 'react';
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
	const { visible, toggleVisible } = props;
	const history = useHistory();
    const [ form ] = Form.useForm();
	const [ response, setResponse ] = useState(null);

    const postSession = data => {
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
					setResponse(data)
				}catch(e) {
					notification.error({
						message: 'No se pudo traer datos del usuario.',
						description: `Servidor de Coalquilando: ${e.message}`,
						placement: 'bottomLeft'
					});
				}
			}
			asyncSignIn.then( user => {
				asyncGetUser(user)
			}).catch( e => {
				notification.error({
					message: 'Error iniciar sesión',
					description: `Cognito: ${e.message}`,
					placement: 'bottomLeft'
				});
			})
        }
    }

    useEffect(() => {
        if(response){
			localStorage.setItem("userData", JSON.stringify(response))
			notification.success({
				message: '¡Bienvenido a Coalquilando!',
				placement: 'bottomLeft'
			});
			history.push("/user/profile")
		}
	}, [response, history])
    
	return (
        <Modal 
            title="Iniciar Sesión" 
            visible={visible} 
            onCancel={toggleVisible} 
			footer={null} 
			destroyOnClose={true}
        >
			<CustomizedForm form={form} data={loginFields} onfinish={postSession}/>
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
			<span onClick={() => toggleVisible(visible)}> Iniciar sesión </span>
			<CustomizedModal visible={visible} toggleVisible={toggleVisible} />
		</div>
	);
};

export default Login;
