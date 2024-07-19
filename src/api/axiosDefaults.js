import axios from "axios"

axios.defaults.baseURL = 'https://pp5-drobota-bd94aa0a3e49.herokuapp.com/'
axios.defaults.headers.post['Content-Type'] = 'multipart/form-data'
axios.defaults.withCredentials = true

export const axiosReq = axios.create()
export const axiosRes = axios.create()
