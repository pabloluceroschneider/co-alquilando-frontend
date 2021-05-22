import React from 'react'
import { Form } from 'antd';
import CustomizedForm from '../../components/CustomizedForm'
import contactForm from '../../forms/CONTACT_US';



export default function ContactUs() {
	const [ form ] = Form.useForm();

    return (
        <div>
            <h1 className="title">Contáctanos</h1>
            <CustomizedForm form={form} data={contactForm} onfinish={console.log} />
        </div>
    )
}
