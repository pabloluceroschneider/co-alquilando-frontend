import React from 'react';
import { Form, Input, Checkbox } from 'antd';
import Select from './Select';
import Upload from './Upload';
import DatePicker from './DatePicker';
import CheckboxGroup from './CheckboxGroup';

const InputRepository = (props) => {
	const { label, name, component, required } = props;

	const pickInput = () => {
		switch (component) {
			case 'Input':
				return <Input />;
			case 'Input.Password':
				return <Input.Password />;
			case 'Input.Number':
				return <Input.Number />;
			case 'Input.TextArea':
				return <Input.TextArea />;
			case 'Checkbox':
				// revisar, no retorna valor
				return <Checkbox />;
			case 'CheckboxGroup':
				// revisar, no retorna valor
				return CheckboxGroup({ ...props, all: true });
			case 'DatePicker':
				return DatePicker(props);
			case 'Select':
				return Select(props);
			case 'Upload':
				return <Upload />;
			default:
				return <Input />;
		}
	};

	switch (component){
		case 'label':
			return <label></label>
		case 'link':
			return <a key={props.label} href={props.href} rel="noopener noreferrer">{props.label}</a>
		default:
			return <Form.Item
						key={label}
						label={label}
						name={name}
						dependencies={props.dependencies}
						hasFeedback={props.hasFeedback}
						valuePropName={props.valuePropName}
						rules={
							props.validate ? (
								[
									{
										required: required,
										message: `Porfavor, ingrese ${label}`
									},
									props.validate
								]
							) : (
								[
									{
										required: required,
										message: `Porfavor, ingrese ${label}`
									}
								]
							)
						}
					>
					{pickInput()}
				</Form.Item>
	}
};

export default InputRepository
