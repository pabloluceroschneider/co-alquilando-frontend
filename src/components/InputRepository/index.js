import React from 'react';
import { Input, DatePicker } from 'antd';
import Select from './Select'
import Upload from './Upload'


const InputRepository = (props) => {
	const { component } = props;

	switch (component) {
		case 'Input':
			return <Input />;
		case 'Input.Password':
			return <Input.Password />;
		case 'Input.Number':
			return <Input.Number />;
		case 'DatePicker':
			return <DatePicker />;
		case 'Input.TextArea':
			return <Input.TextArea />;
		case 'Select':
			return <Select options={props.options} />
		case 'Upload':
			return <Upload />
					
		default:
			return <Input />;
	}
};

export default InputRepository;
