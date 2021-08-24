import React from "react";
import { Link } from "react-router-dom";
import { Form, Input, Checkbox, InputNumber } from "antd";
import Select from "./Select";
import SelectDB from "./SelectDB";
import Upload from "./Upload";
import DatePicker from "./DatePicker";
import CheckboxGroup from "./CheckboxGroup";
import SliderForm from "./Slider";
import ClickeableMap from "../../components/ClickeableMap"

const InputRepository = props => {
  const { element, form } = props;

  const onChange = value => {
    form.setFieldsValue({
      [element.name]: value
    })
  }

  const propMap = () => {
    if (props.element.form === "post"){
      return {
        post: true
      }
    }
    let latitude = props.form.getFieldValue([element.name]) ? props.form.getFieldValue([element.name])["latitude"] : null
    let length = props.form.getFieldValue([element.name]) ? props.form.getFieldValue([element.name])["length"] : null
    return {
      post: false,
      coordinates: {
        latitude,
        length
      }
    }
  }

  const pickInput = () => {
    switch (element.component) {
      case "Input":
        return <Input disabled={element.disabled}/>;
      case "Input.Password":
        return <Input.Password />;
      case "InputNumber":
        return <InputNumber />
      case "Input.Currency":
        return <Input prefix="$" />
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
        return Select(element);
      case "SelectDB":
        return SelectDB(element);
      case "Upload":
        return <Upload onChange={onChange} {...props} key={element.label} />;
      case "slider":
        return <SliderForm onChange={onChange} {...props} key={element.label} />
      case "Map":
        let propsMap = propMap()
        if ( !propsMap.post && !propsMap.coordinates.latitude & !propsMap.coordinates.length) return <div>Cargando Mapa....</div>
        return <div id="formMap" style={{ height: `300px`, width: `100%` }}>
          <ClickeableMap
            googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyDzoLTHAJKj5xymA3iBqJxxQl-MYG9R_ag"
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `300px`, width: `300px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
            zoomLevel={10}
            onChange={onChange}
            {...propsMap.coordinates}
          />
        </div>
      default:
        return <Input />;

    }
  };

  switch (element.component) {

    case "label":
      return <label className="label" key={element.label}>{element.label}</label>;
    case "span":
      return <span className="span" key={element.label}>{element.label}</span>;
    case "multiple-line":
      return (
        <div key={element.label} className='multiple-line'>
          {
            element.content.map( (label,i) => {
              return <p className="span" key={i}>{label}</p>;
            })
          }
        </div>
      )
    case "h2":
      return <h2 className="h2" key={element.label}>{element.label}</h2>;
    case "link":
      return (
        <Link to={element.href}>
          {element.label}
        </Link>
      );
    default:
      return (
        <Form.Item
          key={element.label}
          label={element.label}
          name={element.name}
          dependencies={element.dependencies}
          hasFeedback={element.hasFeedback}
          valuePropName={element.valuePropName}
          className={element.component}
          rules={
            element.validate
              ? [
                {
                  required: element.required,
                  message: `Porfavor, ingrese ${element.label}`,
                },
                element.validate,
              ]
              : [
                {
                  required: element.required,
                  message: `Porfavor, ingrese ${element.label}`,
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
