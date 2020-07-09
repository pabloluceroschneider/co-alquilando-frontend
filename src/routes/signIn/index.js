import React, { useState, useEffect } from 'react'
import { Form, notification } from 'antd';
import { useHistory } from 'react-router-dom';
import CustomizedForm from '../../components/CustomizedForm';
import { ApiRequest } from '../../util/ApiRequest';
import ContentWrapper from '../../components/ContentWrapper';
import { Auth } from 'aws-amplify';

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
					component: "Input"
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

const usePostProperty = fields => {
	const [ response, setResponse ] = useState(null)
	useEffect(() => {
		if (fields){

			// AWS Cognito Integration
			let asyncCognito = async () => {
				let awsData = { email: fields.userEmail, password: fields.userPassword };
				console.log("fields -->", fields)
				try {
					const signUpResponse = await Auth.signUp({
						username: fields.userNickname,
						password: fields.userPassword,
						attributes: {
							email: fields.userEmail
						}
					})
					console.log("signUpResponse -->", signUpResponse)
				} catch (error) {
					console.log(error)
				}
			}
			let bodyReq = fields
			delete bodyReq.userConfirmEmail
			delete bodyReq.userConfirmPassword
			let asyncPost = async() => {
				try{
					let ok = await ApiRequest.post("/user", bodyReq);
					setResponse(ok)
				}catch(e){
					notification.error({
						message: `Error: ${e.message}`,
						placement: 'bottomLeft'
					});
				}
			}
			asyncCognito()
			asyncPost()
		}
	}, [fields])
	return response;
}

const SignIn = () => {
	const [ fields, setFields ] = useState(null)
	const [form]= Form.useForm();
	const history = useHistory();
	let property = usePostProperty(fields)
	
	useEffect( () => {
		if(property){
			console.log(property)
			notification.success({
				message: `Usuario registrado`,
				placement: 'bottomLeft'
			});
			history.push('/');
		}
	},[property, history])

	return (
		<ContentWrapper header footer>
			<CustomizedForm form={form} data={userData} onfinish={setFields} />
		</ContentWrapper>
	);

};

export default SignIn;
