import { Link } from "react-router-dom"
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
    const [alerta, setAlerta] = useState({});


    //Creamos la funcion para pover mandar datos al servidor
    const handleSubmit = async (e) => {
        //Anula el evento default de formulario y evite que se actualice.
        e.preventDefault();

        //Validando entrada de datos para el formuario.
        if ([nombre, email, password, confirmPassword].includes('')) {
            //Actualizamos el estado alerta
            setAlerta({
                msg: 'Completa todos los campos.',
                error: true
            })
            return
        }

        //Validando los passwords para que coincidan.
        if (password !== confirmPassword) {
            //Actualizamos el estado alerta
            setAlerta({
                msg: 'Las contraseñas no coinciden.',
                error: true
            })
            return
        }

        if (password.length < 6) {
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
            const { data } = await clienteAxios.post(`/usuarios`, {
                nombre, email, password
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
            const { data } = error.response;
            setAlerta({
                msg: data.msg, //Hacemos la peticion par aque se muestre el mensaje que esta en la API
                error: true
            })

        }


    }

    const { msg } = alerta;



    return (
        <>


            {msg && <Alerta alerta={alerta} />}

            <form
                className="my-10 bg-white shadow-2xl rounded-lg p-10"
                onSubmit={handleSubmit}
            >
                <h1 className="text-black font-black text-4xl text-center">Crea tu cuenta</h1>
                <div className="my-5">
                    <div className="relative mt-2 rounded shadow-sm">
                        <input
                            id="nombre"
                            type="text"
                            placeholder="Nombre"
                            className="w-full pl-10 py-2 pr-3 border border-black focus:outline-none rounded-full bg-gray-50"
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                        </div>
                    </div>


                </div>

                <div className="my-5">
                    <div className="relative mt-2 rounded shadow-sm">
                        <input
                            id="email"
                            type="email"
                            placeholder="Correo electrónico"
                            className="w-full pl-10 py-2 pr-3 border border-black focus:outline-none rounded-full bg-gray-50"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                            </svg>
                        </div>
                    </div>


                </div>
                <div className="my-5">
                    <div className="relative mt-2 rounded shadow-sm">
                        <input
                            id="password"
                            type="password"
                            placeholder="Contraseña"
                            className="w-full pl-10 py-2 pr-3 border border-black focus:outline-none rounded-full bg-gray-50"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                            </svg>

                        </div>
                    </div>


                </div>

                <div className="my-5">
                    <div className="relative mt-2 rounded shadow-sm">
                        <input
                            id="password2"
                            type="password"
                            placeholder="Confirma tu contraseña"
                            className="w-full pl-10 py-2 pr-3 border border-black focus:outline-none rounded-full bg-gray-50"
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mx-3">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                            </svg>

                        </div>
                    </div>

                </div>

                <input
                    type="submit"
                    value="Crear Cuenta"
                    className="bg-black mb-5 w-full py-3 text-white uppercase font-bold rounded-full hover:cursor-pointer hover:bg-sky-800 transition-colors"
                />

            </form>

            <nav className="lg:flex lg:justify-between">
                <Link
                    className='block text-center my-5 text-slate-500 text-sm'
                    to="/login"
                >¿Ya tienes una cuenta? <span className="text-black font-bold">Inicia sesión</span> </Link>

                <Link
                    className='block text-center my-5 text-slate-500 text-sm'
                    to="/olvide-password"
                >Olvide mi contraseña</Link>
            </nav>

        </>
    )
}

export default Registrar