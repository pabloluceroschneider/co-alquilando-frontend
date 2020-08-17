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
		}
	];
	return (
		<div className="nav-container">
			{list.map((element) => {
				return (
					<div
						className={`link-component ${element.className} ${path === element.link ? 'current' : ''}`}
						onClick={() => {
							history.push(element.link);
						}}
						key={element.link}
					>
						<h3>{element.title}</h3>
					</div>
				);
			})}
		</div>
	);
};

export default OptionsNav;