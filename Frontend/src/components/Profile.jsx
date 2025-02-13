import { useEffect, useState } from 'react';
import api from '../services/api';
import Container from "react-bootstrap/Container";
import NavBarUser from './NavBarUser';
import { Card, Button } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const Profile = () => {
    // Estado para almacenar los datos del perfil
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Efecto para obtener los datos del perfil
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get('/profile');
                setProfile(response.data); // Guardar los datos del perfil
                setLoading(false); // Indicar que la carga ha terminado
            } catch (error) {
                console.error("Error fetching profile:", error);
                setError("Error al cargar el perfil. Inténtalo de nuevo más tarde.");
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    // Mostrar un mensaje de carga mientras se obtienen los datos
    if (loading) {
        return <div class="alert alert-success" role="alert">
            <h4 class="alert-heading">Cargando Perfil</h4>
            <hr />
            <p>Por favor espere mientras cargar los datos del perfil</p>
        </div>;
    }

    // Mostrar un mensaje de error si algo falla
    if (error) {
        return <div>{error}</div>;
    }

    // Mostrar los datos del perfil
    return (
        <div>

            {/* Usa el componente NavBarUser aquí */}
            <NavBarUser />
            
            <Col md={12} lg={2} className="mx-auto" style={{ marginTop: "4rem" }} >
                <div className="p-4 border rounded shadow-sm bg-light d-flex justify-content-center">

                    <Card className="text-center p-4 shadow-sm" style={{ width: "18rem", borderRadius: "15px" }}>
                        <Card.Img
                            variant="top"
                            src="/user.png"
                            className="rounded-circle mx-auto d-block mt-3"
                            style={{ width: "100px", height: "100px" }}
                        />
                        <Card.Body>
                            <Card.Title>{profile.name}</Card.Title>
                            <Card.Subtitle className="text-muted">{profile.email}</Card.Subtitle>
                        </Card.Body>
                    </Card>
                </div>
            </Col>
        </div >
    );
};

export default Profile;