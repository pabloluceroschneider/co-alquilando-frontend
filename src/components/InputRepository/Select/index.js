import React, { useContext, useState, useEffect } from 'react';
import { Select } from 'antd'
import { notification } from 'antd';
import ApiRequest from '../../../util/ApiRequest';
const { Option } = Select;


const CustomSelect = (props) => {
	const {options} = props

	return (
		<Select>
			{options.map((op) => {
				return (
					<Option key={op.value} value={op.value}>
						{op.name}
					</Option>
				);
			})}
		</Select>
	);
};

export default CustomSelect