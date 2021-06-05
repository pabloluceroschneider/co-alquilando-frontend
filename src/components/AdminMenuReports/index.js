import React, { useState, useEffect, useContext } from 'react';
import { Menu, Switch, Divider } from 'antd';
import PieChart from '../Charts/PieChart';
import ColumChart from '../Charts/ColumChart';
import Spin from '../Spin';
import { SessionContext } from '../../store';
import ApiRequest from '../../util/ApiRequest';

const items = [
    "Datos generales del sistema",
    "Paquetes de publicaciones",
    "Resultados en el ultimo mes",
    "Resultados en los ultimos seis meses",
    "Resultados en los último año",
]

const AdminMenuReports = ({
  metric
}) => {
    const [selectedItem, setselectedItem] = useState('0');
    const handleItem = ({key}) => setselectedItem(key);

    const charts = metric && [
        <div >
            <div class="chart" id="pie-gral">
                <PieChart metric={metric.propertiesTotal} keys={1} />
                <PieChart metric={metric.usersTotal} keys={2} />
                <PieChart metric={metric.groupTotal} keys={3} />
            </div>
        </div>,
        <div>
            <div class="chart" id="pie-paymentPackage">
                <PieChart metric={metric.adQuantityTotal} keys={4} />
                <ColumChart metric={metric.adProfitTotal} keys={5} />
            </div>
        </div>,
        <div>
            <div className="chart">
                <ColumChart metric={metric.propertyAverageLastMonthTotal} keys={6} />
                <ColumChart metric={metric.paymentPackageLastMonthTotal} keys={7} />
            </div>
        </div>,
        <div>
            <div class="chart">
                <ColumChart metric={metric.propertyAverageLastSemesterTotal} keys={8} />
                <ColumChart metric={metric.paymentPackageLastSemesterTotal} keys={9} />
            </div>
        </div>,
        <div>
            <div class="chart">
                <ColumChart metric={metric.propertyAverageLastYearTotal} keys={10} />
                <ColumChart metric={metric.paymentPackageLastYearTotal} keys={11} />
            </div>
        </div>
    ]

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