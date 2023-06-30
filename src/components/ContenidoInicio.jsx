import React from 'react'
import { Link } from 'react-router-dom'
const ContenidoInicio = () => {
    return (
        <div className='mt-24 container mx-auto'>

            <div className='md:w-1/3 md:mt-40 '>
                <h1 className='text-6xl md:text-7xl lg:text-7xl text-center font-bold md:text-left lg:text-left'>AGENCIA DE PUBLICIDAD</h1>
                <p className='mt-5 text-center md:text-left lg:text-left'>En un mundo caótico e imprededecible, las marcas destacan como guias, brindando significado y coherecia, En Ogilvy, diseñamos y comunicamos historias que hacen que las marcas importen.</p>

                <div className='mt-10 flex justify-center md:justify-start lg:justify-start'>
                    <Link to="registrar" className="bg-black text-white font-[Poppins] duration-500 px-6 py-2 hover:bg-gray-700 rounded-full">
                        Comenzar un proyecto
                    </Link>
                </div>
            </div>


            <div className='bg-black mt-10 md:hidden  m-4 h-90 text-white rounded-lg p-2'>
                <img src="https://images.unsplash.com/photo-1661956601349-f61c959a8fd4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxlZGl0b3JpYWwtZmVlZHw2fHx8ZW58MHx8fHx8&auto=format&fit=crop&w=500&q=60" className='w-full' alt="" />
            </div>


        </div>
    )
}

export default ContenidoInicio