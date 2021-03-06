import React, { useState, useEffect } from 'react';
import { Form, notification } from 'antd';
import adFields from '../../forms/POST_AD';
import ContentWrapper from '../../components/ContentWrapper';
import CustomizedForm from '../../components/CustomizedForm';

const Ad = () => {
    const [fields, setFields] = useState(null)
    const [form] = Form.useForm()
    const breadscrumb = [
        { "Publicidades": "/ads" },
        { "Publicar Publicidad": "/ad" },
      ];

    return (
		<ContentWrapper topNav footer breadscrumb={breadscrumb}>
			<CustomizedForm form={form} data={adFields} onfinish={setFields} />
		</ContentWrapper>
	);
}

export default Ad