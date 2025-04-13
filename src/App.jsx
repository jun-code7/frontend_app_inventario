import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Categorias from "./pages/Categorias";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import Items from "./pages/Items";

function App() {
  return (
    <>
    <Router>
      <div className="container mt-4">
        <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4">
          <Link className="navbar-brand" to="/">Inventario</Link>
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link" to="/categorias">Categorías</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/items">Items</Link></li>
            {/* Agregaremos Items y Movimientos luego */}
          </ul>
        </nav>
        <Routes>
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/items" element={<Items />} />
        </Routes>
      </div>
    </Router>
    <ToastContainer position="top-right" autoClose={1500} hideProgressBar />
    </>
  );
}

export default App;
