/**
 * Taiwan Chinese DateTime Module
 * Formats: Western (西元), Republic of China (民國), Lunar Calendar (農曆干支), and Shichen (十二時辰)
 */

class TaiwanDateTimeManager {
  constructor() {
    this.is24Hour = false;
    this.primaryCalendar = 'minguo'; // 'minguo' or 'western'
    
    // Traditional Earthly Branches for Time (十二時辰)
    this.shichenList = [
      { name: '子時', range: '23:00 - 01:00', period: '三更 / 半夜' },
      { name: '丑時', range: '01:00 - 03:00', period: '四更 / 荒雞' },
      { name: '寅時', range: '03:00 - 05:00', period: '五更 / 平旦' },
      { name: '卯時', range: '05:00 - 07:00', period: '日出 / 破曉' },
      { name: '辰時', range: '07:00 - 09:00', period: '食時 / 早食' },
      { name: '巳時', range: '09:00 - 11:00', period: '隅中 / 日禺' },
      { name: '午時', range: '11:00 - 13:00', period: '日中 / 正午' },
      { name: '未時', range: '13:00 - 15:00', period: '日昳 / 日跌' },
      { name: '申時', range: '15:00 - 17:00', period: '哺時 / 夕食' },
      { name: '酉時', range: '17:00 - 19:00', period: '日入 / 傍晚' },
      { name: '戌時', range: '19:00 - 21:00', period: '黃昏 / 一更' },
      { name: '亥時', range: '21:00 - 23:00', period: '人定 / 二更' }
    ];

    // Zodiac Animals mapping for Gan-Zhi
    this.zodiacAnimals = ['鼠', '牛', '虎', '兔', '龍', '蛇', '馬', '羊', '猴', '雞', '狗', '豬'];

    this.init();
  }

  init() {
    this.update();
    setInterval(() => this.update(), 1000);
  }

  getTaiwanDate() {
    // Current date adjusted explicitly to Asia/Taipei timezone
    return new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Taipei' }));
  }

  getShichen(hours) {
    if (hours >= 23 || hours < 1) return this.shichenList[0];
    const index = Math.floor((hours + 1) / 2);
    return this.shichenList[index] || this.shichenList[0];
  }

  getLunarInfo(date) {
    try {
      const formatter = new Intl.DateTimeFormat('zh-TW-u-ca-chinese', {
        dateStyle: 'full',
        timeZone: 'Asia/Taipei'
      });
      const parts = formatter.format(date); // e.g. "2026丙午年八月初四 星期一"
      // Extract Ganzhi and lunar month/day
      const match = parts.match(/(\d+)?([甲乙丙丁戊己庚辛壬癸][子丑寅卯辰巳午未申酉戌亥]年)?(.*?)(\s+星期|$)/);
      
      const ganzhiYear = match && match[2] ? match[2] : '丙午年';
      const lunarDate = match && match[3] ? match[3].trim() : '八月初四';

      // Year zodiac lookup (2026 is Year of Horse 馬年)
      const westernYear = date.getFullYear();
      const zodiac = this.zodiacAnimals[(westernYear - 4) % 12] || '馬';

      return {
        ganzhi: `${ganzhiYear} 【${zodiac}年】`,
        lunarDay: lunarDate,
        full: `${ganzhiYear}【${zodiac}年】${lunarDate}`
      };
    } catch (e) {
      return {
        ganzhi: '丙午年 【馬年】',
        lunarDay: '農曆初吉',
        full: '農曆歲次時序'
      };
    }
  }

  getGreeting(hours) {
    if (hours >= 5 && hours < 11) {
      return { text: '早安，晨光熹微，充實美好的一天！', icon: '🌅' };
    } else if (hours >= 11 && hours < 14) {
      return { text: '午安，享用美味午餐，養精蓄銳！', icon: '☀️' };
    } else if (hours >= 14 && hours < 18) {
      return { text: '下午好，專注當下，保持熱忱高效前行！', icon: '☕' };
    } else if (hours >= 18 && hours < 20) {
      return { text: '傍晚好，夕陽晚霞映照，放鬆身心！', icon: '🌇' };
    } else if (hours >= 20 && hours < 23) {
      return { text: '晚安，享受悠閒夜色與充實時光！', icon: '🌙' };
    } else {
      return { text: '夜深了，繁星相伴，注意休息蓄積能量！', icon: '✨' };
    }
  }

