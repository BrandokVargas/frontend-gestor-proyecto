import {Link} from "react-router-dom"
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";

const Registrar = () => {
   
    //Declaramos los estados para poder usar el state en el formlario
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");    
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    //Creamos un estado alerta para que se vaya actualizando conforme querramos.
    const [alerta,setAlerta] = useState({});


    //Creamos la funcion para pover mandar datos al servidor
    const handleSubmit = async (e) => {
        //Anula el evento default de formulario y evite que se actualice.
        e.preventDefault();

        //Validando entrada de datos para el formuario.
        if([nombre,email,password,confirmPassword].includes('')){
            //Actualizamos el estado alerta
            setAlerta({
                msg: 'Completa todos los campos.',
                error: true    
            })
            return
        }

        //Validando los passwords para que coincidan.
        if(password!== confirmPassword){
            //Actualizamos el estado alerta
            setAlerta({
                msg: 'Las contraseñas no coinciden.',
                error: true    
            })
            return
        }

        if(password.length < 6){
            //Actualizamos el estado alerta
            setAlerta({
                msg: 'La contraseña debe tener al menos 6 caracteres.',
                error: true    
            })
        }

        setAlerta({})

        //Haciendo consumo a nuestra API
        try {
            //Hacemos el llamado a nustra api de registro para el manejo de los errores
            const {data} = await clienteAxios.post( `/usuarios`,{
                nombre,email,password
            })
            
            //Mostramos el mensaje que se ha registrado correctamente
            setAlerta({
                msg: data.msg, //Hacemos la peticion par aque se muestre el mensaje que esta en la API
                error: false    
            })

            //Limpiamos los campos del formulario.
            setNombre('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');


        } catch (error) {
            const {data} = error.response;
            setAlerta({
                msg: data.msg, //Hacemos la peticion par aque se muestre el mensaje que esta en la API
                error: true
            })

        }


    }

    const {msg} = alerta;



  return (
    <>
        <h1 className="text-sky-600 font-black text-4xl text-center">Crea tu cuenta</h1>
        
        {msg && <Alerta alerta={alerta} />}

        <form 
            className="my-10 bg-white shadow rounded-lg p-10"
            onSubmit={handleSubmit}
        >
            <div className="my-5">
                <label 
                    className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="nombre"
                >Nombre</label>
                <input
                    id="nombre"
                    type="text"
                    placeholder="Tu Nombre"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>

            <div className="my-5">
                <label 
                    className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="email"
                >Correo electrónico</label>
                <input
                    id="email"
                    type="email"
                    placeholder="Email de Registro"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="my-5">
                <label 
                    className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="password"
                >Contraseña</label>
                <input
                    id="password"
                    type="password"
                    placeholder="Password de Registro"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
            </div>

            <div className="my-5">
                <label 
                    className="uppercase text-gray-600 block text-xl font-bold"
                    htmlFor="password2"
                >Confirma tu contraseña</label>
                <input
                    id="password2"
                    type="password"
                    placeholder="Repetir tu Password"
                    className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                />
            </div>

            <input 
                type="submit"
                value="Crear Cuenta"
                className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
            />
            
        </form>

        <nav className="lg:flex lg:justify-between">
            <Link 
                className='block text-center my-5 text-slate-500 text-sm'
                to="/"
            >¿Ya tienes una cuenta? <span className="text-sky-600">Inicia sesión</span> </Link>

            <Link 
                className='block text-center my-5 text-slate-500 text-sm'
                to="/olvide-password"
            >Olvide mi contraseña</Link>
        </nav>
    
    </>
  )
}

export default Registrar