import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useProyectos from '../hooks/useProyectos';

const Sidebar = () => {

    const { auth } = useAuth();


    return (
        <aside className='md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10' >
            <p className='text-xl font-bold'>Bienvenido: {auth.nombre}</p>

            <Link
                to="crear-proyecto"
                className='bg-sky-900 hover:bg-sky-800 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg'
            >Nuevo Proyecto</Link>

            <div className='md:opacity-30 md:mt-40 lg:opacity-30 lg:mt-40'>
                <img className='hidden md:block lg:blok' src="/loguin.svg" alt="Logo Ogilvy" />
            </div>

        </aside>
    )
}

export default Sidebar