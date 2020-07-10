import React, { useState, useEffect } from 'react';
import { Modal, Form, notification } from 'antd';
import Auth from '../../util/Auth';
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
    const [ form ] = Form.useForm();
	const [ response, setResponse ] = useState(null);

    const postSession = data => {
        if (data) {
            let asyncLogIn = new Promise ( async (res,rej) => {
				try {
					let user = await Auth.signIn( data.username, data.password )
					res(user)
				}catch(e){
					rej(e)
				}
			})
			asyncLogIn.then( res => {
				setResponse(res)
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
			toggleVisible(visible)
			localStorage.setItem("session", JSON.stringify(response))
			notification.success({
				message: '¡Bienvenido a Coalquilando!',
				placement: 'bottomLeft'
			});
		}
	}, [response])
    
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

	const toggleVisible = (value) => {
		setVisible(!value);
    };
    
	return (
		<div>
			<span onClick={() => toggleVisible(visible)}> Iniciar sesión </span>
			<CustomizedModal visible={visible} toggleVisible={toggleVisible} />
		</div>
	);
};

export default Login;
