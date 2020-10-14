import React, { useState } from 'react';
import { Button, Tooltip, Form, InputNumber, Checkbox } from 'antd';
import { FilterOutlined, CloseOutlined, DownOutlined } from "@ant-design/icons";
import SelectDB from '../InputRepository/SelectDB'

const FilterProperties = ({onFilter}) => {
    const [filters] = Form.useForm();

    return (
        <div className="panel" >
            <div className="filter-content">
                <Form form={filters} onFinish={onFilter}>
                    <div className="form">
                        <Form.Item name="neighborhood" label="Barrio">
                            {SelectDB({endpoint:"/location/all",search:"neighborhood",size:"small"})}
                        </Form.Item>

                        <Form.Item name="price" label="Precio Máximo">
                            <InputNumber size="small"/>
                        </Form.Item>

                        <Form.Item name="rooms" label="Habitaciones">
                            <InputNumber size="small"/>
                        </Form.Item>

                        <Form.Item name="pets" label="Acepta Mascotas" valuePropName="checked">
                            <Checkbox />
                        </Form.Item>

                        <Form.Item name="gym" label="Gimnasio" valuePropName="checked">
                            <Checkbox/>
                        </Form.Item>

                        <Form.Item name="pool" label="Pileta" valuePropName="checked">
                            <Checkbox/>
                        </Form.Item>

                        <Form.Item name="playroom" label="Salón de Juegos" valuePropName="checked">
                            <Checkbox/>
                        </Form.Item>

                        <Form.Item name="garage" label="Garage" valuePropName="checked">
                            <Checkbox/>
                        </Form.Item>

                        <Form.Item name="balcony" label="Balcón" valuePropName="checked">
                            <Checkbox/>
                        </Form.Item>

                        <Form.Item name="elevator" label="Ascensor" valuePropName="checked">
                            <Checkbox/>
                        </Form.Item>
                        
                        <Form.Item name="furnished" label="Amoblado" valuePropName="checked">
                            <Checkbox/>
                        </Form.Item>
                    </div>

                    <Form.Item>
                        <Button htmlType="submit">Filtrar</Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

const Filters = ({title, onFilter}) => {
    const [showPanel, setshowPanel] = useState( window.screen.width > 600 ? true : false);
    const [collapse, setCollapse] = useState(true);
    const togglePanel = () => setshowPanel(!showPanel)
    const toggleCollapse = () => setCollapse(!collapse);

    return (
        <div className="wrapper-filter">
            {!showPanel ?
                <Tooltip title={title}>
                    <Button shape="circle" onClick={togglePanel} icon={<FilterOutlined />}/>
                </Tooltip> 
                : (
                    <div className="header" onClick={toggleCollapse}>
                        <span><FilterOutlined />{title}</span>
                        {window.screen.width < 600 ?
                            <CloseOutlined /> 
                            : collapse ? 
                                <CloseOutlined/> 
                                : <DownOutlined/>
                        }
                    </div>
                )
            }

            {collapse &&
                <FilterProperties onFilter={onFilter} />
            }
            
        </div>
    )
}

export default Filters;
