import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'antd';
import CustomizedForm from '../CustomizedForm';
import { ApiRequest } from '../../util/ApiRequest'

const loginFields = {
	name: 'login',
	layout: 'vertical',
    btnSubmit: 'Ingresar',
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
            ],
            [
				{
					label: 'Olvidé mi Contraseña',
                    component: 'link',
                    href: "/"
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
