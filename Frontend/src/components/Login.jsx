import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBarGuest from './NavBarGuest';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/login', { email, password });
      localStorage.setItem('token', response.data.token);
      navigate('/tasks');
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError(err.response.data.error); // Mostrar mensaje de error
      } else {
        setError('Ocurrió un error al intentar iniciar sesión'); // Otros errores
      }
    }
  };

  return (
    <div>
      {/* Usa el componente NavBarGuest aquí */}
      <NavBarGuest />

      {/* Contenedor principal con centrado */}
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh', marginTop: '5rem' }}>
        <Row className="w-100">
          <Col md={12} lg={6} className="mx-auto">
            <div className="p-4 border rounded shadow-sm bg-light">
              <h2 className="text-center mb-4">Iniciar sesión</h2>
              {error && <div className="alert alert-danger">{error}</div>}

              <Form onSubmit={handleLogin}>
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
                    </Col>
                  </Row>
                </Form.Group>

                <Button variant="btn btn-outline-dark" type="submit" className="w-100">
                  Aceptar
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;