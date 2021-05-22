import React from 'react';
import { Steps, Tag } from 'antd';
import LOGO_COALQUILANDO from '../../assets/images/logonav.png';
import desktopVideo from '../../assets/images/Home/Coalq.mp4';
import mobileVideo from '../../assets/images/Home/mobile-coalq.mov';
import Login from '../../components/Login';
import Footer from '../../containers/Footer';
import { LoginOutlined } from '@ant-design/icons';

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
							<Step title="Registrate" description="Completá tus datos y accede a la plataforma." />
							<Step
								title="Personalizá tu Búsqueda"
								description="Elegí tus preferencias para encontrar a tu compañero ideal."
							/>
							<Step
								title="Elegí tu Propiedad"
								description="Navega entre las propiedades y compartilas con tu grupo."
							/>
						</Steps>
					</div>

					<div className="step">
						<h1 className="title">¿Querés compartir tu alquiler?</h1>
						<Steps current={3} progressDot direction="vertical">
							<Step title="Registrate" description="Completá tus datos y accede a la plataforma." />
							<Step
								title="Publicá tu propiedad"
								description="Si vivís en una propiedad, ingresa los datos y comenzá tu búsqueda."
							/>
							<Step
								title="Encontrá compañero"
								description="Navegá entre los perfiles y elegí tus compañeros de vivienda."
							/>
						</Steps>
					</div>

					<div className="step">
						<h1 className="title">Publicá tu propiedad</h1>
						<Steps current={3} progressDot direction="vertical">
							<Step title="Registrate" description="Completá tus datos y accede a la plataforma." />
							<Step
								title="Publicá tus propiedades"
								description="Elegí tu paquete, y cargá los datos de tus propiedades."
							/>
							<Step
								title="Encontrá inquilinos"
								description="Gestioná los grupos, comunicate y concretá el pre-alquiler."
							/>
						</Steps>
					</div>
				</div>
			</section>

			<footer className="footer">
				<Footer />
			</footer>
		</div>
	);
};

export default Home;
