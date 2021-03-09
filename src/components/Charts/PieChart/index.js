import React, { useState, useEffect, useContext } from 'react';

const PieChart = ({ metric, keys }) => {

	window.google.charts.load('current', { packages: ['corechart'] });
	window.google.charts.setOnLoadCallback(drawChart);


	function drawChart() {
		if (typeof (metric) != 'undefined' && metric != null && metric.id != null) {

			let formated = {
				data: metric.propertiesAverage
			};

			var data = window.google.visualization.arrayToDataTable(formated.data);
			var options = {
				title: formated.data[0][1]
			};
			var chart = new window.google.visualization.PieChart(document.getElementById(`piechart-${keys}`));

			chart.draw(data, options);
		}
	}

	return (
		<div style={{ textAlign: '-webkit-center' }} key={keys}>
			<div id={`piechart-${keys}`} style={{ width: 800, height: 400 }} />
		</div>
	);
};

export default PieChart
