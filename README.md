# 🌟 David Lo — Modern Personal Page (0914_PersonalPage)

> 國立中興大學 人工智慧與資訊系統 (NCHU AIIS)
> 兼具極致流暢微光玻璃擬態 (Glassmorphism) 與動態互動美學的現代化個人首頁。

[![GitHub repo](https://img.shields.io/badge/GitHub-davidlo3917%2F0914__PersonalPage-blue?logo=github)](https://github.com/davidlo3917/0914_PersonalPage)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Theme](https://img.shields.io/badge/Theme-Modern%20Luminous%20Light-f59e0b)](#視覺美學與設計系統)

---

## 📖 核心功能亮點

### 1. 🕒 台灣繁體中文時間系統 (Taiwan Chinese DateTime Engine)
- **實時走時數位時鐘**：秒數即時躍動，支援 **12 小時制（上午 / 下午）** 與 **24 小時制** 一鍵無縫切換。
- **西元紀年**：`西元 2026 年 09 月 14 日 星期一`
- **民國紀年**：`民國 115 年 09 月 14 日`
- **農曆歲次與生肖**：`丙午年 【馬年】 八月初四`
- **傳統十二時辰**：對應地支時段（如 `戌時 19:00 - 21:00 • 黃昏`）。
- **動態時段問候**：依據當前台灣時刻自動變換（清晨、早安、午安、下午好、傍晚好、晚安、夜深了）。
- **一鍵複製時間**：附帶輕盈微交互通知。

### 2. 🌤️ 台灣即時氣象儀表板 (Live Weather Dashboard)
- **資料來源**：串接 **Open-Meteo API**（零延遲、即時、精準台灣經緯度氣象）。
- **預設觀測站**：台中市（中興大學校本部南區）。
- **全台主要城市切換**：台中市、台北市、新北市、桃園市、新竹市、台南市、高雄市、花蓮縣。
- **📍 GPS 定位按鈕**：一鍵取得瀏覽器定位，即時查詢當地微氣候。
- **動態氣象指標**：
  - 即時氣溫與當日最高/最低溫
  - 體感溫度 (Apparent Temperature)
  - 相對濕度 (Relative Humidity)
  - 地面風速與蒲福氏風級評定 (Beaufort Scale)
  - 紫外線指數 (UV Index) 與分級防曬提醒
  - 大氣氣壓 (Surface Pressure)
  - 降雨量與降水機率
  - 當日日出與日落時間
- **逐時氣溫橫向預報 (24 Hours)** 與 **未來五天天氣預測**。

### 3. ✨ 視覺美學與動態體驗 (Modern Animated UI/UX)
- **高質感明亮微光玻璃擬態 (Luminous Glassmorphism)**：柔和多層次毛玻璃效果 (`backdrop-filter: blur(24px)`)，搭配精緻高光邊框與輕柔環境陰影。
- **流動極光背景 (Aurora Mesh)**：平滑飄移的柔彩光球。
- **氣象動態粒子畫布 (Particle Canvas)**：背景粒子隨天氣狀態自適應切換（晴朗暖陽微光、細雨絲漣漪、霧氣游動）。
- **3D 視差傾斜卡片 (3D Tilt Cards)**：滑鼠懸浮時隨游標角度產生細微 3D 空間傾斜。
- **游標環境柔光追隨 (Cursor Glow Tracker)**。
- **Web Audio 輕柔互動音效**：內建免外部檔案的 Web Audio API 提示音。

---

## 🛠️ 技術架構

- **結構**：HTML5 語義化標籤架構、完整 SEO 與 Open Graph Meta 標籤。
- **樣式**：純 Vanilla CSS3，不依賴龐大框架，具備極致效能與高度客製化的現代設計系統變數。
- **邏輯**：原生 JavaScript (ES6+)，模組化架構：
  - `js/datetime.js`：台灣時間、民國曆、農曆干支與時辰計算。
  - `js/weather.js`：Open-Meteo 氣象 API 請求、城市切換、指標解析。
  - `js/effects.js`：背景粒子系統、3D Tilt 視差、游標光暈、Web Audio 合成。
  - `js/app.js`：主控制流程與事件監聽。

---

## 🚀 本地預覽與運行

本專案為零依賴靜態網頁，支援直接開啟或透過任何本機 HTTP 伺服器啟動：

### 使用 Python 啟動：
```bash
python3 -m http.server 8080
```
瀏覽器開啟：`http://localhost:8080`

### 使用 Node.js 啟動：
```bash
npx serve .
```

---

## 🌐 部署至 GitHub Pages

1. 進入 GitHub 儲存庫 `davidlo3917/0914_PersonalPage`
2. 點擊 **Settings** -> **Pages**
3. 在 **Build and deployment** 下選擇：
   - **Source**: `Deploy from a branch`
   - **Branch**: `main` / `root`
4. 點擊 **Save**，即可在 `https://davidlo3917.github.io/0914_PersonalPage/` 瀏覽上線網站！

---

© 2026 David Lo (國立中興大學 AIIS) • All Rights Reserved.
