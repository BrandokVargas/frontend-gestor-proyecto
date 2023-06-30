import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import clienteAxios from "../config/clienteAxios"
import Alerta from "../components/Alerta"

const NuevoPassword = () => {

    const [password, setPassword] = useState('');
    const [tokenValido, setTokenValido] = useState(false);
    const [alerta, setAlerta] = useState({});
    const [passwordModificado, setPasswordModificado] = useState(false);


    const params = useParams();
    const { token } = params;



    useEffect(() => {
        const comprobarToken = async () => {
            try {
                await clienteAxios(`/usuarios/olvide-password/${token}`)
                setTokenValido(true)
            } catch (error) {
                setAlerta({
                    msg: error.response.data.msg,
                    error: true
                })
            }
        }
        comprobarToken()
    }, [])

    const handleSubmit = async e => {
        e.preventDefault();

        if (password.length < 6) {
            setAlerta({
                msg: "Tu password tiene que ser mayor a 6",
                error: true
            })
            return
        }

        try {
            const url = `/usuarios/olvide-password/${token}`
            const { data } = await clienteAxios.post(url, { password })
            setAlerta({
                msg: data.msg,
                error: false
            })
            setPasswordModificado(true)
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

            {tokenValido && (
                <form
                    className="my-10 bg-white shadow-2xl rounded-lg p-10"
                    onSubmit={handleSubmit}
                >
                    <h1 className="text-black font-black text-4xl text-center">Reestablece tu contraseña
                    </h1>
                    <div className="my-5">
                        <div className="relative mt-2 rounded shadow-sm">
                            <input
                                id="password"
                                type="password"
                                placeholder="Ingresa su nueva contraseña"
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
                        value="Guardar contraseña"
                        className="bg-black mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
                    />

                </form>
            )}

            {passwordModificado && (
                <Link
                    className='block text-center text-black my-5 text-black text-sm'
                    to="/login"
                >Inicia Sesión</Link>
            )}


        </>
    )
}

export default NuevoPassword