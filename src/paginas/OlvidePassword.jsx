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
            const { data } = await clienteAxios.post( `/usuarios/olvide-password`,{email})

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
            <h1 className="text-sky-600 font-black text-4xl text-center">Recupera tu contraseña
            </h1>

            {msg && <Alerta alerta={alerta} />}

            <form
                className="my-10 bg-white shadow rounded-lg p-10"
                onSubmit={handleSubmit}
            >


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


                <input
                    type="submit"
                    value="Recuperar Contraseña"
                    className="bg-sky-700 mb-5 w-full py-3 text-white font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                />

            </form>

            <nav className="lg:flex lg:justify-between">

                <Link
                    className='block text-center my-5 text-slate-500 text-sm'
                    to="/registrar"
                >¿No tienes una cuenta? <span className="text-sky-600">Regístrate ahora</span></Link>

                <Link
                    className='block text-center my-5 text-slate-500 text-sm'
                    to="/"
                >Tambien puedes <span className="text-sky-600">iniciar sesión</span></Link>

            </nav>

        </>
    )
}

export default OlvidePassword