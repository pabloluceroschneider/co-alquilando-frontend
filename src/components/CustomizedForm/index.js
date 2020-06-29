import React, { useState } from 'react';
import { Form, Button, notification } from 'antd';
import { useHistory } from 'react-router-dom';
import InputRepository from './InputRepository';

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
						{InputRepository( element )}
					</Form.Item>
				);
			})}
		</div>
	);
};

const CustomizedForm = (props) => {
	const { form } = props;
	const { name, layout, fields } = form;
	const { primaries, secondaries, tertiaries } = fields;
	const [ customizeForm ] = Form.useForm();
	const [ showSecondary, setShowSecondary ] = useState(false);
	const [ showTertiary, setShowTertiary ] = useState(false);
	const history = useHistory();


	const onFinish = (values) => {
		console.log(values)
		notification.success({
			message: `Usuario registrado`,
			placement: 'bottomLeft'
		});
		history.push('/');
	};

	const onFinishFailed = values => {
		console.log(values)

		notification.error({
			message: `No se pudo registrar usuario`,
			placement: 'bottomLeft'
		});
	};

	return (
		<div className="customizedForm">
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

				{secondaries ? (
					<p>
						<a href="##" onClick={() => setShowSecondary(!showSecondary)}>
							{!showSecondary ? 'Show more+' : null}
						</a>
					</p>
				) : null}

				{showSecondary ? (
					secondaries.map((row, index) => {
						return <Row key={index} fields={row} />;
					})
				) : null}

				{showSecondary ? (
					<p>
						<a
							href="##"
							onClick={
								tertiaries && !showTertiary ? (
									() => setShowTertiary(!showTertiary)
								) : (
									() => setShowSecondary(false)
								)
							}
						>
							{tertiaries && !showTertiary ? 'Show more+' : showTertiary ? null : 'Show less-'}
						</a>
					</p>
				) : null}

				{showTertiary ? (
					tertiaries.map((row, index) => {
						return <Row key={index} fields={row} />;
					})
				) : null}

				{showTertiary ? (
					<p>
						<a
							href="##"
							onClick={() => {
								setShowTertiary(false);
								setShowSecondary(false);
							}}
						>
							{showTertiary ? 'Show less-' : null}
						</a>
					</p>
				) : null}

				<Form.Item>
					<Button type="primary" htmlType="submit">
						Registrarse
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default CustomizedForm;
