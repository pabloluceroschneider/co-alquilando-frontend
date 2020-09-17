import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Tag } from 'antd';
import { FilterOutlined, CloseOutlined } from "@ant-design/icons";
import getParams from '../../util/getParams';

const FilterPanel = ({filters, onClose}) => {

    return (
        <div className="panel" >
            <div className="header">
                <span><FilterOutlined /> Filtros</span>
                <CloseOutlined onClick={onClose} /> 
            </div>
            <div className="filter-content">
                <form>
                    {filters?.map( f => {
                        return (
                            <div key={f.name} className="filter-item">
                                <span htmlFor={f.name}>{f.span}</span>
                                <input type={f.type} name={f.name}/>
                            </div>
                        )
                    })}
                    <button type="submit">Filtrar</button>
                </form>
            </div>
        </div>
    )
}

const Filters = ({filters}) => {
    const [showPanel, setshowPanel] = useState( window.screen.width > 600 ? true : false);
    const { t } = useTranslation();

    const togglePanel = () => setshowPanel(!showPanel)

    const [ params ] = getParams()

    return (
        <div className="wrapper-filter">
            {!showPanel &&
                <Button onClick={togglePanel} icon={<FilterOutlined /> } />
            }

            {showPanel &&
                <div>
                    <div className="params">
                        {params?.map( p => {
                            return <Tag closable color="processing" key={p[0]}>{`${t(p[0])} : ${t(p[1])}`}</Tag>
                        })}
                    </div>
                    <FilterPanel filters={filters} onClose={togglePanel} />
                </div>
            }
            
        </div>
    )
}

export default Filters;
