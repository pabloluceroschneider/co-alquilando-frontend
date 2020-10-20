import React, { useState, useContext } from "react";
import { useHistory, useRouteMatch } from 'react-router';
import { SessionContext } from "../../store";
import ApiRequest from "../../util/ApiRequest";
import { notification } from "antd";

const OptionsNav = () => {
	const history = useHistory();
	const { path } = useRouteMatch();
	const { state } = useContext(SessionContext);

	const list = [
		{
			title: 'Buscar Compañero',
			className: 'search_roommate',
			link: '/roommates'
		},
		{
			title: 'Buscar Propiedad',
			className: 'search_property',
			link: '/properties'
		},
		{
			title: 'Publicar Propiedad',
			className: 'publish_property',
			link: '/property'
		}

	];




	const validate = async (element) => {
		try {
			const pay = await ApiRequest.get(`user/hasToPay/${state.user.id}`);

			if (element.title === 'Publicar Propiedad') {
				if (!pay.data) {
					history.push(element.link)
				}
				else {
					history.push("/payOptions")
					notification.info({
						message: `No tiene suscripciones activas`,
						placement: 'bottomLeft'
					});
				}
			}
		} catch (e) {
			notification.error({
				message: `No se pudo conectar con el server`,
				placement: 'bottomLeft'
			});
		}

		if (element.title !== 'Publicar Propiedad') {
			history.push(element.link)
		}

	}
	return (
		<div className="options-container">
			{list.map((element) => {
				return (
					<div
						// className={`link-component ${element.className} ${path === element.link ? 'current' : ''}`}
						className={`link-component ${path === element.link ? 'current' : ''}`}
						onClick={() => {
							validate(element);
						}}
						key={element.link}
					>
						<span className="itemMenuTitle">{element.title}</span>
					</div>
				);
			})}
		</div>
	);
};

export default OptionsNav;