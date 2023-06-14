import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
import ModalReportes from "../components/ModalReportes";
import useProyectos from '../hooks/useProyectos';
import EfectoPulse from '../components/EfectoPulse';
import ModalFormTarea from '../components/ModalFormTarea';
import ModalEliminarTarea from '../components/ModalEliminarTarea';
import Tarea from '../components/Tarea';
import Alerta from '../components/Alerta';
import useAuth from '../hooks/useAuth'
import RTareas from '../components/reportes/RTareas';
import { PDFDownloadLink } from '@react-pdf/renderer';
import useAdmin from '../hooks/useAdmin';
import Colaborador from '../components/Colaborador';
import ModalEliminarColaborador from '../components/ModalEliminarColaborador';
import io from 'socket.io-client'


let socket;
const PRIORIDAD = ["Alta", "Regular", "Basica"];
const RevisarProyecto = () => {


    const params = useParams();
    const { obtenerProyecto, revisaProyecto, cargando, handleModalTarea, alerta, submitTareasProyectoSocket, eliminarTareaProyectoSocket, actualizarTareaProyectoSocket, cambiarEstadoTareaSocket } = useProyectos();

    const { auth } = useAuth();
    const admin = useAdmin();

    useEffect(() => {
        obtenerProyecto(params.id)
    }, [])
    // useEffect(() => {
    //     //Eviando datos desde el frontend hacien el backend
    //     socket = io(import.meta.env.VITE_BACKEND_URL); //Abrimos la conexion hacia socket
    //     socket.emit('prueba') //Crear o emiter el evento

    //     //Recibiendo datos del backend
    //     socket.on('respuesta',()=>{
    //         console.log('desde el frontend')
    //     })
    // })
    useEffect(() => {
        //Eviando datos desde el frontend hacien el backend
        socket = io(import.meta.env.VITE_BACKEND_URL); //Abrimos la conexion hacia socket
        socket.emit('abrir proyecto', params.id) //Crear o emiter el evento
    }, [])

    useEffect(() => {
        socket.on("tarea agregada", tareaNueva => {
            if (tareaNueva.proyecto === revisaProyecto._id) {
                submitTareasProyectoSocket(tareaNueva)
            }
        })
        socket.on("tarea eliminada", tareaEliminada => {
            if (tareaEliminada.proyecto === revisaProyecto._id) {
                eliminarTareaProyectoSocket(tareaEliminada)
            }
        })
        socket.on("tarea actualizada", tareaUpdate => {
            if (tareaUpdate.proyecto._id === revisaProyecto._id) {
                actualizarTareaProyectoSocket(tareaUpdate)
            }
        })
        socket.on("nuevo estado", nuevoStateTarea => {
            if (nuevoStateTarea.proyecto._id === revisaProyecto._id) {
                cambiarEstadoTareaSocket(nuevoStateTarea)
            }
        })
    })

    const { msg } = alerta;
    if (cargando) return <EfectoPulse />;

    const { nombre } = revisaProyecto
    return (
        <>
            <div className='flex justify-between'>
                <h1 className='font-black text-4xl'>{nombre}</h1>

                {admin && (
                    <div className='flex items-center gap-2 text-gray-400 hover:text-black'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        <Link
                            to={`/proyectos/editar/${params.id}`}
                            className='uppercase font-bold'
                        >
                            Editar</Link>
                    </div>
                )}

            </div>

            <div className='flex gap-3'>
                {admin && (
                    <button
                        onClick={handleModalTarea}
                        type='button'
                        className='text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-5 flex gap-2 items-center justify-center'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                        Nueva Tarea
                    </button>
                )}

                <PDFDownloadLink document={<RTareas tareas={revisaProyecto.tareas} nombre={revisaProyecto.nombre}/>} fileName="R-tus-tareas.pdf">
                    <button
                        type='button'
                        className='text-sm px-5 py-3 w-full md:w-auto rounded-lg uppercase font-bold bg-sky-400 text-white text-center mt-5 flex gap-2 items-center justify-center'
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                        </svg>
                        Generar reporte tareas
                    </button>
                </PDFDownloadLink>

            </div>

            <p className='font-bold text-xl mt-10'>Tareas del proyecto</p>

            <div className='bg-white shadow mt-10 rounded-lg'>
                {revisaProyecto.tareas?.length ? (
                    PRIORIDAD.map((prioridad) => (
                        revisaProyecto.tareas
                            .filter((tarea) => tarea.prioridad === prioridad)
                            .map((tarea) => (
                                <Tarea key={tarea._id} tarea={tarea} />
                            ))
                    ))
                ) : (
                    <p className='text-center my-5 p-10'>No has creado tareas para este proyecto</p>
                )}
            </div>



            <div className='flex items-center justify-between mt-10'>
                <p className='font-bold text-xl mt-10'>Apartado de colaboradores</p>
                {admin && (
                    <Link to={`/proyectos/nuevo-colaborador/${revisaProyecto._id}`}
                        className='text-gray-400 hover:text-black uppercase font-bold'
                    >
                        Añadir colaborador
                    </Link>
                )}
            </div>

            <div className='bg-white shadow mt-10 rounded-lg'>
                {revisaProyecto.colaboradores?.length ?
                    revisaProyecto.colaboradores?.map(colaborador => (
                        <Colaborador
                            key={colaborador._id}
                            colaborador={colaborador}
                        />
                    )) :
                    <p className='text-center my-5 p-10'>No haz añadido colaboradores para este proyecto</p>}
            </div>

            <ModalFormTarea />
            <ModalEliminarTarea />
            <ModalEliminarColaborador />
            <ModalReportes />
        </>
    )
}

export default RevisarProyecto