import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ContenidoInicio from '../components/ContenidoInicio';
const Inicio = () => {

    const [menuName, setMenuName] = useState('menu');
    const [menuClasses, setMenuClasses] = useState('')

    const handleMenu = () => {
        if (menuName === 'menu') {
            setMenuName('close');
            setMenuClasses('top-[80px] opacity-100');
        } else {
            setMenuName('menu');
            setMenuClasses('');
        }
    }

    return (
        <div>
            <nav className="p-5 bg-white shadow md:flex md:items-center md:justify-between md:justify-around">
                <div className="flex justify-between items-center ">
                    <span className="text-5xl font-[Poppins] font-bold cursor-pointer">
                        Ogilvy
                    </span>

                    <button className="text-3xl cursor-pointer mx-2 md:hidden block"
                        onClick={handleMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>

                    </button>
                </div>


                <div className="md:relative">
                    <div className="hidden md:block fixed inset-0 z-0 pointer-events-none">
                        <img src="/banner.png" alt="" className="w-full h-full opacity-100" />
                    </div>

                    <ul className={`md:flex md:items-center md:static absolute w-full left-0 md:w-auto md:py-0 py-4 md:pl-0 pl-7 top-[-400px] md:opacity-100 opacity-100 bg-white transition-all ease-in duration-500 ${menuClasses}`} style={{ zIndex: 10 }}>
                        <li className="mx-4 my-6 md:my-0">
                            <a href="#" className="text-xl border border-transparent hover:border-b-black duration-500">Inicio</a>
                        </li>
                        <li className="mx-4 my-6 md:my-0">
                            <a href="#" className="text-xl hover:text-gray-700 duration-500 border border-transparent hover:border-b-black">¿Quiénes Somos?</a>
                        </li>
                        <li className="mx-4 my-6 md:my-0">
                            <a href="#" className="text-xl hover:text-gray-700 duration-500 border border-transparent hover:border-b-black">Contacto</a>
                        </li>

                      
                            <Link to="/login" className="border border-slate-950 text-black font-[Poppins] duration-500 px-6 py-2 mx-4 hover:bg-gray-700 rounded-full">
                                Inicia Sesión
                            </Link>
                        

                       
                            <Link to="registrar" className="bg-black text-white font-[Poppins] duration-500 px-6 py-2 mx-4 hover:bg-gray-700 rounded rounded-full">
                                Registrate
                            </Link>
                       
                    </ul>
                </div>



            </nav>

            <ContenidoInicio />
        </div>
    )
}

export default Inicio