const DATA = window.AgroRadarData || {};
const CONTENT = window.AgroRadarContent || {};
const body = document.body;
const page = body.dataset.page || "home";
const categories = normalizeCategories(CONTENT.categorias || DATA.categories || []);
const articles = normalizeArticles(CONTENT.artigos || DATA.articles || []);
const homepageContent = normalizeHomepage(CONTENT.homepage || DATA.homepage || {});
const regions = DATA.regions || [];

const categoryMap = new Map(categories.map((category) => [category.slug, category]));
const articleMap = new Map(articles.map((article) => [article.slug, article]));
const regionMap = new Map(regions.map((region) => [region.id, region]));
const query = new URLSearchParams(window.location.search);

let activeRegion = getStoredRegion();
let headerScrollAttached = false;

function getStoredRegion() {
  const stored = window.localStorage.getItem("agroradar-region");
  if (stored && regionMap.has(stored)) {
    return stored;
  }

  return DATA.site.defaultRegion;
}

function storeRegion(regionId) {
  window.localStorage.setItem("agroradar-region", regionId);
}

function getRegion(regionId = activeRegion) {
  return regionMap.get(regionId) || regionMap.get(DATA.site.defaultRegion) || regions[0];
}

function getCategory(categorySlug) {
  return categoryMap.get(categorySlug) || categories[0];
}

function getArticle(slug) {
  return articleMap.get(slug) || articleMap.get(homepageContent.heroSlug) || articles[0];
}

function articleUrl(slug) {
  return `noticia.html?slug=${encodeURIComponent(slug)}`;
}

function categoryUrl(categorySlug) {
  return `categoria.html?cat=${encodeURIComponent(categorySlug)}`;
}

function sectionUrl(sectionId) {
  return page === "home" ? `#${sectionId}` : `index.html#${sectionId}`;
}

function formatDate(dateInput, options = {}) {
  const date = new Date(dateInput);

  if (Number.isNaN(date.getTime())) {
    return "data indisponível";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "short",
    year: "numeric",
    ...options
  }).format(date);
}

