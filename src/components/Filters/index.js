import React, { useState } from 'react';
import { Button } from 'antd';
import { FilterOutlined, CloseOutlined } from "@ant-design/icons";

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

    const togglePanel = () => setshowPanel(!showPanel)

    return (
        <div className="wrapper-filter">
            {
                !showPanel ?

                <Button onClick={togglePanel} icon={<FilterOutlined /> } />

                : <FilterPanel filters={filters} onClose={togglePanel} />

            }
            
        </div>
    )
}

export default Filters;
