const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {

  // 🔥 SERVIR ARQUIVOS HLS
  if (req.url.startsWith('/furiosa')) {
    const filePath = path.join(__dirname, req.url);

    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404);
        return res.end('Arquivo não encontrado');
      }

      if (filePath.endsWith('.m3u8')) {
        res.writeHead(200, { 'Content-Type': 'application/vnd.apple.mpegurl' });
      } else if (filePath.endsWith('.ts')) {
        res.writeHead(200, { 'Content-Type': 'video/mp2t' });
      } else if (filePath.endsWith('.vtt')) {
        res.writeHead(200, { 'Content-Type': 'text/vtt' });
      } else {
        res.writeHead(200);
      }

      res.end(data);
    });

    return;
  }

  // 🌐 HTML NORMAL
  res.writeHead(200, { 'Content-Type': 'text/html' });

  res.end(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CooveryTV</title>

<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>

<style>
body {
  margin: 0;
  font-family: Arial;
  background: #0f0f0f;
  color: white;
}

/* LOGIN */
#login {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#login img {
  width: 200px;
  margin-bottom: 20px;
}

input {
  padding: 10px;
  margin: 5px;
  width: 250px;
  border-radius: 5px;
  border: none;
}

button {
  padding: 10px 20px;
  margin-top: 10px;
  background: #00ff88;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

/* HOME */
#app {
  display: none;
}

/* NAVBAR */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: #111;
}

.logo img {
  height: 35px;
}

/* BANNER */
.banner {
  position: relative;
  height: 250px;
  overflow: hidden;
  display: flex;
  align-items: end;
  padding: 20px;
}

.banner video {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);
}

.banner::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, #0f0f0f, transparent);
}

/* LISTA */
.section {
  padding: 15px;
}

.movies {
  display: flex;
  overflow-x: auto;
  gap: 10px;
}

.movie {
  min-width: 140px;
  cursor: pointer;
}

.movie img {
  width: 100%;
  border-radius: 8px;
}

/* PLAYER */
video {
  width: 100%;
  margin-top: 10px;
  border-radius: 10px;
}
</style>
</head>

<body>

<div id="login">
  <img src="https://coovery.com.br/wp-content/uploads/2026/03/Photoroom-20260323_155904.png">
  <input placeholder="Email">
  <input placeholder="Senha" type="password">
  <button onclick="entrar()">Entrar</button>
</div>

<div id="app">

  <div class="navbar">
    <div class="logo">
      <img src="https://coovery.com.br/wp-content/uploads/2026/03/Photoroom-20260323_155904.png">
    </div>
    <div>Início | Filmes | Séries</div>
  </div>

  <div class="banner">
    <video autoplay muted loop playsinline>
      <source src="https://coovery.com.br/wp-content/uploads/2026/03/VivaCut_video_1774296108818_1080HD.mp4">
    </video>
    <h2 style="position: relative; z-index: 2;">Filme em destaque</h2>
  </div>

  <div class="section">
    <h3>Assistindo agora</h3>
    <video id="player" controls></video>
  </div>

  <div class="section">
    <h3>Populares</h3>
    <div class="movies" id="lista"></div>
  </div>

</div>

<script>

// LOGIN
function entrar() {
  document.getElementById('login').style.display = 'none';
  document.getElementById('app').style.display = 'block';
}

// 🎬 SEU FILME REAL
const filmes = [
  {
    titulo: "Furiosa",
    capa: "https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
    video: "/furiosa/hls/playlist.m3u8"
  }
];

const lista = document.getElementById('lista');
const player = document.getElementById('player');

filmes.forEach(filme => {
  const div = document.createElement('div');
  div.className = 'movie';

  div.innerHTML = \`<img src="\${filme.capa}">\`;

  div.onclick = () => {

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(filme.video);
      hls.attachMedia(player);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        player.play();
      });
    } else {
      player.src = filme.video;
      player.play();
    }

  };

  lista.appendChild(div);
});

</script>

</body>
</html>
  `);
});

server.listen(80, () => {
  console.log('Servidor rodando 🚀');
});