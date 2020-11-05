import React, { useEffect, useState } from 'react';
import { notification, Pagination } from 'antd';
import ApiRequest from '../../util/ApiRequest';
import ContentWrapper from '../../components/ContentWrapper';
import PropertyCard from '../../components/PropertyCard';
import Spin from '../../components/Spin';
import Filters from '../../components/Filters';
import WaitingSelection from '../../components/WaitingSelection'

const Property = () => {
	const [ datos, setDatos ] = useState(null);
	const [ page, setPage ] = useState(1);
	const [ size ] = useState(10);
	const [params, setParams] = useState();
	const onChange = page => setPage(page);

	useEffect(() => {
			let asyncGet = async () => {
				try {
					let { data } = await ApiRequest.get(`/property/properties`, { page: page -1, size, ...params });
					setDatos(data.content);
				} catch (e) {
					notification.error({
                        message: `Error al obtener propiedades`,
						placement: 'bottomLeft'
					});
				}
			};
			asyncGet();
		},[ page, size, params ]);



	return (
		<ContentWrapper topNav optionsNav>
			<div className="properties-wrapper">
				
				<div className="filters">
					<Filters title="Filtros" onFilter={setParams}/>
				</div>

				<div className="list">

					<div className="contentPL">

						{!datos && <Spin />}

						{datos?.map( p => {
							return <PropertyCard key={p.id} {...p} />;
						})}

						{datos && !datos?.length ? <WaitingSelection message="No se encontraron propiedades" /> :null}

					</div>

					<div className="pagination">
						<Pagination current={page} onChange={onChange} total={datos?.totalItems} pageSize={size} />
					</div>

				</div>

			</div>
		</ContentWrapper>
	);
};

export default Property;
