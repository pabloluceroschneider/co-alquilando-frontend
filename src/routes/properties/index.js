import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import ContentWrapper from '../../components/ContentWrapper';
import FilterMap from '../../components/FilterMap';
import Filters from '../../components/Filters';
import '../../styles/Properties.scss';
import { label } from 'aws-amplify';

const Property = () => {
	const [ selected, setSelected ] = useState()
	const [ onMap, setOnMap ] = useState()
	const [ page, setPage ] = useState(1);
	const [ size ] = useState(3);
	const [ params, setParams] = useState();
	const [ properties, error, setResult ] = useFetch(
		'/property/properties',
		{ page: page -1, size, ...params }, 
		[ page, size, params ] 
	);
	let to = window.screen.width > 600 ? 0 : 300
		
	const onChange = page => setPage(page);
	const toggleActions = (id) => {
		let node = document.getElementById(id);
		let act = node.getElementsByClassName("actions")
		act[0].classList.toggle("show")
	}

	const seeOnMap = (id, fromList) => {
		const rest = properties.filter( p => p.id !== id)
		const prop = properties.find( p => p.id === id)
		setSelected(prop);
		if (fromList) setOnMap(prop);
		setResult([prop, ...rest])
		window.scrollTo({ top: to, behavior: 'smooth' })
		let node = document.getElementById(id);
		let act = node.getElementsByClassName("actions")
		setTimeout(() => act[0].classList.remove("show"), 1300)
	}

	return (
		<ContentWrapper topNav optionsNav>
			<div className="properties-container">
				
				<FilterMap 
					properties={properties} 
					onFilter={setParams} 
					seeOnMap={seeOnMap}
					selected={onMap}
					/>

				{/* <div className="filters">
					<Filters title="Filtros" onFilter={setParams}/>
				</div> */}

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
								<div onClick={() => seeOnMap(id)}>Ver en Mapa</div>
								<Link to={`/property/${id}`}>
									Ver Detalle
								</Link>
							</div>
						</div>
					))}
				</section>
			</div>
		</ContentWrapper>
	);
};

export default Property;
