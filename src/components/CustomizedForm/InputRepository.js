import React from 'react';
import { Input, Button, DatePicker, Upload, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;

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
			return (
				<Select>
					{props.options.map((op) => {
						return (
							<Option key={op} value={op}>
								{op}
							</Option>
						);
					})}
				</Select>
			);
		case 'Upload':
			return (
				<Upload>
					<Button>
						<UploadOutlined /> Subir
					</Button>
				</Upload>
			);
		default:
			return <Input />;
	}
};

export default InputRepository;
