import React, { useState, useEffect, useContext } from 'react';
import { SessionContext } from '../../../store';
import ApiRequest from '../../../util/ApiRequest';


const props = {
	data: [
		['Task', 'Hours per Day'],
		['Work', 11],
		['Eat', 2],
		['Commute', 2],
		['Watch TV', 2],
		['Sleep', 7]
	]
};

const PieChart = () => {
	const [ metric, setMetric ] = useState();
	const { state, dispatch } = useContext(SessionContext);

	window.google.charts.load('current', { packages: ['corechart'] });
	window.google.charts.setOnLoadCallback(drawChart);


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



	function drawChart() {
		console.log("metric:", metric);
		console.log("props:", props);

		if (typeof(metric) != 'undefined' && metric != null ) {
			console.log(metric.propertiesAverage);

			let formated = {
				data : [metric.propertiesAverage]
			} 
			

			console.log(formated);


			var data = window.google.visualization.arrayToDataTable(formated);
		}

		var options = {
			title: 'My Daily Activities'
		};

		var chart = new window.google.visualization.PieChart(document.getElementById('piechart'));

		chart.draw(data, options);
	}

	return (
		<div style={{ textAlign: '-webkit-center' }}>
			<div id="piechart" style={{ width: 900, height: 500 }} />
		</div>
	);
};

export default PieChart
