import axios from "axios";

// backend url
const API_URL = axios.create({
    baseURL: "https://house-painting-service.herokuapp.com"
})

export default API_URL;