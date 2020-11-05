import provinces from "../util/provinces";

const userData = {
	name: 'user',
	layout: 'vertical',
	btnSubmit: 'Actualizar Datos',
	btnDelete: 'Eliminar perfil',
	titleDelete: 'Eliminar perfil',
	deleteContentModal:
		"¿Desea eliminar este perfil de usuario? Si selecciona 'Aceptar', no podrá recuperar su cuenta.",
	fields: {
		primaries: [
			[
				{
					label: 'Nombre',
					name: 'userName',
					component: 'Input',
					required: true
				},
				{
					label: 'Apellido',
					name: 'userSurname',
					component: 'Input',
					required: true
				}
			],
			[
				{
					label: 'Email',
					name: 'userEmail',
					component: 'Input',
					required: true
				},
				{
					label: 'Confirme Email',
					name: 'userConfirmEmail',
					component: 'Input',
					required: true,
					dependencies: [ 'userEmail' ],
					hasFeedback: true,
					validate: ({ getFieldValue }) => ({
						validator(rule, value) {
							if (!value || getFieldValue('userEmail') === value) {
								return Promise.resolve();
							}
							return Promise.reject('Los emails no coinciden!');
						}
					})
				}
			],
			[
				{
					label: 'Fecha de Nacimiento',
					name: 'userBirthDate',
					component: 'DatePicker',
					required: true
				},
				{
					label: 'Número de Celular',
					name: 'userPhone',
					component: 'Input'
				}
			],
			[
				{
					label: 'Documento de Identidad',
					name: 'userDni',
					component: 'Input'
				},
				{
					label: 'Sexo',
					name: [ 'attributes', 'sex' ],
					component: 'Select',
					options: [
						{ name: 'Femenino', value: 'FEMALE' },
						{ name: 'Masculino', value: 'MALE' },
						{ name: 'Otro', value: 'NOT_DEFINED' }
					]
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
				{
					label: 'Provincia',
					name: [ 'attributes', 'city' ],
					component: 'Select',
					options: provinces
				}
			],
			[
				{
					label: 'Ocupación',
					name: [ 'attributes', 'occupation' ],
					component: 'SelectDB',
					endpoint: '/occupation/all',
					search: 'occupation'
				},
				{
					label: 'Tengo Mascotas',
					name: [ 'attributes', 'pets' ],
					component: 'Select',
					options: [ { name: 'Si', value: 'true' }, { name: 'No', value: 'False' } ]
				}
			],
			[
				{
					label: 'Descripción Personal',
					name: 'userDescription',
					component: 'Input.TextArea'
				},
				{
					label: 'Cargar Imagen',
					name: 'photos',
					component: 'Upload',
					aspect: 1 / 1
				}
			]
		]
	}
};
export default userData;
