/* ==========================================================================
   PUZZLE DE PORTUGAL - MOTOR DO MAPA SVG E DRAG & DROP
   ========================================================================== */

class PortugalMapEngine {
  constructor(containerId, svgId) {
    this.container = document.getElementById(containerId);
    this.svg = document.getElementById(svgId);
    this.placedCount = 0;
    this.totalDistricts = DISTRICTS_DATA.length;
    this.placedDistricts = new Set();
    this.activeDraggingPiece = null;
    this.dragGhost = null;

    this.onPiecePlacedCallback = null;
    this.onDistrictClickedCallback = null;

    this.initMapSVG();
    this.bindEvents();
  }

  initMapSVG() {
    this.svg.setAttribute('viewBox', '0 0 460 720');

    // Limpar SVG
    this.svg.innerHTML = `
      <defs>
        <linearGradient id="placed-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2563eb" />
          <stop offset="100%" stop-color="#06b6d4" />
        </linearGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      <!-- Fundo do Mapa -->
      <g id="map-background">
        <rect x="0" y="0" width="460" height="720" fill="transparent" />

        <!-- Molduras para Regiões Autónomas no Oceano Superior Esquerdo -->
        <rect x="23" y="63" width="109" height="59" rx="8" fill="rgba(15, 23, 42, 0.5)" stroke="rgba(255, 255, 255, 0.25)" stroke-dasharray="3 3" />
        <text x="77" y="56" font-size="10" font-weight="800" fill="#f59e0b" text-anchor="middle">🌊 AÇORES</text>

        <rect x="23" y="143" width="109" height="59" rx="8" fill="rgba(15, 23, 42, 0.5)" stroke="rgba(255, 255, 255, 0.25)" stroke-dasharray="3 3" />
        <text x="77" y="136" font-size="10" font-weight="800" fill="#f59e0b" text-anchor="middle">🌺 MADEIRA</text>
      </g>

      <!-- Grupo de Contornos / Slots Vazio para Peças -->
      <g id="district-slots-group"></g>

      <!-- Grupo de Peças Encaixadas -->
      <g id="district-placed-group"></g>

      <!-- Rótulos de Texto -->
      <g id="district-labels-group"></g>
    `;

    const slotsGroup = document.getElementById('district-slots-group');

    // Desenhar slots dos distritos
    DISTRICTS_DATA.forEach(district => {
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('id', `slot-${district.id}`);
      path.setAttribute('class', 'district-slot');
      path.setAttribute('d', district.path);
      path.setAttribute('data-id', district.id);

      slotsGroup.appendChild(path);
    });
  }

  renderTrayPieces(trayContainerId) {
    const tray = document.getElementById(trayContainerId);
    if (!tray) return;

    tray.innerHTML = '';

    // Embaralhar ordem das peças para o puzzle ser desafiante!
    const shuffled = [...DISTRICTS_DATA].sort(() => Math.random() - 0.5);

    shuffled.forEach(district => {
      const card = document.createElement('div');
      card.className = `piece-card ${this.placedDistricts.has(district.id) ? 'placed' : ''}`;
      card.setAttribute('data-id', district.id);
      card.setAttribute('draggable', 'true');

      card.innerHTML = `
        <svg class="piece-preview-svg" viewBox="0 0 460 720">
          <path d="${district.path}" fill="${district.color}" stroke="#ffffff" stroke-width="2" />
        </svg>
        <span class="piece-name">${district.name}</span>
        <span class="piece-sub">${district.region}</span>
      `;

      this.bindCardEvents(card, district);
      tray.appendChild(card);
    });
  }

