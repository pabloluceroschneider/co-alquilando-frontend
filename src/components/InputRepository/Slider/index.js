import React, { useState } from "react";
import { Slider } from "antd";

const SliderForm = (props) => {
  const [minAge, setMinAge] = useState(null);
  const [maxAge, setMaxAge] = useState(null);

  function onChange(value) {
    console.log("onChange: ", value);
    setMinAge(value[0]);
    setMaxAge(value[1]);
   
  }

  function onAfterChange(value) {
    console.log("onAfterChange: ", value);
    setMinAge(value[0]);
    setMaxAge(value[1]);
    console.log("MinAge =>",minAge)
    console.log("MaxAge =>",maxAge)
  }
  const marks = {
    18: "18 años",
  };
  return (
    <>
      <Slider
        range
        step={2}
        min={18}
        max={100}
        marks={marks}
        defaultValue={[18, 50]}
        onChange={onChange}
        onAfterChange={onAfterChange}
      />
    </>
  );
};

export default SliderForm;
