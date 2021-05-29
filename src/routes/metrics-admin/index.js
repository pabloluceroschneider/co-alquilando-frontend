import React, { useState, useEffect, useContext } from 'react';
import ContentWrapper from '../../components/ContentWrapper';
import PieChart from '../../components/Charts/PieChart';
import ColumChart from '../../components/Charts/ColumChart';
import { SessionContext } from '../../store';
import ApiRequest from '../../util/ApiRequest';

const MetricsAdmin = () => {
    const [metric, setMetric] = useState();
    const { state, dispatch } = useContext(SessionContext);
    const breadscrumb = [{ 'Reportes': '/reports' }]

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
                    <div >
                        <h3 class="subtitle">   Datos generales del sistema</h3>
                        <div class="chart" id="pie-gral">
                            <PieChart metric={metric.propertiesTotal} keys={1} />
                            <PieChart metric={metric.usersTotal} keys={2} />
                            <PieChart metric={metric.groupTotal} keys={3} />
                        </div>
                    </div>
                    <div>
                        <h3 class="subtitle">   Paquetes de publicaciones</h3>
                        <div class="chart" id="pie-paymentPackage">
                            <PieChart metric={metric.adQuantityTotal} keys={4} />
                            <ColumChart metric={metric.adProfitTotal} keys={5} />
                        </div>
                    </div>
                    <div>
                        <div>
                            <h3 className="subtitle">   Resultados en el ultimo mes</h3>
                            <div className="chart">
                                <ColumChart metric={metric.propertyAverageLastMonthTotal} keys={6} />
                                <ColumChart metric={metric.paymentPackageLastMonthTotal} keys={7} />
                            </div>
                        </div>
                        <div>
                            <h3 class="subtitle">   Resultados en los ultimos seis meses</h3>
                            <div class="chart">
                                <ColumChart metric={metric.propertyAverageLastSemesterTotal} keys={8} />
                                <ColumChart metric={metric.paymentPackageLastSemesterTotal} keys={9} />
                            </div>
                        </div>
                        <div>
                            <h3 class="subtitle">   Resultados en los último año</h3>
                            <div class="chart">
                                <ColumChart metric={metric.propertyAverageLastYearTotal} keys={10} />
                                <ColumChart metric={metric.paymentPackageLastYearTotal} keys={11} />
                            </div>
                        </div>
                    </div>
                </ContentWrapper>
            ) : null
            };
        </div>
    );
};

export default MetricsAdmin;