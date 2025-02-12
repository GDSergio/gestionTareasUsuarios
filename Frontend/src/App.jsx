import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Login from './components/Login';
import Register from './components/Register';
import TaskForm from './components/TaskForms';
import TaskList from './components/TaskList';


function App() {
    return (
        <Router>
            <Routes>
                {/* Ruta predeterminada que redirige al Login */}
                <Route path="/" element={<Navigate to="/login" />} />
                
                {/* Otras rutas */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/tasks" element={<TaskList />} />
                <Route path="/tasks/new" element={<TaskForm />} />
                <Route path="/tasks/edit/:id" element={<TaskForm />} />
            </Routes>
        </Router>
    );
}

export default App;