function formatDateTime(dateInput) {
  const date = new Date(String(dateInput).replace(" ", "T"));

  if (Number.isNaN(date.getTime())) {
    return "horário indisponível";
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }).format(date);
}

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function normalizeText(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function normalizeCategories(items) {
  return items.map((item) => ({
    slug: item.slug,
    name: item.nome || item.name,
    description: item.descricao || item.description || ""
  }));
}

function normalizeArticles(items) {
  return items.map((item) => ({
    slug: item.slug,
    category: item.categoria || item.category,
    kicker: item.editoria || item.kicker || item.categoria || item.category || "Notícia",
    title: item.titulo || item.title,
    summary: item.resumo || item.summary || "",
    deck: item.chamada || item.deck || item.resumo || item.summary || "",
    image: item.imagem || item.image || "",
    updatedAt: item.data || item.updatedAt,
    location: item.local || item.location || "",
    readTime: item.tempoLeitura || item.readTime || "",
    highlights: item.destaques || item.highlights || [],
    body: Array.isArray(item.conteudo || item.body)
      ? (item.conteudo || item.body)
      : [item.conteudo || item.body || ""],
    related: item.relacionadas || item.related || []
  }));
}

function normalizeRegionalLinks(items) {
  return items.map((item) => ({
    title: item.titulo || item.title || "",
    region: item.regiao || item.region || "",
    description: item.descricao || item.description || "",
    url: item.url || "#",
    origin: item.origem || item.origin || "",
    channel: item.canal || item.channel || "Fonte externa"
  }));
}

function normalizeHomepage(homepage) {
  return {
    heroSlug: homepage.hero || homepage.heroSlug || "",
    highlightSlugs: homepage.destaques || homepage.highlightSlugs || [],
    mostReadSlugs: homepage.maisLidas || homepage.mostReadSlugs || [],
    latestSlugs: homepage.ultimas || homepage.latestSlugs || [],
    regionalNetwork: {
      title:
        homepage.redeRegional?.titulo ||
        homepage.regionalNetwork?.title ||
        "Leilões, eventos e fontes do Norte",
      description:
        homepage.redeRegional?.descricao ||
        homepage.regionalNetwork?.description ||
        "",
      eventLinks: normalizeRegionalLinks(
        homepage.redeRegional?.leiloesEventos || homepage.regionalNetwork?.eventLinks || []
      ),
      sourceLinks: normalizeRegionalLinks(
        homepage.redeRegional?.fontesOficiais || homepage.regionalNetwork?.sourceLinks || []
      )
    }
  };
}

function getRegionSearchTerms(region) {
  const extraTerms = {
    para: ["para", "belem", "barcarena", "santarem", "sudeste paraense", "paraense"],
    tocantins: ["tocantins", "palmas", "tocantinense"],
    rondonia: ["rondonia", "porto velho", "rondoniense"],
    amazonas: ["amazonas", "manaus", "amazonense", "autazes"]
  };

  return [
    region?.name,
    region?.selector,
    region?.weather?.city,
    ...(extraTerms[region?.id] || [])
  ]
    .map(normalizeText)
    .filter(Boolean);
}

function scoreRegionalItem(item, terms) {
  const haystack = normalizeText([item.title, item.region, item.description, item.origin].join(" "));
  return terms.reduce((score, term) => score + (haystack.includes(term) ? 1 : 0), 0);
}

function prioritizeRegionalItems(items, region) {
  const terms = getRegionSearchTerms(region);

  return [...items].sort((left, right) => {
    return scoreRegionalItem(right, terms) - scoreRegionalItem(left, terms);
  });
}

function weatherCodeToText(code) {
  const map = {
    0: "céu limpo",
    1: "predomínio de sol",
    2: "sol entre nuvens",
    3: "céu encoberto",
    45: "neblina",
    48: "névoa úmida",
    51: "garoa fraca",
    53: "garoa moderada",
    55: "garoa intensa",
    61: "chuva fraca",
    63: "chuva moderada",
    65: "chuva forte",
    80: "pancadas isoladas",
    81: "pancadas moderadas",
    82: "pancadas fortes",
    95: "tempestade"
  };

  return map[code] || "condição variável";
}

function buildTickerGroup(region) {
  const localCard = region.marketBoard.find((item) => item.type !== "live-usd");

  return `
    <div class="ticker-group">
      <span>USD/BRL PTAX <strong data-ticker-usd>carregando</strong></span>
      <span>${escapeHtml(region.name)} <strong>${escapeHtml(localCard.value)}</strong></span>
      <span>Clima ${escapeHtml(region.weather.city)} <strong data-ticker-weather>carregando</strong></span>
      <span>Categoria <strong>${escapeHtml(getCategory("mercado").name)}</strong></span>
    </div>
  `;
}

function renderShell() {
  const headerSlot = document.querySelector("[data-site-header]");
  const footerSlot = document.querySelector("[data-site-footer]");
  const region = getRegion();
  const dateLabel = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(new Date());

  if (headerSlot) {
    headerSlot.innerHTML = `
      <aside class="market-ticker" aria-label="Ticker de mercado">
        <div class="container ticker-wrap">
          <span class="ticker-label">Radar de Mercado</span>
          <div class="ticker-window">
            <div class="ticker-track">
              ${buildTickerGroup(region)}
              ${buildTickerGroup(region)}
            </div>
          </div>
          <span class="ticker-meta">Atualizado às <span class="js-live-time">--:--</span></span>
        </div>
      </aside>

      <header class="site-header" id="topo">
        <div class="container header-main">
          <a class="brand" href="index.html" aria-label="AgroRadar, voltar para a página inicial">
            <span class="brand-mark">AR</span>
            <span class="brand-copy">
              <strong>${escapeHtml(DATA.site.name)}</strong>
              <small>${escapeHtml(DATA.site.tagline)}</small>
            </span>
          </a>

          <div class="header-utility">
            <label class="region-switcher" aria-label="Escolher praça local">
              <span>Sua região</span>
              <select data-region-select>
                ${regions
                  .map(
                    (item) => `
                      <option value="${escapeHtml(item.id)}"${item.id === region.id ? " selected" : ""}>
                        ${escapeHtml(item.selector)}
                      </option>
                    `
                  )
                  .join("")}
              </select>
            </label>

            <div class="header-actions">
              <a class="pill-link is-live" href="${sectionUrl("ultimas")}">Últimas notícias</a>
              <a class="pill-link" href="${sectionUrl("newsletter")}">Assinar newsletter</a>
            </div>
          </div>

          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-navigation">
            Menu
          </button>
        </div>

        <div class="container header-nav-row">
          <nav class="site-nav" id="site-navigation" aria-label="Editorias principais">
            ${categories
              .map(
                (category) => `
                  <a href="${categoryUrl(category.slug)}">${escapeHtml(category.name)}</a>
                `
              )
              .join("")}
          </nav>

          <div class="header-stamp">
            <span>Edição do dia</span>
            <strong class="js-live-date">${escapeHtml(dateLabel)}</strong>
          </div>
        </div>

        <div class="container quick-links" aria-label="Navegação rápida">
          <a href="${sectionUrl("cotacoes")}">Cotações</a>
          <a href="${sectionUrl("clima")}">Clima</a>
          <a href="${sectionUrl("mais-lidas")}">Mais lidas</a>
          <a href="${sectionUrl("rede-regional")}">Leilões & eventos</a>
          <a href="${categoryUrl("mercado")}">Mercado</a>
          <a href="${categoryUrl("politica")}">Política</a>
          <a href="sobre.html">Sobre</a>
          <a href="contato.html">Contato</a>
        </div>
      </header>
    `;
  }

  if (footerSlot) {
    footerSlot.innerHTML = `
      <footer class="site-footer">
        <div class="container footer-grid">
          <section class="footer-brand">
            <a class="brand brand--footer" href="index.html">
              <span class="brand-mark">AR</span>
              <span class="brand-copy">
                <strong>${escapeHtml(DATA.site.name)}</strong>
                <small>notícias, mercado e clima para o agronegócio</small>
              </span>
            </a>
            <p>${escapeHtml(DATA.site.mission)}</p>
          </section>

          <nav class="footer-column" aria-label="Editorias do rodapé">
            <h3>Editorias</h3>
            ${categories
              .slice(0, 4)
              .map(
                (category) => `
                  <a href="${categoryUrl(category.slug)}">${escapeHtml(category.name)}</a>
                `
              )
              .join("")}
          </nav>

          <nav class="footer-column" aria-label="Serviços do rodapé">
            <h3>Serviços</h3>
            <a href="${sectionUrl("cotacoes")}">Cotações</a>
            <a href="${sectionUrl("clima")}">Clima local</a>
            <a href="${sectionUrl("rede-regional")}">Rede regional</a>
            <a href="${sectionUrl("ultimas")}">Últimas notícias</a>
            <a href="${sectionUrl("newsletter")}">Newsletter</a>
          </nav>

          <nav class="footer-column" aria-label="Institucional do rodapé">
            <h3>Institucional</h3>
            <a href="sobre.html">Sobre</a>
            <a href="contato.html">Contato</a>
            <a href="${categoryUrl("politica")}">Política</a>
            <a href="${categoryUrl("tecnologia")}">Tecnologia</a>
          </nav>
        </div>

        <div class="container footer-bottom">
          <p>&copy; 2026 AgroRadar. Portal local preparado para Live Server, dados confiáveis e evolução futura para CMS.</p>
          <a href="#topo">Voltar ao topo</a>
        </div>
      </footer>
    `;
  }
}

function renderNewsletterSlots() {
  document.querySelectorAll("[data-newsletter-slot]").forEach((slot, index) => {
    slot.innerHTML = `
      <div class="newsletter-card">
        <div class="newsletter-copy">
          <span class="section-kicker">Newsletter</span>
          <h2>Receba o fechamento que importa antes do próximo pregão</h2>
          <p>
            Um resumo enxuto com mercado, clima, praça selecionada e leitura estratégica para quem
            precisa decidir com contexto, não com ruído.
          </p>
        </div>

        <form class="newsletter-form" data-newsletter-form>
          <label class="visually-hidden" for="newsletter-email-${index}">Seu e-mail</label>
          <input
            id="newsletter-email-${index}"
            name="email"
            type="email"
            placeholder="Seu melhor e-mail"
            required
          >
          <button class="button button--primary" type="submit">Quero receber</button>
          <p class="form-note">Sem spam. Conteúdo focado em mercado, clima e leitura regional.</p>
          <p class="form-feedback" data-form-feedback role="status" aria-live="polite"></p>
        </form>
      </div>
    `;
  });
}

function renderPage() {
  if (page === "home") {
    renderHomePage();
    return;
  }

  if (page === "article") {
    renderArticlePage();
    return;
  }

  if (page === "category") {
    renderCategoryPage();
  }
}

function renderHomePage() {
  const heroArticle = getArticle(homepageContent.heroSlug);
  const highlightArticles = homepageContent.highlightSlugs.map(getArticle);
  const mostReadArticles = homepageContent.mostReadSlugs.map(getArticle);
  const latestArticles = homepageContent.latestSlugs.map(getArticle);
  const region = getRegion();
  const regionHighlight = getArticle(region.localHighlightSlug);
  const regionalNetwork = homepageContent.regionalNetwork || {};
  const prioritizedEventLinks = prioritizeRegionalItems(regionalNetwork.eventLinks || [], region);
  const prioritizedSourceLinks = prioritizeRegionalItems(regionalNetwork.sourceLinks || [], region);

  const heroSlot = document.querySelector("[data-home-hero]");
  const briefingSlot = document.querySelector("[data-home-briefing]");
  const agendaSlot = document.querySelector("[data-home-agenda]");
  const highlightSlot = document.querySelector("[data-home-highlights]");
  const mostReadSlot = document.querySelector("[data-most-read]");
  const latestSlot = document.querySelector("[data-latest-feed]");
  const topicSlot = document.querySelector("[data-topic-links]");
  const regionName = document.querySelector("[data-region-panel-name]");
  const regionNote = document.querySelector("[data-region-panel-note]");
  const regionLink = document.querySelector("[data-region-highlight-link]");
  const regionBoardLabel = document.querySelector("[data-region-board-label]");
  const categoryPills = document.querySelector("[data-category-pills]");
  const boardSlot = document.querySelector("[data-region-board]");
  const regionalTitle = document.querySelector("[data-regional-title]");
  const regionalDescription = document.querySelector("[data-regional-description]");
  const regionalContext = document.querySelector("[data-regional-context]");
  const regionalEventsSlot = document.querySelector("[data-regional-events]");
  const regionalSourcesSlot = document.querySelector("[data-regional-sources]");

  if (heroSlot) {
    heroSlot.innerHTML = `
      <div class="story-meta">
        <span class="eyebrow">${escapeHtml(heroArticle.kicker)}</span>
        <span class="story-time">Atualizado em ${escapeHtml(formatDateTime(heroArticle.updatedAt))}</span>
      </div>

      <h1>${escapeHtml(heroArticle.title)}</h1>

      <p class="story-summary">${escapeHtml(heroArticle.deck)}</p>

      <div class="hero-actions">
        <a class="button button--primary" href="${articleUrl(heroArticle.slug)}">Ler matéria completa</a>
        <a class="button button--ghost" href="${categoryUrl(heroArticle.category)}">Abrir editoria</a>
      </div>

      <div class="hero-metrics" aria-label="Resumo rápido do cenário">
        ${heroArticle.highlights
          .slice(0, 3)
          .map(
            (highlight, index) => `
              <div>
                <span>${index === 0 ? "Foco" : index === 1 ? "Praça" : "Leitura"}</span>
                <strong>${escapeHtml(highlight)}</strong>
              </div>
            `
          )
          .join("")}
      </div>
    `;
  }

  if (briefingSlot) {
    briefingSlot.innerHTML = DATA.homepage.briefing
      .map(
        (item) => `
          <li>
            <strong>${escapeHtml(item.label)}</strong>
            <p>${escapeHtml(item.text)}</p>
          </li>
        `
      )
      .join("");
  }

  if (agendaSlot) {
    agendaSlot.innerHTML = DATA.homepage.agenda
      .map(
        (item) => `
          <li>
            <span>${escapeHtml(item.time)}</span>
            <p>${escapeHtml(item.text)}</p>
          </li>
        `
      )
      .join("");
  }

  if (highlightSlot) {
    highlightSlot.innerHTML = highlightArticles.map(buildHighlightCard).join("");
  }

  if (mostReadSlot) {
    mostReadSlot.innerHTML = mostReadArticles
      .map(
        (article) => `
          <li>
            <a href="${articleUrl(article.slug)}">
              <span class="ranked-category">${escapeHtml(getCategory(article.category).name)}</span>
              <strong>${escapeHtml(article.title)}</strong>
            </a>
          </li>
        `
      )
      .join("");
  }

  if (latestSlot) {
    latestSlot.innerHTML = latestArticles
      .map((article, index) => buildLatestCard(article, index === 0))
      .join("");
  }

  if (topicSlot) {
    topicSlot.innerHTML = categories
      .slice(0, 3)
      .map(
        (category) => `
          <a class="topic-link" href="${categoryUrl(category.slug)}">
            <span>${escapeHtml(category.name)}</span>
            <strong>${escapeHtml(category.description)}</strong>
          </a>
        `
      )
      .join("");
  }

  if (regionName) {
    regionName.textContent = region.name;
  }

  if (regionNote) {
    regionNote.textContent = region.localNote;
  }

  if (regionLink) {
    regionLink.href = articleUrl(regionHighlight.slug);
  }

  if (regionBoardLabel) {
    regionBoardLabel.textContent = `Praça atual: ${region.name}`;
  }

  if (categoryPills) {
    categoryPills.innerHTML = categories
      .map(
        (category, index) => `
          <a class="filter-pill${index === 0 ? " is-active" : ""}" href="${categoryUrl(category.slug)}">
            ${escapeHtml(category.name)}
          </a>
        `
      )
      .join("");
  }

  if (boardSlot) {
    boardSlot.innerHTML = region.marketBoard.map(buildBoardCard).join("");
  }

  if (regionalTitle) {
    regionalTitle.textContent = regionalNetwork.title || "Leilões, eventos e fontes do Norte";
  }

  if (regionalDescription) {
    regionalDescription.textContent =
      regionalNetwork.description ||
      "O AgroRadar conecta o leitor à agenda regional e aos canais oficiais mais úteis do Norte, sempre mantendo o conteúdo na origem.";
  }

  if (regionalContext) {
    regionalContext.textContent = `Prioridade da praça: ${region.name}`;
  }

  if (regionalEventsSlot) {
    regionalEventsSlot.innerHTML = prioritizedEventLinks
      .map((item) => buildRegionalLinkCard(item))
      .join("");
  }

  if (regionalSourcesSlot) {
    regionalSourcesSlot.innerHTML = prioritizedSourceLinks
      .map((item) => buildRegionalLinkCard(item, true))
      .join("");
  }

  document.title = "AgroRadar | Notícias, mercado e clima para o agro";
}

function renderArticlePage() {
  const slug = query.get("slug");
  const article = getArticle(slug);
  const category = getCategory(article.category);
  const related = getRelatedArticles(article);
  const region = getRegion();
  const container = document.querySelector("[data-article-view]");

  if (!container) {
    return;
  }

  container.innerHTML = `
    <div class="article-page-grid">
      <article class="article-main-column">
        <nav class="breadcrumb" aria-label="Caminho da notícia">
          <a href="index.html">Início</a>
          <span>/</span>
          <a href="${categoryUrl(category.slug)}">${escapeHtml(category.name)}</a>
          <span>/</span>
          <strong>${escapeHtml(article.region ? getRegion(article.region).name : category.name)}</strong>
        </nav>

        <section class="panel article-hero-card">
          <div class="story-meta">
            <span class="eyebrow">${escapeHtml(article.kicker)}</span>
            <span class="story-time">${escapeHtml(article.location)} · ${escapeHtml(formatDateTime(article.updatedAt))}</span>
          </div>
          <h1 class="article-title">${escapeHtml(article.title)}</h1>
          <p class="article-deck">${escapeHtml(article.deck)}</p>
          <div class="article-meta-row">
            <span>Leitura de ${escapeHtml(article.readTime)}</span>
            <a class="text-link" href="${categoryUrl(article.category)}">Ver mais em ${escapeHtml(category.name)}</a>
          </div>
        </section>

        <div class="article-layout">
          <article class="panel article-body-panel">
            ${buildArticleMedia(article)}
            <div class="article-summary">
              <strong>Resumo</strong>
              <p>${escapeHtml(article.summary)}</p>
            </div>

            <ul class="article-bullets">
              ${article.highlights
                .map(
                  (highlight) => `
                    <li>${escapeHtml(highlight)}</li>
                  `
                )
                .join("")}
            </ul>

            <div class="article-body-copy">
              ${article.body
                .map(
                  (paragraph) => `
                    <p>${escapeHtml(paragraph)}</p>
                  `
                )
                .join("")}
            </div>
          </article>

          <aside class="article-sidebar">
            ${buildRegionAside(region)}

            <section class="panel sidebar-panel">
              <div class="section-heading section-heading--compact">
                <div>
                  <span class="section-kicker">Continue lendo</span>
                  <h2>Relacionadas</h2>
                </div>
              </div>
              ${related
                .map(
                  (item) => `
                    <a class="topic-link" href="${articleUrl(item.slug)}">
                      <span>${escapeHtml(getCategory(item.category).name)}</span>
                      <strong>${escapeHtml(item.title)}</strong>
                    </a>
                  `
                )
                .join("")}
            </section>
          </aside>
        </div>
      </article>
    </div>
  `;

  document.title = `AgroRadar | ${article.title}`;
}

function renderCategoryPage() {
  const category = getCategory(query.get("cat"));
  const region = getRegion();
  const container = document.querySelector("[data-category-view]");
  const filteredArticles = articles
    .filter((article) => article.category === category.slug)
    .sort((left, right) => {
      const leftRegionScore = left.region === region.id ? 1 : 0;
      const rightRegionScore = right.region === region.id ? 1 : 0;
      return rightRegionScore - leftRegionScore;
    });

  if (!container) {
    return;
  }

  container.innerHTML = `
    <div class="category-shell">
      <section class="page-hero page-hero--category">
        <nav class="breadcrumb" aria-label="Caminho da categoria">
          <a href="index.html">Início</a>
          <span>/</span>
          <strong>${escapeHtml(category.name)}</strong>
        </nav>
        <span class="section-kicker">Categoria</span>
        <h1>${escapeHtml(category.name)}</h1>
        <p>
          ${escapeHtml(category.description)} A praça selecionada continua sendo ${escapeHtml(region.name)},
          então o feed prioriza primeiro o que conversa melhor com essa região sem perder o recorte Norte.
        </p>
      </section>

      <div class="category-layout">
        <div class="category-main">
          ${filteredArticles
            .map(
              (article, index) => `
                <article class="panel category-story${index === 0 ? " category-story--lead" : ""}">
                  <span class="eyebrow eyebrow--soft">${escapeHtml(getRegion(article.region).name)}</span>
                  <h2>${escapeHtml(article.title)}</h2>
                  <p>${escapeHtml(article.deck)}</p>
                  <div class="news-card-footer">
                    <span>${escapeHtml(formatDateTime(article.updatedAt))}</span>
                    <a class="text-link" href="${articleUrl(article.slug)}">Abrir notícia</a>
                  </div>
                </article>
              `
            )
            .join("")}
        </div>

        <aside class="category-sidebar">
          ${buildRegionAside(region)}

          <section class="panel sidebar-panel">
            <div class="section-heading section-heading--compact">
              <div>
                <span class="section-kicker">Editorias</span>
                <h2>Descubra outras frentes</h2>
              </div>
            </div>
            ${categories
              .filter((item) => item.slug !== category.slug)
              .map(
                (item) => `
                  <a class="topic-link" href="${categoryUrl(item.slug)}">
                    <span>${escapeHtml(item.name)}</span>
                    <strong>${escapeHtml(item.description)}</strong>
                  </a>
                `
              )
              .join("")}
          </section>
        </aside>
      </div>
    </div>
  `;

  document.title = `AgroRadar | ${category.name}`;
}

function buildHighlightCard(article) {
  return `
    <a class="story-card story-card--link" href="${articleUrl(article.slug)}">
      <span class="eyebrow eyebrow--soft">${escapeHtml(getCategory(article.category).name)}</span>
      <h3>${escapeHtml(article.title)}</h3>
      <p>${escapeHtml(article.summary)}</p>
      <span class="text-link">Ler matéria</span>
    </a>
  `;
}

function buildLatestCard(article, featured = false) {
  return `
    <article class="news-card${featured ? " news-card--feature" : ""}">
      <span class="eyebrow eyebrow--soft">${escapeHtml(getCategory(article.category).name)}</span>
      <h3>${escapeHtml(article.title)}</h3>
      <p>${escapeHtml(article.deck)}</p>
      <div class="news-card-footer">
        <span>${escapeHtml(formatDateTime(article.updatedAt))}</span>
        <a class="text-link" href="${articleUrl(article.slug)}">Continuar leitura</a>
      </div>
    </article>
  `;
}

function buildBoardCard(item) {
  if (item.type === "live-usd") {
    return `
      <article class="quote-card quote-card--live">
        <div class="quote-card__stack">
          <span>${escapeHtml(item.label)}</span>
          <strong data-live-usd-value>Carregando</strong>
          <small data-live-usd-buy>Compra: aguardando</small>
        </div>
        <span class="quote-trend is-flat" data-live-usd-badge>oficial</span>
      </article>
    `;
  }

  return `
    <article class="quote-card">
      <div class="quote-card__stack">
        <span>${escapeHtml(item.label)}</span>
        <strong>${escapeHtml(item.value)}</strong>
        <small>Fonte: monitor editorial</small>
      </div>
      <span class="quote-trend is-flat">${escapeHtml(item.change)}</span>
    </article>
  `;
}

function buildRegionalLinkCard(item, compact = false) {
  return `
    <article class="regional-link-card${compact ? " regional-link-card--compact" : ""}">
      <div class="regional-link-card__meta">
        <span class="regional-link-card__badge">${escapeHtml(item.channel)}</span>
        <span>${escapeHtml(item.region)}</span>
      </div>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.description)}</p>
      <div class="regional-link-card__footer">
        <div class="regional-link-card__origin">
          <strong>${escapeHtml(item.origin)}</strong>
          <small>Conteúdo hospedado na origem</small>
        </div>
        <a class="text-link" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">
          Abrir fonte original
        </a>
      </div>
    </article>
  `;
}

function getRelatedArticles(article, limit = 3) {
  const explicit = article.related
    .map(getArticle)
    .filter((item) => item && item.slug !== article.slug);
  const seen = new Set(explicit.map((item) => item.slug));
  const sameCategory = articles.filter((item) => {
    return item.category === article.category && item.slug !== article.slug && !seen.has(item.slug);
  });

  return [...explicit, ...sameCategory].slice(0, limit);
}

function buildArticleMedia(article) {
  if (!article.image) {
    return "";
  }

  return `
    <figure class="article-cover">
      <img src="${escapeHtml(article.image)}" alt="Capa editorial da matéria ${escapeHtml(article.title)}">
    </figure>
  `;
}

function buildRegionAside(region) {
  const article = getArticle(region.localHighlightSlug);
  return `
    <section class="panel sidebar-panel sidebar-panel--region">
      <div class="section-heading section-heading--compact">
        <div>
          <span class="section-kicker">Praça ativa</span>
          <h2>${escapeHtml(region.name)}</h2>
        </div>
      </div>
      <p>${escapeHtml(region.localNote)}</p>
      <a class="topic-link" href="${articleUrl(article.slug)}">
        <span>Destaque local</span>
        <strong>${escapeHtml(article.title)}</strong>
      </a>
      <div class="region-aside-actions">
        <a class="button button--secondary" href="${categoryUrl(article.category)}">Ver editoria relacionada</a>
        <a class="text-link" href="${sectionUrl("rede-regional")}">Abrir leilões e fontes do Norte</a>
      </div>
    </section>
  `;
}

function bindShellInteractions() {
  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");

  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = siteNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  document.querySelectorAll("[data-region-select]").forEach((select) => {
    select.addEventListener("change", (event) => {
      activeRegion = event.target.value;
      storeRegion(activeRegion);
      renderApp();
    });
  });

  document.querySelectorAll("[data-newsletter-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const feedback = form.querySelector("[data-form-feedback]");
      if (feedback) {
        feedback.textContent = `Inscrição recebida para ${getRegion().name}. O resumo do AgroRadar chega na próxima edição.`;
      }
      form.reset();
    });
  });

  if (!headerScrollAttached) {
    window.addEventListener(
      "scroll",
      () => {
        const header = document.querySelector(".site-header");
        if (header) {
          header.classList.toggle("is-compact", window.scrollY > 24);
        }
      },
      { passive: true }
    );
    headerScrollAttached = true;
  }

  const header = document.querySelector(".site-header");
  if (header) {
    header.classList.toggle("is-compact", window.scrollY > 24);
  }
}

