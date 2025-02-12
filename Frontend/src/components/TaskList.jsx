import { useEffect, useState } from 'react';
import api from '../services/api';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await api.get('/tasks');
            setTasks(response.data);
        };

        fetchTasks();
    }, []);

    return (
        <div>
            <h2>Tareas</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <button>Edit</button>
                        <button>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
