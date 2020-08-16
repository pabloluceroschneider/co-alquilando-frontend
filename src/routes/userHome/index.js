import React from 'react';
import ImgPortada from '../../assets/images/LOGO.jpg'
import ContentWrapper from '../../components/ContentWrapper';
import serviceWorker  from '../../sw.js'

const userHome = () => {
	serviceWorker.register();

    return (
		<ContentWrapper topNav optionsNav footer>
            <div>
            <img src={ImgPortada} alt="Error de carga"></img>
          </div>
		</ContentWrapper>
    );
}

export default userHome;