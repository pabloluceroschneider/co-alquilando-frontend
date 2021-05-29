import React, { useState, useEffect, useContext } from 'react';
import ContentWrapper from '../../components/ContentWrapper';
import PieChart from '../../components/Charts/PieChart';
import ColumChart from '../../components/Charts/ColumChart';
import { SessionContext } from '../../store';
import ApiRequest from '../../util/ApiRequest';

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
		<div>

			{ metric ? (
				<ContentWrapper topNav breadscrumb={breadscrumb}>
					<div class="metrics">
						<div>
							<h3 class="subtitle"> Datos generales</h3>
							<div class="chart" id="pie">
								<PieChart metric={metric.propertiesAverage} keys={1} />
							</div>
						</div>
						<div>
							<div>
								<h3 className="subtitle"> Resultados en el ultimo mes</h3>
								<div className="conteiner">
									<div class="chart" id="colum-1">
										<ColumChart metric={metric.propertyAverageLastMonth} keys={2} />
									</div>
									<div class="chart" id="colum-2">
										<ColumChart metric={metric.propertyAverageLastSixMonth} keys={3} />
									</div>
								</div>
							</div>
							<div>
								<h3 class="subtitle"> Resultados en los ultimos seis meses</h3>
								<div class="chart" id="colum-3">
									<ColumChart metric={metric.propertyAverageLastSixMonth} keys={3} />
								</div>
							</div>
						</div>
					</div>
				</ContentWrapper>
			) : null
			};
		</div>
	);
};

export default Metrics;
