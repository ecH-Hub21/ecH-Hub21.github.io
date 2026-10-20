(function () {
  "use strict";
  const cfg = window.PORTFOLIO_CONFIG || {};
  const $ = (selector, root = document) => root.querySelector(selector);
  const escapeHTML = (value) => String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[char]));
  const safeURL = (value) => {
    try {
      const url = new URL(value, window.location.href);
      return ["https:", "http:"].includes(url.protocol) ? url.href : "";
    } catch (_) { return ""; }
  };
  const tags = (items = []) => items.map(item => `<span class="stack-tag">${escapeHTML(item)}</span>`).join("");

  // Mobile navigation
  const menuButton = $("#menu-toggle");
  const nav = $("#site-nav");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const expanded = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!expanded));
      menuButton.setAttribute("aria-label", expanded ? "Open navigation" : "Close navigation");
      nav.classList.toggle("is-open", !expanded);
    });
    nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      nav.classList.remove("is-open");
    }));
  }

  // Project cards
  const projectGrid = $("#project-grid");
  if (projectGrid) {
    const projects = Array.isArray(cfg.projects) ? cfg.projects : [];
    projectGrid.innerHTML = projects.map((project, index) => {
      const url = safeURL(project.link);
      const chips = tags(project.stack || []);
      return `<article class="project-card ${index % 2 ? "project-card-offset" : ""}">
        <div class="project-card-top"><span class="mono project-number">${escapeHTML(project.number || String(index + 1).padStart(2, "0"))} / BUILD LOG</span><span class="project-status mono">${escapeHTML(project.status || "PROJECT")}</span></div>
        <div class="project-card-art ${index % 2 ? "art-network" : "art-terminal"}" aria-hidden="true">
          ${index % 2 ? `<svg viewBox="0 0 500 180" fill="none"><path d="M36 138L112 80L195 112L283 35L365 77L458 22" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 6"/><path d="M36 138L112 80L195 112L283 35L365 77L458 22" stroke="#c7f36b" stroke-width="4" stroke-linecap="round" stroke-dasharray="1 90"/><g stroke="currentColor"><circle cx="36" cy="138" r="7"/><circle cx="112" cy="80" r="7"/><circle cx="195" cy="112" r="7"/><circle cx="283" cy="35" r="7"/><circle cx="365" cy="77" r="7"/><circle cx="458" cy="22" r="7"/></g><g fill="currentColor" font-family="DM Mono, monospace" font-size="10"><text x="26" y="163">EVENTS</text><text x="247" y="19">GATEWAY</text><text x="390" y="102">GOALS</text></g></svg>` : `<div class="terminal-window"><div class="terminal-bar"><i></i><i></i><i></i><span class="mono">gym_manager.php</span></div><div class="terminal-body mono"><p><span class="terminal-prompt">$</span> connect database</p><p><span class="terminal-muted">[ok]</span> mysql connection ready</p><p><span class="terminal-prompt">$</span> manage records<span class="terminal-cursor"></span></p><div class="terminal-lines"><b></b><b></b><b></b></div></div></div>`}
        </div>
        <div class="project-card-body"><p class="eyebrow project-type">${escapeHTML(project.type || "PROJECT")}</p><h3>${escapeHTML(project.title || "Untitled project")}</h3><p class="project-description">${escapeHTML(project.description || "Add a short description in site-config.js.")}</p><div class="stack-list">${chips}</div>
          ${url ? `<a class="project-link" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer">${escapeHTML(project.linkLabel || "View project")} <span aria-hidden="true">↗</span></a>` : `<span class="project-link project-link-muted">Project details available on request <span aria-hidden="true">↗</span></span>`}
        </div>
      </article>`;
    }).join("");
  }

  // Education timeline
  const educationList = $("#education-list");
  if (educationList) {
    const education = Array.isArray(cfg.education) ? cfg.education : [];
    educationList.innerHTML = education.map((item, index) => {
      const title = item.institution || item.program || "Education";
      const subtitle = item.institution ? item.program : "";
      const meta = [item.period, item.location].filter(Boolean).join("  •  ").toUpperCase();
      return `<article class="education-card">
        <div class="edu-stamp"><span>EDU</span><strong>${String(index + 1).padStart(2, "0")}</strong></div>
        <div class="edu-main"><p class="mono edu-meta">${escapeHTML(meta)}</p><h3>${escapeHTML(title)}</h3>${subtitle ? `<p class="edu-program">${escapeHTML(subtitle)}</p>` : ""}${item.detail ? `<p class="edu-desc">${escapeHTML(item.detail)}</p>` : ""}</div>
        <div class="edu-arrow" aria-hidden="true">↗</div>
      </article>`;
    }).join("");
  }

  // Credential shelf. Empty credentials are treated honestly rather than populated with fake badges.
  const credentialShelf = $("#credential-shelf");
  if (credentialShelf) {
    const credentials = Array.isArray(cfg.certifications) ? cfg.certifications.filter(item => item && item.name) : [];
    credentialShelf.innerHTML = credentials.length ? credentials.map((credential, index) => {
      const url = safeURL(credential.url);
      return `<article class="credential-item"><span class="credential-seal" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span><div><h3>${escapeHTML(credential.name)}</h3><p>${escapeHTML(credential.issuer || "Issuer not specified")}${credential.date ? ` <span>·</span> ${escapeHTML(credential.date)}` : ""}</p>${credential.note ? `<small>${escapeHTML(credential.note)}</small>` : ""}</div>${url ? `<a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer" aria-label="Verify ${escapeHTML(credential.name)}">↗</a>` : `<span class="credential-no-link" aria-label="No verification link added">—</span>`}</article>`;
    }).join("") : `<div class="credential-empty"><span class="empty-icon" aria-hidden="true">＋</span><div><strong>Credential library</strong><p>No credentials have been added to this public portfolio yet. Only list completed courses and certifications you can verify.</p></div><span class="mono empty-count">0 ADDED</span></div>`;
  }

  // Contact links remain hidden until real details are supplied.
  const contactLinks = $("#contact-links");
  const contactHint = $("#contact-hint");
  if (contactLinks) {
    const links = [];
    if (typeof cfg.email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cfg.email.trim())) {
      const email = cfg.email.trim();
      links.push(`<a class="contact-link" href="mailto:${escapeHTML(email)}"><span>Email</span><strong>${escapeHTML(email)}</strong><span aria-hidden="true">↗</span></a>`);
    }
    const linkedin = safeURL(cfg.linkedin);
    if (linkedin) links.push(`<a class="contact-link" href="${escapeHTML(linkedin)}" target="_blank" rel="noopener noreferrer"><span>LinkedIn</span><strong>Professional profile</strong><span aria-hidden="true">↗</span></a>`);
    const github = safeURL(cfg.github);
    if (github) links.push(`<a class="contact-link" href="${escapeHTML(github)}" target="_blank" rel="noopener noreferrer"><span>GitHub</span><strong>Code & projects</strong><span aria-hidden="true">↗</span></a>`);
    contactLinks.innerHTML = links.join("");
    if (links.length) contactHint.hidden = true;
  }

  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();
  const footerName = $(".footer-year");
  if (footerName && cfg.name) footerName.innerHTML = `© <span id="year">${new Date().getFullYear()}</span> ${escapeHTML(cfg.name.toUpperCase())}`;
})();
