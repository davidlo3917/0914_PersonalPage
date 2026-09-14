/**
 * Interactive Visual FX & Particle Canvas
 * Features: Weather-reactive particle canvas, 3D tilt interaction, mouse light tracker, Web Audio feedback
 */

class AmbientParticleCanvas {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mode = 'clear'; // 'clear', 'rain', 'cloudy'
    this.animationId = null;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.createParticles();
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  setWeatherMode(mode) {
    this.mode = mode;
    this.createParticles();
  }

  createParticles() {
    this.particles = [];
    const count = this.mode === 'rain' ? 80 : 45;

    for (let i = 0; i < count; i++) {
      if (this.mode === 'rain') {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          length: Math.random() * 20 + 10,
          speedY: Math.random() * 8 + 6,
          speedX: Math.random() * 1 - 0.5,
          opacity: Math.random() * 0.35 + 0.15
        });
      } else if (this.mode === 'cloudy' || this.mode === 'fog') {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          radius: Math.random() * 80 + 40,
          speedX: Math.random() * 0.4 + 0.1,
          speedY: Math.random() * 0.2 - 0.1,
          opacity: Math.random() * 0.12 + 0.04
        });
      } else {
        // Clear / Sunny floating luminous dust
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          radius: Math.random() * 3 + 1,
          speedX: Math.random() * 0.6 - 0.3,
          speedY: Math.random() * 0.6 - 0.3,
          opacity: Math.random() * 0.5 + 0.2,
          pulse: Math.random() * Math.PI,
          hue: Math.random() > 0.5 ? 210 : 38 // Azure or warm gold
        });
      }
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    if (this.mode === 'rain') {
      this.ctx.lineWidth = 1.5;
      for (const p of this.particles) {
        this.ctx.strokeStyle = `rgba(56, 189, 248, ${p.opacity})`;
        this.ctx.beginPath();
        this.ctx.moveTo(p.x, p.y);
        this.ctx.lineTo(p.x + p.speedX * 2, p.y + p.length);
        this.ctx.stroke();

        p.y += p.speedY;
        p.x += p.speedX;
        if (p.y > this.height) {
          p.y = -20;
          p.x = Math.random() * this.width;
        }
      }
    } else if (this.mode === 'cloudy' || this.mode === 'fog') {
      for (const p of this.particles) {
        const grad = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, `rgba(226, 232, 240, ${p.opacity})`);
        grad.addColorStop(1, 'rgba(226, 232, 240, 0)');
        this.ctx.fillStyle = grad;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x - p.radius > this.width) p.x = -p.radius;
      }
    } else {
      // Clear / Sunny
      for (const p of this.particles) {
        p.pulse += 0.02;
        const currentOpacity = p.opacity * (0.7 + 0.3 * Math.sin(p.pulse));

        this.ctx.fillStyle = p.hue === 210 
          ? `rgba(96, 165, 250, ${currentOpacity})`
          : `rgba(251, 191, 36, ${currentOpacity})`;

        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = this.width;
        if (p.x > this.width) p.x = 0;
        if (p.y < 0) p.y = this.height;
        if (p.y > this.height) p.y = 0;
      }
    }

    this.animationId = requestAnimationFrame(() => this.animate());
  }
}

// 3D Tilt Card Interaction
function init3DTiltCards() {
  const cards = document.querySelectorAll('.hero-card, .glass-panel');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-2px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    });
  });
}

// Mouse Cursor Light Glow
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function updateGlow() {
    currentX += (mouseX - currentX) * 0.12;
    currentY += (mouseY - currentY) * 0.12;
    glow.style.left = `${currentX}px`;
    glow.style.top = `${currentY}px`;
    requestAnimationFrame(updateGlow);
  }
  updateGlow();
}

// Web Audio Pleasant Ambient Chime
class SoftAudioFeedback {
  constructor() {
    this.audioCtx = null;
    this.soundEnabled = false;
  }

  initContext() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.audioCtx = new AudioCtx();
    }
  }

  playChime(freq = 587.33) {
    if (!this.soundEnabled) return;
    try {
      this.initContext();
      if (!this.audioCtx) return;
      if (this.audioCtx.state === 'suspended') {
        this.audioCtx.resume();
      }

      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, this.audioCtx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.4);

      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      osc.start();
      osc.stop(this.audioCtx.currentTime + 0.4);
    } catch (e) {
      // Ignore audio errors
    }
  }
}

window.AmbientParticleCanvas = AmbientParticleCanvas;
window.init3DTiltCards = init3DTiltCards;
window.initCursorGlow = initCursorGlow;
window.SoftAudioFeedback = SoftAudioFeedback;
