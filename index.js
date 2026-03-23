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

<script src="https://cdn.jsdelivr.net/npm/hls.js@latest"></script>

<style>
body {
  margin: 0;
  font-family: Arial;
  background: #0f0f0f;
  color: white;
}

#login {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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

#app {
  display: none;
}

.navbar {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  background: #111;
}

.logo {
  color: #00ff88;
  font-weight: bold;
}

.banner {
  height: 200px;
  background: #222;
  display: flex;
  align-items: center;
  padding: 20px;
}

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
  text-align: center;
}

.movie img {
  width: 100%;
  border-radius: 8px;
}

video {
  width: 100%;
  margin-top: 10px;
  border-radius: 10px;
}
</style>
</head>

<body>

<div id="login">
  <h1>CooveryTV 🚀</h1>
  <input placeholder="Email">
  <input placeholder="Senha" type="password">
  <button onclick="entrar()">Entrar</button>
</div>

<div id="app">

  <div class="navbar">
    <div class="logo">CooveryTV</div>
    <div>TV | Filmes | Séries</div>
  </div>

  <div class="banner">
    <h2>TV ao vivo 🔥</h2>
  </div>

  <div class="section">
    <h3>Assistindo agora</h3>
    <video id="player" controls autoplay></video>
  </div>

  <div class="section">
    <h3>Canais</h3>
    <div class="movies" id="lista"></div>
  </div>

</div>

<script>

function entrar() {
  document.getElementById('login').style.display = 'none';
  document.getElementById('app').style.display = 'block';
}

const lista = document.getElementById('lista');
const player = document.getElementById('player');

async function carregarM3U() {
  try {
    const res = await fetch("http://oldmonkey.fun/get.php?username=ZeeJGV&password=UffTyb&type=m3u_plus&output=hls");
    const texto = await res.text();

    const linhas = texto.split('\\n');

    for (let i = 0; i < linhas.length; i++) {

      if (linhas[i].startsWith('#EXTINF')) {

        const titulo = linhas[i].split(',')[1];
        const video = linhas[i + 1];

        const div = document.createElement('div');
        div.className = 'movie';

        div.innerHTML = \`
          <img src="https://via.placeholder.com/150">
          <p style="font-size:12px">\${titulo}</p>
        \`;

        div.onclick = () => assistir(video);

        lista.appendChild(div);
      }
    }

  } catch (erro) {
    console.log("Erro ao carregar lista:", erro);
  }
}

function assistir(video) {

  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(video);
    hls.attachMedia(player);
  } else {
    player.src = video;
  }
}

carregarM3U();

</script>

</body>
</html>
  `);
});

server.listen(80, () => {
  console.log('Servidor rodando 🚀');
});
