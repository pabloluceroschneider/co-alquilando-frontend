import React from 'react'

const props = {
	data: [
		[ 'Task', 'Hours per Day' ],
		[ 'Work', 11 ],
		[ 'Eat', 2 ],
		[ 'Commute', 2 ],
		[ 'Watch TV', 2 ],
		[ 'Sleep', 7 ]
	]
};

const PieChart = () => {
	window.google.charts.load('current', { packages: [ 'corechart' ] });
	window.google.charts.setOnLoadCallback(drawChart);

	function drawChart() {
		var data = window.google.visualization.arrayToDataTable(props.data);

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
