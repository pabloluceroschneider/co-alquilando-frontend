import React from "react";
import { Form, Input, Button, notification } from "antd";

const FormProperty = () => {
    const [ form ] = Form.useForm()
  const onFinish = (values) => {
    console.log("Success:", values);
    notification.success({
        message: 'Se cargo con éxito',
        description:
          'Se agrego correctamente la propiedad',
        placement: 'bottomLeft'
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    notification.error({
        message: 'No se cargo la propiedad',
        description:
          'Ocurrio un error al cargar la propiedad',
        placement: 'bottomLeft'
      });
  };
  return (
    <Form
      name="propery"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}
      layout='vertical'
    >
      <Form.Item
        label="Titulo"
        name="propertyTitle"
        rules={[
          {
            required: true,
            message: "Please input property title!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Dirección"
        name="propertyAddress"
        rules={[
          {
            required: true,
            message: "Please input property address!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Ambientes"
        name="propertyRooms"
        rules={[
          {
            required: true,
            message: "Please input property rooms!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Precio"
        name="propertyPrice"
        rules={[
          {
            required: true,
            message: "Please input property price!",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
				<Button type="primary" htmlType="submit">
					Publicar
				</Button>
			</Form.Item>
    </Form>
  );
};

const Property = (props) => {
  return (
    <div className='form-property'>
      <FormProperty />
    </div>
  );
};

export default Property;
