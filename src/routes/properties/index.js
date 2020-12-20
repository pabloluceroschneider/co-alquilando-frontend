import React, { useEffect, useState } from 'react';
import { notification, Pagination } from 'antd';
import ApiRequest from '../../util/ApiRequest';
import ContentWrapper from '../../components/ContentWrapper';
import PropertyCard from '../../components/PropertyCard';
import Spin from '../../components/Spin';
import Filters from '../../components/Filters';
import FilterMap from '../../components/FilterMap';
import WaitingSelection from '../../components/WaitingSelection'
import '../../styles/Properties.scss';

const Property = () => {
	const [ properties, setProperties ] = useState(null);
	const [ selected, setSelected ] = useState()
	const [ page, setPage ] = useState(1);
	const [ size ] = useState(6);
	const [params, setParams] = useState();
	const onChange = page => setPage(page);
	let to = window.screen.width > 600 ? 0 : 300

	useEffect(() => {
			let asyncGet = async () => {
				try {
					let { data: { content } } = await ApiRequest.get(`/property/properties`, { page: page -1, size, ...params });
					setProperties(content);
				} catch (e) {
					notification.error({
                        message: `Error al obtener propiedades`,
						placement: 'bottomLeft'
					});
				}
			};
			asyncGet();
	},[ page, size, params ]);
	
	const toggleActions = (id) => {
		let node = document.getElementById(id);
		let act = node.getElementsByClassName("actions")
		act[0].classList.toggle("show")
	}

	const seeOnMap = (id) => {
		const rest = properties.filter( p => p.id !== id)
		const prop = properties.find( p => p.id === id)
		setSelected(prop);
		setProperties([prop, ...rest])
		window.scrollTo({ top: to, behavior: 'smooth' })
		setTimeout(() => toggleActions(id), 1300)
	}
	
	return (
		<ContentWrapper topNav optionsNav>
			<div className="properties-container">
				<FilterMap properties={properties} />

				<section className="properties">
					{properties?.map( ({id,  photos, title, price, description, address}) => (
						<div id={id} key={id} className={`property ${selected?.id===id}`}>
							<div className="detail" onBlur={() => toggleActions(id)} onClick={() => toggleActions(id)}>
								<img src={`http://localhost:8080//property/${id}/photos/${photos[0]}`} alt={description}></img>
								<summary>
									<div className="title">{title}</div>
									<div>${price.rentPrice}</div>
									<div>
										{[address.street,address.neighborhood,address.province].join(", ")}
									</div>
								</summary>
							</div>
							<div className="actions">
								<div>Ver Detalle</div>
								<div onClick={() => seeOnMap(id)}>Ver en Mapa</div>
							</div>
						</div>
					))}
				</section>
			</div>
		</ContentWrapper>
	);
};

export default Property;
