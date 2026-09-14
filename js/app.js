/**
 * Main Application Controller
 * Orchestrates DateTime, Weather, Animations, Audio & User Interactions
 */

// Global Toast System
const AppToast = {
  show(message, duration = 3000) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>✨</span><span>${message}</span>`;
    container.appendChild(toast);

    // Trigger animation
    requestAnimationFrame(() => {
      toast.classList.add('show');
    });

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
};
window.AppToast = AppToast;

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Visual Effects & Ambient Canvas
  window.ambientCanvas = new window.AmbientParticleCanvas('particle-canvas');
  window.init3DTiltCards();
  window.initCursorGlow();

  // 2. Initialize Audio Feedback
  const audioManager = new window.SoftAudioFeedback();
  const soundBtn = document.getElementById('toggle-sound-btn');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      audioManager.soundEnabled = !audioManager.soundEnabled;
      soundBtn.textContent = audioManager.soundEnabled ? '🔊 提示音效：開' : '🔇 提示音效：關';
      if (audioManager.soundEnabled) {
        audioManager.playChime(659.25);
        AppToast.show('已開啟互動輕音效');
      } else {
        AppToast.show('已關閉音效');
      }
    });
  }

  // 3. Initialize Taiwan DateTime Engine
  const dateTimeManager = new window.TaiwanDateTimeManager();

  const toggle1224Btn = document.getElementById('toggle-12-24-btn');
  if (toggle1224Btn) {
    toggle1224Btn.addEventListener('click', () => {
      const is24 = dateTimeManager.toggleTimeFormat();
      toggle1224Btn.textContent = is24 ? '切換 12 小時制' : '切換 24 小時制';
      audioManager.playChime(523.25);
      AppToast.show(is24 ? '已切換為 24 小時制' : '已切換為 12 小時制 (上下午)');
    });
  }

  const copyTimeBtn = document.getElementById('copy-datetime-btn');
  if (copyTimeBtn) {
    copyTimeBtn.addEventListener('click', async () => {
      const textToCopy = dateTimeManager.getFormattedString();
      try {
        await navigator.clipboard.writeText(textToCopy);
        audioManager.playChime(783.99);
        AppToast.show('已複製台灣時間至剪貼簿！');
      } catch (e) {
        // Fallback copy
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        audioManager.playChime(783.99);
        AppToast.show('已複製台灣時間至剪貼簿！');
      }
    });
  }

  // 4. Initialize Live Taiwan Weather
  const weatherManager = new window.TaiwanWeatherManager();

  // 5. Interactive Name Edit Easter Egg (Double click to customize)
  const nameElement = document.getElementById('user-display-name');
  if (nameElement) {
    nameElement.setAttribute('title', '點擊可編輯姓名');
    nameElement.addEventListener('click', () => {
      const currentName = nameElement.textContent.trim();
      const newName = prompt('請輸入您想顯示的姓名：', currentName);
      if (newName && newName.trim() !== '') {
        nameElement.textContent = newName.trim();
        AppToast.show(`歡迎，${newName.trim()}！`);
        audioManager.playChime(659.25);
      }
    });
  }

  // Share Page Button
  const shareBtn = document.getElementById('share-page-btn');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'David Lo | 個人主頁與台灣即時氣象',
            text: '查看即時台灣繁體中文時間與台中即時氣象！',
            url: window.location.href
          });
        } catch (e) {}
      } else {
        await navigator.clipboard.writeText(window.location.href);
        AppToast.show('已複製頁面連結！');
        audioManager.playChime(587.33);
      }
    });
  }

  console.log('✨ David Lo Personal Page loaded smoothly with Taiwan DateTime & Open-Meteo Weather.');
});
