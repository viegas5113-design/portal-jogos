/* ==========================================================================
   PUZZLE DE PORTUGAL - LÓGICA DO JOGO E MODOS (DISTANT, CONCELHOS & QUIZ)
   ========================================================================== */

class PortugalGameController {
  constructor() {
    this.currentMode = 'puzzle'; // 'puzzle' | 'concelhos' | 'quiz'
    this.mapEngine = null;

    // Estado Geral do Jogo
    this.timerSeconds = 0;
    this.timerInterval = null;
    this.score = 0;
    this.comboCount = 0;

    // Estado do Modo Concelhos
    this.currentConcelhoQuestion = null;
    this.concelhoAnswered = false;

    // Estado do Modo Quiz
    this.quizQuestions = [];
    this.quizIndex = 0;
    this.quizScore = 0;
    this.quizAnswered = false;

    this.initUI();
  }

  initUI() {
    this.mapEngine = new PortugalMapEngine('map-container', 'portugal-map');
    this.mapEngine.renderTrayPieces('puzzle-tray');

    // Callback quando peça é encaixada no modo puzzle
    this.mapEngine.onPiecePlacedCallback = (district, count, total) => {
      this.handlePiecePlaced(district, count, total);
    };

    // Callback quando qualquer distrito é clicado no mapa
    this.mapEngine.onDistrictClickedCallback = (districtId) => {
      this.handleDistrictClick(districtId);
    };

    this.bindDOMEvents();
    this.startTimer();
  }

