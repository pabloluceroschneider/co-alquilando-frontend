import React from 'react';
import ContentWrapper from '../../components/ContentWrapper';
import ContactUS from '../../components/ContactUs';

const ContactUs = () => {

	return (
		<ContentWrapper topNav footer>
			<div style={{ height: '70vh', width: '90vw', margin: 'auto'}}>
				<ContactUS />
			</div>
		</ContentWrapper>
	);
};

export default ContactUs;
