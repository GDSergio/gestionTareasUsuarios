import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBarUser from './NavBarUser';

const TaskForm = () => {
    const location = useLocation(); // Obtiene el estado pasado con navigate
    const navigate = useNavigate();
    const task = location.state?.task || null;

    const [title, setTitle] = useState(task ? task.title : '');
    const [description, setDescription] = useState(task ? task.description : '');
    const [status, setStatus] = useState(task ? task.status : 'pendiente');

    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setDescription(task.description);
            setStatus(task.status);
        }
    }, [task]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (task) {
                await api.put(`/tasks/${task.id}`, { title, description, status });
            } else {
                await api.post('/tasks', { title, description, status });
            }

            navigate('/tasks'); // Redirige a la lista de tareas después de guardar
        } catch (error) {
        //     if (err.response && err.response.data.errors) {
        //         setValidationErrors(err.response.data.errors);
        //       } else {
        //         setError('Hubo un error al registrar el usuario.');
        //       }
        }
    };

    return (
        <div>
            <NavBarUser />
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh', marginTop: '5rem' }}>
                <Row className="w-100">
                    <Col md={12} lg={6} className="mx-auto">
                        <div className="p-4 border rounded shadow-sm bg-light">
                            <h2 className="text-center mb-4">{task ? 'Editar Tarea' : 'Registrar Tarea'}</h2>

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Título</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Título"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        placeholder="Descripción"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Estado</Form.Label>
                                    <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                                        <option value="pendiente">Pendiente</option>
                                        <option value="progreso">En Progreso</option>
                                        <option value="terminado">Terminado</option>
                                    </Form.Select>
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100">
                                    {task ? 'Actualizar' : 'Guardar'}
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default TaskForm;
