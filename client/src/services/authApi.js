import axios from 'axios';
const VITE_API_URL=import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1'

export const Login=async(email,password)=>{
    const response=await axios.post(`${VITE_API_URL}/auth/login`,{
        email:email,
        password:password
    })
    return response.data;

}

export const Register=async(name,email,password)=>{
    const response=await axios.post(`${VITE_API_URL}/auth/register`,{
        name:name,
        email:email,
        password:password
    })
     return response.data
}


export const Logout=async(token)=>{
    const response=await axios.post(`${VITE_API_URL}/auth/logout`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })
    return response.data;
}

export const getUsers=async (token) => {

    const response=await axios.get(`${VITE_API_URL}/auth/get-users`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    })

    return response.data;

    
}