function updateLiveStamp() {
  const now = new Date();
  const timeFormatter = new Intl.DateTimeFormat("pt-BR", {
    hour: "2-digit",
    minute: "2-digit"
  });
  const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  document.querySelectorAll(".js-live-time").forEach((node) => {
    node.textContent = timeFormatter.format(now);
  });

  document.querySelectorAll(".js-live-date").forEach((node) => {
    node.textContent = dateFormatter.format(now);
  });
}

function getRecentDates(limit = 5) {
  const dates = [];
  const cursor = new Date();

  while (dates.length < limit) {
    dates.push(
      `${String(cursor.getMonth() + 1).padStart(2, "0")}-${String(cursor.getDate()).padStart(2, "0")}-${cursor.getFullYear()}`
    );
    cursor.setDate(cursor.getDate() - 1);
  }

  return dates;
}

async function fetchUsdBrl() {
  const cacheKey = "agroradar-usdbrl-cache";

  try {
    for (const date of getRecentDates(6)) {
      const url =
        "https://olinda.bcb.gov.br/olinda/servico/PTAX/versao/v1/odata/" +
        `CotacaoDolarDia(dataCotacao=@dataCotacao)?@dataCotacao='${date}'&$top=1&$orderby=dataHoraCotacao%20desc&$format=json`;
      const response = await fetch(url);

      if (!response.ok) {
        continue;
      }

      const payload = await response.json();

      if (payload.value && payload.value.length) {
        const item = payload.value[0];
        const result = {
          buy: item.cotacaoCompra,
          sell: item.cotacaoVenda,
          updatedAt: item.dataHoraCotacao,
          source: DATA.sources.usdbrl.name,
          cached: false
        };

        window.localStorage.setItem(cacheKey, JSON.stringify(result));
        return result;
      }
    }
  } catch (error) {
    // If direct browser access fails, fall back to the latest cached official value.
  }

  const cached = window.localStorage.getItem(cacheKey);
  return cached ? { ...JSON.parse(cached), cached: true } : null;
}

