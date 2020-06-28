import React from 'react';
import { Form, Input, Button, Divider } from 'antd';


const FormSignIn = () => {
	const onFinish = (values) => {
		console.log('Success:', values);
	};

	const onFinishFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<Form
			name="sign-in"
			initialValues={{
				remember: true
			}}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
		>
			<Form.Item
				label="Username"
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
				label="userSurname"
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
				label="userEmail"
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
				label="userConfirmEmail"
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
				label="userPassword"
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
				label="userConfirmPassword"
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
				label="userPhone"
				name="userPhone"
				rules={[
					{
						required: true,
						message: 'Please input your username!'
					}
				]}
			>
				<Input />
			</Form.Item>

            <Divider />

            <Form.Item
				label="userDni"
				name="userDni"
			>
				<Input />
			</Form.Item>

            <Form.Item
				label="userSex"
				name="userSex"
			>
				<Input />
			</Form.Item>

            <Form.Item
				label="userBirthDate"
				name="userBirthDate"
			>
				<Input />
			</Form.Item>

            <Form.Item
				label="userNationality"
				name="userNationality"
			>
				<Input />
			</Form.Item>

            <Form.Item
				label="userCity"
				name="userCity"
			>
				<Input />
			</Form.Item>

            <Form.Item
				label="userDescription"
				name="userDescription"
			>
				<Input />
			</Form.Item>

            <Form.Item
				label="userPreferences"
				name="userPreferences"
			>
				<Input />
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit">
					Submit
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
