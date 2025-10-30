## App de música con búsqueda de Spotify

Características:
- Barra de búsqueda fija (sticky).
- Búsqueda de canciones en Spotify mediante un proxy local.
- Lista de resultados y reproductor con controles de anterior/siguiente/pausa.
- Renovación automática del token App de Spotify (Client Credentials) en el servidor.

### Requisitos
- Node 18+.
- Cuenta de Spotify Developer para obtener `CLIENT_ID` y `CLIENT_SECRET` (App, no usuario).

### Configuración
1. Crear archivo `.env` en la raíz con:
```
CLIENT_ID=tu_client_id
CLIENT_SECRET=tu_client_secret
API_PORT=3001
```
2. Instalar dependencias:
```
npm i
```
3. Iniciar el proxy API (renueva token automático) en un terminal:
```
npm run start:api
```
4. Iniciar la app Angular en otro terminal:
```
npm start
```
La app consumirá `http://localhost:3001/api/search`.

### Notas
- El flujo Client Credentials permite búsqueda y previews, no reproducción completa de usuario.
- Para reproducción completa con el Web Playback SDK se requiere OAuth Authorization Code con cuenta del usuario.
