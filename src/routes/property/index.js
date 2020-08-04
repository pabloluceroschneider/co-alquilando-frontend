import React, { useState, useEffect, useContext } from 'react';
import { SessionContext } from '../../store';
import ApiRequest from '../../util/ApiRequest';
import { Form, notification } from 'antd';
import CustomizedForm from '../../components/CustomizedForm';
import ContentWrapper from '../../components/ContentWrapper';

const propertyData = {
	name: 'property',
	layout: 'vertical',
	btnSubmit: 'Registrar Propiedad',
	fields: {
		primaries: [
			[
				{
					label: 'Título',
					name: 'title',
					component: 'Input',
					required: true
				}
			],
			[
				{
					label: 'Tipología',
					name: [ 'attributes', 'typology' ],
					component: 'Select',
					options: [
						{ name: 'Departamento', value: 'APARMENT' },
						{ name: 'Casa', value: 'HOUSE' },
						{ name: 'Otro', value: 'NOT_DEFINED' }
					],
					required: true
				},
				{
					label: 'Cantidad de personas',
					name: [ 'attributes', 'amountPeople' ],
					component: 'Input',
					required: true
				}
			],
			[
				{
					label: 'Habitaciones',
					name: [ 'attributes', 'rooms' ],
					component: 'Input',
					required: true
				},
				{
					label: 'Baños',
					name: [ 'attributes', 'bathrooms' ],
					component: 'Input',
					required: true
				}
			],
			[
				{
					label: 'Descripción',
					name: 'description',
					component: 'Input.TextArea',
					required: true
				}
			],
			[
				{
					label: 'Dirección',
					component: 'h2'
				}
			],
			[
				{
					label: 'Calle',
					name: [ 'address', 'street' ],
					component: 'Input',
					required: true
				},
				{
					label: 'Número',
					name: [ 'address', 'number' ],
					component: 'Input',
					required: true
				},
				{
					label: 'Barrio',
					name: [ 'address', 'neighborhood' ],
					component: 'Input',
					required: true
				}
			],
			[
				{
					label: 'Piso',
					name: [ 'address', 'floor' ],
					component: 'Input'
				},
				{
					label: 'Departamento',
					name: [ 'address', 'apartment' ],
					component: 'Input'
				},
				{
					label: 'Provincia',
					name: [ 'address', 'province' ],
					component: 'Input',
					required: true
				}
			],
			[
				{
					label: 'Geolocalizacion',
					name: "coordinates",
          component: 'Map',
					required: true
        }
			],
			[
				{
					label: 'Precio',
					component: 'h2'
				}
			],
			[
				{
					label: 'Alquiler',
					name: [ 'price', 'rentPrice' ],
					component: 'Input',
					required: true
				},
				{
					label: 'Expensas',
					name: [ 'price', 'expenses' ],
					component: 'Input',
					required: true
				},
				{
					label: 'Servicios',
					name: [ 'price', 'services' ],
					component: 'Input'
				},
				{
					label: 'Impuestos',
					name: [ 'price', 'taxes' ],
					component: 'Input'
				}
			]
		],
		secondaries: [
			[
				{
					label: 'Comodidades',
					component: 'h2'
				}
			],
			[
				{
					label: 'Gimnasio',
					name: [ 'attributes', 'gym' ],
					valuePropName: 'checked',
					component: 'Checkbox'
				},
				{
					label: 'Pileta',
					name: [ 'attributes', 'pool' ],
					valuePropName: 'checked',
					component: 'Checkbox'
				},
				{
					label: 'Playroom',
					name: [ 'attributes', 'playroom' ],
					valuePropName: 'checked',
					component: 'Checkbox'
				}
			],
			[
				{
					label: 'Asador',
					name: [ 'attributes', 'roaster' ],
					valuePropName: 'checked',
					component: 'Checkbox'
				},
				{
					label: 'Cochera',
					name: [ 'attributes', 'garage' ],
					valuePropName: 'checked',
					component: 'Checkbox'
				},
				{
					label: 'Balcón',
					name: [ 'attributes', 'balcony' ],
					valuePropName: 'checked',
					component: 'Checkbox'
				}
			],
			[
				{
					label: 'Ascensor',
					name: [ 'attributes', 'elevator' ],
					valuePropName: 'checked',
					component: 'Checkbox'
				},
				{
					label: 'Amoblado Incluido',
					name: [ 'attributes', 'furnished' ],
					valuePropName: 'checked',
					component: 'Checkbox'
				},
				{
					label: 'Aire acondicionado',
					name: [ 'attributes', 'aa' ],
					valuePropName: 'checked',
					component: 'Checkbox'
				}
			],
			[
				{
					label: 'Salon de usos múltiples',
					name: [ 'attributes', 'sum' ],
					valuePropName: 'checked',
					component: 'Checkbox'
				},
				{
					label: 'Calefacción',
					name: [ 'attributes', 'calefaction' ],
					valuePropName: 'checked',
					component: 'Checkbox'
				},
				{
					label: 'Acepta Mascotas',
					name: [ 'attributes', 'pets' ],
					valuePropName: 'checked',
					component: 'Checkbox'
				}
			]
		]
	}
};

const usePostProperty = (values) => {
  const [ response, setResponse ] = useState(null);
  const { state } = useContext(SessionContext);

	useEffect(
		() => {
			if (values) {
        values.address = {...values.address, coordinates: values.coordinates };
        delete values.coordinates;
        let atributos = Object.entries(values.attributes);
        console.log("values", values)
        console.log("atributos", atributos)
				const attributesFormate = atributos.map((a) => {
					let json = {
						attributeType: a[0],
						value: a[1] ? a[1] : '',
						weigth: 0
					};
					return json;
				});

				let formatedBody = {
					...values,
					attributes: attributesFormate,
					ownerId: state.user.id,
					status: 'available'
				};

				let bodyReq = formatedBody;
				let asyncPost = async () => {
					try {
						let ok = await ApiRequest.post('/property', bodyReq);
						setResponse(ok);
					} catch (e) {
						notification.error({
							message: `Error: ${e.message}`,
							placement: 'bottomLeft'
						});
					}
				};
				asyncPost();
			}
		},
		[ values ]
	);
	return response;
};

const Property = () => {
	const [ values, setValues ] = useState(null);
	const [ form ] = Form.useForm();

	let property = usePostProperty(values);
	console.log('asdasdasda', values);
	useEffect(
		() => {
			if (property) {
				console.log(property);
				notification.success({
					message: `Propiedad Publicada`,
					placement: 'bottomLeft'
				});
				form.resetFields();
			}
		},
		[ property, form ]
	);

	return (
		<ContentWrapper topNav footer>
			<CustomizedForm form={form} data={propertyData} onfinish={setValues} />
		</ContentWrapper>
	);
};

export default Property;
