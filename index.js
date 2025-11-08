const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Base de datos en memoria (simulación)
const database = {
  projects: [
    { id: 1, name: 'Mint', description: 'App Dental', createdAt: new Date() }
  ],
  tasks: [
    { id: 1, title: 'Diseñar UI', description: 'Pantalla principal', status: 'todo', projectId: 1 }
  ]
};

// Rutas CRUD para proyectos


// Crear un nuevo proyecto
app.post('/api/v1/projects', (req, res) => {
    const { name, description } = req.body;
    const newProject = { id: database.projects.length + 1, name, description, createdAt: new Date() };
    database.projects.push(newProject);
    res.status(201).json(newProject);
});

// Obtener todos los proyectos
app.get('/api/v1/projects', (req, res) => {
    res.json(database.projects);
});

// Obtener un proyecto por ID
app.get('/api/v1/projects/:id', (req, res) => {
    const project = database.projects.find(p => p.id === parseInt(req.params.id));
    if (project) {
        res.json(project);
    } else {
        res.status(404).json({ message: 'Project not found' });
    }
});

// Actualizar un proyecto por ID
app.put('/api/v1/projects/:id', (req, res) => {
    const project = database.projects.find(p => p.id === parseInt(req.params.id));
    if (project) {
        const { name, description } = req.body;
        project.name = name || project.name;
        project.description = description || project.description;
        res.json(project);
    } else {
        res.status(404).json({ message: 'Project not found' });
    }
});

// Eliminar un proyecto por ID
app.delete('/api/v1/projects/:id', (req, res) => {
    const index = database.projects.findIndex(p => p.id === parseInt(req.params.id));
    if (index !== -1) {
        database.projects.splice(index, 1);
        res.status(204).end();
    }
    else {
        res.status(404).json({ message: 'Project not found' });
    }
});

// Crear una nueva tarea
app.post('/api/v1/tasks', (req, res) => {
    const { title, description, status, projectId } = req.body;
    
    if (!title) {
        return res.status(400).json({ message: 'Title is required' });
    }
    
    const newTask = { 
        id: database.tasks.length + 1, 
        title, 
        description: description || '', 
        status: status || 'todo', 
        projectId: projectId || null 
    };
    
    database.tasks.push(newTask);
    res.status(201).json(newTask);
});

// Obtener todas las tareas
app.get('/api/v1/tasks', (req, res) => {
    res.json(database.tasks);
});

//Obtener una tarea por ID
app.get('/api/v1/tasks/:id', (req, res) => {
    const task = database.tasks.find(t => t.id === parseInt(req.params.id));
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Actualizar una tarea por ID
app.put('/api/v1/tasks/:id', (req, res) => {
    const task = database.tasks.find(t => t.id === parseInt(req.params.id));
    if (task) {
        const { title, description, status, projectId } = req.body;
        task.title = title || task.title;
        task.description = description !== undefined ? description : task.description;
        task.status = status || task.status;
        task.projectId = projectId !== undefined ? projectId : task.projectId;
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Eliminar una tarea por ID
app.delete('/api/v1/tasks/:id', (req, res) => {
    const index = database.tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (index !== -1) {
        database.tasks.splice(index, 1);
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

app.listen(port, () => {
    console.log(`API listening at http://localhost:${port}`);
});
