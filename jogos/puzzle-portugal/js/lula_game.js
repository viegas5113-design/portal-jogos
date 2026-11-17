/* ==========================================================================
   PESCA DA LULA 2D - Motor de Jogo Principal (lula_game.js)
   ========================================================================== */

(function () {
  'use strict';

  class SoundEngine {
    constructor() { this.ctx = null; this.enabled = true; }
    init() {
      if (!this.ctx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.ctx = new AudioCtx();
      }
      if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
    }
    playSplash() {
      if (!this.enabled) return; this.init(); if (!this.ctx) return;
      const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.2, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < buffer.length; i++) data[i] = Math.random() * 2 - 1;
      const noise = this.ctx.createBufferSource(); noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter(); filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.2);
      const gain = this.ctx.createGain(); gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
      noise.connect(filter); filter.connect(gain); gain.connect(this.ctx.destination);
      noise.start();
    }
    playReel() {
      if (!this.enabled) return; this.init(); if (!this.ctx) return;
      const osc = this.ctx.createOscillator(); const gain = this.ctx.createGain();
      osc.type = 'sawtooth'; osc.frequency.setValueAtTime(250 + Math.random() * 80, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.05, this.ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain); gain.connect(this.ctx.destination); osc.start(); osc.stop(this.ctx.currentTime + 0.04);
    }
    playJerk() {
      if (!this.enabled) return; this.init(); if (!this.ctx) return;
      const osc = this.ctx.createOscillator(); const gain = this.ctx.createGain();
      osc.type = 'triangle'; osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(450, this.ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
      osc.connect(gain); gain.connect(this.ctx.destination); osc.start(); osc.stop(this.ctx.currentTime + 0.1);
    }
    playStrike() {
      if (!this.enabled) return; this.init(); if (!this.ctx) return;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = this.ctx.createOscillator(); const gain = this.ctx.createGain();
        osc.type = 'sine'; osc.frequency.setValueAtTime(freq, this.ctx.currentTime + i * 0.05);
        gain.gain.setValueAtTime(0.15, this.ctx.currentTime + i * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + i * 0.05 + 0.3);
        osc.connect(gain); gain.connect(this.ctx.destination);
        osc.start(this.ctx.currentTime + i * 0.05); osc.stop(this.ctx.currentTime + i * 0.05 + 0.3);
      });
    }
    playInk() {
      if (!this.enabled) return; this.init(); if (!this.ctx) return;
      const buffer = this.ctx.createBuffer(1, this.ctx.sampleRate * 0.3, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < buffer.length; i++) data[i] = Math.random() * 2 - 1;
      const noise = this.ctx.createBufferSource(); noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter(); filter.type = 'bandpass'; filter.frequency.setValueAtTime(400, this.ctx.currentTime);
      const gain = this.ctx.createGain(); gain.gain.setValueAtTime(0.2, this.ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
      noise.connect(filter); filter.connect(gain); gain.connect(this.ctx.destination); noise.start();
    }
    playCoin() {
      if (!this.enabled) return; this.init(); if (!this.ctx) return;
      const osc = this.ctx.createOscillator(); const gain = this.ctx.createGain();
      osc.type = 'sine'; osc.frequency.setValueAtTime(987.77, this.ctx.currentTime); osc.frequency.setValueAtTime(1318.51, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.2, this.ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
      osc.connect(gain); gain.connect(this.ctx.destination); osc.start(); osc.stop(this.ctx.currentTime + 0.3);
    }
  }

  function triggerVibrate(pattern) {
    if (navigator.vibrate) { try { navigator.vibrate(pattern); } catch (e) {} }
  }

  const SQUID_SPECIES = [
    { id: 'lula_costa', name: 'Lula-da-Costa', color: '#e67e22', glow: '#f39c12', minDepth: 2, maxDepth: 25, weightMin: 0.3, weightMax: 1.2, baseValue: 15, fightPower: 1.0, jetFreq: 0.02 },
    { id: 'pota_argentina', name: 'Pota-da-Meia-Laranja', color: '#c0392b', glow: '#e74c3c', minDepth: 10, maxDepth: 40, weightMin: 1.5, weightMax: 4.5, baseValue: 40, fightPower: 1.8, jetFreq: 0.04 },
    { id: 'choco_comum', name: 'Choco-da-Ria', color: '#7f8c8d', glow: '#bdc3c7', minDepth: 5, maxDepth: 30, weightMin: 0.8, weightMax: 2.5, baseValue: 25, fightPower: 1.3, jetFreq: 0.015 },
    { id: 'lula_biolum', name: 'Lula-Bioluminescente', color: '#00f2ff', glow: '#00ff88', minDepth: 25, maxDepth: 55, weightMin: 0.5, weightMax: 1.8, baseValue: 75, fightPower: 1.5, jetFreq: 0.03 },
    { id: 'lula_gigante', name: 'Lula-Gigante Abissal', color: '#8e44ad', glow: '#9b59b6', minDepth: 40, maxDepth: 60, weightMin: 6.0, weightMax: 15.0, baseValue: 200, fightPower: 2.8, jetFreq: 0.06 }
  ];

  const GameState = {
    coins: 50, score: 0, catchesCount: 0,
    equippedLure: 0, equippedLight: 0, equippedLine: 0, equippedReel: 0,
    inventory: [],
    lures: [
      { name: 'Palhaço Clássico', color: '#ff7700', power: 1.0, cost: 0, icon: '🦑' },
      { name: 'Egi Rosa Neon', color: '#ff007f', power: 1.4, cost: 60, icon: '💖' },
      { name: 'Egi Azul UV', color: '#00f2ff', power: 1.9, cost: 140, icon: '⚡' },
      { name: 'Egi Dourado Abissal', color: '#ffd700', power: 2.6, cost: 300, icon: '👑' }
    ],
    lights: [
      { name: 'Candeeiro Halogéneo', radius: 140, cost: 0, icon: '💡' },
      { name: 'Farol LED Submersível', radius: 220, cost: 80, icon: '🔦' },
      { name: 'Luz UV Atraente', radius: 320, cost: 200, icon: '🌟' }
    ],
    lines: [
      { name: 'Nylon 0.30mm', maxTension: 100, cost: 0, icon: '🧵' },
      { name: 'Multifilamento PE', maxTension: 160, cost: 100, icon: '🎗️' },
      { name: 'Núcleo Titânio', maxTension: 240, cost: 250, icon: '⚓' }
    ],
    reels: [
      { name: 'Carreteto Básico 3:1', speed: 1.0, cost: 0, icon: '⚙️' },
      { name: 'Carreteto Rápido 5:1', speed: 1.6, cost: 70, icon: '⚡' },
      { name: 'Carreteto Elétrico 7:1', speed: 2.3, cost: 180, icon: '🚀' }
    ]
  };

  let canvas, ctx, aquariumCanvas, aquariumCtx;
  let sound = new SoundEngine();
  let width = 0, height = 0, dpr = 1;
  let time = 0;

  const MODE = { IDLE: 'IDLE', FISHING: 'FISHING', HOOKED: 'HOOKED' };
  let currentMode = MODE.IDLE;

  let lureDepth = 0, cameraDepth = 0, lureX = 0, lureY = 0, tension = 0;
  let hookedSquid = null, activeSquids = [], particles = [], inkSplats = [];
  const boat = { x: 0, y: 0, waveOffset: 0 };
  let isReeling = false;

  class Squid {
    constructor(species, depth) {
      this.species = species;
      this.depth = depth;
      this.x = Math.random() * (width - 140) + 70;
      this.y = 0;
      this.vx = (Math.random() - 0.5) * 1.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.size = Math.random() * 12 + 20;
      this.weight = (Math.random() * (species.weightMax - species.weightMin) + species.weightMin).toFixed(2);
      this.tentaclePhase = Math.random() * Math.PI * 2;
      this.state = 'SWIMMING';
    }

    update() {
      this.tentaclePhase += 0.08;
      if (this.state === 'SWIMMING') {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 50 || this.x > width - 50) this.vx *= -1;

        const lightSpec = GameState.lights[GameState.equippedLight];
        const distToLure = Math.hypot(this.x - lureX, this.y - lureY);

        if (currentMode === MODE.FISHING && distToLure < lightSpec.radius) {
          const angle = Math.atan2(lureY - this.y, lureX - this.x);
          const lurePower = GameState.lures[GameState.equippedLure].power;
          this.vx = Math.cos(angle) * (1.2 * lurePower);
          this.vy = Math.sin(angle) * (1.2 * lurePower);

          if (distToLure < 25 && Math.random() < 0.05) hookSquid(this);
        }
      }
    }

    draw(renderCtx, screenX, screenY) {
      renderCtx.save();
      renderCtx.translate(screenX, screenY);
      const angle = Math.atan2(this.vy, this.vx);
      renderCtx.rotate(angle - Math.PI / 2);

      renderCtx.shadowColor = this.species.glow;
      renderCtx.shadowBlur = this.species.id === 'lula_biolum' ? 18 : 6;

      renderCtx.fillStyle = this.species.color;
      renderCtx.beginPath();
      renderCtx.moveTo(0, -this.size);
      renderCtx.bezierCurveTo(this.size * 0.6, -this.size * 0.5, this.size * 0.5, this.size * 0.5, 0, this.size * 0.6);
      renderCtx.bezierCurveTo(-this.size * 0.5, this.size * 0.5, -this.size * 0.6, -this.size * 0.5, 0, -this.size);
      renderCtx.fill();

      renderCtx.beginPath();
      renderCtx.moveTo(0, -this.size);
      renderCtx.lineTo(this.size * 0.7, -this.size * 0.4);
      renderCtx.lineTo(0, -this.size * 0.1);
      renderCtx.lineTo(-this.size * 0.7, -this.size * 0.4);
      renderCtx.closePath();
      renderCtx.fill();

      renderCtx.fillStyle = '#ffffff';
      renderCtx.beginPath();
      renderCtx.arc(-this.size * 0.25, 0, 3, 0, Math.PI * 2);
      renderCtx.arc(this.size * 0.25, 0, 3, 0, Math.PI * 2);
      renderCtx.fill();

      renderCtx.fillStyle = '#000000';
      renderCtx.beginPath();
      renderCtx.arc(-this.size * 0.25, 0, 1.5, 0, Math.PI * 2);
      renderCtx.arc(this.size * 0.25, 0, 1.5, 0, Math.PI * 2);
      renderCtx.fill();

      renderCtx.strokeStyle = this.species.color;
      renderCtx.lineWidth = 2;
      renderCtx.lineCap = 'round';

      for (let i = -3; i <= 3; i++) {
        const wave = Math.sin(this.tentaclePhase + i * 0.4) * 6;
        const length = (i === -1 || i === 1) ? this.size * 1.3 : this.size * 0.8;
        renderCtx.beginPath();
        renderCtx.moveTo(i * 3, this.size * 0.5);
        renderCtx.quadraticCurveTo(i * 4 + wave, this.size * 0.8, i * 3 + wave * 1.3, this.size * 0.5 + length);
        renderCtx.stroke();
      }
      renderCtx.restore();
    }
  }

  function hookSquid(squid) {
    currentMode = MODE.HOOKED;
    hookedSquid = squid;
    hookedSquid.state = 'HOOKED';
    tension = 40;
    sound.playStrike();
    triggerVibrate([100, 50, 100]);
    showBanner('🦑 FISGOU! ENROLA COM CUIDADO!');
    activeSquids = activeSquids.filter(s => s !== squid);
  }

  function emitInkCloud(x, y) {
    sound.playInk();
    triggerVibrate([80]);
    for (let i = 0; i < 18; i++) {
      particles.push({
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        radius: Math.random() * 15 + 8,
        alpha: 0.8,
        color: '#05070a'
      });
    }
    inkSplats.push({
      x: Math.random() * (width - 60) + 30,
      y: Math.random() * (height - 60) + 30,
      radius: Math.random() * 30 + 20,
      alpha: 0.9
    });
  }

  function init() {
    canvas = document.getElementById('canvas-game');
    if (!canvas) return;
    ctx = canvas.getContext('2d');

    aquariumCanvas = document.getElementById('canvas-aquarium');
    if (aquariumCanvas) aquariumCtx = aquariumCanvas.getContext('2d');

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('orientationchange', () => setTimeout(resize, 200));

    canvas.addEventListener('touchstart', (e) => {
      if (e.target !== canvas) return;
      e.preventDefault();
      sound.init();
      const touchX = e.touches[0].clientX;
      if (touchX > width * 0.5) {
        reelIn(true);
      } else {
        if (currentMode === MODE.IDLE) dropLine();
        else jerkLure();
      }
    }, { passive: false });

    canvas.addEventListener('touchend', (e) => {
      if (e.target !== canvas) return;
      e.preventDefault();
      reelIn(false);
    }, { passive: false });

    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space') { e.preventDefault(); jerkLure(); }
      else if (e.code === 'ArrowUp' || e.code === 'KeyW') { reelIn(true); }
      else if (e.code === 'ArrowDown' || e.code === 'KeyS') { dropLine(); }
    });
    window.addEventListener('keyup', (e) => {
      if (e.code === 'ArrowUp' || e.code === 'KeyW') { reelIn(false); }
    });

    setupTouchBtn('btn-reel', () => reelIn(true), () => reelIn(false));
    setupTouchBtn('btn-jerk', jerkLure);
    setupTouchBtn('btn-drop', dropLine);

    document.getElementById('btn-shop').onclick = openShop;
    document.getElementById('btn-aquarium').onclick = openAquarium;
    document.getElementById('btn-close-shop').onclick = closeShop;
    document.getElementById('btn-close-aquarium').onclick = closeAquarium;

    spawnSquids();
    requestAnimationFrame(gameLoop);
  }

  function setupTouchBtn(id, startFn, endFn) {
    const btn = document.getElementById(id);
    if (!btn) return;

    btn.addEventListener('touchstart', (e) => {
      e.preventDefault();
      sound.init();
      btn.classList.add('touch-active');
      if (startFn) startFn();
    }, { passive: false });

    btn.addEventListener('touchend', (e) => {
      e.preventDefault();
      btn.classList.remove('touch-active');
      if (endFn) endFn();
    }, { passive: false });

    btn.addEventListener('mousedown', () => {
      sound.init();
      btn.classList.add('touch-active');
      if (startFn) startFn();
    });

    btn.addEventListener('mouseup', () => {
      btn.classList.remove('touch-active');
      if (endFn) endFn();
    });
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);

    boat.x = width < 600 ? width * 0.25 : width * 0.35;
    boat.y = 120;
  }

  function spawnSquids() {
    activeSquids = [];
    for (let i = 0; i < 14; i++) {
      const species = SQUID_SPECIES[Math.floor(Math.random() * SQUID_SPECIES.length)];
      const depth = Math.random() * (species.maxDepth - species.minDepth) + species.minDepth;
      const squid = new Squid(species, depth);
      squid.y = 140 + depth * 35;
      activeSquids.push(squid);
    }
  }

  function dropLine() {
    if (currentMode === MODE.IDLE) {
      currentMode = MODE.FISHING;
      sound.playSplash();
      triggerVibrate([40]);
    }
  }

  function jerkLure() {
    sound.playJerk();
    triggerVibrate([30]);
    if (currentMode === MODE.FISHING || currentMode === MODE.HOOKED) {
      lureY -= 15;
      for (let i = 0; i < 5; i++) {
        particles.push({
          x: lureX + (Math.random() - 0.5) * 10,
          y: lureY,
          vx: (Math.random() - 0.5) * 1,
          vy: -Math.random() * 2 - 1,
          radius: Math.random() * 3 + 2,
          alpha: 0.7,
          color: '#00f2ff'
        });
      }
    }
  }

  function reelIn(active) { isReeling = active; }

  function update() {
    time += 0.05;
    boat.waveOffset = Math.sin(time) * 4;
    const boatTipX = boat.x + (width < 600 ? 80 : 110);
    const boatTipY = boat.y - 45 + boat.waveOffset;

    lureX = boatTipX;

    if (currentMode === MODE.IDLE) {
      lureDepth = 0;
      lureY = boatTipY;
    } else if (currentMode === MODE.FISHING) {
      if (!isReeling) {
        lureDepth = Math.min(60, lureDepth + 0.1);
      } else {
        lureDepth = Math.max(0, lureDepth - 0.25 * GameState.reels[GameState.equippedReel].speed);
        sound.playReel();
        if (lureDepth <= 0) currentMode = MODE.IDLE;
      }
      lureY = 140 + lureDepth * 35;
    } else if (currentMode === MODE.HOOKED) {
      const reelSpec = GameState.reels[GameState.equippedReel];

      if (isReeling) {
        lureDepth -= 0.2 * reelSpec.speed;
        tension += 1.2 * hookedSquid.species.fightPower;
        sound.playReel();
      } else {
        lureDepth += 0.08;
        tension -= 0.8;
      }

      if (Math.random() < hookedSquid.species.jetFreq) {
        tension += 18 * hookedSquid.species.fightPower;
        emitInkCloud(lureX, lureY);
      }

      tension = Math.max(0, Math.min(100, tension));
      lureY = 140 + lureDepth * 35;

      if (tension >= 98) {
        currentMode = MODE.IDLE;
        hookedSquid = null;
        tension = 0;
        sound.playSplash();
        triggerVibrate([200, 100, 200]);
        showBanner('💥 A LINHA PARTIU! A LULA ESCAPOU!');
      }

      if (tension <= 5 && lureDepth > 2) {
        currentMode = MODE.IDLE;
        hookedSquid = null;
        tension = 0;
        triggerVibrate([150]);
        showBanner('🌊 A LULA DESESCACOU DAS AGULHAS!');
      }

      if (lureDepth <= 0.5) catchSuccess();
    }

    cameraDepth += (lureY - height * 0.4 - cameraDepth) * 0.05;
    cameraDepth = Math.max(0, cameraDepth);

    activeSquids.forEach(squid => squid.update());
    if (activeSquids.length < 10) spawnSquids();

    particles.forEach(p => { p.x += p.vx; p.y += p.vy; p.alpha -= 0.008; });
    particles = particles.filter(p => p.alpha > 0);

    inkSplats.forEach(s => s.alpha -= 0.001);
    inkSplats = inkSplats.filter(s => s.alpha > 0);

    document.getElementById('depth-val').innerText = `${lureDepth.toFixed(1)}m`;
    document.getElementById('coins-val').innerText = GameState.coins;
    document.getElementById('score-val').innerText = GameState.score;
    document.getElementById('tension-inner').style.height = `${tension}%`;
  }

  function catchSuccess() {
    const squid = hookedSquid;
    currentMode = MODE.IDLE;
    hookedSquid = null;
    tension = 0;

    const value = Math.round(squid.species.baseValue * (squid.weight / squid.species.weightMin));
    GameState.coins += value;
    GameState.score += value * 10;
    GameState.catchesCount++;

    GameState.inventory.push({ species: squid.species, weight: squid.weight, value: value });

    sound.playCoin();
    triggerVibrate([80, 40, 80, 40, 120]);
    showBanner(`🎉 CAPTURASTE ${squid.species.name.toUpperCase()} (${squid.weight}kg) +${value} 💰`);
  }

  function draw() {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.scale(dpr, dpr);

    ctx.save();
    ctx.translate(0, -cameraDepth);

    const skyGrad = ctx.createLinearGradient(0, 0, 0, 140);
    skyGrad.addColorStop(0, '#030712');
    skyGrad.addColorStop(1, '#0b162c');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, 140);

    ctx.fillStyle = '#ffffff';
    for (let i = 0; i < 25; i++) {
      const sx = (i * 137.5) % width;
      const sy = (i * 53.1) % 110;
      ctx.globalAlpha = ((Math.sin(time + i) + 1) / 2) * 0.8;
      ctx.fillRect(sx, sy, 1.5, 1.5);
    }
    ctx.globalAlpha = 1.0;

    const oceanGrad = ctx.createLinearGradient(0, 140, 0, 140 + 60 * 35);
    oceanGrad.addColorStop(0, '#0a2e4d');
    oceanGrad.addColorStop(0.3, '#041628');
    oceanGrad.addColorStop(0.7, '#020b14');
    oceanGrad.addColorStop(1.0, '#010408');
    ctx.fillStyle = oceanGrad;
    ctx.fillRect(0, 140, width, 60 * 35 + 500);

    const lightSpec = GameState.lights[GameState.equippedLight];
    const boatTipX = boat.x + (width < 600 ? 80 : 110);
    const boatTipY = boat.y - 45 + boat.waveOffset;

    const coneGrad = ctx.createRadialGradient(boatTipX, boatTipY, 10, boatTipX, boatTipY + 200, lightSpec.radius * 1.8);
    coneGrad.addColorStop(0, 'rgba(0, 242, 255, 0.4)');
    coneGrad.addColorStop(0.5, 'rgba(0, 242, 255, 0.15)');
    coneGrad.addColorStop(1, 'rgba(0, 242, 255, 0)');

    ctx.fillStyle = coneGrad;
    ctx.beginPath();
    ctx.moveTo(boatTipX, boatTipY);
    ctx.lineTo(boatTipX - lightSpec.radius, boatTipY + lightSpec.radius * 2.2);
    ctx.lineTo(boatTipX + lightSpec.radius, boatTipY + lightSpec.radius * 2.2);
    ctx.closePath();
    ctx.fill();

    drawBoat(boat.x, boat.y + boat.waveOffset);

    if (currentMode !== MODE.IDLE) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.moveTo(boatTipX, boatTipY);
      const midY = (boatTipY + lureY) / 2;
      ctx.quadraticCurveTo(boatTipX + Math.sin(time * 2) * 4, midY, lureX, lureY);
      ctx.stroke();

      drawLure(lureX, lureY);
    }

    activeSquids.forEach(squid => squid.draw(ctx, squid.x, squid.y));
    if (hookedSquid) hookedSquid.draw(ctx, lureX, lureY + 15);

    particles.forEach(p => {
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });

    ctx.fillStyle = 'rgba(0, 242, 255, 0.15)';
    ctx.beginPath();
    ctx.moveTo(0, 140);
    for (let x = 0; x <= width; x += 25) {
      ctx.lineTo(x, 140 + Math.sin(x * 0.02 + time * 2) * 4);
    }
    ctx.lineTo(width, 160);
    ctx.lineTo(0, 160);
    ctx.fill();

    ctx.restore();

    inkSplats.forEach(s => {
      ctx.save();
      ctx.globalAlpha = s.alpha;
      ctx.fillStyle = '#05070a';
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    });
  }

  function drawBoat(x, y) {
    ctx.save();
    ctx.translate(x, y);
    const scale = width < 600 ? 0.8 : 1.0;
    ctx.scale(scale, scale);

    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#00f2ff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-75, -10); ctx.lineTo(85, -10); ctx.lineTo(55, 25); ctx.lineTo(-55, 25);
    ctx.closePath(); ctx.fill(); ctx.stroke();

    ctx.strokeStyle = '#ffd700'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(25, -10); ctx.lineTo(105, -45); ctx.stroke();

    ctx.fillStyle = '#ffd700';
    ctx.beginPath(); ctx.arc(105, -42, 6, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  function drawLure(x, y) {
    const lureSpec = GameState.lures[GameState.equippedLure];
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = lureSpec.color;
    ctx.shadowColor = lureSpec.color; ctx.shadowBlur = 10;
    ctx.beginPath(); ctx.ellipse(0, 0, 4, 12, 0, 0, Math.PI * 2); ctx.fill();

    ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 1.5;
    for (let i = -3; i <= 3; i += 2) {
      ctx.beginPath(); ctx.moveTo(i, 12); ctx.lineTo(i * 2, 18); ctx.stroke();
    }
    ctx.restore();
  }

  function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
  }

  function showBanner(text) {
    const banner = document.getElementById('event-banner');
    banner.innerText = text;
    banner.classList.add('active');
    setTimeout(() => banner.classList.remove('active'), 3000);
  }

  function openShop() { renderShopGrid(); document.getElementById('modal-shop').classList.add('active'); }
  function closeShop() { document.getElementById('modal-shop').classList.remove('active'); }

  function renderShopGrid() {
    const grid = document.getElementById('shop-grid');
    grid.innerHTML = '';
    GameState.lures.forEach((item, index) => {
      const isEquipped = GameState.equippedLure === index;
      const card = document.createElement('div');
      card.className = 'shop-item-card';
      card.innerHTML = `
        <div class="shop-item-icon">${item.icon}</div>
        <div class="shop-item-name">${item.name}</div>
        <div class="shop-item-desc">Atracção x${item.power}</div>
        <button class="shop-item-btn" ${isEquipped ? 'disabled' : ''}>
          ${isEquipped ? 'Equipado' : `Comprar (${item.cost}💰)`}
        </button>
      `;
      card.querySelector('button').onclick = () => {
        if (GameState.coins >= item.cost) {
          if (!isEquipped && item.cost > 0) GameState.coins -= item.cost;
          GameState.equippedLure = index;
          sound.playCoin(); triggerVibrate([50]); renderShopGrid();
        }
      };
      grid.appendChild(card);
    });

    GameState.lights.forEach((item, index) => {
      const isEquipped = GameState.equippedLight === index;
      const card = document.createElement('div');
      card.className = 'shop-item-card';
      card.innerHTML = `
        <div class="shop-item-icon">${item.icon}</div>
        <div class="shop-item-name">${item.name}</div>
        <div class="shop-item-desc">Luz ${item.radius}px</div>
        <button class="shop-item-btn" ${isEquipped ? 'disabled' : ''}>
          ${isEquipped ? 'Equipado' : `Comprar (${item.cost}💰)`}
        </button>
      `;
      card.querySelector('button').onclick = () => {
        if (GameState.coins >= item.cost) {
          if (!isEquipped && item.cost > 0) GameState.coins -= item.cost;
          GameState.equippedLight = index;
          sound.playCoin(); triggerVibrate([50]); renderShopGrid();
        }
      };
      grid.appendChild(card);
    });
  }

  function openAquarium() { renderAquarium(); document.getElementById('modal-aquarium').classList.add('active'); }
  function closeAquarium() { document.getElementById('modal-aquarium').classList.remove('active'); }

  function renderAquarium() {
    const list = document.getElementById('caught-list');
    list.innerHTML = '';
    if (GameState.inventory.length === 0) {
      list.innerHTML = '<p style="color:var(--text-muted); grid-column: 1/-1; text-align:center;">Nenhuma lula capturada ainda.</p>';
      return;
    }
    GameState.inventory.forEach(item => {
      const card = document.createElement('div');
      card.className = 'caught-card';
      card.innerHTML = `<div class="name">${item.species.name}</div><div>⚖️ ${item.weight} kg</div><div style="color:var(--accent-gold);">+${item.value} 💰</div>`;
      list.appendChild(card);
    });

    if (aquariumCtx) {
      aquariumCtx.clearRect(0, 0, aquariumCanvas.width, aquariumCanvas.height);
      GameState.inventory.slice(-5).forEach((item, idx) => {
        const dummySquid = new Squid(item.species, 10);
        dummySquid.draw(aquariumCtx, 30 + idx * 60, 80);
      });
    }
  }

  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    init();
  } else {
    document.addEventListener('DOMContentLoaded', init);
  }

})();
