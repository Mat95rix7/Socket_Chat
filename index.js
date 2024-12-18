const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static('public'));

// Route GET pour servir la page exercice_03.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Écoute de la connexion des clients
io.on("connection", (socket) => {
  
  socket.on('connection user', (username) => {
    console.log(`le client ${username} est connecté`);
  });

  socket.on('chat message', (username, msg) => {
    console.log(`le message de ${username} a été envoyé`);
    io.emit('chat message', username, msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// Démarrage du serveur
const PORT = 3000;
http.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});