import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./layouts/Auth";
import RutaProtegida from "./layouts/RutaProtegida";

import Inicio from "./paginas/Inicio";
import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import NuevoPassword from "./paginas/NuevoPassword";
import OlvidePassword from "./paginas/OlvidePassword";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import Proyectos from "./paginas/Proyectos";
import NuevoProyecto from "./paginas/NuevoProyecto";
import RevisarProyecto from "./paginas/RevisarProyecto"
import EditarProyecto from "./paginas/EditarProyecto";
import NuevoColaborador from "./paginas/NuevoColaborador";


import { AuthProvider } from "./context/AuthProvider";
import { ProyectosProvider } from "./context/ProyectosProvider";



function App() {


  return (

    <BrowserRouter>
      <AuthProvider>
        <ProyectosProvider>
          <Routes>
            {/* Area publica */}
            <Route>
              <Route index element={<Inicio />} />
            </Route>

            <Route path="/" element={<Auth />}>             
              <Route path="login" element={<Login />} />
              <Route path="registrar" element={<Registrar />} />
              <Route path="olvide-password" element={<OlvidePassword />} />
              <Route path="olvide-password/:token" element={<NuevoPassword />} />
              <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
            </Route>

            {/* Area privada */}
            <Route path="/proyectos" element={<RutaProtegida />}>
              <Route index element={<Proyectos />} />
              <Route path="crear-proyecto" element={<NuevoProyecto />} />
              <Route path="nuevo-colaborador/:id" element={<NuevoColaborador />} />
              <Route path=":id" element={<RevisarProyecto />} />
              <Route path="editar/:id" element={<EditarProyecto />} />
            </Route>
          </Routes>
        </ProyectosProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
export default App





