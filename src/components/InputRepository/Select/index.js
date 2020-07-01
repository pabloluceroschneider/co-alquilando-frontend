import React from 'react';
import { Select } from 'antd'
const { Option } = Select;

const CustomSelect = (props) => {
	const { options } = props;
	return (
		<Select>
			{options.map((op) => {
				return (
					<Option key={op} value={op}>
						{op}
					</Option>
				);
			})}
		</Select>
	);
};

export default CustomSelect