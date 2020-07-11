import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { Form, notification } from 'antd';
import Auth from '../../util/Auth';
import ApiRequest from '../../util/ApiRequest';
import ContentWrapper from '../../components/ContentWrapper';
import CustomizedForm from '../../components/CustomizedForm';
import calcAge from '../../util/CalculateAge';

const userData = {
	name: 'user',
	layout: 'vertical',
	btnSubmit: 'Registrarse',
	fields: {
		primaries: [
			[
				{
					label: "Nombre de usuario",
					name: "userNickname",
					component: "Input",
					required: true
				}
			],
			[
				{
					label: "Nombre",
					name: "userName",
					component: "Input",
					required: true
				},
				{
					label: "Apellido",
					name: "userSurname",
					component: "Input",
					required: true
				}
			],
			[
				{
					label: "Email",
					name: "userEmail",
					component: "Input",
					required: true
				},
				{
					label: "Confirme Email",
					name: "userConfirmEmail",
					component: "Input",
					required: true,
					dependencies:['userEmail'],
					hasFeedback: true,
					validate: ({ getFieldValue }) => ({
						validator(rule, value) {
						  if (!value || getFieldValue('userEmail') === value) {
							return Promise.resolve();
						  }
						  return Promise.reject('Los emails no coinciden!');
						},
					  }),
				}
			],
			[
				{
					label: "Contraseña",
					name: "userPassword",
					component: "Input.Password",
					required: true
				},
				{
					label: "Confirme contraseña",
					name: "userConfirmPassword",
					component: "Input.Password",
					required: true,
					dependencies:['userPassword'],
					hasFeedback: true,
					validate: ({ getFieldValue }) => ({
						validator(rule, value) {
						  if (!value || getFieldValue('userPassword') === value) {
							return Promise.resolve();
						  }
						  return Promise.reject('Las constraseñas no coinciden!');
						},
					  }),
				}
			],
			[
				{
					label: "Fecha de Nacimiento",
					name: "userBirthDate",
					component: "DatePicker",
					dependencies:['userBirthDate'],
					validate: ({getFieldValue}) => ({
						validator() {
							let userBirthDate = getFieldValue("userBirthDate")
							let age = calcAge(userBirthDate)
						    if(age < 18){
								return Promise.reject('Debes ser mayor de 18 años');
							}else if(age > 100){
								return Promise.reject('Edad no permitida');
							}else{
								return Promise.resolve()
							}
						},
					  }),
				},				
				{
					label: "Número de Celular",
					name: "userPhone",
					component: "Input"
				}
			]
		],
		secondaries: [
			[
				{
					label: "Documento de Identidad",
					name: "userDni",
					component: "Input",
				},
				{
					label: "Sexo",
					name: "userSex",
					component: "Select",
					options : [
						{ name: "Femenino", value: "FEMALE"},
						{ name: "Masculino", value: "MALE"},
						{ name: "Otro", value: "NOT_DEFINED"}
					]
				}
			],
			[
				{
					label: "Nacionalidad",
					name: "userNationality",
					component: "Input",
				},
				{
					label: "Ciudad",
					name: "userCity",
					component: "Input",
				}
			],
			[
				{
					label: "Descripción Personal",
					name: "userDescription",
					component: "Input.TextArea",
				},
				{
					label: "Cargar Imagen",
					name: "userPhoto",
					component: "Upload",
				}
			]

		]
	}
};

const usePostUser = bodyReq => {
	const [ user, setUser ] = useState(null)
	useEffect(() => {
		if (bodyReq){
			let asyncAuth = new Promise ( async (res, rej) => {
				try {
					let user = await Auth.signUp( bodyReq.userNickname, bodyReq.userPassword, bodyReq.userEmail )
					res(user)
				}catch(e){
					rej(e)
				}
			})
			let asyncPost = async () => {
				try{
					delete bodyReq.userConfirmPassword;
					delete bodyReq.userConfirmEmail;
					let ok = await ApiRequest.post("/user", bodyReq);
					setUser(ok)
				}catch(e){
					notification.error({
						message: 'Error al almacenar usuario ',
						description: `Api Error: ${e.message}`,
						placement: 'bottomLeft'
					});
				}
			}
			asyncAuth.then( user => {
				asyncPost()
			}).catch( e => {
				notification.error({
					message: 'Error al crear usuario ',
					description: `Cognito: ${e.message}`,
					placement: 'bottomLeft'
				});
			})
		}
	}, [bodyReq])
	return [user];
}

const SignIn = () => {
	const [ fields, setFields ] = useState(null)
	const history = useHistory();
	const [ form ] = Form.useForm();
	const [ user ] = usePostUser(fields)
	
	useEffect( () => {
		if(user){
			notification.success({
				message: `Usuario registrado`,
				placement: 'bottomLeft'
			});
			history.push('/');
		}
	},[user, history])

	return (
		<ContentWrapper header footer>
			<CustomizedForm form={form} data={userData} onfinish={setFields} />
		</ContentWrapper>
	);

};

export default SignIn;
