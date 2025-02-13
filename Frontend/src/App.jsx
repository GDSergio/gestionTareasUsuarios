import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from './components/Login';
import Register from './components/Register';
import TaskForm from './components/TaskForms';
import TaskList from './components/TaskList';
import Profile from './components/Profile';
import PrivateRoute from "./components/PrivateRoute";


function App() {
    return (
        <Router>
            <Routes>
                {/* Ruta predeterminada que redirige al Login */}
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route element={<PrivateRoute />}>
                    <Route path="/tasks" element={<TaskList />} />
                    <Route path="/tasks/new" element={<TaskForm />} />
                    <Route path="/tasks/edit/:id" element={<TaskForm />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/logout" element={<Profile />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default App;
