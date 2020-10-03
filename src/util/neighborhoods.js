import useState from 'react';
import ApiRequest from '../util/ApiRequest';

let n = null;
//const [neighborhoods, setNeighborhoods] = useState(null);

let asyncNeighborhoods = async () => {
    let { data } = await ApiRequest.get(`location/all`);
    //setNeighborhoods(data)
    n=data;
}
asyncNeighborhoods();

export default n;


