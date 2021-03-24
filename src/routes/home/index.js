import React from 'react';
import { Steps, Tag } from 'antd';
import LOGO_COALQUILANDO from '../../assets/images/logonav.png';
import desktopVideo from '../../assets/images/Home/Coalq.mp4';
import mobileVideo from '../../assets/images/Home/mobile-coalq.mov';
import Login from '../../components/Login';
import Footer from '../../containers/Footer';
import ContactUs from '../../components/ContactUs';
import { FacebookOutlined, TwitterOutlined, LoginOutlined } from '@ant-design/icons';

import '../../styles/Home.scss';

const { Step } = Steps;

const Home = () => {

	const mobileView = window.screen.width < 600;
	const video = mobileView ? mobileVideo : desktopVideo;

	return (
		<div className="home-page">
			<div className="logo">
				<img src={LOGO_COALQUILANDO} alt="image_home" />
			</div>

			<section className="video-section">
				<video className="video" loop autoPlay preload muted>
					<source src={video} />
				</video>

				<div className="presentation-text">
					<h1 className="text --title">CoAlquilando</h1>
					<h3 className="text --subtitle">Encontrá tu lugar...</h3>
					<div className="login">
						<Login>
              <Tag icon={<LoginOutlined />} >
                Ingresar
              </Tag>
            </Login>
					</div>
				</div>
			</section>

			<section className="steps">
				<div className="step-by-step">
					<div className="step">
						<h1 className="title">¿Buscás compañero de Alquiler?</h1>
						<Steps current={3} progressDot direction="vertical">
							<Step title="Registrate" description="This is a description. This is a description." />
							<Step
								title="Personalizá tu Búsqueda"
								description="This is a description. This is a description."
							/>
							<Step
								title="Encontrá tu compañero ideal"
								description="This is a description. This is a description."
							/>
						</Steps>
					</div>

					<div className="step">
						<h1 className="title">Alquilá tu propiedad</h1>
						<Steps current={3} progressDot direction="vertical">
							<Step title="Registrate" description="This is a description. This is a description." />
							<Step
								title="Publicá tu propiedad"
								description="This is a description. This is a description."
							/>
							<Step
								title="Seguí publicando"
								description="This is a description. This is a description."
							/>
						</Steps>
					</div>

					<div className="step">
						<h1 className="title">Alquilá tu propiedad</h1>
						<Steps current={3} progressDot direction="vertical">
							<Step title="Registrate" description="This is a description. This is a description." />
							<Step
								title="Publicá tu propiedad"
								description="This is a description. This is a description."
							/>
							<Step
								title="Seguí publicando"
								description="This is a description. This is a description."
							/>
						</Steps>
					</div>
				</div>
			</section>

			<section className="contact-us">
				<ContactUs />
			</section>

			<footer className="footer">
				<Footer />
			</footer>
		</div>
	);
};

export default Home;
