require('dotenv').config();

const http = require('http');
const app = require('./app');

// Renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaine
const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
}

const port = normalizePort(process.env.PORT || '8000');

// Spécifier le PORT d'utilisation
app.set('port', port)

// Cherche les erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// Création du server
const server = http.createServer(app)

// Ecouteur d'évènement consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console
server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
})

// Écoute des requêtes envoyées sur le PORT 3000 par défaut, Ou un autre PORT si le 3000 n'est pas disponible
server.listen(port)