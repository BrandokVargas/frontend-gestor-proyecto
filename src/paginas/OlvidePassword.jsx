import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from '../components/Alerta'
import clienteAxios from "../config/clienteAxios"
const OlvidePassword = () => {

    const [email, setEmail] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email == '' || email.length < 6) {
            setAlerta({
                msg: "Debes colocar tu correo electronico",
                error: true
            });
            return
        }

        try {
            const { data } = await clienteAxios.post(`/usuarios/olvide-password`, { email })

            setAlerta({
                msg: data.msg,
                error: false
            })

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

                <h1 className="text-black font-black text-4xl text-center">Recupera tu contraseña
                </h1>
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


                <input
                    type="submit"
                    value="Recuperar Contraseña"
                    className="bg-black mb-5 w-full py-3 text-white font-bold rounded hover:cursor-pointer hover:bg-black transition-colors"
                />

            </form>

            <nav className="lg:flex lg:justify-between">

                <Link
                    className='block text-center my-5 text-slate-500 text-sm'
                    to="/registrar"
                >¿No tienes una cuenta? <span className="text-black font-bold">Regístrate ahora</span></Link>

                <Link
                    className='block text-center my-5 text-slate-500 text-sm'
                    to="/login"
                >Tambien puedes <span className="text-black font-bold">iniciar sesión</span></Link>

            </nav>

        </>
    )
}

export default OlvidePassword