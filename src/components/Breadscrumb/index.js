import React from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const CustomBreadcrumb = ({paths}) => {
	return (
		<Breadcrumb className="content-wrapper breadscrum">
			<Breadcrumb.Item href="/">
				<HomeOutlined />
			</Breadcrumb.Item>
			{paths?.map( (c,i) => {
				let values = Object.values(c)[0]
				if (!values) return
				return (
					<Breadcrumb.Item key={i} href={values}>
						{Object.keys(c)}
					</Breadcrumb.Item>
				)
			})}
		</Breadcrumb>
	);
};

export default CustomBreadcrumb;
