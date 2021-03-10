import React, { useState, useEffect, useContext } from 'react';
import ContentWrapper from '../../components/ContentWrapper';
import PieChart from '../../components/Charts/PieChart';
import ColumChart from '../../components/Charts/ColumChart';
import { SessionContext } from '../../store';
import ApiRequest from '../../util/ApiRequest';

const Metrics = () => {

	const [metric, setMetric] = useState();
	const { state, dispatch } = useContext(SessionContext);

	useEffect(
		() => {
			if (metric) return;
			const getMetric = async () => {
				await ApiRequest.get(`metric/owner/${state.user.id}`)
					.then(({ data }) => {
						setMetric(data);
					})
			};
		getMetric();	
		},
		[metric, state]
	);

	return (
		<div>
			
			{ metric ? (
					<ContentWrapper topNav>
						<div>
							<PieChart metric={metric.propertiesAverage} keys={1} />
							<ColumChart metric={metric.propertyAverageLastMonth} keys={2} />
						</div>
					</ContentWrapper >
				) : null
			};
		</div>
	);
};

export default Metrics;
