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
    },
    {
      id: 'puzzle-portugal',
      title: 'Puzzle de Portugal: Distritos e Concelhos',
      desc: 'O jogo completo dos distritos e concelhos de Portugal com mapa interativo e sons.',
      tag: 'Importado do Cartão · Mapa PT',
      icon: '🇵🇹',
      bg: '#dcfce7',
      url: './jogos/puzzle-portugal/index.html'
    },
    {
      id: 'puzzle-magnetico',
      title: 'O Grande Puzzle do Avô',
      desc: 'Escolha qualquer fotografia do tablet ou telemóvel e monte o puzzle magnético com o dedo.',
      tag: 'Importado do Cartão · Puzzle Foto',
      icon: '🧲',
      bg: '#fef3c7',
      url: './jogos/puzzle-magnetico/index.html'
    },
    {
      id: 'avo-magnetico',
      title: 'Avô Magnético - O Construtor',
      desc: 'Construtor criativo com peças magnéticas para os netos brincarem no ecrã tátil.',
      tag: 'Importado do Cartão · Jogos Netos',
      icon: '🧱',
      bg: '#ffedd5',
      url: './jogos/avo-magnetico/index.html'
    },
    {
      id: 'aventura-lagos',
      title: 'Aventura no Mar - Lagos Navigator',
      desc: 'Navegue pela costa de Lagos numa aventura marítima educativa.',
      tag: 'Importado do Cartão · Jogos Netos',
      icon: '⛵',
      bg: '#dbeafe',
      url: './jogos/aventura-lagos/index.html'
    },
    {
      id: 'matematica-lagos',
      title: 'A Matemática do Avô - Lagos',
      desc: 'Desafios divertidos de matemática para treinar contas em Lagos.',
      tag: 'Importado do Cartão · Educativo',
      icon: '🧮',
      bg: '#fae8ff',
      url: './jogos/matematica-lagos/index.html'
    },
    {
      id: 'pesca-malega',
      title: 'A Pesca do Avô - Aventura no Mar',
      desc: 'Pescaria divertida no mar de Lagos com o barco do Avô.',
      tag: 'Importado do Cartão · Pesca',
      icon: '🎣',
      bg: '#cffafe',
      url: './jogos/pesca-malega/index.html'
    },
    {
      id: 'pesca-lula',
      title: 'Pesca da Lula 2D - Egi Fishing',
      desc: 'Pesca interativa de lulas com técnica de eging.',
      tag: 'Importado do Cartão · Pesca',
      icon: '🦑',
      bg: '#e0e7ff',
      url: './jogos/puzzle-portugal/pesca_lula.html'
    },
    {
      id: 'pesca-lula-animada',
      title: 'Pesca da Lula · Animada',
      desc: 'Versão com personagens animadas para pescar lulas no mar.',
      tag: 'Importado do Cartão · Pesca',
      icon: '🐙',
      bg: '#fce7f3',
      url: './jogos/pesca-lula-animada/index.html'
    },
    {
      id: 'pesca-embarcada',
      title: 'Pesca Embarcada Pro',
      desc: 'Simulador de pesca embarcada no Oceano Português.',
      tag: 'Importado do Cartão · Pesca',
      icon: '🚤',
      bg: '#e0f2fe',
      url: './jogos/pesca-embarcada/index.html'
    },
    {
      id: 'aorus-corrida',
      title: 'Apex Velocity 3D - Corrida',
      desc: 'Jogo de corridas arcade em 3D com velocidade e obstáculos.',
      tag: 'Importado do Cartão · Corrida',
      icon: '🏎️',
      bg: '#fee2e2',
      url: './jogos/aorus-corrida/index.html'
    },
    {
      id: 'cyber-runner',
      title: 'Anti-Gravity Cyber Runner',
      desc: 'Corra e salte por pistas futuristas sem cair.',
      tag: 'Importado do Cartão · Arcade',
      icon: '🚀',
      bg: '#ede9fe',
      url: './jogos/cyber-runner/index.html'
    },
    {
      id: 'aventura-pirata',
      title: 'Aventura Pirata: Caça ao Tesouro',
      desc: 'Aventura pirata em busca do tesouro escondido.',
      tag: 'Importado do Cartão · Aventura',
      icon: '🏴‍☠️',
      bg: '#fef9c3',
      url: './jogos/aventura-pirata/index.html'
    },
    {
      id: 'plataformas-2d',
      title: 'Aventura de Plataformas 2D',
      desc: 'Salte pelas plataformas, apanhe moedas e desvie-se dos inimigos.',
      tag: 'Convertido Python · Plataformas',
      icon: '🪙',
      bg: '#d1fae5',
      url: './jogos/plataformas-2d/index.html'
    },
    {
      id: 'freecell',
      title: 'Freecell do Capitão',
      desc: 'Clássico jogo de cartas Freecell adaptado para jogar no tablet.',
      tag: 'Importado do Cartão · Cartas',
      icon: '♠️',
      bg: '#f1f5f9',
      url: './jogos/freecell/index.html'
    },
    {
      id: 'paciencia',
      title: 'A Paciência do Capitão',
      desc: 'Solitário clássico (Klondike) com cartas fáceis de ver e tocar.',
      tag: 'Importado do Cartão · Cartas',
      icon: '♥️',
      bg: '#ffe4e6',
      url: './jogos/paciencia/index.html'
    },
    {
      id: 'spider',
      title: 'Spider do Capitão',
      desc: 'Solitário Spider para organizar sequências completas de cartas.',
      tag: 'Importado do Cartão · Cartas',
      icon: '🕷️',
      bg: '#e2e8f0',
      url: './jogos/spider/index.html'
    },
    {
      id: 'nao-te-irrites',
      title: 'Não Te Irrites do Avô',
      desc: 'Jogo de tabuleiro clássico para jogar em família no tablet.',
      tag: 'Importado do Cartão · Tabuleiro',
      icon: '🎲',
      bg: '#fef3c7',
      url: './jogos/nao-te-irrites/index.html'
    },
    {
      id: 'puzzle-mapa',
      title: 'Adivinha o País pelo Mapa',
      desc: 'Identifique o país correto apenas pela sua silhueta no mapa.',
      tag: 'Importado do Cartão · Geografia',
      icon: '🌍',
      bg: '#dcfce7',
      url: './jogos/puzzle-mapa/index.html'
    },
    {
      id: 'puzzle-paises',
      title: 'Puzzle Mundial de Países',
      desc: 'Desafio geográfico mundial para descobrir países no mapa.',
      tag: 'Importado do Cartão · Geografia',
      icon: '🌐',
      bg: '#dbeafe',
      url: './jogos/puzzle-paises/index.html'
    },
    {
      id: 'puzzle-capitais',
      title: 'Jogo das Capitais do Mundo',
      desc: 'Acerte nas capitais dos países de todo o mundo.',
      tag: 'Importado do Cartão · Geografia',
      icon: '🏛️',
      bg: '#f3e8ff',
      url: './jogos/puzzle-capitais/index.html'
    },
    {
      id: 'palavras-cruzadas',
      title: 'Palavras Cruzadas',
      desc: 'Complete a grelha de palavras cruzadas em português.',
      tag: 'Importado do Cartão · Palavras',
      icon: '✏️',
      bg: '#ecfccb',
      url: './jogos/palavras-cruzadas/index.html'
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
