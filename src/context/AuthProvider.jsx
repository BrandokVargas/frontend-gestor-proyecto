import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";



const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({});
    const [cargando,setCargando] = useState(true);
    console.log("a",auth._id)
    const navigate = useNavigate();

 
    useEffect(()=>{
        const autenticarUser = async () => {
            const token = localStorage.getItem('token')
            if(!token){ 
                setCargando(false)
                return
            }

            const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`

                }
            }

            try {
                const {data} = await clienteAxios('/usuarios/perfil',config)
                setAuth(data)
                navigate('/proyectos')
            } catch (error) {
                setAuth({})
            } 
        
            setCargando(false)
        }
        autenticarUser();
    },[])


    return (
        <AuthContext.Provider
            value={{
                //States globales
                auth,
                setAuth,
                cargando
            }}
        >
            {children}
        </AuthContext.Provider>

    )
}

export {
    AuthProvider
}

export default AuthContext;
