import React, { useState, useEffect, useContext } from 'react';

const PieChart = ({ metric, keys }) => {

	window.google.charts.load('current', { packages: ['corechart'] });
	window.google.charts.setOnLoadCallback(drawChart);


	function drawChart() {
		if (typeof (metric) != 'undefined' && metric != null) {

			let formated = {
				data: metric
			};

			var data = window.google.visualization.arrayToDataTable(formated.data);

			var options = {
				title: formated.data[0][1],
				colors: ['#76b5c5',  '#1e81b0', '#0a5da4', '#154c79']

			};
			var chart = new window.google.visualization.PieChart(
				document.getElementById(`piechart-${keys}`));

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
