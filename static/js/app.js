(function () {
  'use strict';

  const GAMES = [
    {
      id: 'jogo-1',
      title: 'Jogo de Coleta',
      desc: 'Mova a barra azul para apanhar as bolas vermelhas que caem do ecrã e ganhe pontos.',
      tag: 'Importado do PC · Arcade',
      icon: '🔴',
      bg: '#fee2e2',
      url: './jogos/jogo-1/index.html'
    },
    {
      id: 'jogo-2',
      title: 'Jogo da Memória',
      desc: 'Encontre todos os pares de cartas iguais com o menor número de jogadas possível.',
      tag: 'Memória · Offline',
      icon: '🃏',
      bg: '#dcfce7',
      url: './jogos/jogo-2/index.html'
    },
    {
      id: 'jogo-3',
      title: 'Quebra-Cabeças 15',
      desc: 'Deslize as peças numeradas até ordenar os números de 1 a 15 no tabuleiro.',
      tag: 'Puzzle · Lógica',
      icon: '🧩',
      bg: '#fef3c7',
      url: './jogos/jogo-3/index.html'
    },
    {
      id: 'jogo-4',
      title: 'Quiz de Portugal',
      desc: 'Teste os seus conhecimentos sobre rios, cidades, ilhas e regiões de Portugal.',
      tag: 'Educativo · Portugal',
      icon: '🇵🇹',
      bg: '#dbeafe',
      url: './jogos/jogo-4/index.html'
    },
    {
      id: 'jogo-5',
      title: 'Jogo de Pong',
      desc: 'Clássico ténis de mesa retro com 1 jogador (vs IA) ou 2 jogadores no mesmo ecrã.',
      tag: 'Importado do PC · Arcade',
      icon: '🏓',
      bg: '#e0e7ff',
      url: './jogos/jogo-5/index.html'
    },
    {
      id: 'jogo-6',
      title: 'Mapa dos Distritos de Portugal',
      desc: 'Encontre no mapa os 18 distritos de Portugal Continental, Madeira e Açores.',
      tag: 'Mapa · Puzzle Educativo',
      icon: '🗺️',
      bg: '#e0f2fe',
      url: './jogos/jogo-6/index.html'
    }
  ];

  const grid = document.getElementById('gamesGrid');
  const stage = document.getElementById('gameStage');
  const stageFrame = document.getElementById('stageFrame');
  const stageTitle = document.getElementById('stageTitle');
  const btnBackMenu = document.getElementById('btnBackMenu');
  const btnInstall = document.getElementById('btnInstall');
  const btnRefreshGames = document.getElementById('btnRefreshGames');

  let deferredPrompt = null;

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    btnInstall.classList.add('visible');
  });

  btnInstall.addEventListener('click', async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const res = await deferredPrompt.userChoice;
    if (res.outcome === 'accepted') {
      btnInstall.classList.remove('visible');
    }
    deferredPrompt = null;
  });

  function openGame(game) {
    stageTitle.textContent = `${game.icon} ${game.title}`;
    stageFrame.src = game.url;
    stage.classList.add('open');
  }

  function closeGame() {
    stage.classList.remove('open');
    stageFrame.src = 'about:blank';
  }

  btnBackMenu.addEventListener('click', closeGame);

  btnRefreshGames.addEventListener('click', async () => {
    btnRefreshGames.disabled = true;
    btnRefreshGames.textContent = '🔄 A atualizar...';
    try {
      if ('caches' in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      }
      if ('serviceWorker' in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map((r) => r.update()));
      }
    } catch (_) {}
    window.location.reload();
  });

  GAMES.forEach((game) => {
    const card = document.createElement('article');
    card.className = 'game-card';
    card.innerHTML = `
      <div class="game-icon" style="background:${game.bg};">${game.icon}</div>
      <span class="game-tag">${game.tag}</span>
      <h2 class="game-title">${game.title}</h2>
      <p class="game-desc">${game.desc}</p>
      <button class="play-btn" type="button">▶️ Jogar</button>
    `;
    card.querySelector('.play-btn').addEventListener('click', () => openGame(game));
    grid.appendChild(card);
  });

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
})();
