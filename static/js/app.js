(function () {
  'use strict';

  const CATEGORIES = [
    { id: 'todos', label: '🌟 Todos os Jogos', color: '#4f46e5' },
    { id: 'pesca', label: '🎣 Pesca & Mar', color: '#0284c7' },
    { id: 'mapas', label: '🗺️ Mapas & Mundo', color: '#059669' },
    { id: 'netos', label: '🧒 Jogos dos Netos', color: '#d97706' },
    { id: 'classicos', label: '🃏 Cartas & Clássicos', color: '#7c3aed' }
  ];

  const GAMES = [
    // 🎣 Pesca & Mar (6)
    {
      id: 'pesca-lula',
      category: 'pesca',
      title: 'Pesca da Lula 2D (Egi Fishing)',
      desc: 'Pesca interativa de lulas com técnica de eging.',
      tag: 'Pesca · Egi Fishing',
      icon: '🦑',
      bg: '#e0e7ff',
      url: './jogos/puzzle-portugal/pesca_lula.html'
    },
    {
      id: 'pesca-lula-animada',
      category: 'pesca',
      title: 'Pesca da Lula · Personagens Animadas',
      desc: 'Versão com personagens animadas para pescar lulas no mar.',
      tag: 'Pesca · Animado',
      icon: '🐙',
      bg: '#fce7f3',
      url: './jogos/pesca-lula-animada/index.html'
    },
    {
      id: 'pesca-embarcada',
      category: 'pesca',
      title: 'Pesca Embarcada Pro',
      desc: 'Simulador de pesca embarcada no Oceano Português.',
      tag: 'Pesca · Oceano',
      icon: '🚤',
      bg: '#e0f2fe',
      url: './jogos/pesca-embarcada/index.html'
    },
    {
      id: 'pesca-malega',
      category: 'pesca',
      title: 'A Pesca do Avô - Aventura no Mar',
      desc: 'Pescaria divertida no mar de Lagos com o barco do Avô.',
      tag: 'Pesca · Lagos',
      icon: '🎣',
      bg: '#cffafe',
      url: './jogos/pesca-malega/index.html'
    },
    {
      id: 'aventura-lagos',
      category: 'pesca',
      title: 'Aventura no Mar - Lagos Navigator',
      desc: 'Navegue pela costa de Lagos numa aventura marítima educativa.',
      tag: 'Mar · Navegação',
      icon: '⛵',
      bg: '#dbeafe',
      url: './jogos/aventura-lagos/index.html'
    },
    {
      id: 'aventura-pirata',
      category: 'pesca',
      title: 'Aventura Pirata: Caça ao Tesouro',
      desc: 'Aventura pirata em busca do tesouro escondido.',
      tag: 'Mar · Aventura',
      icon: '🏴‍☠️',
      bg: '#fef9c3',
      url: './jogos/aventura-pirata/index.html'
    },

    // 🗺️ Mapas & Mundo (6)
    {
      id: 'puzzle-portugal',
      category: 'mapas',
      title: 'Puzzle de Portugal: Distritos e Concelhos',
      desc: 'O jogo completo dos distritos e concelhos de Portugal com mapa interativo e sons.',
      tag: 'Mapa · Portugal',
      icon: '🇵🇹',
      bg: '#dcfce7',
      url: './jogos/puzzle-portugal/index.html'
    },
    {
      id: 'jogo-6',
      category: 'mapas',
      title: 'Mapa dos Distritos de Portugal',
      desc: 'Encontre no mapa os 18 distritos de Portugal Continental, Madeira e Açores.',
      tag: 'Mapa · Puzzle Educativo',
      icon: '🗺️',
      bg: '#e0f2fe',
      url: './jogos/jogo-6/index.html'
    },
    {
      id: 'jogo-4',
      category: 'mapas',
      title: 'Quiz de Portugal',
      desc: 'Teste os seus conhecimentos sobre rios, cidades, ilhas e regiões de Portugal.',
      tag: 'Educativo · Portugal',
      icon: '🧭',
      bg: '#dbeafe',
      url: './jogos/jogo-4/index.html'
    },
    {
      id: 'puzzle-mapa',
      category: 'mapas',
      title: 'Adivinha o País pelo Mapa',
      desc: 'Identifique o país correto apenas pela sua silhueta no mapa.',
      tag: 'Geografia · Mundo',
      icon: '🌍',
      bg: '#dcfce7',
      url: './jogos/puzzle-mapa/index.html'
    },
    {
      id: 'puzzle-paises',
      category: 'mapas',
      title: 'Puzzle Mundial de Países',
      desc: 'Desafio geográfico mundial para descobrir países no mapa.',
      tag: 'Geografia · Mundo',
      icon: '🌐',
      bg: '#dbeafe',
      url: './jogos/puzzle-paises/index.html'
    },
    {
      id: 'puzzle-capitais',
      category: 'mapas',
      title: 'Jogo das Capitais do Mundo',
      desc: 'Acerte nas capitais dos países de todo o mundo.',
      tag: 'Geografia · Capitais',
      icon: '🏛️',
      bg: '#f3e8ff',
      url: './jogos/puzzle-capitais/index.html'
    },

    // 🧒 Jogos dos Netos (7)
    {
      id: 'puzzle-magnetico',
      category: 'netos',
      title: 'O Grande Puzzle do Avô',
      desc: 'Escolha qualquer fotografia do tablet ou telemóvel e monte o puzzle magnético com o dedo.',
      tag: 'Puzzle · Fotografia',
      icon: '🧲',
      bg: '#fef3c7',
      url: './jogos/puzzle-magnetico/index.html'
    },
    {
      id: 'avo-magnetico',
      category: 'netos',
      title: 'Avô Magnético - O Construtor',
      desc: 'Construtor criativo com peças magnéticas para os netos brincarem no ecrã tátil.',
      tag: 'Criativo · Netos',
      icon: '🧱',
      bg: '#ffedd5',
      url: './jogos/avo-magnetico/index.html'
    },
    {
      id: 'matematica-lagos',
      category: 'netos',
      title: 'A Matemática do Avô',
      desc: 'Desafios divertidos de matemática para treinar contas em Lagos.',
      tag: 'Educativo · Contas',
      icon: '🧮',
      bg: '#fae8ff',
      url: './jogos/matematica-lagos/index.html'
    },
    {
      id: 'jogo-1',
      category: 'netos',
      title: 'Jogo de Coleta',
      desc: 'Mova a barra azul para apanhar as bolas vermelhas que caem do ecrã e ganhe pontos.',
      tag: 'Arcade · Reflexos',
      icon: '🔴',
      bg: '#fee2e2',
      url: './jogos/jogo-1/index.html'
    },
    {
      id: 'jogo-2',
      category: 'netos',
      title: 'Jogo da Memória',
      desc: 'Encontre todos os pares de cartas iguais com o menor número de jogadas possível.',
      tag: 'Memória · Pares',
      icon: '🃏',
      bg: '#dcfce7',
      url: './jogos/jogo-2/index.html'
    },
    {
      id: 'plataformas-2d',
      category: 'netos',
      title: 'Aventura de Plataformas 2D',
      desc: 'Salte pelas plataformas, apanhe moedas e desvie-se dos inimigos.',
      tag: 'Plataformas · 2D',
      icon: '🪙',
      bg: '#d1fae5',
      url: './jogos/plataformas-2d/index.html'
    },
    {
      id: 'palavras-cruzadas',
      category: 'netos',
      title: 'Jogo de Palavras Cruzadas',
      desc: 'Complete a grelha de palavras cruzadas em português.',
      tag: 'Palavras · Educativo',
      icon: '✏️',
      bg: '#ecfccb',
      url: './jogos/palavras-cruzadas/index.html'
    },

    // 🃏 Cartas & Clássicos (8)
    {
      id: 'freecell',
      category: 'classicos',
      title: 'Freecell do Capitão',
      desc: 'Clássico jogo de cartas Freecell adaptado para jogar no tablet.',
      tag: 'Cartas · Freecell',
      icon: '♠️',
      bg: '#f1f5f9',
      url: './jogos/freecell/index.html'
    },
    {
      id: 'paciencia',
      category: 'classicos',
      title: 'A Paciência do Capitão',
      desc: 'Solitário clássico (Klondike) com cartas fáceis de ver e tocar.',
      tag: 'Cartas · Paciência',
      icon: '♥️',
      bg: '#ffe4e6',
      url: './jogos/paciencia/index.html'
    },
    {
      id: 'spider',
      category: 'classicos',
      title: 'Spider do Capitão',
      desc: 'Solitário Spider para organizar sequências completas de cartas.',
      tag: 'Cartas · Spider',
      icon: '🕷️',
      bg: '#e2e8f0',
      url: './jogos/spider/index.html'
    },
    {
      id: 'nao-te-irrites',
      category: 'classicos',
      title: 'Não Te Irrites do Avô',
      desc: 'Jogo de tabuleiro clássico para jogar em família no tablet.',
      tag: 'Tabuleiro · Clássico',
      icon: '🎲',
      bg: '#fef3c7',
      url: './jogos/nao-te-irrites/index.html'
    },
    {
      id: 'jogo-3',
      category: 'classicos',
      title: 'Quebra-Cabeças 15',
      desc: 'Deslize as peças numeradas até ordenar os números de 1 a 15 no tabuleiro.',
      tag: 'Puzzle · Lógica',
      icon: '🧩',
      bg: '#fef3c7',
      url: './jogos/jogo-3/index.html'
    },
    {
      id: 'jogo-5',
      category: 'classicos',
      title: 'Jogo de Pong',
      desc: 'Clássico ténis de mesa retro com 1 jogador (vs IA) ou 2 jogadores no mesmo ecrã.',
      tag: 'Arcade · Clássico',
      icon: '🏓',
      bg: '#e0e7ff',
      url: './jogos/jogo-5/index.html'
    },
    {
      id: 'aorus-corrida',
      category: 'classicos',
      title: 'Apex Velocity 3D',
      desc: 'Jogo de corridas arcade em 3D com velocidade e obstáculos.',
      tag: 'Corrida · 3D',
      icon: '🏎️',
      bg: '#fee2e2',
      url: './jogos/aorus-corrida/index.html'
    },
    {
      id: 'cyber-runner',
      category: 'classicos',
      title: 'Anti-Gravity Cyber Runner',
      desc: 'Corra e salte por pistas futuristas sem cair.',
      tag: 'Arcade · Runner',
      icon: '🚀',
      bg: '#ede9fe',
      url: './jogos/cyber-runner/index.html'
    }
  ];

  const catBar = document.getElementById('catBar');
  const gamesContainer = document.getElementById('gamesContainer') || document.getElementById('gamesGrid');
  const stage = document.getElementById('gameStage');
  const stageFrame = document.getElementById('stageFrame');
  const stageTitle = document.getElementById('stageTitle');
  const btnBackMenu = document.getElementById('btnBackMenu');
  const btnInstall = document.getElementById('btnInstall');
  const btnRefreshGames = document.getElementById('btnRefreshGames');

  let activeCat = 'todos';
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
        await Promise.all(regs.map((r) => r.unregister()));
      }
    } catch (_) {}
    window.location.replace(window.location.pathname + '?v=' + Date.now());
  });

  function createGameCard(game) {
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
    return card;
  }

  function renderCategories() {
    catBar.innerHTML = '';
    CATEGORIES.forEach((cat) => {
      const count = cat.id === 'todos'
        ? GAMES.length
        : GAMES.filter((g) => g.category === cat.id).length;

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cat-btn' + (activeCat === cat.id ? ' active' : '');
      btn.style.setProperty('--cat-color', cat.color);
      btn.innerHTML = `<span>${cat.label}</span><span class="cat-count">${count}</span>`;
      btn.addEventListener('click', () => {
        activeCat = cat.id;
        renderCategories();
        renderGames();
      });
      catBar.appendChild(btn);
    });
  }

  function renderGames() {
    gamesContainer.innerHTML = '';

    if (activeCat === 'todos') {
      CATEGORIES.filter((c) => c.id !== 'todos').forEach((cat) => {
        const list = GAMES.filter((g) => g.category === cat.id);
        if (!list.length) return;

        const sec = document.createElement('section');
        sec.className = 'cat-section';

        const h = document.createElement('h2');
        h.className = 'cat-section-title';
        h.textContent = `${cat.label} (${list.length})`;
        sec.appendChild(h);

        const grid = document.createElement('div');
        grid.className = 'games-grid';
        list.forEach((g) => grid.appendChild(createGameCard(g)));
        sec.appendChild(grid);

        gamesContainer.appendChild(sec);
      });
    } else {
      const grid = document.createElement('div');
      grid.className = 'games-grid';
      GAMES.filter((g) => g.category === activeCat).forEach((g) => grid.appendChild(createGameCard(g)));
      gamesContainer.appendChild(grid);
    }
  }

  renderCategories();
  renderGames();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
})();
