import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import Categorias from "./pages/Categorias";
import Inicio from "./pages/Inicio"
import Items from "./pages/Items";
import Movimientos from "./pages/Movimientos"
import CategoriaDetalle from "./pages/CategoriaDetalle"

function App() {
  return (
    <>
    <Router>
      <div className="container mt-4">
            <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm rounded px-4 py-2 mb-4">
                <NavLink className="navbar-brand fw-bold text-primary" to="/">Inventario</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                      <NavLink 
                        className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold text-primary' : ''}`}
                        to="/"
                      >
                        Inicio
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink 
                        className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold text-primary' : ''}`}
                        to="/categorias"
                      >
                        Categorías
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink 
                        className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold text-primary' : ''}`}
                        to="/items"
                      >
                        Items
                      </NavLink>
                    </li>
                    <li className="nav-item">
                      <NavLink 
                        className={({ isActive }) => `nav-link ${isActive ? 'active fw-bold text-primary' : ''}`}
                        to="/movimientos"
                      >
                        Movimientos
                      </NavLink>
                    </li>
                  </ul>
                </div>
            </nav>


        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/categorias/:id" element={<CategoriaDetalle/>} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/movimientos" element={<Movimientos />} />
          <Route path="/items" element={<Items />} />
        </Routes>
      </div>
    </Router>
    <ToastContainer position="top-right" autoClose={1500} hideProgressBar />
    </>
  );
}

export default App;
