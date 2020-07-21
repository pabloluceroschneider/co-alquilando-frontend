import React from "react";
import { Slider } from "antd";

const SliderForm = (props) => {

  return (
    <>
      <Slider
        range
        step={2}
        min={18}
        max={100}
        marks= { {
          18: "18 años",
        }}
        defaultValue={[18, 50]}
        onAfterChange={props.onChange}
      />
    </>
  );
};

export default SliderForm;
