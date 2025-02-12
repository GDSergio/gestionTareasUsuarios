import { useState } from 'react';
import api from '../services/api';

const TaskForm = ({ task, onSubmit }) => {
    const [title, setTitle] = useState(task ? task.title : '');
    const [description, setDescription] = useState(task ? task.description : '');
    const [status, setStatus] = useState(task ? task.status : 'pendiente');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (task) {
            await api.put(`/tasks/${task.id}`, { title, description, status });
        } else {
            await api.post('/tasks', { title, description, status });
        }

        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
            <textarea placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="pendiente">Pendiente</option>
                <option value="progreso">En Progreso</option>
                <option value="terminado">Terminado</option>
            </select>
            <button type="submit">Guardar</button>
        </form>
    );
};

export default TaskForm;
