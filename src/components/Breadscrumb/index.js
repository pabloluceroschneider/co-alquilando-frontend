import React from 'react';
import { Link } from "react-router-dom";
import { Breadcrumb } from 'antd';
import { HomeOutlined } from '@ant-design/icons';

const CustomBreadcrumb = ({paths}) => {
	return (
		<Breadcrumb className="content-wrapper breadscrum">
			<Breadcrumb.Item>
				<Link to="/">
					<HomeOutlined />
				</Link>
			</Breadcrumb.Item>
			{paths?.map( (c,i) => {
				let values = Object.values(c)[0]
				if (!values) return null
				return (
					<Breadcrumb.Item key={i}>
						<Link to={values}>
							{Object.keys(c)}
						</Link>
					</Breadcrumb.Item>
				)
			})}
		</Breadcrumb>
	);
};

export default CustomBreadcrumb;
