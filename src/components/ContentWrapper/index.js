import React, { useState } from 'react';
import CustomHeader from '../../containers/Header';
import Footer from '../../containers/Footer';
import CustomSideNav from '../../containers/SideNav';
import Match from '../Match';
import { Layout } from 'antd';

const { Content } = Layout;

const ContentWrapper = (props) => {
    const [ content, setContent ] = useState("children");

    const renderContent = () => {
        switch (content){
            case "matchUsers":
                return <Match />
            default:
                return props.children
        }
    }

	return (
		<Layout>
			{props.header ? <CustomHeader /> : null}

			{props.content ? (
				<Layout>
					<CustomSideNav setContent={setContent} /> 
					<Content className="site-layout-background">
                        {renderContent()}
                    </Content>
				</Layout>
			) : props.children }

			{props.footer ? <Footer /> : null}
		</Layout>
	);
};

export default ContentWrapper;
