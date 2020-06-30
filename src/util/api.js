import axios from 'axios';

const url = {
    local: "http://localhost:8080"
}

export default axios.create({
    baseUrl: url.local,
    headers:{
        'Content-Type':'application/json'
    }
})

