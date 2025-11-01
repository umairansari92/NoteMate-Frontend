import axios from "axios";

const API=  axios.create({
    baseURL: "https://note-mate-backend-six.vercel.app/",

})

// attach token automatically if exists

API.interceptors.request.use((req)=>{
    const token =localStorage.getItem("token")
    if(token){
        req.headers.Authorization=`Bearer ${token}`
    }
    return req
})

export default API;