import React from 'react';
import { Form, notification } from 'antd';
import adFields from '../../forms/POST_AD';
import ContentWrapper from '../../components/ContentWrapper';
import CustomizedForm from '../../components/CustomizedForm';
import ApiRequest from '../../util/ApiRequest';

const Ad = () => {
    const [form] = Form.useForm()
    const breadscrumb = [
        { "Publicidades": "/ads" },
        { "Publicar Publicidad": "/ad" },
      ];

    const postAd = values => {
      let formatedBodyReq = {
        ...values, 
        startDate: values.startDate.toString(),
        endDate: values.endDate.toString(),
      }
      console.log('formatedBodyReq =>', formatedBodyReq)

      const createAd = async () => {
        await ApiRequest.post('/ad', formatedBodyReq).then(res => {
          notification.success({
            message: "Publicidad publicada con éxito",
            placement: "bottomLeft"
          })
          form.resetFields()
        }).catch(err => {
          notification.error({
            message: "Error: no se pudo publicar la publicidad",
            placement: "bottomLeft"
          })
        })
      }

      createAd();
    }

    return (
		<ContentWrapper topNav footer breadscrumb={breadscrumb}>
			<CustomizedForm form={form} data={adFields} onfinish={postAd} />
		</ContentWrapper>
	);
}

export default Ad