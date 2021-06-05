import React, { useState, useEffect, useContext } from 'react';
import { Menu, Switch, Divider } from 'antd';
import ContentWrapper from '../../components/ContentWrapper';
import AdminMenuReports from '../../components/AdminMenuReports';
import ColumChart from '../../components/Charts/ColumChart';
import { SessionContext } from '../../store';
import ApiRequest from '../../util/ApiRequest';

const MetricsAdmin = () => {
    const [metric, setMetric] = useState(null);
    const { state } = useContext(SessionContext);
    const breadscrumb = [
        { 'Administrador': '/admin'},
        { 'Métricas': '/reports-admin'},
    ];

    useEffect(()=>{
        const getMetric = async () => {
            await ApiRequest.get(`metric/owner/${state.user.id}`)
                .then(({ data }) => {
                    setMetric(data);
                })
            };
        getMetric();
    },[]);

    return (
        <ContentWrapper topNav breadscrumb={breadscrumb}>
            <div className="page reports-admin">
                <AdminMenuReports metric={metric} />
            </div>
        </ContentWrapper>
    );
};

export default MetricsAdmin;