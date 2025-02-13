import React from 'react';

import { Dropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa"; // Importa el ícono
import { useNavigate } from "react-router-dom"; // ✅ Importar useNavigate
import api from "../services/api";



const NavigationBar = () => {
  const navigate = useNavigate(); // ✅ Obtener navigate

  const handleLogout = async () => {
    try {
      await api.post("/logout"); // Llama al endpoint de logout
      localStorage.removeItem("token"); // ✅ Elimina el token
      navigate("/login"); // ✅ Redirige al login
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };
  
  return (
    <nav className="navbar navbar-dark bg-dark px-4">
      <a className="navbar-brand" href="#">Gestion tareas por usuario</a>

      {/* Menú desplegable del usuario */}

      <div className="d-flex align-items-center">
        {/* Enlace a Tasks */}
        <a className="nav-link text-light me-3" href="/tasks">Tareas</a>

        {/* Menú desplegable del usuario */}
        <Dropdown>
          <Dropdown.Toggle variant="dark" id="dropdown-user">
            <FaUserCircle size={24} />
          </Dropdown.Toggle>

          <Dropdown.Menu align="end">
            <Dropdown.Item href="/profile">Perfil</Dropdown.Item>
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  );
};

export default NavigationBar;
