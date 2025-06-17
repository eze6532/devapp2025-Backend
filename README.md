#  Configuración del Entorno - Proyecto Backend

Este proyecto requiere de algunas variables de entorno para funcionar correctamente. Utilizamos un archivo `.env` para definir estas variables de manera sencilla y mantenerlas fuera del código fuente.

##  Archivo `.env`

Antes de ejecutar el proyecto, creá un archivo `.env` en la raíz del proyecto con el siguiente contenido de ejemplo:

```env
PORT=3000
# DB=memoria
# DB=mongo
DB=firebase

- `MONGO_URL`: URL de conexión a MongoDB. Obligatoria si estás usando `DB=mongo`.

# por ejemplo:
# MONGO_URL=mongodb://127.0.0.1:27017/AutoPersonaDB