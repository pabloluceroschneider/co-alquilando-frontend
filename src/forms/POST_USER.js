import { regex } from 'uuidv4';
import calcAge from '../util/CalculateAge';

const userFields = {
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
					required: true,
					validate: ({getFieldValue}) => ({
						validator() {
							let userNickname = getFieldValue("userNickname")

							let result_space = userNickname.split(" ")
							if(result_space.length > 1){
								return Promise.reject('No debe contener espacios');
							}

							let regexp = /[^a-zA-Z0-9-/]/
							let result_special_chart = regexp.test(userNickname)
							console.log("result reg", result_special_chart)
							if(result_special_chart){
								return Promise.reject('No debe contener caracteres especiales');
							}

							return Promise.resolve()
						},
					  }),
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
					required: true,
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
					label: "Sexo",
					name: ["attributes","sex"],
					component: "Select",
					options : [
						{ name: "Femenino", value: "FEMALE"},
						{ name: "Masculino", value: "MALE"},
						{ name: "Otro", value: "NOT_DEFINED"}
					],
					required: true,
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
					label: "Número de Celular",
					name: "userPhone",
					component: "Input"
				}				
			],
			[
				{
					label: 'Nacionalidad',
					name: [ 'attributes', 'nationality' ],
					component: 'SelectDB',
					endpoint: '/nationality/all',
					search: 'nationality'
				},
				// {
				// 	label: "Provincia ()",
				// 	name: ["attributes","city"],
				// 	component: "Select",
				// 	options: provinces
				// }
			],
			[
				{
					label: "Descripción Personal",
					name: "userDescription",
					component: "Input.TextArea",
				}
			]

		]
	}
};

export default userFields