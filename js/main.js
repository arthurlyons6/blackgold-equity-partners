/* Black Gold Equity Partners: site behaviour.
   Deliberately small: mobile menu, footer year, the figures block and the contact form. */
(function () {
  "use strict";

  /* Public figures. Each stays hidden until a real, sourced value is entered here.
     Set value to a string such as "$128M" and source to where it comes from.
     Nothing on the page shows a number that is still null. */
  var FIGURES = [
    { key: "pipeline", label: "Qualified pipeline", value: null, source: "" },
    { key: "deals", label: "Active deals", value: null, source: "" },
    { key: "portfolio", label: "Portfolio companies", value: null, source: "" },
    { key: "hitrate", label: "100-day milestones met", value: null, source: "" }
  ];
  var FIGURES_AS_OF = ""; /* e.g. "Figures as of Dec 1, 2026" */

  function ready(fn) {
    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", fn);
    else fn();
  }

  function initMenu() {
    var head = document.querySelector(".masthead");
    var btn = document.querySelector(".menu-btn");
    if (!head || !btn) return;
    btn.addEventListener("click", function () {
      var open = head.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      btn.textContent = open ? "Close" : "Menu";
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && head.classList.contains("open")) { btn.click(); btn.focus(); }
    });
  }

  function initYear() {
    var y = String(new Date().getFullYear());
    document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = y; });
  }

  function initFigures() {
    var section = document.querySelector("[data-figures]");
    if (!section) return;
    var real = FIGURES.filter(function (f) { return f.value !== null && f.value !== ""; });
    if (!real.length) return; /* stays hidden */
    var list = section.querySelector("[data-figures-list]");
    real.forEach(function (f) {
      var wrap = document.createElement("div");
      var dd = document.createElement("dd"); dd.textContent = f.value;
      var dt = document.createElement("dt"); dt.textContent = f.label;
      if (f.source) dt.title = "Source: " + f.source;
      wrap.appendChild(dd); wrap.appendChild(dt); list.appendChild(wrap);
    });
    var note = section.querySelector("[data-figures-note]");
    if (note) note.textContent = FIGURES_AS_OF;
    section.hidden = false;
  }

  /* ---------- Contact form ---------- */
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function labelFor(field) {
    var l = document.querySelector('label[for="' + field.id + '"]');
    return l ? l.textContent.trim() : "This field";
  }
  function check(field) {
    var v = (field.value || "").trim();
    if (field.required && !v) return labelFor(field) + " is required.";
    if (field.type === "email" && v && !EMAIL.test(v)) return "Enter a valid email address.";
    return "";
  }
  function setError(field, msg) {
    var id = field.id + "-error";
    var el = document.getElementById(id);
    if (msg) {
      if (!el) {
        el = document.createElement("p");
        el.className = "field-error"; el.id = id;
        field.insertAdjacentElement("afterend", el);
      }
      el.textContent = msg;
      field.setAttribute("aria-invalid", "true");
      field.setAttribute("aria-describedby", ((field.getAttribute("aria-describedby") || "").replace(id, "").trim() + " " + id).trim());
    } else {
      if (el) el.remove();
      field.removeAttribute("aria-invalid");
      var d = (field.getAttribute("aria-describedby") || "").replace(id, "").trim();
      if (d) field.setAttribute("aria-describedby", d); else field.removeAttribute("aria-describedby");
    }
  }
  function validate(form) {
    var first = null;
    form.querySelectorAll("input, select, textarea").forEach(function (f) {
      var m = check(f); setError(f, m); if (m && !first) first = f;
    });
    if (first) first.focus();
    return !first;
  }

  function initForm() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    var status = document.getElementById("submit-status");
    var button = form.querySelector('button[type="submit"]');
    function say(text, kind) { if (status) { status.textContent = text; status.dataset.kind = kind || ""; } }

    form.addEventListener("input", function (e) {
      if (e.target.getAttribute("aria-invalid") === "true") setError(e.target, check(e.target));
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate(form)) { say("Check the highlighted fields.", "error"); return; }
      function val(n) { var el = form.elements.namedItem(n); return el ? String(el.value || "").trim() : ""; }
      var payload = { name: val("name"), email: val("email"), type: val("type"), company: val("company"), message: val("message") };
      button.disabled = true;
      say("Sending…");
      fetch(window.location.origin + "/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify(payload)
      }).then(function (r) {
        if (!r.ok) throw new Error("HTTP " + r.status);
        say("Sent. We'll reply within the response time shown for your inquiry type.", "ok");
        form.reset();
      }).catch(function () {
        say("This didn't send. Email deals@blackgoldequitypartners.com and we'll pick it up from there.", "error");
      }).then(function () { button.disabled = false; });
    });
  }

  ready(function () { initMenu(); initYear(); initFigures(); initForm(); });
})();
