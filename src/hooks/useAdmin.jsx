import useProyectos from "./useProyectos";
import useAuth from "./useAuth";

const useAdmin = () => {
    const {revisaProyecto } = useProyectos()
    const { auth } = useAuth()
    return revisaProyecto.creador === auth._id
}

export default useAdmin