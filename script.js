
"use strict";

/* =========================================================
   GAMEND X — ULTRA PRO GAME HUB
   Main Application JavaScript
   ========================================================= */

const GAMEND = (() => {

  /* ---------------------------------------------------------
     1. GAME DATABASE

     IMPORTANT:
     Replace each game URL with your actual game HTML path.
     Example: games/my-game/index.html
  --------------------------------------------------------- */

  const GAMES = [
    {
      id: "game-01",
      name: "Jantar Mantar 3D Runner",
      category: "action",
      description: "Experience an exciting 3D protest runner adventure.",
      icon: "fa-person-running",
      image: "",
      url: "games/jantar-mantar/index.html",
      rating: 4.9,
      popularity: 100,
      newest: 21
    },
    {
      id: "game-02",
      name: "Space Adventure",
      category: "arcade",
      description: "Explore space and overcome challenging obstacles.",
      icon: "fa-rocket",
      image: "",
      url: "games/space-adventure/index.html",
      rating: 4.7,
      popularity: 95,
      newest: 20
    },
    {
      id: "game-03",
      name: "Speed Racing",
      category: "racing",
      description: "Race through exciting tracks and beat your best time.",
      icon: "fa-car",
      image: "",
      url: "games/speed-racing/index.html",
      rating: 4.6,
      popularity: 90,
      newest: 19
    },
    {
      id: "game-04",
      name: "Brain Puzzle",
      category: "puzzle",
      description: "Test your thinking with challenging puzzles.",
      icon: "fa-puzzle-piece",
      image: "",
      url: "games/brain-puzzle/index.html",
      rating: 4.5,
      popularity: 85,
      newest: 18
    },
    {
      id: "game-05",
      name: "Battle Arena",
      category: "action",
      description: "Enter the arena and test your gaming skills.",
      icon: "fa-shield-halved",
      image: "",
      url: "games/battle-arena/index.html",
      rating: 4.8,
      popularity: 98,
      newest: 17
    },
    {
      id: "game-06",
      name: "Classic Snake",
      category: "arcade",
      description: "Enjoy a classic arcade gaming experience.",
      icon: "fa-worm",
      image: "",
      url: "games/classic-snake/index.html",
      rating: 4.4,
      popularity: 80,
      newest: 16
    },
    {
      id: "game-07",
      name: "Memory Challenge",
      category: "puzzle",
      description: "Improve your memory through fun challenges.",
      icon: "fa-brain",
      image: "",
      url: "games/memory-challenge/index.html",
      rating: 4.3,
      popularity: 75,
      newest: 15
    },
    {
      id: "game-08",
      name: "Moto Rush",
      category: "racing",
      description: "Ride fast and navigate challenging roads.",
      icon: "fa-motorcycle",
      image: "",
      url: "games/moto-rush/index.html",
      rating: 4.6,
      popularity: 88,
      newest: 14
    },
    {
      id: "game-09",
      name: "Tower Defense",
      category: "strategy",
      description: "Build your defence and protect your territory.",
      icon: "fa-chess-rook",
      image: "",
      url: "games/tower-defense/index.html",
      rating: 4.5,
      popularity: 82,
      newest: 13
    },
    {
      id: "game-10",
      name: "Pixel Shooter",
      category: "action",
      description: "A fast-paced arcade shooting challenge.",
      icon: "fa-crosshairs",
      image: "",
      url: "games/pixel-shooter/index.html",
      rating: 4.7,
      popularity: 92,
      newest: 12
    },
    {
      id: "game-11",
      name: "Block Puzzle",
      category: "puzzle",
      description: "Arrange blocks and solve the puzzle.",
      icon: "fa-cubes",
      image: "",
      url: "games/block-puzzle/index.html",
      rating: 4.4,
      popularity: 76,
      newest: 11
    },
    {
      id: "game-12",
      name: "Football Challenge",
      category: "arcade",
      description: "Take on a series of football challenges.",
      icon: "fa-futbol",
      image: "",
      url: "games/football-challenge/index.html",
      rating: 4.6,
      popularity: 89,
      newest: 10
    },
    {
      id: "game-13",
      name: "Chess Master",
      category: "strategy",
      description: "Plan your moves and challenge your strategy.",
      icon: "fa-chess",
      image: "",
      url: "games/chess-master/index.html",
      rating: 4.8,
      popularity: 91,
      newest: 9
    },
    {
      id: "game-14",
      name: "Endless Runner",
      category: "arcade",
      description: "Run as far as possible and beat your record.",
      icon: "fa-person-running",
      image: "",
      url: "games/endless-runner/index.html",
      rating: 4.5,
      popularity: 83,
      newest: 8
    },
    {
      id: "game-15",
      name: "Car Parking",
      category: "racing",
      description: "Master difficult parking challenges.",
      icon: "fa-square-parking",
      image: "",
      url: "games/car-parking/index.html",
      rating: 4.3,
      popularity: 72,
      newest: 7
    },
    {
      id: "game-16",
      name: "Number Quest",
      category: "puzzle",
      description: "Solve number puzzles and improve your skills.",
      icon: "fa-calculator",
      image: "",
      url: "games/number-quest/index.html",
      rating: 4.4,
      popularity: 70,
      newest: 6
    },
    {
      id: "game-17",
      name: "Zombie Escape",
      category: "action",
      description: "Escape dangerous situations and survive.",
      icon: "fa-skull",
      image: "",
      url: "games/zombie-escape/index.html",
      rating: 4.7,
      popularity: 94,
      newest: 5
    },
    {
      id: "game-18",
      name: "Empire Builder",
      category: "strategy",
      description: "Build and manage your own virtual empire.",
      icon: "fa-chess-king",
      image: "",
      url: "games/empire-builder/index.html",
      rating: 4.5,
      popularity: 79,
      newest: 4
    },
    {
      id: "game-19",
      name: "Bubble Pop",
      category: "arcade",
      description: "Enjoy a colourful bubble popping game.",
      icon: "fa-circle-dot",
      image: "",
      url: "games/bubble-pop/index.html",
      rating: 4.2,
      popularity: 68,
      newest: 3
    },
    {
      id: "game-20",
      name: "Drift Racing",
      category: "racing",
      description: "Master drifting and racing techniques.",
      icon: "fa-gauge-high",
      image: "",
      url: "games/drift-racing/index.html",
      rating: 4.8,
      popularity: 96,
      newest: 2
    },
    {
      id: "game-21",
      name: "Ultimate Quiz",
      category: "puzzle",
      description: "Test your knowledge with exciting questions.",
      icon: "fa-circle-question",
      image: "",
      url: "games/ultimate-quiz/index.html",
      rating: 4.3,
      popularity: 74,
      newest: 1
    }
  ];

  /* ---------------------------------------------------------
     2. STORAGE
  --------------------------------------------------------- */

  const STORAGE = {
    favorites: "gx_favorites",
    recent: "gx_recent",
    theme: "gx_mode",
    motion: "gx_motion",
    sound: "gx_sound",
    playTime: "gx_play_time",
    notifications: "gx_notifications"
  };

  function readStorage(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      return value === null ? fallback : JSON.parse(value);
    } catch (error) {
      console.warn("Storage read error:", key, error);
      return fallback;
    }
  }

  function saveStorage(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn("Storage write error:", key, error);
      toast("Unable to save settings on this device.");
      return false;
    }
  }

  let favorites = readStorage(STORAGE.favorites, []);
  let recent = readStorage(STORAGE.recent, []);
  let playTime = Number(readStorage(STORAGE.playTime, 0)) || 0;

  if (!Array.isArray(favorites)) favorites = [];
  if (!Array.isArray(recent)) recent = [];

  let activeCategory = "all";
  let searchTerm = "";
  let sortMode = "featured";
  let currentPage = 1;
  const PAGE_SIZE = 12;

  let activeGame = null;
  let gameStartTime = null;
  let playTimer = null;
  let toastTimer = null;

  /* ---------------------------------------------------------
     3. DOM HELPERS
  --------------------------------------------------------- */

  const $ = id => document.getElementById(id);

  function on(id, event, callback) {
    const element = $(id);
    if (element) element.addEventListener(event, callback);
  }

  function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]);
  }

  function toast(message) {
    const element = $("toast");
    if (!element) return;

    element.textContent = message;
    element.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      element.classList.remove("show");
    }, 2600);
  }

  function formatPlayTime(seconds) {
    const totalMinutes = Math.floor(seconds / 60);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  }

  /* ---------------------------------------------------------
     4. GAME CARD
  --------------------------------------------------------- */

  function gameCard(game) {
    const isFavorite = favorites.includes(game.id);

    const image = game.image
      ? `<img src="${escapeHTML(game.image)}"
          alt="${escapeHTML(game.name)}"
          loading="lazy"
          onerror="this.style.display='none'">`
      : "";

    return `
      <article class="game-card" data-game-id="${escapeHTML(game.id)}">

        <div class="game-cover">
          ${image}

          <div class="game-cover-placeholder">
            <i class="fa-solid ${escapeHTML(game.icon)}"></i>
          </div>

          <span class="game-category">
            ${escapeHTML(game.category)}
          </span>

          <button class="favorite-toggle ${isFavorite ? "active" : ""}"
            data-favorite="${escapeHTML(game.id)}"
            aria-label="Toggle favorite"
            aria-pressed="${isFavorite}">
            <i class="${isFavorite ? "fa-solid" : "fa-regular"} fa-heart"></i>
          </button>
        </div>

        <div class="game-info">
          <h3>${escapeHTML(game.name)}</h3>

          <p>${escapeHTML(game.description)}</p>

          <div class="game-card-footer">
            <span class="game-rating">
              <i class="fa-solid fa-star"></i>
              ${Number(game.rating).toFixed(1)}
            </span>

            <button class="game-play-btn"
              data-play="${escapeHTML(game.id)}">
              <i class="fa-solid fa-play"></i> Play
            </button>
          </div>
        </div>

      </article>
    `;
  }

  function renderGrid(containerId, games, emptyText) {
    const container = $(containerId);
    if (!container) return;

    if (!games.length) {
      container.innerHTML = `
        <div class="empty-card">${escapeHTML(emptyText)}</div>
      `;
      return;
    }

    container.innerHTML = games.map(gameCard).join("");
  }

  /* ---------------------------------------------------------
     5. SEARCH / FILTER / SORT
  --------------------------------------------------------- */

  function getFilteredGames() {
    let result = [...GAMES];

    if (activeCategory !== "all") {
      result = result.filter(game =>
        game.category === activeCategory
      );
    }

    if (searchTerm) {
      result = result.filter(game => {
        const text = [
          game.name,
          game.description,
          game.category
        ].join(" ").toLowerCase();

        return text.includes(searchTerm);
      });
    }

    switch (sortMode) {
      case "name":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "popular":
        result.sort((a, b) => b.popularity - a.popularity);
        break;

      case "newest":
        result.sort((a, b) => b.newest - a.newest);
        break;

      default:
        result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }

  function renderGames() {
    const filtered = getFilteredGames();
    const visible = filtered.slice(0, currentPage * PAGE_SIZE);

    renderGrid(
      "gameGrid",
      visible,
      searchTerm
        ? "No games match your search."
        : "No games found in this category."
    );

    const total = $("gameTotalLabel");
    if (total) total.textContent = `${filtered.length} Games`;

    const more = $("loadMoreGames");
    if (more) {
      more.style.display =
        visible.length < filtered.length ? "inline-flex" : "none";
    }

    updateStats();
  }

  function applySearch(value) {
    searchTerm = String(value || "").trim().toLowerCase();
    currentPage = 1;
    renderGames();
  }

  function setCategory(category) {
    activeCategory = category;
    currentPage = 1;

    document.querySelectorAll(".filter-btn").forEach(button => {
      button.classList.toggle(
        "active",
        button.dataset.category === category
      );
    });

    renderGames();
  }

  function setSort(mode) {
    sortMode = mode;
    currentPage = 1;
    renderGames();
  }

  /* ---------------------------------------------------------
     6. FAVORITES
  --------------------------------------------------------- */

  function toggleFavorite(id) {
    if (!GAMES.some(game => game.id === id)) return;

    if (favorites.includes(id)) {
      favorites = favorites.filter(item => item !== id);
      toast("Removed from favourites.");
    } else {
      favorites.push(id);
      toast("Added to favourites.");
    }

    saveStorage(STORAGE.favorites, favorites);

    renderGames();
    renderFavorites();
    updateStats();
  }

  function renderFavorites() {
    const favoriteGames = favorites
      .map(id => GAMES.find(game => game.id === id))
      .filter(Boolean);

    renderGrid(
      "favoriteGames",
      favoriteGames,
      "No favourite games yet. Add games using the heart icon."
    );
  }

  /* ---------------------------------------------------------
     7. RECENTLY PLAYED
  --------------------------------------------------------- */

  function addRecent(id) {
    recent = [
      id,
      ...recent.filter(item => item !== id)
    ].slice(0, 20);

    saveStorage(STORAGE.recent, recent);
    renderRecent();
    updateStats();
  }

  function renderRecent() {
    const recentGames = recent
      .map(id => GAMES.find(game => game.id === id))
      .filter(Boolean);

    renderGrid(
      "recentGames",
      recentGames.slice(0, 8),
      "Your recently played games will appear here."
    );
  }

  /* ---------------------------------------------------------
     8. GAME MODAL AND LAUNCH
  --------------------------------------------------------- */

  function openGameModal(id) {
    const game = GAMES.find(item => item.id === id);
    if (!game) return;

    activeGame = game;

    const content = $("gameModalContent");
    if (!content) return;

    content.innerHTML = `
      <div class="game-modal-content">

        <div class="game-cover" style="height:220px">
          <div class="game-cover-placeholder">
            <i class="fa-solid ${escapeHTML(game.icon)}"></i>
          </div>
        </div>

        <h2 style="margin-top:20px">
          ${escapeHTML(game.name)}
        </h2>

        <p style="margin-top:10px">
          ${escapeHTML(game.description)}
        </p>

        <p style="margin-top:12px;color:var(--muted)">
          Category: ${escapeHTML(game.category)}
          · Rating: ${Number(game.rating).toFixed(1)}
        </p>

        <button class="primary-button"
          id="launchSelectedGame"
          style="width:100%;margin-top:22px">
          <i class="fa-solid fa-play"></i>
          Start Game
        </button>

      </div>
    `;

    $("gameModal")?.classList.remove("hidden");

    $("launchSelectedGame")?.addEventListener(
      "click",
      launchActiveGame
    );
  }

  function launchActiveGame() {
    if (!activeGame) return;

    if (!activeGame.url) {
      toast("Game URL is not configured.");
      return;
    }

    const destination = new URL(
      activeGame.url,
      window.location.href
    );

    if (!["http:", "https:"].includes(destination.protocol)) {
      toast("Invalid game URL.");
      return;
    }

    addRecent(activeGame.id);
    closeModal("gameModal");

    window.location.assign(destination.href);
  }

  function closeModal(id) {
    const modal = $(id);
    if (modal) modal.classList.add("hidden");
  }

  /* ---------------------------------------------------------
     9. GAMING TIME

     This measures active time on the hub page.
     It does not measure time inside separately opened games.
  --------------------------------------------------------- */

  function updatePlayTime() {
    if (gameStartTime === null) return;

    const elapsed = Math.floor(
      (Date.now() - gameStartTime) / 1000
    );

    playTime += elapsed;
    gameStartTime = Date.now();

    saveStorage(STORAGE.playTime, playTime);
    updateStats();
  }

  function startPlayTimer() {
    if (playTimer) return;

    gameStartTime = Date.now();

    playTimer = setInterval(updatePlayTime, 60000);
  }

  function stopPlayTimer() {
    if (!playTimer) return;

    updatePlayTime();
    clearInterval(playTimer);

    playTimer = null;
    gameStartTime = null;
  }

  /* ---------------------------------------------------------
     10. STATISTICS
  --------------------------------------------------------- */

  function updateStats() {
    if ($("totalGames")) {
      $("totalGames").textContent = GAMES.length;
    }

    if ($("playedCount")) {
      $("playedCount").textContent = recent.length;
    }

    if ($("favoriteCount")) {
      $("favoriteCount").textContent = favorites.length;
    }

    if ($("playTime")) {
      $("playTime").textContent = formatPlayTime(playTime);
    }
  }

  /* ---------------------------------------------------------
     11. THEME
  --------------------------------------------------------- */

  function applyTheme(mode) {
    const selected = mode === "light" ? "light" : "dark";

    document.documentElement.dataset.mode = selected;
    saveStorage(STORAGE.theme, selected);

    const icon = $("themeToggle")?.querySelector("i");

    if (icon) {
      icon.className = selected === "dark"
        ? "fa-solid fa-moon"
        : "fa-solid fa-sun";
    }

    const setting = $("appearanceSetting");
    if (setting) setting.value = selected;
  }

  function toggleTheme() {
    const current =
      document.documentElement.dataset.mode || "dark";

    applyTheme(current === "dark" ? "light" : "dark");
  }

  /* ---------------------------------------------------------
     12. MODAL HELPERS
  --------------------------------------------------------- */

  function openModal(id) {
    const modal = $(id);
    if (modal) modal.classList.remove("hidden");
  }

  function closeAllModals() {
    document.querySelectorAll(".modal-backdrop").forEach(modal => {
      modal.classList.add("hidden");
    });
  }

  function openSettings() {
    openModal("settingsModal");
  }

  function openAbout() {
    openModal("aboutModal");
  }

  /* ---------------------------------------------------------
     13. SIDEBAR
  --------------------------------------------------------- */

  function openSidebar() {
    $("sidebar")?.classList.add("open");
    $("sidebarOverlay")?.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  function closeSidebar() {
    $("sidebar")?.classList.remove("open");
    $("sidebarOverlay")?.classList.remove("show");
    document.body.style.overflow = "";
  }

  /* ---------------------------------------------------------
     14. NAVIGATION
  --------------------------------------------------------- */

  function navigateTo(section) {
    const target = $(section);
    if (!target) return;

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

    closeSidebar();
  }

  function updateActiveNavigation() {
    const sections = [
      "home",
      "games",
      "recent",
      "favorites",
      "leaderboard"
    ];

    let current = "home";

    sections.forEach(id => {
      const section = $(id);
      if (!section) return;

      if (section.getBoundingClientRect().top <= 150) {
        current = id;
      }
    });

    document.querySelectorAll("[data-section]").forEach(link => {
      link.classList.toggle(
        "active",
        link.dataset.section === current
      );
    });
  }

  /* ---------------------------------------------------------
     15. FEEDBACK / BUG REPORT

     This starter version saves locally.
     Connect a backend to receive reports remotely.
  --------------------------------------------------------- */

  function saveLocalReport(type, data) {
    const key = "gx_local_reports";
    const reports = readStorage(key, []);

    if (!Array.isArray(reports)) return false;

    reports.push({
      id: crypto.randomUUID
        ? crypto.randomUUID()
        : `${Date.now()}-${Math.random()}`,
      type,
      data,
      createdAt: new Date().toISOString()
    });

    return saveStorage(key, reports);
  }

  function handleFeedback(event) {
    event.preventDefault();

    const text = $("feedbackText")?.value.trim();

    if (!text) return toast("Please enter your feedback.");

    if (saveLocalReport("feedback", { text })) {
      $("feedbackForm").reset();
      closeModal("feedbackModal");
      toast("Feedback saved on this device.");
    }
  }

  function handleBugReport(event) {
    event.preventDefault();

    const title = $("bugTitle")?.value.trim();
    const details = $("bugDetails")?.value.trim();

    if (!title || !details) {
      return toast("Please complete all fields.");
    }

    if (saveLocalReport("bug", { title, details })) {
      $("reportForm").reset();
      closeModal("reportModal");
      toast("Bug report saved on this device.");
    }
  }

  /* ---------------------------------------------------------
     16. EVENT DELEGATION
  --------------------------------------------------------- */

  function bindGameActions() {
    document.addEventListener("click", event => {

      const favoriteButton = event.target.closest("[data-favorite]");

      if (favoriteButton) {
        event.preventDefault();
        event.stopPropagation();

        toggleFavorite(favoriteButton.dataset.favorite);
        return;
      }

      const playButton = event.target.closest("[data-play]");

      if (playButton) {
        event.preventDefault();
        openGameModal(playButton.dataset.play);
      }
    });
  }

  /* ---------------------------------------------------------
     17. ALL EVENT LISTENERS
  --------------------------------------------------------- */

  function bindEvents() {

    on("globalSearch", "input", event => {
      applySearch(event.target.value);
    });

    on("categoryFilters", "click", event => {
      const button = event.target.closest("[data-category]");
      if (!button) return;

      setCategory(button.dataset.category);
    });

    on("sortGames", "change", event => {
      setSort(event.target.value);
    });

    on("loadMoreGames", "click", () => {
      currentPage++;
      renderGames();
    });

    on("heroExplore", "click", () => navigateTo("games"));
    on("exploreBtn", "click", () => navigateTo("games"));

    on("viewAllRecent", "click", () => navigateTo("recent"));

    on("bottomFavorites", "click", () => navigateTo("favorites"));

    on("menuToggle", "click", openSidebar);
    on("sidebarClose", "click", closeSidebar);
    on("sidebarOverlay", "click", closeSidebar);

    on("openSettings", "click", openSettings);
    on("bottomSettings", "click", openSettings);

    on("openAbout", "click", openAbout);
    on("footerAbout", "click", openAbout);

    on("themeToggle", "click", toggleTheme);

    on("appearanceSetting", "change", event => {
      applyTheme(event.target.value);
    });

    on("motionSetting", "change", event => {
      const enabled = event.target.checked;
      saveStorage(STORAGE.motion, enabled);

      document.documentElement.dataset.motion =
        enabled ? "on" : "off";
    });

    on("soundSetting", "change", event => {
      saveStorage(STORAGE.sound, event.target.checked);
    });

    on("feedbackBtn", "click", () => openModal("feedbackModal"));
    on("reportBtn", "click", () => openModal("reportModal"));

    on("feedbackForm", "submit", handleFeedback);
    on("reportForm", "submit", handleBugReport);

    on("notificationBtn", "click", () => {
      toast("You're all caught up!");
    });

    on("profileBtn", "click", () => {
      toast("Welcome to GAMEND X!");
    });

    document.querySelectorAll("[data-close-modal]").forEach(button => {
      button.addEventListener("click", closeAllModals);
    });

    document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
      backdrop.addEventListener("click", event => {
        if (event.target === backdrop) {
          backdrop.classList.add("hidden");
        }
      });
    });

    document.addEventListener("keydown", event => {
      if (event.key === "Escape") {
        closeAllModals();
        closeSidebar();
      }
    });

    document.querySelectorAll(".nav-link[data-section], .bottom-link[data-section]").forEach(link => {
      link.addEventListener("click", event => {
        event.preventDefault();
        navigateTo(link.dataset.section);
      });
    });

    window.addEventListener("scroll", updateActiveNavigation, {
      passive: true
    });

    window.addEventListener("pagehide", stopPlayTimer);

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopPlayTimer();
      else startPlayTimer();
    });

    bindGameActions();
  }

  /* ---------------------------------------------------------
     18. RESTORE SETTINGS
  --------------------------------------------------------- */

  function restoreSettings() {
    const theme = readStorage(STORAGE.theme, "dark");
    applyTheme(theme);

    const motion = readStorage(STORAGE.motion, true);
    const sound = readStorage(STORAGE.sound, false);

    if ($("motionSetting")) {
      $("motionSetting").checked = motion;
    }

    if ($("soundSetting")) {
      $("soundSetting").checked = sound;
    }

    document.documentElement.dataset.motion =
      motion ? "on" : "off";
  }

  /* ---------------------------------------------------------
     19. INITIALISE
  --------------------------------------------------------- */

  function init() {
    const year = $("currentYear");
    if (year) year.textContent = new Date().getFullYear();

    restoreSettings();

    renderGames();
    renderRecent();
    renderFavorites();

    updateStats();
    bindEvents();

    startPlayTimer();

    updateActiveNavigation();

    console.info(
      `GAMEND X initialized successfully. ${GAMES.length} catalog entries loaded.`
    );
  }

  return {
    init,
    games: GAMES,
    renderGames,
    renderFavorites,
    renderRecent,
    toggleFavorite,
    openGameModal,
    applyTheme
  };

})();

/* Wait until the DOM is ready. */
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", GAMEND.init, {
    once: true
  });
} else {
  GAMEND.init();
}
