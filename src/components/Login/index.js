import React, { useState, useEffect } from 'react';
import { Modal, Form, notification } from 'antd';
import CustomizedForm from '../CustomizedForm';
import { ApiRequest } from '../../util/ApiRequest'

const loginFields = {
	name: 'login',
	layout: 'vertical',
	className: 'login',
	fields: {
		primaries: [
			[
				{
					label: 'Email',
					name: 'email',
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
			]
		]
	}
};

const CustomizedModal = (props) => {
	const { visible, toggleVisible, onSubmit } = props;
    const [ form ] = Form.useForm();
    
	return (
		<Modal title="Iniciar Sesión" visible={visible} okText="Registrarse" cancelText="Cancelar" onOk={onSubmit} onCancel={toggleVisible} okButtonProps={{ color: 'red' }}>
			<CustomizedForm form={form} data={loginFields}/>
            <div className="links-login">
                <a href="/" rel="noopener noreferrer">Olvidé mi contraseña</a>
                <a href="/sign-in" rel="noopener noreferrer">¿No tienes cuenta? ¡Registrate!</a><br />
            </div>
        </Modal>
	);
};

const Login = () => {
    const [ visible, setVisible ] = useState(false);
	const [ response, setResponse ] = useState(null);

	const toggleVisible = (value) => {
		setVisible(!value);
    };
    
    const postSession = data => {
        console.log("data -->", data)
        if (data) {
            let asyncPost = async () => {
                await ApiRequest.post('/auth', data).then( res => {
                    setResponse(res.data);
                }).catch( err => {
                    setResponse(err);
                })
                }
            asyncPost();
        }
    }

    useEffect(() => {
        if(response){
            localStorage.setItem("session", response)
        }
    }, [response])

	return (
		<div>
			<span onClick={() => toggleVisible(visible)}> Iniciar sesión </span>
			<CustomizedModal visible={visible} onSubmit={postSession} toggleVisible={toggleVisible} />
		</div>
	);
};

export default Login;
