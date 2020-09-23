import React from 'react';
import ImgPortada from '../../assets/images/LOGO.jpg';
import ContentWrapper from '../../components/ContentWrapper';

const UserHome = () => {
	return (
		<ContentWrapper topNav optionsNav footer>
			<div className="userHome">
				<img src={ImgPortada} alt="Error de carga" />
			</div>
		</ContentWrapper>
	);
};

export default UserHome;
