import React from 'react';
import { useHistory, useRouteMatch } from 'react-router';

const OptionsNav = () => {
	const history = useHistory();
	const { path } = useRouteMatch();

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
	return (
		<div className="options-container">
			{list.map((element) => {
				return (
					<div
						// className={`link-component ${element.className} ${path === element.link ? 'current' : ''}`}
						className={`link-component ${path === element.link ? 'current' : ''}`}
						onClick={() => {
							history.push(element.link);
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