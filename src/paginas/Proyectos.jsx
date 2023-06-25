
import useProyectos from "../hooks/useProyectos"
import ListaProyectos from "../components/ListaProyectos";
import Alerta from "../components/Alerta";

const Proyectos = () => {
    const { proyectos, handleModalReporte,alerta } = useProyectos();

    const {msg} = alerta;
    return (
        <>
            <h1 className="text-4xl font-black">Tus proyectos</h1>
            {msg && <Alerta alerta={alerta}/>}


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
         
        </>
    )
}

export default Proyectos