  bindCardEvents(card, district) {
    // Eventos de clique / toque para seleção manual (Tap-to-Place)
    card.addEventListener('click', (e) => {
      if (this.placedDistricts.has(district.id)) return;
      
      audioManager.play('click');

      // Alternar seleção da peça
      if (this.selectedPiece === district) {
        this.selectedPiece = null;
        card.classList.remove('selected');
      } else {
        document.querySelectorAll('.piece-card').forEach(c => c.classList.remove('selected'));
        this.selectedPiece = district;
        card.classList.add('selected');

        const infoTitle = document.getElementById('info-title');
        const infoBody = document.getElementById('info-body');
        if (infoTitle && infoBody) {
          infoTitle.textContent = `📍 Peça Selecionada: ${district.name}`;
          infoBody.textContent = `Toca agora na silhueta do distrito no mapa de Portugal para encaixar a peça!`;
        }
      }
    });

    // Eventos de Arrastar com Rato (Desktop Drag & Drop)
    card.addEventListener('dragstart', (e) => {
      if (this.placedDistricts.has(district.id)) {
        e.preventDefault();
        return;
      }
      this.activeDraggingPiece = district;
      card.classList.add('dragging');
      e.dataTransfer.setData('text/plain', district.id);
      audioManager.play('click');
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('dragging');
      this.activeDraggingPiece = null;
    });

    // Eventos Táteis para Ecrãs de Telemóvel (Touch Dragging)
    card.addEventListener('touchstart', (e) => {
      if (this.placedDistricts.has(district.id)) return;
      const touch = e.touches[0];
      this.activeDraggingPiece = district;

      // Criar elemento fantasma para seguir o dedo no ecrã
      this.createTouchGhost(district, touch.clientX, touch.clientY);
    }, { passive: true });

    card.addEventListener('touchmove', (e) => {
      if (!this.activeDraggingPiece || !this.dragGhost) return;
      const touch = e.touches[0];
      this.dragGhost.style.left = `${touch.clientX - 25}px`;
      this.dragGhost.style.top = `${touch.clientY - 25}px`;
    }, { passive: true });

    card.addEventListener('touchend', (e) => {
      if (!this.activeDraggingPiece) return;
      const touch = e.changedTouches[0];

      // Identificar elemento por baixo do dedo na largada
      const dropTarget = document.elementFromPoint(touch.clientX, touch.clientY);
      if (dropTarget) {
        const slot = dropTarget.closest('.district-slot, .district-placed');
        if (slot) {
          const targetId = slot.getAttribute('data-id');
          if (targetId === district.id) {
            this.placeDistrict(district.id);
          } else {
            audioManager.play('error');
            this.flashDistrict(targetId, 'wrong');
          }
        }
      }

      this.removeTouchGhost();
      this.activeDraggingPiece = null;
    });
  }

  createTouchGhost(district, x, y) {
    this.removeTouchGhost();
    const ghost = document.createElement('div');
    ghost.id = 'touch-drag-ghost';
    ghost.style.position = 'fixed';
    ghost.style.left = `${x - 25}px`;
    ghost.style.top = `${y - 25}px`;
    ghost.style.width = '50px';
    ghost.style.height = '50px';
    ghost.style.pointerEvents = 'none';
    ghost.style.zIndex = '9999';
    ghost.style.transform = 'scale(1.2)';
    ghost.style.filter = 'drop-shadow(0 4px 8px rgba(0,0,0,0.5))';

    ghost.innerHTML = `
      <svg viewBox="0 0 460 720" style="width:100%; height:100%;">
        <path d="${district.path}" fill="${district.color}" stroke="#ffffff" stroke-width="3" />
      </svg>
    `;

    document.body.appendChild(ghost);
    this.dragGhost = ghost;
  }

  removeTouchGhost() {
    if (this.dragGhost) {
      this.dragGhost.remove();
      this.dragGhost = null;
    }
  }

