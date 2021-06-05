import React, { useState, useEffect, useContext } from 'react';
import { Menu, Switch, Divider } from 'antd';
import PieChart from '../Charts/PieChart';
import ColumChart from '../Charts/ColumChart';
import Spin from '../Spin';
import { SessionContext } from '../../store';
import ApiRequest from '../../util/ApiRequest';

const items = [
  "Datos generales",
  "Resultados en el ultimo mes",
  "Resultados en los últimos seis meses",
  "Resultados en los último año"
];

const AdminMenuReports = ({
  metric
}) => {
    const [selectedItem, setselectedItem] = useState('0');
    const handleItem = ({key}) => setselectedItem(key);

    const charts = metric && [
      <div class="chart" id="pie">
        <PieChart metric={metric.propertiesAverage} keys={1} />
      </div>,
      <div>
        <ColumChart metric={metric.propertyAverageLastMonth} keys={2} />
        <ColumChart metric={metric.groupAverageLastMonth} keys={3} />
        <ColumChart metric={metric.paymentPackageLastMonth} keys={4} />
      </div>,
      <div class="chart" id="colum-3">
        <ColumChart metric={metric.propertyAverageLastSemester} keys={5} />
        <ColumChart metric={metric.groupAverageLastSemester} keys={6} />
        <ColumChart metric={metric.paymentPackageLastSemester} keys={7} />
      </div>,
      <div class="chart" id="colum-3">
        <ColumChart metric={metric.propertyAverageLastYear} keys={8} />
        <ColumChart metric={metric.propertyAverageLastSixMonth} keys={9} />
      </div>
    ];

    return (
    <>
      <Menu className="menu-admin-reports" defaultSelectedKeys={['0']}>
        {items.map( (item, index) => (
          <Menu.Item 
            key={index}
            onClick={handleItem}
            >
            {item}
          </Menu.Item>
        ))}
      </Menu>

      <section className="charts">
        {metric 
        ? charts[selectedItem] 
        : <Spin />}
      </section>
    </>
    );
};

export default AdminMenuReports;