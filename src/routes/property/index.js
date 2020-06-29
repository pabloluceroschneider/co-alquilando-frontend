import React from "react";
import { Form, Input, Button, notification, Checkbox, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const FormProperty = () => {
  const contractOptions = [ "Dueño", "Inmobiliaria" ];

  const { Option } = Select;

  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Success:", values);
    notification.success({
      message: "Se cargo con éxito",
      description: "Se agrego correctamente la propiedad",
      placement: "bottomLeft",
    });
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    notification.error({
      message: "No se cargo la propiedad",
      description: "Ocurrio un error al cargar la propiedad",
      placement: "bottomLeft",
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
      layout="vertical"
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
      <div className="group">
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
          label="Habitaciones"
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
      </div>

      <Form.Item name="propertyAttributes" label="Comodidades">
        <Checkbox.Group>
          <Checkbox value="A">Ascensor</Checkbox>
          <Checkbox value="B">Patio</Checkbox>
          <Checkbox value="C">WiFI</Checkbox>
          <Checkbox value="D">Asador</Checkbox>
          <Checkbox value="E">Balcon</Checkbox>
          <Checkbox value="F">Cochera</Checkbox>
        </Checkbox.Group>
      </Form.Item>
      <div className="group">

      <Form.Item
        name="propertyContract"
        label="Tipo de Contrato"
      >
        <Select placeholder="Selecciona el tipo de contrato" allowClear>
            {contractOptions.map((c) => {
                return(
                    <Option key={c} value={c}>
                        {c}
                    </Option>
                )
            })}
          
        </Select>

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
      </div>

      <Form.Item name="images" label="Imagenes">
        <Upload name="logo" listType="picture">
          <Button>
            <UploadOutlined /> Elegir imagenes
          </Button>
        </Upload>
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
    <div className="form-property">
      <FormProperty />
    </div>
  );
};

export default Property;
