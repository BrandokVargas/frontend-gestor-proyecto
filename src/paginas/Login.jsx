import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Alerta from "../components/Alerta"
import clienteAxios from "../config/clienteAxios"
import useAuth from "../hooks/useAuth"

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const { setAuth } = useAuth()
    const navigate = useNavigate()


    const handleSubmit = async e => {
        e.preventDefault();

        if ([email, password].includes('')) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true
            })
            return
        }

        try {
            const { data } = await clienteAxios.post('/usuarios/login', { email, password })
            setAlerta({})
            //Almacenando en el localstorage
            localStorage.setItem('token', data.token)
            //Insertamos en el state global auth
            setAuth(data)
            navigate('/proyectos')
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
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
                <div className="flex flex-col justify-center items-center">
                    <Link to="/">
                        <img src="/Log.png" className="w-64" alt="LogoOgilvy" />
                    </Link>                  
                    <h1 className="text-black font-bold text-4xl text-center">Iniciar sesión
                    </h1>
                </div>

                <div className="my-5">
                    <div className="relative mt-2 rounded shadow-sm">
                        <input
                            id="email"
                            type="email"
                            placeholder="Escribe tu correo electrónico"
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
                            placeholder="Escribe tu contraseña"
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

                <input
                    type="submit"
                    value="Iniciar"
                    className="bg-black mb-5 w-full py-3 text-white uppercase font-bold rounded-full hover:cursor-pointer hover:bg-slate-950 transition-colors"
                />

            </form>

            <nav className="lg:flex lg:justify-between">
                <Link
                    className='block text-center my-5 text-slate-500 text-sm'
                    to="/registrar"
                >¿No tienes una cuenta? <span className="text-black font-bold">Regístrate gratis</span></Link>

                <Link
                    className='block text-center my-5 text-slate-500 text-sm'
                    to="/olvide-password"
                >Olvide mi contraseña</Link>
            </nav>



        </>
    )
}

export default Login