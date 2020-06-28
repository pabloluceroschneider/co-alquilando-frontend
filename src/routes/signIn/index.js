import React from 'react';
import { Form, Input, Button, Divider, DatePicker, notification, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useHistory } from 'react-router-dom';

const FormSignIn = () => {
	const [ form ] = Form.useForm();
	let history = useHistory();

	const onFinish = (values) => {
		console.log('Success:', values);
		notification.success({
			message: `Usuario registrado`,
			placement: 'bottomLeft'
		});
		history.push('/');
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
		notification.error({
			message: `No se pudo registrar usuario`,
			placement: 'bottomLeft'
		});
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
		>
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

			<Divider />

			<Form.Item label="Número de Celular" name="userPhone">
				<Input />
			</Form.Item>

			<Form.Item label="Documento de Identidad" name="userDni">
				<Input />
			</Form.Item>

			<Form.Item label="Sexo" name="userSex">
				<Input />
			</Form.Item>

			<Form.Item label="Nacionalidad" name="userNationality">
				<Input />
			</Form.Item>

			<Form.Item label="Ciudad" name="userCity">
				<Input />
			</Form.Item>

			<Form.Item label="Descripción Personal" name="userDescription">
				<Input />
			</Form.Item>

			<Form.Item label="Preferencias" name="userPreferences">
				<Input />
			</Form.Item>

			<Form.Item label="Cargar Imagen">
				<Upload>
					<Button>
						<UploadOutlined />  Subir
					</Button>
				</Upload>
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit">
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
