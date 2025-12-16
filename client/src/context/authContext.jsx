
import { createContext,useContext,useEffect,useState } from "react";
const AuthContext = createContext(null);


export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);
    const[token,setUserToken]=useState(null);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        const storedToken=localStorage.getItem('token');
        const storedUser=localStorage.getItem('user');
        if(storedToken && storedUser)
        {
            setUserToken(storedToken);
            setUser(JSON.parse(storedUser))
        }
        setLoading(false)
    },[])

    const Login=(userData,token)=>{
        setUser(userData);
        setUserToken(token);
        localStorage.setItem('token',token);
        localStorage.setItem('user',JSON.stringify(userData));
    }


    const Logout=()=>{
        setUser(null);
        setUserToken(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    const Register=(userData,token)=>{
        setUser(userData);
        setUserToken(token);
        localStorage.setItem('token',token);
        localStorage.setItem('user',JSON.stringify(userData));
    }

    return(
        <AuthContext.Provider value={{
            user,
            token,
            isAuthenticated:!!token,
            Login,
            Logout,
            Register,
            loading
        }}
        >{children}</AuthContext.Provider>
    )

}


const useAuth=()=>useContext(AuthContext);
export default useAuth;