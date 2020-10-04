import React, { useState, useEffect } from 'react'
import { Form } from "antd";
import ApiRequest from "../../util/ApiRequest";
import ContentWrapper from "../../components/ContentWrapper";
import CustomizedForm from "../../components/CustomizedForm";

const propertyFields = {
	name: "user",
	layout: "vertical",
	btnSubmit: "Actualizar Datos",
	fields: {
	  primaries: [
		[
		  {
			label: "Titulo",
			name: "title",
			component: "Input",
		  }
		],
		[
		  {
			label: "Geolocalizacion",
			name: "coordinates",
			component: "Map",
		  },
		]
	]}
}

export const UpdateProperty = () => {
	const [form] = Form.useForm();
	const [fields, setFields] = useState(null);

	form.setFieldsValue({ title: "Valor"})
	form.setFieldsValue({ coordinates: {latitude:"-31.3588105",length:"-64.1820288"}})
	console.log(form.getFieldsValue(["coordinates"]))

	return (
		<ContentWrapper topNav title="Actualizar Perfil">
			<CustomizedForm form={form} data={propertyFields} onfinish={setFields} />
		</ContentWrapper>
	)
}

export default UpdateProperty
