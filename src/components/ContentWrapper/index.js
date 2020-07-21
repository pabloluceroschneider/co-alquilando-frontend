import React, { useState, useEffect } from 'react';
import CustomHeader from '../../containers/Header';
import Footer from '../../containers/Footer';
import CustomSideNav from '../../containers/SideNav';
import { Layout } from 'antd';
import '../../styles/ContentWrapper.css';

const { Content } = Layout;

const ContentWrapper = (props) => {
    const [ content, setContent ] = useState(props.children)
	return (
		<Layout>
			{props.header ? <CustomHeader /> : null}

			{props.content ? (
				<Layout>
					<CustomSideNav /> 
					<Content className="site-layout-background">{content}</Content>
				</Layout>
			) : props.children }

			{props.footer ? <Footer /> : null}
		</Layout>
	);
};

export default ContentWrapper;
