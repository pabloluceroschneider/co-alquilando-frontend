import React from 'react';
import { Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';

const CustomBreadcrumb = ({paths}) => {
	return (
		<Breadcrumb className="content-wrapper breadscrum">
			<Breadcrumb.Item href="/">
				<HomeOutlined />
			</Breadcrumb.Item>
			{paths?.map( (c,i) => {
				return (
					<Breadcrumb.Item key={i} href={Object.values(c)}>
						{Object.keys(c)}
					</Breadcrumb.Item>
				)
			})
			}
		</Breadcrumb>
	);
};

export default CustomBreadcrumb;
