import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import io from 'socket.io-client'
import useAuth from '../hooks/useAuth'

let socket;
const ProyectoContext = createContext();

const ProyectosProvider = ({ children }) => {

    const [proyectos, setProyectos] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [revisaProyecto, setRevisaProyecto] = useState({});
    const [cargando, setCargando] = useState(false);
    const [tarea, setTarea] = useState({})
    const [colaborador, setColaborador] = useState({});

    //Modales 
    const [modalTarea, setModalTarea] = useState(false);
    const [modalEliminarTarea, setModalEliminarTarea] = useState(false);
    const [modalReporte, setModalReporte] = useState(false);
    const [modalEliminarColaborador, setModalEliminarColaborador] = useState(false);
    const [buscador, setBuscador] = useState(false);

    const navigate = useNavigate();
    const {auth} = useAuth();

    useEffect(() => {
        const obtenerProyectos = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) return

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                }

                const { data } = await clienteAxios('/proyectos', config);
                setProyectos(data)
            } catch (error) {
                console.log(error)
            }
        }
        obtenerProyectos();
    }, [auth])

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL); //Abrimos la conexion hacia socket
    }, []) 

    const mostrarAlerta = alerta => {
        setAlerta(alerta);
        setTimeout(() => {
            setAlerta({})
        }, 5000)
    }

    const submitProyecto = async proyecto => {
        if (proyecto.id) {
            await editarProyecto(proyecto);
        } else {
            await nuevoProyecto(proyecto);
        }
    }

    const editarProyecto = async proyecto => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            //Sincronizando el state
            const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config)
            const proyectoActualizado = proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState)
            setProyectos(proyectoActualizado)

            //Mostrar alerta

            setAlerta({
                msg: 'Proyecto Actualizado correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000)


        } catch (error) {
            console.log(error)
        }
    }

    const nuevoProyecto = async proyecto => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post('/proyectos', proyecto, config)
            //console.log(data)

            setProyectos([...proyectos, data])

            setAlerta({
                msg: 'Proyecto creando correctamente',
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000)

        } catch (error) {
            console.log(error)
        }
    }

    const obtenerProyecto = async id => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token');
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios(`/proyectos/${id}`, config);
            setRevisaProyecto(data)
            setAlerta({})
        } catch (error) {
            navigate('/proyectos')
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
            setTimeout(() => {
                setAlerta({})
            }, 3000)
        } finally {
            setCargando(false)
        }

    }

    const eliminarProyecto = async id => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.delete(`/proyectos/${id}`, config)

            //Sincronizacion del state
            const proyectsDeleteUpdate = proyectos.filter(proyectoState => proyectoState._id !== id);
            setProyectos(proyectsDeleteUpdate)

            setAlerta({
                msg: data.msg,
                error: false
            })

            setTimeout(() => {
                setAlerta({})
                navigate('/proyectos')
            }, 3000)
        } catch (error) {
            console.log(error)
        }
    }

    const handleModalTarea = () => {
        setModalTarea(!modalTarea)
        setTarea({})
    }


    const handleModalReporte = () => {
        setModalReporte(!modalReporte)
    }

    const crearTarea = async (tarea) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post('/tareas', tarea, config)


            // //Agregar al state
            // const proyectoUpdating = { ...revisaProyecto }
            // proyectoUpdating.tareas = [...revisaProyecto.tareas, data]
            // setRevisaProyecto(proyectoUpdating)

            setAlerta({})
            setModalTarea(false)

            //Socket io crear tarea
            socket.emit('nueva tarea', data) 

        } catch (error) {
            console.log(error)
        }
    }

    const submitTarea = async tarea => {
        if (tarea?.id) {
            await editarTarea(tarea)
        } else {
            await crearTarea(tarea)
        }
    }

    const editarTarea = async (tarea) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config)

            // const proyectoUpdating = { ...revisaProyecto }
            // proyectoUpdating.tareas = proyectoUpdating.tareas.map(tareaState => tareaState._id === data._id ? data : tareaState);
            // setRevisaProyecto(proyectoUpdating);
            setAlerta({})
            setModalTarea(false)
            //Socket
            socket.emit('actualizar tarea',data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleModalEditarTarea = (tarea) => {
        setTarea(tarea)
        setModalTarea(true)
    }

    const handleModalEliminarTarea = (tarea) => {
        setTarea(tarea)
        setModalEliminarTarea(!modalEliminarTarea)
    }

    const eliminarTarea = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.delete(`/tareas/${tarea._id}`, config)
            setAlerta({
                msg: data.msg,
                error: false
            })

            // const proyectoUpdating = { ...revisaProyecto }
            // proyectoUpdating.tareas = proyectoUpdating.tareas.filter(tareaState => tareaState._id !== tarea._id)
            // setRevisaProyecto(proyectoUpdating);

            setModalEliminarTarea(false)
            //Socket
            socket.emit('eliminar tarea',tarea)

            setTarea({})
            setTimeout(() => {
                setAlerta({})
            }, 3000)

        } catch (error) {
            console.log(error)
        }

    }

    const submitColaborador = async email => {
        setCargando(true)
        try {
            const token = localStorage.getItem('token');
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post('/proyectos/colaboradores', { email }, config)
            setColaborador(data)
            setAlerta({})
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        } finally {
            setCargando(false)
        }
    }

    const agregarColaborador = async email => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post(`/proyectos/colaboradores/${revisaProyecto._id}`, email, config)
            setAlerta({
                msg: data.msg,
                error: false
            })
            setColaborador({})
            setTimeout(() => {
                setAlerta({})
            }, 3000)
        } catch (error) {
            
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        
            setTimeout(() => {
                setAlerta({})
            }, 3000)
           
        }

    }

    const handleModalEliminarColaborador = (colaborador) => {
        setModalEliminarColaborador(!modalEliminarColaborador)
        setColaborador(colaborador)

    }

    const eliminarColaborador = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post(`/proyectos/eliminar-colaborador/${revisaProyecto._id}`, { id: colaborador._id }, config)

            const proyectoActualizado = { ...revisaProyecto }

            proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(colaboradorState => colaboradorState._id !== colaborador._id)

            setRevisaProyecto(proyectoActualizado)

            setAlerta({
                msg: data.msg,
                error: false
            })
            setColaborador({})
            setModalEliminarColaborador(false)
            setTimeout(() => {
                setAlerta({})
            }, 3000)
        } catch (error) {
            console.log(error.response)
        }
    }

    const completarTarea = async id => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post(`/tareas/estado/${id}`, {}, config)
            // const proyectoActualizado = { ...revisaProyecto }
            // proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === data._id ? data : tareaState)
            // setRevisaProyecto(proyectoActualizado)
            setTarea({})
            setAlerta({})

            //Socket
            socket.emit('cambiar estado',data)
        } catch (error) {
            console.log(error.response)
        }
    }


    const handleBuscador = () => {
        setBuscador(!buscador)
    }

    //Funciones sockets
    const submitTareasProyectoSocket = (tarea) => {
        //Agregar al state
        const proyectoUpdating = { ...revisaProyecto }
        proyectoUpdating.tareas = [...proyectoUpdating.tareas, tarea]
        setRevisaProyecto(proyectoUpdating)  
    }

    const eliminarTareaProyectoSocket = (tarea) => {
        const proyectoUpdating = { ...revisaProyecto }
        proyectoUpdating.tareas = proyectoUpdating.tareas.filter(tareaState => tareaState._id !== tarea._id)
        setRevisaProyecto(proyectoUpdating);
    }

    const actualizarTareaProyectoSocket = (tarea) =>{
        const proyectoUpdating = { ...revisaProyecto }
            proyectoUpdating.tareas = proyectoUpdating.tareas.map(tareaState => tareaState._id === tarea._id ? tarea : tareaState);
            setRevisaProyecto(proyectoUpdating);
    }
    const cambiarEstadoTareaSocket = (tarea) => {
        const proyectoActualizado = { ...revisaProyecto }
        proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === tarea._id ? tarea : tareaState)
        setRevisaProyecto(proyectoActualizado)
    }

    const cerrarSesion = () => {
        setProyectos([])
        setRevisaProyecto({})
        setAlerta({})
    }

    return (
        <ProyectoContext.Provider
            value={
                {
                    proyectos,
                    mostrarAlerta,
                    alerta,
                    submitProyecto,
                    obtenerProyecto,
                    revisaProyecto,
                    cargando,
                    eliminarProyecto,
                    handleModalTarea,
                    modalTarea,
                    submitTarea,
                    handleModalEditarTarea,
                    tarea,
                    modalEliminarTarea,
                    handleModalEliminarTarea,
                    eliminarTarea,
                    handleModalReporte,
                    modalReporte,
                    submitColaborador,
                    colaborador,
                    agregarColaborador,
                    handleModalEliminarColaborador,
                    modalEliminarColaborador,
                    eliminarColaborador,
                    completarTarea,
                    buscador,
                    handleBuscador,
                    submitTareasProyectoSocket,
                    eliminarTareaProyectoSocket,
                    actualizarTareaProyectoSocket,
                    cambiarEstadoTareaSocket,
                    cerrarSesion
                }
            }
        >{children}
        </ProyectoContext.Provider>
    )
}

export { ProyectosProvider }

export default ProyectoContext;


