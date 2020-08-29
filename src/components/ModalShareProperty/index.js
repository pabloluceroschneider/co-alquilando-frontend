import React, { useState } from 'react';
import { Tag, Modal } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const ModalShareProperty = () => {
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(0);

    const handleVisible = () => {
        setVisible(!visible)
    }

    const list = [ "Grupo 1", "Grupo 2" ]

    const isSelected = index => {
        return selected === index ? "selected" : ""
    }

    const handleSelected = index => {
        setSelected(index)
    }

    return (
        <div className="share-property">
            <Tag onClick={handleVisible} icon={<SendOutlined />} color="#5e83ba">Compartir en Grupo</Tag>
            <Modal
                title="Selecciona Grupo"
                visible={visible}
                onCancel={handleVisible}
                onOk={handleVisible}
                className="share-property"
            >
                {list.map( (l, index) => {
                    return (
                        <div onClick={() => handleSelected(index)} key={index} className={`group ${isSelected(index)}`}>
                            <p>{l}</p>
                        </div>
                    )
                })}
            </Modal>
        </div>
    )
}

export default ModalShareProperty;