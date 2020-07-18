import React from "react";
import { Form, Input, Checkbox } from "antd";
import Select from "./Select";
import Upload from "./Upload";
import DatePicker from "./DatePicker";
import CheckboxGroup from "./CheckboxGroup";
import SliderForm from "./Slider";

const InputRepository = (props) => {
  const { label, name, component, required } = props;

  const pickInput = () => {
    switch (component) {
      case "Input":
        return <Input />;
      case "Input.Password":
        return <Input.Password />;
      case "Input.Number":
        return <Input.Number />;
      case "Input.TextArea":
        return <Input.TextArea />;
      case "Checkbox":
        // revisar, no retorna valor
        return <Checkbox />;
      case "CheckboxGroup":
        // revisar, no retorna valor
        return CheckboxGroup({ ...props, all: true });
      case "DatePicker":
        return DatePicker(props);
      case "Select":
        return Select(props);
      case "Upload":
        return <Upload />;
      default:
        return <Input />;
    }
  };

  switch (component) {
    case "label":
      return <label className="label" key={label}>{label}</label>;
    case "h2":
      return <h2 className="h2" key={label}>{label}</h2>;
    case "link":
      return (
        <a key={props.label} href={props.href} rel="noopener noreferrer">
          {props.label}
        </a>
      );
    case "slider":
      return <SliderForm key={label} />
    default:
      return (
        <Form.Item
          key={label}
          label={label}
          name={name}
          dependencies={props.dependencies}
          hasFeedback={props.hasFeedback}
          valuePropName={props.valuePropName}
          className={component}
          rules={
            props.validate
              ? [
                  {
                    required: required,
                    message: `Porfavor, ingrese ${label}`,
                  },
                  props.validate,
                ]
              : [
                  {
                    required: required,
                    message: `Porfavor, ingrese ${label}`,
                  },
                ]
          }
        >
          {pickInput()}
        </Form.Item>
      );
  }
};

export default InputRepository
