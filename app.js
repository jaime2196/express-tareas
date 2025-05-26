const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.use(express.json()); // Middleware para parsear JSON

let tareas = [];

app.get("/", (req, res) => res.status(200).send("Funciona"));

// Obtener todas las tareas
app.get("/tareas", (req, res) => {
  res.json(tareas);
});

// Crear una nueva tarea
app.post("/tareas", (req, res) => {
  // Obtener los datos desde los parámetros de la URL
  const { id, descripcion, prioridad, fechaVencimiento, fechaCreacion } = req.query;

  const nuevaTarea = {
    id: id ? Number(id) : undefined,
    descripcion,
    prioridad,
    fechaVencimiento,
    fechaCreacion
  };
  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});

app.delete("/tareas/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = tareas.findIndex(t => t.id === id);

  if (index !== -1) {
    const tareaEliminada = tareas.splice(index, 1)[0];
    res.json({ mensaje: "Tarea eliminada", tarea: tareaEliminada });
  } else {
    res.status(404).json({ mensaje: "Tarea no encontrada" });
  }
});


// Endpoint para seed de tareas aleatorias
app.get("/seed", (req, res) => {
  const prioridades = ["BAJA", "MEDIA", "ALTA", "CRITICA"];
  const descripciones = [
    "Regar las plantas",
    "Sacar al perro",
    "Hacer la compra",
    "Estudiar para el examen",
    "Llamar al médico",
    "Limpiar la casa",
    "Preparar la comida",
    "Enviar el informe",
    "Leer un libro",
    "Hacer ejercicio"
  ];
  const tareasSeed = [];

  for (let i = 1; i <= 10; i++) {
    const id = Math.floor(Math.random() * 1000) + 1;
    const descripcion = descripciones[Math.floor(Math.random() * descripciones.length)];
    const prioridad = prioridades[Math.floor(Math.random() * prioridades.length)];

    // Fechas aleatorias
    const fechaVencimiento = new Date(2025, 4, Math.floor(Math.random() * 28) + 1); // Mayo 2025
    const fechaCreacion = new Date(2025, 4, 1, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), Math.floor(Math.random() * 60));

    // Formato: yyyy-MM-dd para vencimiento, yyyy-MM-dd HH:mm:ss para creación
    const pad = n => n.toString().padStart(2, '0');
    const formatFecha = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
    const formatFechaHora = d => `${formatFecha(d)} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    const formatFechaHoraISO = d => d.toISOString(); // Devuelve en formato ISO

    tareasSeed.push({
      id,
      descripcion,
      prioridad,
      fechaVencimiento: formatFecha(fechaVencimiento), // yyyy-MM-dd
      fechaCreacion: formatFechaHoraISO(fechaCreacion) // ISO 8601
    });
  }

  tareas = tareasSeed;
  res.status(201).json({ mensaje: "Tareas generadas", tareas });
});

/*TAREA:
 *private int id;
    private String descripcion;
    private Prioridad prioridad;
    private Calendar fechaVencimiento;
    private Calendar fechaCreacion;
 */

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

