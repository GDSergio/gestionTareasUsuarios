import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBarGuest from './NavBarGuest';


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roleId, setRoleId] = useState(2); // Default role
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [validationErrors, setValidationErrors] = useState({});

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            await api.post('/register', {
                name,
                email,
                password,
                role_id: roleId,
            });
            navigate('/login');
        } catch (err) {
            if (err.response && err.response.data.errors) {
                setValidationErrors(err.response.data.errors);
              } else {
                setError('Hubo un error al registrar el usuario.');
              }
        }
    };

    return (
        <div>
            <NavBarGuest />

            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh', marginTop: '5rem' }}>
                <Row className="w-100">
                    <Col md={12} lg={6} className="mx-auto">
                        <div className="p-4 border rounded shadow-sm bg-light">
                            <h2 className="text-center mb-4">Registro de Guest</h2>
                            {error && <div className="alert alert-danger">{error}</div>}

                            <Form onSubmit={handleRegister}>
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Row className='d-flex justify-content-between'>
                                        <Col xs={12} md={1}>
                                            <Form.Label>Nombre</Form.Label>
                                        </Col>
                                        <Col xs={12} md={9} >
                                            <Form.Control
                                                type="text"
                                                placeholder="Nombre"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                            {validationErrors.name && <div className="text-danger">{validationErrors.name[0]}</div>}

                                        </Col>
                                    </Row>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Row className='d-flex justify-content-between'>
                                        <Col xs={12} md={1}>
                                            <Form.Label>Correo</Form.Label>
                                        </Col>
                                        <Col xs={12} md={9} >
                                            <Form.Control
                                                type="email"
                                                placeholder="Correo"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                            {validationErrors.email && <div className="text-danger">{validationErrors.email[0]}</div>}
                                        </Col>
                                    </Row>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Row className='d-flex justify-content-between'>
                                        <Col xs={12} md={1}>
                                            <Form.Label>Contraseña</Form.Label>
                                        </Col>
                                        <Col xs={12} md={9} >
                                            <Form.Control
                                                type="password"
                                                placeholder="Contraseña"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                            {validationErrors.password && <div className="text-danger">{validationErrors.password[0]}</div>}
                                        </Col>
                                    </Row>
                                </Form.Group>

                                <Button variant="btn btn-outline-dark" type="submit" className="w-100">
                                    Registrarse
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Register;
