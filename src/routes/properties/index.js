import React, { useState, useEffect, useContext } from 'react';
import ContentWrapper from '../../components/ContentWrapper';
import PieChart from '../../components/Charts/PieChart';
import { SessionContext } from '../../store';
import ApiRequest from '../../util/ApiRequest';

const Property = () => {

	const [metric, setMetric] = useState();
	const { state, dispatch } = useContext(SessionContext);

	useEffect(
		() => {
			if (metric) return;
			const getMetric = async () => {
				console.log("UserId: ", state.user.id)
				await ApiRequest.get(`metric/owner/${state.user.id}`)
					.then(({ data }) => {
						console.log("data: ", data)
						setMetric(data);
					})
			};
			getMetric();
		},
		[metric, state]
	);


	return (
		<ContentWrapper topNav>
			<div>
				<PieChart metric={metric} keys={1} />
				<PieChart metric={metric} keys={2} />
			</div>
		</ContentWrapper>
	);
};

export default Property;
