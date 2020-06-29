import React, { useState } from 'react';
import { Form, Input, Button, Divider, DatePicker, notification, Upload, Select } from 'antd';
import { UploadOutlined, DownOutlined, UpOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';
const { Option } = Select;

const Row = (props) => {
	const { fields } = props;
	return (
		<div className={`group${fields.length}`}>
			{fields.map((element) => {
				return (
					<Form.Item
						key={element.label}
						label={element.label}
						name={element.name}
						rules={[
							{
								required: true,
								message: 'Please input your username!'
							}
						]}
					>
						<Input />
					</Form.Item>
				);
			})}
		</div>
	);
};

const CustomizedForm = (props) => {
	const { form } = props;
	const { name, layout, fields } = form;
	const { primaries, secondaries, tertiary } = fields;
	const [ customizeForm ] = Form.useForm();
	const [ showSecondary, setShowSecondary ] = useState(false);
	const [ showTertiary, setShowTertiary ] = useState(false);

	return (
		<div className="customizedForm">
			<Form
				name={name}
				initialValues={{
					remember: true
				}}
				// onFinish={onFinish}
				// onFinishFailed={onFinishFailed}
				form={customizeForm}
				layout={layout}
			>
				{form ? (
					primaries.map((row, index) => {
						return <Row key={index} fields={row} />;
					})
				) : null}

				{secondaries ? (
					<p>
						<a href="##" onClick={() => setShowSecondary(!showSecondary)}>{!showSecondary ? 'Show more+' : null}</a>
					</p>
				) : null}

				{showSecondary ? (
					secondaries.map((row, index) => {
						return <Row key={index} fields={row} />;
					})
				) : null}

				{showSecondary ? (
					<p>
						<a href="##" onClick={() => setShowSecondary(!showSecondary)}>{tertiary ? 'Show more+' : 'Show less-'}</a>
					</p>
				) : null}

				<Button id="submit-customizedForm">Submit</Button>
			</Form>
		</div>
	);
};

// const CustomizeForm = () => {
// 	const [ provinces, setProvinces ] = useState(null);
// 	const [ showMore, setShowMore ] = useState(false);
// 	const [ form ] = Form.useForm();
// 	let sexOptions = [ 'Femenino', 'Masculino', 'Otro' ];
// 	let history = useHistory();

// 	const onFinish = (values) => {
// 		notification.success({
// 			message: `Usuario registrado`,
// 			placement: 'bottomLeft'
//         });
// 		history.push('/');
// 	};

// 	const onFinishFailed = () => {
// 		notification.error({
// 			message: `No se pudo registrar usuario`,
// 			placement: 'bottomLeft'
// 		});
// 	};

// 	const getProvinces = () => {
// 		if (!provinces) {
// 			fetch('https://apis.datos.gob.ar/georef/api/provincias')
// 				.then(function(response) {
// 					return response.json();
// 				})
// 				.then(function(myJson) {
// 					setProvinces(myJson.provincias);
// 				});
// 		}
// 	};

// 	return (
// 		<Form
// 			name="sign-in"
// 			initialValues={{
// 				remember: true
// 			}}
// 			onFinish={onFinish}
// 			onFinishFailed={onFinishFailed}
// 			form={form}
// 			layout="vertical"
// 		>
// 			<div className="group">
// 				<Form.Item
// 					label="Nombre"
// 					name="userName"
// 					rules={[
// 						{
// 							required: true,
// 							message: 'Please input your username!'
// 						}
// 					]}
// 				>
// 					<Input />
// 				</Form.Item>

// 				<Form.Item
// 					label="Apellido"
// 					name="userSurname"
// 					rules={[
// 						{
// 							required: true,
// 							message: 'Please input your username!'
// 						}
// 					]}
// 				>
// 					<Input />
// 				</Form.Item>
// 			</div>

// 			<div className="group">
// 				<Form.Item
// 					label="Email"
// 					name="userEmail"
// 					rules={[
// 						{
// 							required: true,
// 							message: 'Please input your username!'
// 						}
// 					]}
// 				>
// 					<Input />
// 				</Form.Item>

// 				<Form.Item
// 					label="Confirme email"
// 					name="userConfirmEmail"
// 					rules={[
// 						{
// 							required: true,
// 							message: 'Please input your username!'
// 						}
// 					]}
// 				>
// 					<Input />
// 				</Form.Item>
// 			</div>

// 			<div className="group">
// 				<Form.Item
// 					label="Contraseña"
// 					name="userPassword"
// 					rules={[
// 						{
// 							required: true,
// 							message: 'Please input your password!'
// 						}
// 					]}
// 				>
// 					<Input.Password />
// 				</Form.Item>

// 				<Form.Item
// 					label="Confirme contraseña"
// 					name="userConfirmPassword"
// 					rules={[
// 						{
// 							required: true,
// 							message: 'Please input your password!'
// 						}
// 					]}
// 				>
// 					<Input.Password />
// 				</Form.Item>
// 			</div>

// 			<div className="group">
// 				<Form.Item
// 					label="Fecha de Nacimiento"
// 					name="userBirthDate"
// 					rules={[
// 						{
// 							required: true,
// 							message: 'Please input your username!'
// 						}
// 					]}
// 				>
// 					<DatePicker />
// 				</Form.Item>
// 				<Form.Item label="Número de Celular" name="userPhone">
// 					<Input />
// 				</Form.Item>
// 			</div>

//             { showMore ? ( <>
// 			<Divider />
// 			<div className="group">
// 				<Form.Item label="Documento de Identidad" name="userDni">
// 					<Input />
// 				</Form.Item>

// 				<Form.Item label="Sexo" name="userSex">
// 					<Select allowClear>
// 						{sexOptions.map((s) => {
// 							return (
// 								<Option key={s} value={s}>
// 									{s}
// 								</Option>
// 							);
// 						})}
// 					</Select>
// 				</Form.Item>
// 			</div>

// 			<div className="group">
// 				<Form.Item label="Nacionalidad" name="userNationality">
// 					<Input />
// 				</Form.Item>

// 				<Form.Item label="Ciudad" name="userCity">
// 					<Select allowClear onClick={getProvinces()}>
// 						{provinces ? (
// 							provinces.map((p) => {
// 								return (
// 									<Option key={p.id} value={p.nombre}>
// 										{p.nombre}
// 									</Option>
// 								);
// 							})
// 						) : null}
// 					</Select>
// 				</Form.Item>
// 			</div>

// 			<div className="group">
// 				<Form.Item label="Descripción Personal" name="userDescription">
// 					<Input.TextArea />
// 				</Form.Item>

// 				<Form.Item label="Cargar Imagen">
// 					<Upload>
// 						<Button>
// 							<UploadOutlined /> Subir
// 						</Button>
// 					</Upload>
// 				</Form.Item>
// 			</div>

// 			<Divider />
// 			<Form.Item label="Preferencias" name="userPreferences">
//                 <Form.Item label="Tipología" name="userPreferences.typology">
//                     <Input />
//                 </Form.Item>
// 			</Form.Item>
//             </>
//             ) : null }

//             <div className="group">
//                 <div>
//                     { !showMore ?
//                     <div onClick={() => setShowMore(!showMore)} style={{display:'inline'}}>
//                         <DownOutlined/>
//                     <span style={{marginLeft:5}}>Mostrar más</span>
//                     </div> :
//                     <div onClick={() => setShowMore(!showMore)} style={{display:'inline'}}>
//                     <UpOutlined/>
//                     <span style={{marginLeft:5}}>Mostrar menos</span>
//                 </div>
//                 }
//                 </div>
//                 <Form.Item name="submit-sign-in" style={{alignItems:'right'}}>
//                     <Button type="primary" htmlType="submit">
//                         Registrarse
//                     </Button>
//                 </Form.Item>
//             </div>

// 		</Form>
// 	);
// };

export default CustomizedForm;
