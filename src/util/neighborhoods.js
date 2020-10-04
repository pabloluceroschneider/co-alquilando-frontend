import React, { useContext, useState, useEffect } from 'react';
import { Select } from 'antd'
import { notification } from 'antd';
import ApiRequest from './ApiRequest';
const { Option } = Select;


let neighborhood = async() => {
    let { data } = await ApiRequest.get(`location/all`);
    console.log(data);
    return [];
}

export default neighborhood;
