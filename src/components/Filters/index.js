import React, { useState } from 'react';
import { FilterOutlined } from "@ant-design/icons";

const FilterPanel = ({filters, onClose}) => {

    return (
        <div className="panel" >
            <div onClick={onClose}>
                Panel
            </div>
        </div>
    )
}

const Filters = ({filters}) => {
    const [showPanel, setshowPanel] = useState(false);

    const togglePanel = () => setshowPanel(!showPanel)

    return (
        <div className="wrapper-filter">
            {
                !showPanel ?

                <button type="button" onClick={togglePanel}>
                    <FilterOutlined /> Filters
                </button>

                : <FilterPanel filters={filters} onClose={togglePanel} />

            }
            
        </div>
    )
}

export default Filters;