async function fetchWeather(region) {
  const cacheKey = `agroradar-weather-${region.id}`;
  const { latitude, longitude } = region.weather;
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
    "&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code" +
    "&hourly=precipitation_probability&forecast_hours=1&timezone=auto";

  try {
    const response = await fetch(url);
    const payload = await response.json();

    if (payload.current) {
      const result = {
        temperature: payload.current.temperature_2m,
        humidity: payload.current.relative_humidity_2m,
        wind: payload.current.wind_speed_10m,
        code: payload.current.weather_code,
        rain: payload.hourly && payload.hourly.precipitation_probability
          ? payload.hourly.precipitation_probability[0]
          : null,
        updatedAt: payload.current.time,
        source: DATA.sources.weather.name,
        cached: false
      };

      window.localStorage.setItem(cacheKey, JSON.stringify(result));
      return result;
    }
  } catch (error) {
    // Fall back to the last cached payload if the live request is blocked.
  }

  const cached = window.localStorage.getItem(cacheKey);
  return cached ? { ...JSON.parse(cached), cached: true } : null;
}

function updateUsdBrlUi(data) {
  const sourceText = data
    ? `Fonte: ${data.source}${data.cached ? " · último dado oficial em cache" : ""}`
    : `Fonte oficial: ${DATA.sources.usdbrl.name}`;
  const updatedText = data
    ? `Atualização: ${formatDateTime(data.updatedAt)}`
    : "Atualização: indisponível no momento";
  const sellText = data ? formatCurrency(data.sell) : "Indisponível";
  const buyText = data ? `Compra: ${formatCurrency(data.buy)}` : "Compra: indisponível";

  document.querySelectorAll("[data-usdbrl-source]").forEach((node) => {
    node.textContent = sourceText;
  });

  document.querySelectorAll("[data-usdbrl-updated]").forEach((node) => {
    node.textContent = updatedText;
  });

  document.querySelectorAll("[data-live-usd-value]").forEach((node) => {
    node.textContent = sellText;
  });

  document.querySelectorAll("[data-live-usd-buy]").forEach((node) => {
    node.textContent = buyText;
  });

  document.querySelectorAll("[data-live-usd-badge]").forEach((node) => {
    node.textContent = data ? "venda oficial" : "aguardando";
  });

  document.querySelectorAll("[data-ticker-usd]").forEach((node) => {
    node.textContent = data ? sellText : "indisponível";
  });
}

