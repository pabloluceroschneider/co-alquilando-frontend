import React from 'react';
import ImgPortada from '../../assets/images/LOGO.jpg';
import ContentWrapper from '../../components/ContentWrapper';
import useServiceWorker from '../../util/useServiceWorker';

const UserHome = () => {
	useServiceWorker();
	return (
		<ContentWrapper topNav optionsNav footer>
			<div className="userHome">
				<img src={ImgPortada} alt="Error de carga" />
			</div>
		</ContentWrapper>
	);
};

export default UserHome;
