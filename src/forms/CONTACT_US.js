const contactForm = {
	name: 'user',
	layout: 'vertical',
	btnSubmit: 'Contactar',
	fields: {
		primaries: [
			[
				{
					label: 'Nombre Completo',
					name: 'name',
					component: 'Input',
					required: true
				},
				{
					label: 'Email',
					name: 'email',
					component: 'Input',
					required: true
				}
			],
			[
				{
					label: 'TextField',
					name: 'contact-us',
					component: 'Input.TextArea',
					required: true
				}
			]
		]
	}
};
export default contactForm;