function updateWeatherUi(region, data) {
  const condition = data ? weatherCodeToText(data.code) : "consulta climática indisponível";
  const updatedText = data
    ? `Atualização: ${formatDateTime(data.updatedAt)}${data.cached ? " · em cache" : ""}`
    : "Atualização: indisponível no momento";

  document.querySelectorAll("[data-weather-region-label]").forEach((node) => {
    node.textContent = region.weather.city;
  });

  document.querySelectorAll("[data-weather-city-label]").forEach((node) => {
    node.textContent = region.weather.city;
  });

  document.querySelectorAll("[data-weather-temp]").forEach((node) => {
    node.textContent = data ? `${Math.round(data.temperature)}°C` : "--";
  });

  document.querySelectorAll("[data-weather-condition]").forEach((node) => {
    node.textContent = data
      ? `${condition.charAt(0).toUpperCase() + condition.slice(1)}, leitura útil para ${region.name.toLowerCase()}.`
      : "Não foi possível consultar o clima desta praça agora.";
  });

  document.querySelectorAll("[data-weather-rain]").forEach((node) => {
    node.textContent = data && data.rain !== null ? `${Math.round(data.rain)}%` : "--";
  });

  document.querySelectorAll("[data-weather-humidity]").forEach((node) => {
    node.textContent = data ? `${Math.round(data.humidity)}%` : "--";
  });

  document.querySelectorAll("[data-weather-wind]").forEach((node) => {
    node.textContent = data ? `${Math.round(data.wind)} km/h` : "--";
  });

  document.querySelectorAll("[data-weather-source]").forEach((node) => {
    node.textContent = `Fonte: ${DATA.sources.weather.name}${data && data.cached ? " · último dado em cache" : ""}`;
  });

  document.querySelectorAll("[data-weather-updated]").forEach((node) => {
    node.textContent = updatedText;
  });

  document.querySelectorAll("[data-ticker-weather]").forEach((node) => {
    node.textContent = data ? `${Math.round(data.temperature)}°C` : "indisponível";
  });
}

async function hydrateLiveData() {
  updateUsdBrlUi(null);
  updateWeatherUi(getRegion(), null);

  const [usdbrl, weather] = await Promise.all([fetchUsdBrl(), fetchWeather(getRegion())]);
  updateUsdBrlUi(usdbrl);
  updateWeatherUi(getRegion(), weather);
}

function renderApp() {
  renderShell();
  renderPage();
  renderNewsletterSlots();
  bindShellInteractions();
  updateLiveStamp();
  hydrateLiveData();
}

renderApp();
setInterval(updateLiveStamp, 60000);
