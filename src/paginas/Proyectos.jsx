
import useProyectos from "../hooks/useProyectos"
import ListaProyectos from "../components/ListaProyectos";
import ModalReportes from "../components/ModalReportes";
import Alerta from "../components/Alerta";

const Proyectos = () => {
    const { proyectos, handleModalReporte,alerta } = useProyectos();

    const {msg} = alerta;
    return (
        <>
            <h1 className="text-4xl font-black">Tus proyectos</h1>
            {msg && <Alerta alerta={alerta}/>}
            <div className="mt-5 md:w-1/3 lg:w-1/7 xl:w-1/6">

                <button className='bg-sky-700 hover:bg-sky-800 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg'
                    type='button'
                    onClick={() => handleModalReporte()}
                >
                    Reporte Proyectos
                </button>
            </div>

            <div className="bg-white shadow mt-10 rounded-lg ">
                {proyectos.length ?
                    proyectos.map(proyecto => (
                        <ListaProyectos
                            key={proyecto._id}
                            proyecto={proyecto}
                        />
                    ))
                    : <p className=" text-center text-gray-600 uppercase p-5">No hay proyectos aún</p>}
            </div>
            <ModalReportes />
        </>
    )
}

export default Proyectos