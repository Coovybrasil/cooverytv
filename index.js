const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  res.end(`
<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>CooveryTV</title>

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

/* 🔥 BANNER COM VÍDEO (TODOS DISPOSITIVOS) */
.banner {
  position: relative;
  height: 250px;
  overflow: hidden;
  display: flex;
  align-items: end;
  padding: 20px;
}

/* VÍDEO RESPONSIVO */
.banner video {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);
}

/* OVERLAY ESCURO */
.banner::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, #0f0f0f, transparent);
  top: 0;
  left: 0;
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
  transition: transform 0.2s;
}

.movie:hover {
  transform: scale(1.05);
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

/* ========================= */
/* 📱 MOBILE */
/* ========================= */
.mobile .banner {
  height: 180px;
}

.mobile .movie {
  min-width: 100px;
}

.mobile .navbar {
  font-size: 14px;
}

/* ========================= */
/* 💻 DESKTOP */
/* ========================= */
.desktop .movie {
  min-width: 150px;
}

/* ========================= */
/* 📺 TV */
/* ========================= */
.tv .movie {
  min-width: 260px;
}

.tv .banner {
  height: 400px;
}

.tv .navbar {
  font-size: 22px;
}

.tv video {
  height: 400px;
}

.tv button {
  font-size: 18px;
  padding: 15px 30px;
}
</style>
</head>

<body>

<!-- LOGIN -->
<div id="login">
  <img src="https://coovery.com.br/wp-content/uploads/2026/03/Photoroom-20260323_155904.png">
  <input placeholder="Email">
  <input placeholder="Senha" type="password">
  <button onclick="entrar()">Entrar</button>
</div>

<!-- APP -->
<div id="app">

  <div class="navbar">
    <div class="logo">
      <img src="https://coovery.com.br/wp-content/uploads/2026/03/Photoroom-20260323_155904.png">
    </div>
    <div>Início | Filmes | Séries</div>
  </div>

  <div class="banner">

    <!-- 🎬 VÍDEO ATUALIZADO -->
    <video autoplay muted loop playsinline>
      <source src="https://coovery.com.br/wp-content/uploads/2026/03/VivaCut_video_1774296108818_1080HD.mp4" type="video/mp4">
    </video>

    <h2 style="position: relative; z-index: 2;">
      Filme em destaque
    </h2>

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

// 🔥 DETECTAR DISPOSITIVO
function detectarDispositivo() {
  const largura = window.innerWidth;

  if (largura <= 768) {
    document.body.classList.add("mobile");
  } else if (largura <= 1200) {
    document.body.classList.add("desktop");
  } else {
    document.body.classList.add("tv");
  }
}

detectarDispositivo();

// LOGIN
function entrar() {
  document.getElementById('login').style.display = 'none';
  document.getElementById('app').style.display = 'block';
}

// FILMES
const filmes = [
  {
    titulo: "Filme 1",
    capa: "https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg",
    video: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
  },
  {
    titulo: "Filme 2",
    capa: "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
    video: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
  },
  {
    titulo: "Filme 3",
    capa: "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
    video: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
  }
];

const lista = document.getElementById('lista');
const player = document.getElementById('player');

filmes.forEach(filme => {
  const div = document.createElement('div');
  div.className = 'movie';

  div.innerHTML = \`
    <img src="\${filme.capa}">
  \`;

  div.onclick = () => {
    player.src = filme.video;
    player.play();
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