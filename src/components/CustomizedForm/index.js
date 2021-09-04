import React, { useState } from 'react';
import { Form, Button, notification, Divider } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import InputRepository from '../InputRepository';
import Modal from 'antd/lib/modal/Modal';

const Row = (props) => {
	const { fields, form } = props;
	return (
		<div className={`group${fields.length}`}>
			{fields.map((element) => {
				return InputRepository({ element, form })
			})}
		</div>
	);
};

const CustomizedForm = (props) => {
	const { data, onfinish, form, onDelete } = props;
	const { name, layout, fields, btnSubmit, btnDelete, deleteContentModal, titleDelete, className } = data;
	const { primaries, secondaries, tertiaries } = fields;
	const [showSecondary, setShowSecondary] = useState(false);
	const [showTertiary, setShowTertiary] = useState(false);
	const [loading, setLoading] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const toggleShowModal = () => setShowModal(!showModal);

	const onFinish = () => {
		const values = form.getFieldsValue();
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
			onfinish(values);
		}, 2000);
	};

	const onFinishFailed = values => {
		notification.error({
			message: `Error en formulario`,
			placement: 'bottomLeft'
		});
	};

	const showMore = () => {
		if (secondaries) {
			if (showSecondary) {
				if (tertiaries) {
					if (showTertiary) {
						return <div onClick={() => { setShowTertiary(false); setShowSecondary(false) }}><UpOutlined />  Mostrar menos</div>
					} else {
						return <div onClick={() => { setShowTertiary(true) }}><DownOutlined />  Mostrar más</div>
					}
				} else {
					return <div onClick={() => { setShowSecondary(false) }}><UpOutlined />  Mostrar menos</div>
				}

			} else {
				return <div onClick={() => { setShowSecondary(true) }}><DownOutlined />  Mostras más</div>
			}
		} else {
			return null
		}
	}

	const onValuesChange = (name, form) => (field) => {
		if (name === 'ad' || name === 'update-ad') {
			form.setFieldsValue({ image: field.isVertical })	
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
				form={form}
				layout={layout}
				onValuesChange={onValuesChange(name, form)}
			>
				{data && (
					primaries.map((row, index) => {
						return <Row key={index} fields={row} form={form} />;
					})
				)}

				{showSecondary && (
					<>
						<Divider />
						{secondaries.map((row, index) => {
							return <Row key={index} fields={row} form={form} />;
						})}
					</>
				)}

				{showTertiary && (
					<>
						<Divider />
						{tertiaries.map((row, index) => {
							return <Row key={index} fields={row} form={form} />;
						})}
					</>
				)}

				<div className="showmore">
					{showMore()}
				</div>

				{(btnSubmit && btnDelete) ? (
					<Form.Item>
						<Button onClick={toggleShowModal} className="delete" type="secondary">
							{btnDelete}
						</Button>
						<Button loading={loading} type="primary" onClick={onFinish}>
							{btnSubmit}
						</Button>
						<Modal visible={showModal}
							onOk={onDelete}
							onCancel={toggleShowModal}
							title={titleDelete}
							okText="Confirmar"
							cancelText="Cancelar"
							destroyOnClose
						>
							{deleteContentModal}
						</Modal>
					</Form.Item>
				) :
					(
						<Form.Item>
							<Button loading={loading} type="primary" onClick={onFinish}>
								{btnSubmit}
							</Button>
						</Form.Item>
					)
				}
			</Form >

		)
	}

	return (
		<div className={className ? className : "customizedForm"}>
			{renderForm()}
		</div>
	);
};

export default CustomizedForm;