import React, { useState } from 'react'
import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

const CustomCheckboxGroup = props => {
    const { options, name } = props;
    const [ checkedList, setCheckedList ] = useState()
    const [ indeterminate, setIndeterminate ] = useState(true)
    const [ checkAll, setCheckAll ] = useState(false)

    const onChange = checkedList => {
        setCheckedList(checkedList);
        setIndeterminate( !!checkedList.length && checkedList.length < options.length );
        setCheckAll(checkedList.length === options.length)
    };

    const onCheckAllChange = e => {
        setCheckedList(e.target.checked ? options : []);
        setIndeterminate(false);
        setCheckAll(e.target.checked);
    };

    return (
      <div style={{textAlign:'left'}}>
        { props.all ? <div>
          <Checkbox
            indeterminate={indeterminate}
            onChange={onCheckAllChange}
            checked={checkAll}
          >
            Todos
          </Checkbox>
        </div>: null}
        <CheckboxGroup
          options={options}
          value={checkedList}
          onChange={onChange}
          name={name}
        />
      </div>
    );
}

export default CustomCheckboxGroup;