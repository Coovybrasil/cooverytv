const http = require('http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  res.end(`
  <!DOCTYPE html>
  <html lang="pt-BR">
  <head>
    <meta charset="UTF-8">
    <title>CooveryTV</title>

    <style>
      body {
        margin: 0;
        font-family: Arial;
        background: #0f0f0f;
        color: white;
      }

      /* NAVBAR */
      .navbar {
        display: flex;
        justify-content: space-between;
        padding: 15px 30px;
        background: #111;
      }

      .logo {
        font-size: 22px;
        font-weight: bold;
        color: #00ff88;
      }

      .menu a {
        color: white;
        margin-left: 20px;
        text-decoration: none;
      }

      /* BANNER */
      .banner {
        height: 300px;
        background: url('https://images.unsplash.com/photo-1524985069026-dd778a71c7b4') center/cover;
        display: flex;
        align-items: center;
        padding: 30px;
      }

      .banner h1 {
        font-size: 40px;
      }

      /* LISTA DE FILMES */
      .section {
        padding: 20px;
      }

      .movies {
        display: flex;
        gap: 15px;
        overflow-x: auto;
      }

      .movie {
        min-width: 150px;
        height: 220px;
        background: #222;
        border-radius: 10px;
        overflow: hidden;
        cursor: pointer;
      }

      .movie img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      /* PLAYER */
      .player {
        padding: 20px;
      }

      video {
        width: 100%;
        max-width: 800px;
        border-radius: 10px;
      }
    </style>
  </head>

  <body>

    <!-- NAVBAR -->
    <div class="navbar">
      <div class="logo">CooveryTV</div>
      <div class="menu">
        <a href="#">Início</a>
        <a href="#">Filmes</a>
        <a href="#">Séries</a>
      </div>
    </div>

    <!-- BANNER -->
    <div class="banner">
      <h1>Bem-vindo ao CooveryTV 🚀</h1>
    </div>

    <!-- PLAYER -->
    <div class="player">
      <h2>Assistindo agora</h2>
      <video controls>
        <source src="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8" type="application/x-mpegURL">
      </video>
    </div>

    <!-- LISTA -->
    <div class="section">
      <h2>Populares</h2>
      <div class="movies">

        <div class="movie">
          <img src="https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg">
        </div>

        <div class="movie">
          <img src="https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg">
        </div>

        <div class="movie">
          <img src="https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg">
        </div>

      </div>
    </div>

  </body>
  </html>
  `);
});

server.listen(80, () => {
  console.log('Servidor rodando na porta 80 🚀');
});
