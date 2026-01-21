const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes basiques
app.get('/', (req, res) => {
  res.send('Serveur School Chat est en cours d\'exécution');
});

// Gestion des connexions Socket.IO
io.on('connection', (socket) => {
  console.log('Nouvel utilisateur connecté:', socket.id);

  // Rejoindre un groupe
  socket.on('join-group', (groupId) => {
    socket.join(groupId);
    console.log('Utilisateur ' + socket.id + ' a rejoint le groupe ' + groupId);
    io.to(groupId).emit('user-joined', { userId: socket.id, groupId: groupId });
  });

  // Envoyer un message
  socket.on('send-message', (data) => {
    console.log('Message reçu:', data);
    io.to(data.groupId).emit('receive-message', {
      userId: socket.id,
      message: data.message,
      timestamp: new Date()
    });
  });

  // Déconnexion
  socket.on('disconnect', () => {
    console.log('Utilisateur déconnecté:', socket.id);
  });
});

// Démarrage du serveur
server.listen(PORT, () => {
  console.log('Serveur School Chat écoute sur le port ' + PORT);
});