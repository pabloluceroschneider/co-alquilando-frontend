import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';


const ColumChart = ({ metric, keys }) => {
  const { t } = useTranslation();
  window.google.charts.load('current', { packages: ['corechart'] });
  window.google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    if (typeof (metric) != 'undefined' && metric != null) {

      var colors = [{ "role": "style" }, '#76b5c5', '#1e81b0'];

      let formatedMetric = metric.map((a, index) => {
        console.log("a ", a);
        return a.push(colors[index])
      });

      var data = window.google.visualization.arrayToDataTable(
        metric
      );

      var options = {
        width: 500,
				height: 340,
        title: t(`title-metric-${metric[0][0]}`),
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
      };

      var view = new window.google.visualization.DataView(data);
      view.setColumns([0, 1,
        {
          calc: "stringify",
          sourceColumn: 1,
          type: "string",
          role: "annotation"
        },
        2]);

      var chart = new window.google.visualization.ColumnChart(document.getElementById(`columnchart_values-${keys}`));
      chart.draw(view, options);
    }
  }

  return (
    <div style={{ textAlign: '-webkit-center' }} key={keys}>
      <div id={`columnchart_values-${keys}`} />
    </div>
  );

};

export default ColumChart