  toggleTimeFormat() {
    this.is24Hour = !this.is24Hour;
    this.update();
    return this.is24Hour;
  }

  getFormattedString() {
    const d = this.getTaiwanDate();
    const y = d.getFullYear();
    const m = d.getMonth() + 1;
    const date = d.getDate();
    const day = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'][d.getDay()];
    const minguoYear = y - 1911;
    const hours = String(d.getHours()).padStart(2, '0');
    const mins = String(d.getMinutes()).padStart(2, '0');
    const secs = String(d.getSeconds()).padStart(2, '0');

    return `民國 ${minguoYear} 年（西元 ${y} 年）${m}月${date}日 ${day} ${hours}:${mins}:${secs} (台灣標準時間)`;
  }

  update() {
    const d = this.getTaiwanDate();
    const year = d.getFullYear();
    const month = d.getMonth() + 1;
    const date = d.getDate();
    const dayIndex = d.getDay();
    const hours24 = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();

    const minguoYear = year - 1911;
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const weekdayStr = weekdays[dayIndex];

    // AM/PM calculation
    const isPM = hours24 >= 12;
    const ampmText = isPM ? '下午 PM' : '上午 AM';

    // Display Hours
    let displayHours = hours24;
    if (!this.is24Hour) {
      displayHours = hours24 % 12;
      if (displayHours === 0) displayHours = 12;
    }

    const hoursStr = String(displayHours).padStart(2, '0');
    const minutesStr = String(minutes).padStart(2, '0');
    const secondsStr = String(seconds).padStart(2, '0');

    // Update Elements
    const ampmElem = document.getElementById('clock-ampm');
    const hoursElem = document.getElementById('clock-hours');
    const minutesElem = document.getElementById('clock-minutes');
    const secondsElem = document.getElementById('clock-seconds');
    const greetingElem = document.getElementById('hero-greeting');
    
    if (ampmElem) ampmElem.textContent = ampmText;
    if (hoursElem) hoursElem.textContent = hoursStr;
    if (minutesElem) minutesElem.textContent = minutesStr;
    if (secondsElem) secondsElem.textContent = secondsStr;

    // Greeting
    const greeting = this.getGreeting(hours24);
    if (greetingElem) {
      greetingElem.innerHTML = `<span>${greeting.icon}</span> <span>${greeting.text}</span>`;
    }

    // Dates
    const westElem = document.getElementById('date-val-western');
    const minguoElem = document.getElementById('date-val-minguo');
    const lunarElem = document.getElementById('date-val-lunar');
    const shichenElem = document.getElementById('date-val-shichen');

    const formattedMonth = String(month).padStart(2, '0');
    const formattedDate = String(date).padStart(2, '0');

    if (westElem) {
      westElem.textContent = `西元 ${year} 年 ${formattedMonth} 月 ${formattedDate} 日 ${weekdayStr}`;
    }

    if (minguoElem) {
      minguoElem.textContent = `民國 ${minguoYear} 年 ${formattedMonth} 月 ${formattedDate} 日`;
    }

    const lunarInfo = this.getLunarInfo(d);
    if (lunarElem) {
      lunarElem.textContent = `${lunarInfo.ganzhi} ${lunarInfo.lunarDay}`;
    }

    const shichen = this.getShichen(hours24);
    if (shichenElem) {
      shichenElem.textContent = `${shichen.name}（${shichen.range} • ${shichen.period}）`;
    }
  }
}

// Attach globally
window.TaiwanDateTimeManager = TaiwanDateTimeManager;