  bindEvents() {
    // Permitir Drop no Mapa com destaque do slot sob o cursor
    this.svg.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (this.activeDraggingPiece) {
        const hoverTarget = document.elementFromPoint(e.clientX, e.clientY);
        const slot = hoverTarget ? hoverTarget.closest('.district-slot') : null;
        document.querySelectorAll('.district-slot').forEach(s => s.classList.remove('hover-target'));
        if (slot) slot.classList.add('hover-target');
      }
    });

    this.svg.addEventListener('dragleave', () => {
      document.querySelectorAll('.district-slot').forEach(s => s.classList.remove('hover-target'));
    });

    this.svg.addEventListener('drop', (e) => {
      e.preventDefault();
      document.querySelectorAll('.district-slot').forEach(s => s.classList.remove('hover-target'));
      const draggedDistrictId = e.dataTransfer.getData('text/plain');
      
      if (draggedDistrictId) {
        // Obter o elemento exato onde a peça foi largada
        const dropTarget = document.elementFromPoint(e.clientX, e.clientY);
        const slot = dropTarget ? dropTarget.closest('.district-slot, .district-placed') : null;
        const targetSlotId = slot ? slot.getAttribute('data-id') : null;

        if (targetSlotId === draggedDistrictId) {
          this.placeDistrict(draggedDistrictId);
        } else {
          audioManager.play('error');
          if (targetSlotId) {
            this.flashDistrict(targetSlotId, 'wrong');
          }
        }
      }
    });

    // Cliques no mapa (Slot ou Distrito Colocado)
    this.svg.addEventListener('click', (e) => {
      const target = e.target.closest('.district-placed, .district-slot');
      if (target) {
        const id = target.getAttribute('data-id');

        // Se estivermos no Modo Puzzle e houver uma peça selecionada por clique/toque
        if (this.selectedPiece) {
          if (id === this.selectedPiece.id) {
            this.placeDistrict(this.selectedPiece.id);
            this.selectedPiece = null;
            document.querySelectorAll('.piece-card').forEach(c => c.classList.remove('selected'));
          } else {
            audioManager.play('error');
            this.flashDistrict(id, 'wrong');
          }
          return;
        }

        // Modos Concelhos e Quiz
        if (this.onDistrictClickedCallback) {
          this.onDistrictClickedCallback(id);
        }
      }
    });

    // Tooltip / Hover nos distritos
    this.svg.addEventListener('mouseover', (e) => {
      const target = e.target.closest('.district-placed, .district-slot');
      if (target) {
        const id = target.getAttribute('data-id');
        const district = DISTRICTS_DATA.find(d => d.id === id);
        if (district) {
          target.setAttribute('title', `${district.name} (${district.capital})`);
        }
      }
    });
  }

  showAllDistricts(showAll = true) {
    DISTRICTS_DATA.forEach(district => {
      const slot = document.getElementById(`slot-${district.id}`);
      if (!slot) return;

      if (showAll) {
        slot.setAttribute('class', 'district-placed interactive-mode');
        slot.setAttribute('fill', district.color);

        // Garantir que os rótulos de texto estão presentes
        let label = document.getElementById(`label-${district.id}`);
        if (!label) {
          const labelsGroup = document.getElementById('district-labels-group');
          label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
          label.setAttribute('id', `label-${district.id}`);
          label.setAttribute('x', district.cx);
          label.setAttribute('y', district.cy);
          label.setAttribute('class', 'district-text');
          label.textContent = district.name;
          labelsGroup.appendChild(label);
        }
      } else {
        if (!this.placedDistricts.has(district.id)) {
          slot.setAttribute('class', 'district-slot');
          slot.setAttribute('fill', 'rgba(30, 41, 59, 0.6)');
          const label = document.getElementById(`label-${district.id}`);
          if (label) label.remove();
        }
      }
    });
  }

  flashDistrict(districtId, status = 'correct') {
    const slot = document.getElementById(`slot-${districtId}`);
    if (!slot) return;

    const originalFill = slot.getAttribute('fill');
    const flashColor = status === 'correct' ? '#10b981' : '#ef4444';

    slot.setAttribute('fill', flashColor);
    slot.style.transition = 'fill 0.15s ease';

    setTimeout(() => {
      slot.setAttribute('fill', originalFill || '#2563eb');
    }, 600);
  }

  placeDistrict(districtId) {
    if (this.placedDistricts.has(districtId)) return;

    const district = DISTRICTS_DATA.find(d => d.id === districtId);
    if (!district) return;

    this.placedDistricts.add(districtId);
    this.placedCount++;

    // Atualizar visual do slot
    const slot = document.getElementById(`slot-${districtId}`);
    if (slot) {
      slot.setAttribute('class', 'district-placed');
      slot.setAttribute('fill', district.color);
    }

    // Adicionar rótulo com o nome do distrito no centroide
    let label = document.getElementById(`label-${district.id}`);
    if (!label) {
      const labelsGroup = document.getElementById('district-labels-group');
      label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
      label.setAttribute('id', `label-${district.id}`);
      label.setAttribute('x', district.cx);
      label.setAttribute('y', district.cy);
      label.setAttribute('class', 'district-text');
      label.textContent = district.name;
      labelsGroup.appendChild(label);
    }

    // Marcar cartão na barra lateral como concluído
    const card = document.querySelector(`.piece-card[data-id="${districtId}"]`);
    if (card) {
      card.classList.add('placed');
    }

    audioManager.play('snap');

    if (this.onPiecePlacedCallback) {
      this.onPiecePlacedCallback(district, this.placedCount, this.totalDistricts);
    }
  }

  resetMap() {
    this.placedDistricts.clear();
    this.placedCount = 0;
    this.initMapSVG();
  }
}

