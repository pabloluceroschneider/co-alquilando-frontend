const adFields = {
	name: 'ad',
	layout: 'vertical',
	btnSubmit: 'Actualizar Publicidad',
    btnDelete: 'Eliminar perfil',
	titleDelete: 'Eliminar perfil',
	deleteContentModal:
		"¿Desea eliminar esta publicidad? Si selecciona 'Aceptar', no podrá recuperarla.",
	fields: {
		primaries: [
			[
				{
					label: 'Cliente',
					name: 'client',
					component: 'Input',
					required: true
				}
			],
			[
				{
					label: "Fecha de Inicio",
					name: "startDate",
					component: "DatePicker",
					dependencies:['startDate'],
					required: true,
				},
				{
					label: "Fecha de Fin",
					name: "endDate",
					component: "DatePicker",
					dependencies:['finishDate'],
					required: true,
				},
				{
					label: 'Precio',
					name: ['adPrice','price'],
					component: 'Input',
					required: true
				}
			],
            [
				{
					label: 'Cargar Imagen',
					name: 'photoURL',
					component: 'Upload',
					aspect: 16/9
				}
			],
		],
	}
};

export default adFields;
