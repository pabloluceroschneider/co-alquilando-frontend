import React from 'react';
import CustomizedForm from '../../components/CustomizedForm';

const userForm = {
	name: 'user',
	layout: 'vertical',
	fields: {
		primaries: [
			[
				{
					label: "Nombre",
					name: "userName",
					component: "Input",
					required: true
				},
				{
					label: "Apellido",
					name: "userSurName",
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
					required: true
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
					required: true
				}
			],
			[
				{
					label: "Fecha de Nacimiento",
					name: "userBirthDate",
					component: "DatePicker",
					required: true
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
					options : ["Femenino","Masculino","Otros"]
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

		],
		tertiaries: [
			[
				{
					label: "Documento de Identidad",
					name: "userDni",
					component: "CheckBox",
				},
				{
					label: "Sexo",
					name: "userSex",
					component: "Select",
					options : ["Femenino","Masculino","Otros"]
				},
				{
					label: "Cargar Imagen",
					name: "userPhoto",
					component: "Upload",
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
				},
				{
					label: "Descripción Personal",
					name: "userDescription",
					component: "TextArea",
				},
				
			]
		]
	}
};

const SignIn = () => {
	return (
			<CustomizedForm form={userForm} />
	);
};

export default SignIn;
