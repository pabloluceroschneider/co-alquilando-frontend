import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Tag } from 'antd';
import { FilterOutlined, CloseOutlined } from "@ant-design/icons";
import { getParams } from '../../util/getParams';

const FilterPanel = ({filters, onClose}) => {
    const { t } = useTranslation();

    const [ params ] = getParams()

    return (
        <div className="panel" >
            <div className="header">
                <span><FilterOutlined /> Filtros</span>
                { window.screen.width < 600 ? <CloseOutlined onClick={onClose} /> : null}
            </div>
            <div className="filter-content">
                {params?.map( p => {
                    return <Tag closable color="processing" key={p[0]}>{`${t(p[0])}`}</Tag>
                })}
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

    const togglePanel = () => setshowPanel(!showPanel)

    return (
        <div className="wrapper-filter">
            {!showPanel &&
                <Button onClick={togglePanel} icon={<FilterOutlined /> } />
            }

            {showPanel &&
                <div>
                    <FilterPanel filters={filters} onClose={togglePanel} />
                </div>
            }
            
        </div>
    )
}

export default Filters;
