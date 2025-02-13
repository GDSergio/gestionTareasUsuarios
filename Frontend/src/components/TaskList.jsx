import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redireccionar a TaskForm
import api from '../services/api';
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import NavBarUser from './NavBarUser';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await api.get('/tasks');
                setTasks(response.data);
            } catch (error) {
                console.error("Error cargando las tareas:", error);
            }
            setLoading(false);
        };

        fetchTasks();
    }, []);

    const handleCreate = () => {
        navigate(`/tasks/new`); // Envía la tarea como estado
    };

    const handleEdit = (task) => {
        navigate(`/tasks/edit/${task.id}`, { state: { task } }); // Envía la tarea como estado
    };

    const handleDelete = async (taskId) => {
        if (!window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) return;

        try {
            await api.delete(`/tasks/${taskId}`);
            setTasks(tasks.filter(task => task.id !== taskId)); // Actualiza la lista sin la eliminada
        } catch (error) {
            console.error("Error eliminando la tarea:", error);
            alert("No se pudo eliminar la tarea.");
        }
    };

    // Mostrar un mensaje de carga mientras se obtienen los datos
    if (loading) {
        return <div class="alert alert-success" role="alert">
            <h4 class="alert-heading">Cargando Lista de Tareas</h4>
            <hr />
            <p>Por favor espere mientras se cargan sus tareas</p>
        </div>;
    }

    return (
        <div>
            {/* Usa el componente NavBarUser aquí */}
            <NavBarUser />


            <Container className="mt-4">
                
                
                <Row className="d-flex justify-content-between" md={12} lg={2}>
                <h2>Lista de Tareas</h2>
                    <Button style={{ width: "3rem"}} variant="btn btn-outline-success" onClick={() => handleCreate()}>
                        <FaPlus /> 
                    </Button>
                </Row>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripcion</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map((task) => (
                            <tr key={task.id}>
                                <td>{task.id}</td>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td>{task.status}</td>
                                <td>
                                    <Button variant="warning" className="me-2" onClick={() => handleEdit(task)}>
                                        <FaEdit /> {/* Ícono de edición */}
                                    </Button>
                                    <Button variant="danger" onClick={() => handleDelete(task.id)}>
                                        <FaTrash /> {/* Ícono de eliminar */}
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </div>
    );
};

export default TaskList;
