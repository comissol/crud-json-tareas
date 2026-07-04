import express from 'express';
import healthRouter from './src/routes/health.js';
import tasksRouter from './src/routes/tasks.js'

const PORT = process.env.PORT || 3000;
const API_PREFIX = "/api/v1";
const server = express();
server.set("view engine", "ejs");
server.set("views", "./views");


server.use(express.json()); //*esto es un middleware, esto se usa para poder empezar a usar el body en formato JSON para poder hacer put, patch, etc.

server.get ("/", (req,res) => {
    res.render("index");
});

server.use(`${API_PREFIX}/health`, healthRouter); //siempre se llama así por convención, para ver cómo está el estado del servidor.
server.use(`${API_PREFIX}/tasks`, tasksRouter);

// 404 Not Found
server.use((req, res, next) => {
    const error = new Error(`Not Found: ${req.method} ${req.originalUrl}`);
    error.status = 404;
    next(error);
});

// Global Error Handler
server.use((err, req, res, next) => {
    const status = err.status || 500;
    res.status(status).json({status, error: err.message || 'Internet server error'});
});

server.listen(PORT, (err) => {
    if (err) {
        console.error('Error al iniciar el servidor:', err);
        return;
    }
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});