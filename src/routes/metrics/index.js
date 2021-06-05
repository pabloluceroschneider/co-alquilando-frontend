import React, { useState, useEffect, useContext } from 'react';
import ContentWrapper from '../../components/ContentWrapper';
import PieChart from '../../components/Charts/PieChart';
import ColumChart from '../../components/Charts/ColumChart';
import { SessionContext } from '../../store';
import ApiRequest from '../../util/ApiRequest';
import UserMenuReports from '../../components/UserMenuReports';

const Metrics = () => {

	const [metric, setMetric] = useState();
	const { state, dispatch } = useContext(SessionContext);
	const breadscrumb = [{'Mis Reportes': '/reports'}]

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
		<ContentWrapper topNav breadscrumb={breadscrumb}>
				<div className="page reports-admin">
						<UserMenuReports metric={metric} />
				</div>
		</ContentWrapper>
	)
};

export default Metrics;
