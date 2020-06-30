import React from 'react';
import { Input, Checkbox } from 'antd';
import Select from './Select'
import Upload from './Upload'
import DatePicker from './DatePicker'
import CheckboxGroup from './CheckboxGroup'


const InputRepository = (props) => {
	const { component } = props;

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
			return <Checkbox>{props.label}</Checkbox>
		case 'CheckboxGroup':
			// revisar, envia una función a values
			return CheckboxGroup({...props,all:true})
		case 'DatePicker':
			return DatePicker(props);
		case 'Select':
			return Select(props)
		case 'Upload':
			return <Upload />
					
		default:
			return <Input />;
	}
};

export default InputRepository;