  bindDOMEvents() {
    // Seletores de Modo
    document.querySelectorAll('.btn-mode').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const mode = e.currentTarget.getAttribute('data-mode');
        this.switchMode(mode);
      });
    });

    // Botão de Áudio (Mute/Unmute)
    const btnSound = document.getElementById('btn-sound');
    if (btnSound) {
      btnSound.addEventListener('click', () => {
        const muted = audioManager.toggleMute();
        btnSound.textContent = muted ? '🔇' : '🔊';
      });
    }

    // Botão de Reinício
    const btnReset = document.getElementById('btn-reset');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        this.resetGame();
      });
    }

    // Botão Atlas de Concelhos
    const btnAtlas = document.getElementById('btn-atlas');
    if (btnAtlas) {
      btnAtlas.addEventListener('click', () => {
        this.openAtlasModal();
      });
    }

    // Fechar Modais
    document.querySelectorAll('.close-modal-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
      });
    });

    // Pesquisa no Atlas de Concelhos
    const searchInput = document.getElementById('concelho-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.filterConcelhos(e.target.value);
      });
    }
  }

  switchMode(mode) {
    this.currentMode = mode;
    audioManager.play('click');

    document.querySelectorAll('.btn-mode').forEach(b => b.classList.remove('active'));
    const activeBtn = document.querySelector(`.btn-mode[data-mode="${mode}"]`);
    if (activeBtn) activeBtn.classList.add('active');

    const trayTitle = document.getElementById('tray-title');
    const trayContainer = document.getElementById('puzzle-tray');
    const concelhoPanel = document.getElementById('concelho-panel');
    const quizPanel = document.getElementById('quiz-panel');
    const infoCard = document.getElementById('info-card');
    const modeBadge = document.getElementById('mode-badge');

    if (mode === 'puzzle') {
      if (trayTitle) trayTitle.textContent = '🧩 Peças dos Distritos';
      if (trayContainer) trayContainer.style.display = 'grid';
      if (concelhoPanel) concelhoPanel.style.display = 'none';
      if (quizPanel) quizPanel.style.display = 'none';
      if (infoCard) infoCard.style.display = 'block';
      if (modeBadge) modeBadge.style.display = 'none';
      this.mapEngine.showAllDistricts(false);
    } else if (mode === 'concelhos') {
      if (trayTitle) trayTitle.textContent = '📍 Desafio dos Concelhos';
      if (trayContainer) trayContainer.style.display = 'none';
      if (concelhoPanel) concelhoPanel.style.display = 'flex';
      if (quizPanel) quizPanel.style.display = 'none';
      if (infoCard) infoCard.style.display = 'block';
      if (modeBadge) modeBadge.style.display = 'flex';
      this.mapEngine.showAllDistricts(true);
      this.startConcelhosChallenge();
    } else if (mode === 'quiz') {
      if (trayTitle) trayTitle.textContent = '❓ Quiz de Geografia';
      if (trayContainer) trayContainer.style.display = 'none';
      if (concelhoPanel) concelhoPanel.style.display = 'none';
      if (quizPanel) quizPanel.style.display = 'flex';
      if (infoCard) infoCard.style.display = 'block';
      if (modeBadge) modeBadge.style.display = 'none';
      this.mapEngine.showAllDistricts(true);
      this.startGeographyQuiz();
    }
  }

  startTimer() {
    clearInterval(this.timerInterval);
    this.timerSeconds = 0;
    this.updateTimerDisplay();

    this.timerInterval = setInterval(() => {
      this.timerSeconds++;
      this.updateTimerDisplay();
    }, 1000);
  }

  updateTimerDisplay() {
    const el = document.getElementById('timer-val');
    if (!el) return;
    const mins = Math.floor(this.timerSeconds / 60).toString().padStart(2, '0');
    const secs = (this.timerSeconds % 60).toString().padStart(2, '0');
    el.textContent = `${mins}:${secs}`;
  }

  /* ==========================================================================
     MODO 1: PUZZLE DOS DISTRITOS
     ========================================================================== */
  handlePiecePlaced(district, count, total) {
    this.score += 100;
    this.updateScoreDisplay();

    const countEl = document.getElementById('placed-val');
    if (countEl) countEl.textContent = `${count} / ${total}`;

    // Atualizar cartão informativo com curiosidades
    const infoTitle = document.getElementById('info-title');
    const infoBody = document.getElementById('info-body');
    if (infoTitle && infoBody) {
      infoTitle.textContent = `📍 ${district.name} (${district.capital})`;
      infoBody.textContent = district.trivia;
    }

    if (count === total) {
      this.triggerVictory();
    }
  }

  /* ==========================================================================
     CLIQUE NO MAPA SVG (GERAL)
     ========================================================================== */
  handleDistrictClick(districtId) {
    if (this.currentMode === 'concelhos') {
      this.evaluateConcelhoAnswer(districtId);
    } else if (this.currentMode === 'quiz') {
      this.evaluateQuizAnswerByDistrict(districtId);
    }
  }

  /* ==========================================================================
     MODO 2: DESAFIO DOS CONCELHOS
     ========================================================================== */
  startConcelhosChallenge() {
    this.comboCount = 0;
    this.updateComboDisplay();
    this.nextConcelhoQuestion();
  }

  nextConcelhoQuestion() {
    this.concelhoAnswered = false;

    // Escolher concelho aleatório
    const concelho = CONCELHOS_DATABASE[Math.floor(Math.random() * CONCELHOS_DATABASE.length)];
    const targetDistrict = DISTRICTS_DATA.find(d => d.name === concelho.district);

    if (!targetDistrict) return;

    // Escolher 3 distritos errados para opções
    const otherDistricts = DISTRICTS_DATA.filter(d => d.id !== targetDistrict.id);
    const shuffledOthers = [...otherDistricts].sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [...shuffledOthers, targetDistrict].sort(() => Math.random() - 0.5);

    this.currentConcelhoQuestion = {
      concelho,
      targetDistrict,
      options
    };

    // Atualizar UI do Painel de Concelhos
    const nameEl = document.getElementById('concelho-name');
    const promptEl = document.getElementById('concelho-prompt');
    const optionsContainer = document.getElementById('concelho-options');
    const feedbackEl = document.getElementById('concelho-feedback');
    const infoTitle = document.getElementById('info-title');
    const infoBody = document.getElementById('info-body');

    if (nameEl) nameEl.textContent = `${concelho.isCapital ? '👑 ' : ''}${concelho.name}`;
    if (promptEl) promptEl.textContent = `A que distrito pertence o concelho de ${concelho.name}?`;
    if (feedbackEl) feedbackEl.style.display = 'none';

    if (infoTitle && infoBody) {
      infoTitle.textContent = `💡 Dica: Concelho de ${concelho.name}`;
      infoBody.textContent = concelho.trivia;
    }

    // Gerar botões de opção
    if (optionsContainer) {
      const letters = ['A', 'B', 'C', 'D'];
      optionsContainer.innerHTML = options.map((opt, i) => `
        <button class="option-btn" data-district-id="${opt.id}">
          <span class="option-badge">${letters[i]}</span>
          <span>${opt.name}</span>
        </button>
      `).join('');

      optionsContainer.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const districtId = e.currentTarget.getAttribute('data-district-id');
          this.evaluateConcelhoAnswer(districtId);
        });
      });
    }
  }

  evaluateConcelhoAnswer(districtId) {
    if (this.concelhoAnswered || !this.currentConcelhoQuestion) return;

    const { concelho, targetDistrict } = this.currentConcelhoQuestion;
    const feedbackEl = document.getElementById('concelho-feedback');

    if (districtId === targetDistrict.id) {
      this.concelhoAnswered = true;
      audioManager.play('snap');
      this.mapEngine.flashDistrict(districtId, 'correct');

      this.score += 150 + (this.comboCount * 25);
      this.comboCount++;
      this.updateScoreDisplay();
      this.updateComboDisplay();

      // Realçar opção correta
      const correctBtn = document.querySelector(`#concelho-options .option-btn[data-district-id="${districtId}"]`);
      if (correctBtn) correctBtn.classList.add('correct');

      if (feedbackEl) {
        feedbackEl.className = 'feedback-banner success';
        feedbackEl.style.display = 'block';
        feedbackEl.textContent = `✅ Correto! ${concelho.name} pertence ao distrito de ${targetDistrict.name}!`;
      }

      setTimeout(() => {
        this.nextConcelhoQuestion();
      }, 1300);

    } else {
      audioManager.play('error');
      this.mapEngine.flashDistrict(districtId, 'wrong');
      this.comboCount = 0;
      this.updateComboDisplay();

      // Realçar opção errada clicada
      const wrongBtn = document.querySelector(`#concelho-options .option-btn[data-district-id="${districtId}"]`);
      if (wrongBtn) wrongBtn.classList.add('wrong');

      if (feedbackEl) {
        feedbackEl.className = 'feedback-banner error';
        feedbackEl.style.display = 'block';
        feedbackEl.textContent = `❌ Incorreto! Clica no distrito no mapa ou escolhe outra opção.`;
      }
    }
  }

  /* ==========================================================================
     MODO 3: QUIZ DE GEOGRAFIA
     ========================================================================== */
  startGeographyQuiz() {
    this.quizQuestions = [...QUIZ_QUESTIONS_DATABASE].sort(() => Math.random() - 0.5).slice(0, 10);
    this.quizIndex = 0;
    this.quizScore = 0;
    this.nextQuizQuestion();
  }

  nextQuizQuestion() {
    if (this.quizIndex >= this.quizQuestions.length) {
      this.triggerQuizVictory();
      return;
    }

    this.quizAnswered = false;
    const q = this.quizQuestions[this.quizIndex];

    const progressTag = document.getElementById('quiz-progress-tag');
    const scoreTag = document.getElementById('quiz-score-tag');
    const questionText = document.getElementById('quiz-question-text');
    const optionsContainer = document.getElementById('quiz-options');
    const feedbackEl = document.getElementById('quiz-feedback');
    const infoTitle = document.getElementById('info-title');
    const infoBody = document.getElementById('info-body');

    if (progressTag) progressTag.textContent = `Pergunta ${this.quizIndex + 1} de ${this.quizQuestions.length}`;
    if (scoreTag) scoreTag.textContent = `Score Quiz: ${this.quizScore}`;
    if (questionText) questionText.textContent = q.question;
    if (feedbackEl) feedbackEl.style.display = 'none';

    if (infoTitle && infoBody) {
      infoTitle.textContent = `❓ Pergunta de Geografia`;
      infoBody.textContent = `Responde selecionando uma das opções abaixo ou clicando diretamente no distrito correspondente no mapa de Portugal!`;
    }

    if (optionsContainer) {
      const letters = ['A', 'B', 'C', 'D'];
      optionsContainer.innerHTML = q.options.map((optText, index) => `
        <button class="option-btn" data-option-index="${index}">
          <span class="option-badge">${letters[index]}</span>
          <span>${optText}</span>
        </button>
      `).join('');

      optionsContainer.querySelectorAll('.option-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const optIndex = parseInt(e.currentTarget.getAttribute('data-option-index'), 10);
          this.evaluateQuizAnswer(optIndex);
        });
      });
    }
  }

  evaluateQuizAnswer(selectedIndex) {
    if (this.quizAnswered) return;
    this.quizAnswered = true;

    const q = this.quizQuestions[this.quizIndex];
    const isCorrect = selectedIndex === q.correctIndex;
    const feedbackEl = document.getElementById('quiz-feedback');

    const optionsContainer = document.getElementById('quiz-options');
    if (optionsContainer) {
      optionsContainer.querySelectorAll('.option-btn').forEach((btn, index) => {
        if (index === q.correctIndex) btn.classList.add('correct');
        else if (index === selectedIndex && !isCorrect) btn.classList.add('wrong');
      });
    }

    if (q.targetDistrictId) {
      this.mapEngine.flashDistrict(q.targetDistrictId, isCorrect ? 'correct' : 'wrong');
    }

    if (isCorrect) {
      audioManager.play('snap');
      this.score += 200;
      this.quizScore += 200;
      this.updateScoreDisplay();

      if (feedbackEl) {
        feedbackEl.className = 'feedback-banner success';
        feedbackEl.style.display = 'block';
        feedbackEl.textContent = `✅ Correto! ${q.explanation}`;
      }

      setTimeout(() => {
        this.quizIndex++;
        this.nextQuizQuestion();
      }, 1600);

    } else {
      audioManager.play('error');
      if (feedbackEl) {
        feedbackEl.className = 'feedback-banner error';
        feedbackEl.style.display = 'block';
        feedbackEl.textContent = `❌ Incorreto! ${q.explanation}`;
      }

      setTimeout(() => {
        this.quizIndex++;
        this.nextQuizQuestion();
      }, 2200);
    }
  }

  evaluateQuizAnswerByDistrict(districtId) {
    if (this.quizAnswered || !this.quizQuestions[this.quizIndex]) return;
    const q = this.quizQuestions[this.quizIndex];

    if (q.targetDistrictId) {
      if (districtId === q.targetDistrictId) {
        this.evaluateQuizAnswer(q.correctIndex);
      } else {
        this.evaluateQuizAnswer(-1); // Resposta incorreta por clique no distrito errado
      }
    }
  }

  triggerQuizVictory() {
    audioManager.play('victory');

    const modal = document.getElementById('victory-modal');
    const title = modal.querySelector('.modal-title');
    const finalTime = document.getElementById('final-time');
    const finalScore = document.getElementById('final-score');

    if (title) title.textContent = `🎓 Quiz Concluído!`;
    if (finalTime) finalTime.textContent = document.getElementById('timer-val').textContent;
    if (finalScore) finalScore.textContent = this.score;

    if (modal) modal.classList.add('active');
    this.launchConfetti();
  }

  triggerVictory() {
    clearInterval(this.timerInterval);
    audioManager.play('victory');

    const modal = document.getElementById('victory-modal');
    const title = modal.querySelector('.modal-title');
    const finalTime = document.getElementById('final-time');
    const finalScore = document.getElementById('final-score');

    if (title) title.textContent = `Parabéns! Portugal Completo!`;
    if (finalTime) finalTime.textContent = document.getElementById('timer-val').textContent;
    if (finalScore) finalScore.textContent = this.score;

    if (modal) modal.classList.add('active');
    this.launchConfetti();
  }

  updateScoreDisplay() {
    const el = document.getElementById('score-val');
    if (el) el.textContent = this.score;
  }

  updateComboDisplay() {
    const el = document.getElementById('combo-val');
    if (el) el.textContent = this.comboCount;
  }

  launchConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#2563eb', '#f59e0b', '#10b981', '#ef4444', '#06b6d4'];

    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: Math.random() * 4 + 2,
        speedX: Math.random() * 2 - 1
      });
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.y += p.speedY;
        p.x += p.speedX;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      if (particles.some(p => p.y < canvas.height)) {
        requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    animate();
  }

  openAtlasModal() {
    const modal = document.getElementById('atlas-modal');
    if (modal) {
      modal.classList.add('active');
      this.filterConcelhos('');
    }
  }

  filterConcelhos(query) {
    const list = document.getElementById('concelhos-list-container');
    if (!list) return;

    const filtered = CONCELHOS_DATABASE.filter(c => 
      c.name.toLowerCase().includes(query.toLowerCase()) || 
      c.district.toLowerCase().includes(query.toLowerCase())
    );

    list.innerHTML = filtered.map(c => `
      <div class="concelho-item">
        <div>
          <strong>${c.name}</strong> ${c.isCapital ? '👑' : ''}
          <div style="font-size:11px; color:#94a3b8;">${c.trivia}</div>
        </div>
        <div class="concelho-district">${c.district}</div>
      </div>
    `).join('');
  }

  resetGame() {
    this.score = 0;
    this.comboCount = 0;
    this.updateScoreDisplay();
    this.updateComboDisplay();
    document.getElementById('placed-val').textContent = `0 / ${DISTRICTS_DATA.length}`;
    this.mapEngine.resetMap();

    if (this.currentMode === 'puzzle') {
      this.mapEngine.renderTrayPieces('puzzle-tray');
      this.mapEngine.showAllDistricts(false);
    } else {
      this.mapEngine.showAllDistricts(true);
      if (this.currentMode === 'concelhos') this.startConcelhosChallenge();
      else if (this.currentMode === 'quiz') this.startGeographyQuiz();
    }

    this.startTimer();
    document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
  }
}

// Inicializar quando a página carregar
window.addEventListener('DOMContentLoaded', () => {
  window.gameApp = new PortugalGameController();
});
