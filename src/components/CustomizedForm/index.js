import React, { useState } from 'react';
import { Form, Button, notification, Divider } from 'antd';
import { useHistory } from 'react-router-dom';
import InputRepository from '../InputRepository';

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
						rules={
							element.required ? (
								[
									{
										required: true,
										message: `Porfavor, ingrese ${element.label}`
									}
								]
							) : (
								false
							)
						}
					>
						{InputRepository(element)}
					</Form.Item>
				);
			})}
		</div>
	);
};

const CustomizedForm = (props) => {
	const { form, onfinish } = props;
	const { name, layout, fields } = form;
	const { primaries, secondaries, tertiaries } = fields;
	const [ customizeForm ] = Form.useForm();
	const [ showSecondary, setShowSecondary ] = useState(false);
	const [ showTertiary, setShowTertiary ] = useState(false);
	const history = useHistory();

	const onFinish = (values) => {
		onfinish(values)
		// console.log(values)
		// notification.success({
		// 	message: `Usuario registrado`,
		// 	placement: 'bottomLeft'
		// });
		// history.push('/');
	};

	const onFinishFailed = values => {
		notification.error({
			message: `No se pudo registrar usuario`,
			placement: 'bottomLeft'
		});
	};

	const showMore = () => {
		if(secondaries){
			if(showSecondary){
				if(tertiaries){
					if(showTertiary){
						return <div onClick={ () => {setShowTertiary(false);setShowSecondary(false)}}>Mostrar menos</div>
					}else{
						return <div onClick={ () => {setShowTertiary(true)}}>Mostrar más</div>
					}
				}else{
					return <div onClick={ () => {setShowSecondary(false)}}>Mostrar menos</div>
				}

			}else{
				return <div onClick={ () => {setShowSecondary(true)} }>Mostrar más</div>
			}
		}else{
			return null
		}
	}

	const renderForm = () => {
		return (
			<Form
				name={name}
				initialValues={{
					remember: true
				}}
				onFinish={onFinish}
				onFinishFailed={onFinishFailed}
				form={customizeForm}
				layout={layout}
			>
				{form ? (
					primaries.map((row, index) => {
						return <Row key={index} fields={row} />;
					})
				) : null}

				{showSecondary ? (
					<>
					<Divider />
					{secondaries.map((row, index) => {
						return <Row key={index} fields={row} />;
					})}
					</>
				) : null}

				{showTertiary ? (
					<>
					<Divider />
					{tertiaries.map((row, index) => {
						return <Row key={index} fields={row} form={customizeForm}/>;
					})}
					</>
				) : null}

				<div className="showmore">
					{showMore()}
				</div>

				<Form.Item>
					<Button type="primary" htmlType="submit">
						Registrarse
					</Button>
				</Form.Item>
			</Form>

		)
	}

	return (
		<div className="customizedForm">
			{renderForm()}
		</div>
	);
};

export default CustomizedForm;
