import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Tag } from 'antd';
import { FilterOutlined, CloseOutlined, DownOutlined } from "@ant-design/icons";
import { getParams } from '../../util/getParams';

const FilterPanel = ({filters, onClose}) => {
    const { t } = useTranslation();
    const [ params ] = getParams();
    const [collapse, setCollapse] = useState(true);
    const toggleCollapse = () => setCollapse(!collapse);

    return (
        <div className="panel" >
            <div className="header">
                <span><FilterOutlined /> Filtros</span>
                {window.screen.width < 600 ?
                    <CloseOutlined onClick={onClose}/> 
                    : collapse ? 
                        <CloseOutlined onClick={toggleCollapse}/> 
                        : <DownOutlined onClick={toggleCollapse}/>
                }
            </div>
            <div className={`filter-content collapse-${collapse}`}>
                <div className="tags">
                    {params?.map( p => {
                        return <Tag closable color="processing" key={p[0]}>{`${t(p[0])}`}</Tag>
                    })}
                </div>
                <form>
                    {filters?.map( f => {
                        return (
                            <div key={f.name} className="filter-item">
                                <span htmlFor={f.name}>{f.span}</span>
                                <input type={f.type} name={f.name} id={f.name} list={`datalist-${f.name}`} min={f.min} />
                                {f.type === "datalist" ?
                                    <datalist id={`datalist-${f.name}`}>
                                        {f.options.map( op => {
                                        return <option key={op.value} value={op.value}>{op.name}</option>
                                        })}
                                    </datalist> : null
                                }
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
                <Button onClick={togglePanel} icon={<FilterOutlined /> }>Filtros</Button>
            }

            {showPanel &&
                <FilterPanel filters={filters} onClose={togglePanel} />
            }
            
        </div>
    )
}

export default Filters;
