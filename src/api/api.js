import axios from "axios";


export default axios.create({
    baseURL: 'https://memorias-sv.herokuapp.com/'
})