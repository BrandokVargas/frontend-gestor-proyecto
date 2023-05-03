import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./layouts/Auth";
import RutaProtegida from "./layouts/RutaProtegida";

import Login from "./paginas/Login";
import Registrar from "./paginas/Registrar";
import NuevoPassword from "./paginas/NuevoPassword";
import OlvidePassword from "./paginas/OlvidePassword";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import Proyectos from "./paginas/Proyectos";


import { AuthProvider } from "./context/AuthProvider";

function App() {
 

  return (
    
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Area publica */}
          <Route path="/" element={<Auth />}>
            <Route index element={<Login />} />
            <Route path="registrar" element={<Registrar />} />
            <Route path="olvide-password" element={<OlvidePassword />} />
            <Route path="olvide-password/:token" element={<NuevoPassword />} />
            <Route path="confirmar/:id" element={<ConfirmarCuenta />} />
          </Route>

          {/* Area privada */}
          <Route path="/proyectos" element={<RutaProtegida />}>
              <Route index element={<Proyectos/>} />
              
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
export default App





