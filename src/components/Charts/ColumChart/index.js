import React, { useState, useEffect, useContext } from 'react';


const ColumChart = ({ metric, keys }) => {
  window.google.charts.load('current', { packages: ['corechart'] });
  window.google.charts.setOnLoadCallback(drawChart);

  function drawChart() {
    if (typeof (metric) != 'undefined' && metric != null) {

      var colors = [{ "role": "style" }, '#76b5c5', '#1e81b0'];

      console.log("metric 1: ", metric);

      let formatedMetric = metric.map((a, index) => {
        console.log("a ", a);
        return a.push(colors[index])
      });

      console.log("metric 2: ", metric);

      var data = window.google.visualization.arrayToDataTable(
        metric
      );


      var options = {
        title: metric[0][0],
        width: 600,
        height: 400,
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

      var chart = new window.google.visualization.ColumnChart(document.getElementById("columnchart_values"));
      chart.draw(view, options);
    }
  }

  return (
    <div style={{ textAlign: '-webkit-center' }} key={keys}>
      <div id="columnchart_values" style={{ width: 800, height: 400 }} />
    </div>
  );

};

export default ColumChart
