import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Divider, DatePicker, notification, Upload, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const { Option } = Select;

const FormSignIn = () => {
	const [ provinces, setProvinces ] = useState(null);
	const [ form ] = Form.useForm();
	let sexOptions = [ 'Femenino', 'Masculino', 'Otro' ];
	let history = useHistory();

	const onFinish = (values) => {
		notification.success({
			message: `Usuario registrado`,
			placement: 'bottomLeft'
		});
		history.push('/');
	};

	const onFinishFailed = (errorInfo) => {
		notification.error({
			message: `No se pudo registrar usuario`,
			placement: 'bottomLeft'
		});
	};

	const getProvinces = () => {
		if (!provinces) {
			fetch('https://apis.datos.gob.ar/georef/api/provincias')
				.then(function(response) {
					return response.json();
				})
				.then(function(myJson) {
					setProvinces(myJson.provincias);
				});
		}
	};

	return (
		<Form
			name="sign-in"
			initialValues={{
				remember: true
			}}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			form={form}
			layout="vertical"
		>
			<div className="group">
				<Form.Item
					label="Nombre"
					name="userName"
					rules={[
						{
							required: true,
							message: 'Please input your username!'
						}
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Apellido"
					name="userSurname"
					rules={[
						{
							required: true,
							message: 'Please input your username!'
						}
					]}
				>
					<Input />
				</Form.Item>
			</div>

			<div className="group">
				<Form.Item
					label="Email"
					name="userEmail"
					rules={[
						{
							required: true,
							message: 'Please input your username!'
						}
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label="Confirme email"
					name="userConfirmEmail"
					rules={[
						{
							required: true,
							message: 'Please input your username!'
						}
					]}
				>
					<Input />
				</Form.Item>
			</div>

			<div className="group">
				<Form.Item
					label="Contraseña"
					name="userPassword"
					rules={[
						{
							required: true,
							message: 'Please input your password!'
						}
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item
					label="Confirme contraseña"
					name="userConfirmPassword"
					rules={[
						{
							required: true,
							message: 'Please input your password!'
						}
					]}
				>
					<Input.Password />
				</Form.Item>
			</div>

			<div className="group">
				<Form.Item
					label="Fecha de Nacimiento"
					name="userBirthDate"
					rules={[
						{
							required: true,
							message: 'Please input your username!'
						}
					]}
				>
					<DatePicker />
				</Form.Item>
				<Form.Item label="Número de Celular" name="userPhone">
					<Input />
				</Form.Item>
			</div>

			<Divider />

			<div className="group">
				<Form.Item label="Documento de Identidad" name="userDni">
					<Input />
				</Form.Item>

				<Form.Item label="Sexo" name="userSex">
					<Select allowClear>
						{sexOptions.map((s) => {
							return (
								<Option key={s} value={s}>
									{s}
								</Option>
							);
						})}
					</Select>
				</Form.Item>
			</div>

			<div className="group">
				<Form.Item label="Nacionalidad" name="userNationality">
					<Input />
				</Form.Item>

				<Form.Item label="Ciudad" name="userCity">
					<Select allowClear onClick={getProvinces()}>
						{provinces ? (
							provinces.map((p) => {
								return (
									<Option key={p.id} value={p.nombre}>
										{p.nombre}
									</Option>
								);
							})
						) : null}
					</Select>
				</Form.Item>
			</div>

			<div className="group">
				<Form.Item label="Descripción Personal" name="userDescription">
					<Input.TextArea />
				</Form.Item>

				<Form.Item label="Cargar Imagen">
					<Upload>
						<Button>
							<UploadOutlined /> Subir
						</Button>
					</Upload>
				</Form.Item>
			</div>

			<Form.Item label="Preferencias" name="userPreferences">
				<Input />
			</Form.Item>

			<Form.Item name="submit-sign-in">
				<Button id="submit-sign-in" type="primary" htmlType="submit">
					Registrarse
				</Button>
			</Form.Item>
		</Form>
	);
};

const SignIn = () => {
	return (
		<div className="form-sign-in">
			<FormSignIn />
		</div>
	);
};

export default SignIn;
