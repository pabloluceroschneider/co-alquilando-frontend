import React, { useEffect, useState } from 'react';
import { notification, Pagination } from 'antd';
import ApiRequest from '../../util/ApiRequest';
import ContentWrapper from '../../components/ContentWrapper';
import PropertyCard from '../../components/PropertyCard';
import Filters from '../../components/Filters';
// import Loading from '../../components/Loading';
import WaitingSelection from '../../components/WaitingSelection'
import { propertyFilters } from '../../forms/FILTERS';
import { getParamsEntries } from '../../util/getParams'

const Property = () => {
	const [ datos, setDatos ] = useState(null);
	const [ page, setPage ] = useState(1);
	const [ size ] = useState(10);
	const [ params ] = useState( getParamsEntries() );

	useEffect(() => {
			let asyncGet = async () => {
				try {
					let { data } = await ApiRequest.get(`/property/properties`, { page: page -1, size, ...params });
					setDatos(data);
				} catch (e) {
					notification.error({
						message: `Error: ${e.message}`,
						placement: 'bottomLeft'
					});
				}
			};
			asyncGet();
		},[ page, size, params ]);

	const onChange = page => setPage(page);

	return (
		<ContentWrapper topNav optionsNav>
			<div className="properties-wrapper">
				
				<div className="filters">
					<Filters filters={propertyFilters}/>
				</div>

				<div className="list">

					<div className="contentPL">
						{datos?.content?.map( p => {
							return <PropertyCard key={p.id} {...p} />;
						})}

						{!datos?.content?.length && <WaitingSelection message="No se encontraron propiedades" />}
						{/* {!datos?.content && <div className="loading-wrapper"><Loading text="Hola" /></div> } */}
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
