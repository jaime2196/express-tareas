# Express Tareas

Este es un proyecto de ejemplo usando [Express](https://expressjs.com) para la gestión de tareas.

## Instalación y ejecución local

1. Clona el repositorio o descarga el código fuente.
2. Instala las dependencias ejecutando:

   ```
   npm install
   ```

3. Inicia la aplicación con:

   ```
   node app.js
   ```

La aplicación estará disponible por defecto en [http://localhost:3001](http://localhost:3001).

## Endpoints y funcionalidad

- **GET /**  
  Devuelve un mensaje de prueba para comprobar que el servidor funciona.

- **GET /tareas**  
  Devuelve todas las tareas almacenadas en el sistema.

- **POST /tareas**  
  Crea una nueva tarea.  
  Los datos deben enviarse como parámetros en la URL (query params):  
  `id`, `descripcion`, `prioridad`, `fechaVencimiento`, `fechaCreacion`.

  Ejemplo:  
  ```
  POST http://localhost:3001/tareas?id=1&descripcion=Regar%20las%20plantas&prioridad=BAJA&fechaVencimiento=2025-05-27&fechaCreacion=2025-05-26T21:46:16.680Z
  ```

- **DELETE /tareas/:id**  
  Elimina la tarea con el id especificado.

  Ejemplo:  
  ```
  DELETE http://localhost:3001/tareas/1
  ```

- **GET /seed**  
  Rellena la lista de tareas con datos de ejemplo generados aleatoriamente.

## Despliegue

El proyecto está desplegado en:  
[https://express-tareas.onrender.com/](https://express-tareas.onrender.com/)

**Nota:**  
La primera vez que accedas a la URL puede tardar unos segundos en arrancar, ya que Render detiene los proyectos que no se están utilizando en su plan gratuito.

---
