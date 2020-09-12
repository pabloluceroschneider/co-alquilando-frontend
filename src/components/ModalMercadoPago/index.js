import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';

const ModalMercadoPago = () => {
    const [visible, setVisible] = useState(false);
    
    return (
        <div className="modal-async-mercado-pago"> 
            <Button type="primary" onClick={() => setVisible(true)}>
                Registrar link de pago
             </Button>
            <Modal
                title="Registrar link de pago por Mercado Pago"
                centered
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                width={1000}
            >
                <p>some contents...</p>
                <p>some contents...</p>
                <p>some contents...</p>
            </Modal>
        </div>
  );
}

export default ModalMercadoPago;