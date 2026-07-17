(function () {
  "use strict";

  function onReady(cb) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", cb);
    } else {
      cb();
    }
  }

  onReady(function () {
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ===== FADE / REVEAL OBSERVER ===== */
    var revealEls = document.querySelectorAll(
      ".fade-up, .reveal-left, .reveal-right, .scale-in"
    );
    if (revealEls.length && (reduceMotion || !("IntersectionObserver" in window))) {
      /* Motion-sensitive users (or old browsers) get content immediately. */
      revealEls.forEach(function (el) {
        el.classList.add("visible");
      });
    } else if (revealEls.length) {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
      );
      revealEls.forEach(function (el) {
        observer.observe(el);
      });
    }

    /* ===== SCROLL INDICATOR ===== */
    var indicator = document.createElement("div");
    indicator.className = "scroll-indicator";
    indicator.setAttribute("aria-hidden", "true");
    document.body.appendChild(indicator);

    function updateScrollIndicator() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var docHeight = document.documentElement.scrollHeight - window.innerHeight;
      var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      indicator.style.width = pct + "%";
    }

    window.addEventListener("scroll", updateScrollIndicator, { passive: true });
    updateScrollIndicator();

    /* ===== CUSTOM CURSOR ===== */
    var cursor = null;
    if (
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      cursor = document.createElement("div");
      cursor.className = "custom-cursor";
      cursor.setAttribute("aria-hidden", "true");
      document.body.appendChild(cursor);

      var hoverTargets = document.querySelectorAll(
        "a, button, .btn, .card, input, textarea, select"
      );
      hoverTargets.forEach(function (el) {
        el.addEventListener("mouseenter", function () {
          cursor.classList.add("hover");
        });
        el.addEventListener("mouseleave", function () {
          cursor.classList.remove("hover");
        });
      });

      document.addEventListener("mousemove", function (e) {
        cursor.style.left = e.clientX + "px";
        cursor.style.top = e.clientY + "px";
      });
    }

    /* ===== THEME TOGGLE ===== */
    var themeKey = "bg-theme";
    var saved = localStorage.getItem(themeKey) || "dark";
    document.documentElement.setAttribute("data-theme", saved);

    var toggleBtns = document.querySelectorAll(".theme-toggle");

    function syncThemeToggleLabels() {
      var theme = document.documentElement.getAttribute("data-theme");
      var label =
        theme === "light" ? "Switch to dark theme" : "Switch to light theme";
      toggleBtns.forEach(function (btn) {
        btn.setAttribute("aria-label", label);
        btn.setAttribute("title", label);
      });
    }

    toggleBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var current = document.documentElement.getAttribute("data-theme");
        var next = current === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem(themeKey, next);
        syncThemeToggleLabels();
      });
    });
    syncThemeToggleLabels();

    /* ===== MOBILE NAV (hamburger) ===== */
    var hamburger = document.querySelector(".hamburger");
    var navMenu = document.querySelector(".nav-links");
    if (hamburger && navMenu) {
      if (!navMenu.id) navMenu.id = "nav-menu";
      hamburger.setAttribute("aria-controls", navMenu.id);

      var setMenu = function (open) {
        navMenu.classList.toggle("open", open);
        hamburger.classList.toggle("active", open);
        hamburger.setAttribute("aria-expanded", open ? "true" : "false");
      };

      hamburger.addEventListener("click", function () {
        setMenu(!navMenu.classList.contains("open"));
      });

      /* Close after choosing a destination */
      navMenu.addEventListener("click", function (e) {
        if (e.target.closest("a")) setMenu(false);
      });

      /* Escape closes and returns focus to the toggle */
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && navMenu.classList.contains("open")) {
          setMenu(false);
          hamburger.focus();
        }
      });

      /* Click/tap outside the panel closes it */
      document.addEventListener("click", function (e) {
        if (
          navMenu.classList.contains("open") &&
          !e.target.closest(".nav-links") &&
          !e.target.closest(".hamburger")
        ) {
          setMenu(false);
        }
      });
    }

    /* ===== FOOTER YEAR ===== */
    var yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    /* ===== PAGE TRANSITIONS (inject transition div) =====
       Skipped entirely under prefers-reduced-motion: navigation
       happens immediately with no overlay or artificial delay. */
    if (!reduceMotion) {
      var transitionEl = document.createElement("div");
      transitionEl.className = "page-transition";
      transitionEl.setAttribute("aria-hidden", "true");
      document.body.appendChild(transitionEl);

      var navLinks = document.querySelectorAll("a[href]");
      navLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
          var href = link.getAttribute("href");
          if (
            !href ||
            href.startsWith("#") ||
            href.startsWith("http") ||
            href.startsWith("//") ||
            href.includes("?") ||
            href.includes("/api/")
          ) {
            return;
          }
          e.preventDefault();
          transitionEl.classList.add("active");
          setTimeout(function () {
            window.location.href = href;
          }, 300);
        });
      });
    }

    /* ===== ABSOLUTE UPDATED DATES (data-updated="YYYY-MM-DD") ===== */
    var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var updatedEls = document.querySelectorAll("[data-updated]");
    updatedEls.forEach(function (el) {
      var parts = (el.getAttribute("data-updated") || "").split("-");
      if (parts.length !== 3) return;
      var date = new Date(+parts[0], +parts[1] - 1, +parts[2]);
      if (isNaN(date.getTime())) return;
      el.textContent =
        "Updated " + MONTHS[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
    });

    /* ===== PARALLAX (disabled for reduced motion) ===== */
    var parallaxEls = document.querySelectorAll(".parallax-slow, .parallax-medium");
    if (parallaxEls.length && !reduceMotion) {
      window.addEventListener(
        "scroll",
        function () {
          var y = window.pageYOffset;
          parallaxEls.forEach(function (el) {
            var rate = el.classList.contains("parallax-slow") ? 0.25 : 0.45;
            el.style.transform = "translateY(" + y * rate + "px)";
          });
        },
        { passive: true }
      );
    }
  });

  /* Expose site API */
  window.site = window.site || {};

  /* ===== HERO METRICS ===== */
  var HERO_METRICS = [
    { id: "m-pipeline", label: "Pipeline value", value: "$128M", empty: "$—" },
    { id: "m-deals", label: "Active deals", value: "14", empty: "—" },
    { id: "m-ports", label: "Portfolio", value: "6", empty: "—" }
  ];

  function bindHeroMetrics() {
    HERO_METRICS.forEach(function (metric) {
      var el = document.getElementById(metric.id);
      if (el) el.textContent = metric.value || metric.empty;
    });
  }
  function resetHeroMetrics() {
    HERO_METRICS.forEach(function (metric) {
      var el = document.getElementById(metric.id);
      if (el) el.textContent = metric.empty;
    });
  }

  /* ===== CONTACT FORM VALIDATION ===== */
  var EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function fieldLabelText(field) {
    var label = field.id
      ? document.querySelector('label[for="' + field.id + '"]')
      : null;
    return label ? label.textContent.trim() : "This field";
  }

  function fieldErrorEl(field) {
    var errorId = (field.id || field.name || "field") + "-error";
    var el = document.getElementById(errorId);
    if (!el) {
      el = document.createElement("p");
      el.className = "field-error";
      el.id = errorId;
      el.hidden = true;
      var wrap = field.closest(".field") || field.parentNode;
      wrap.appendChild(el);
    }
    return el;
  }

  function setFieldError(field, message) {
    var el = fieldErrorEl(field);
    var ids = (field.getAttribute("aria-describedby") || "")
      .split(/\s+/)
      .filter(function (id) {
        return id && id !== el.id;
      });
    if (message) {
      el.textContent = message;
      el.hidden = false;
      field.setAttribute("aria-invalid", "true");
      ids.push(el.id);
    } else {
      el.textContent = "";
      el.hidden = true;
      field.removeAttribute("aria-invalid");
    }
    if (ids.length) {
      field.setAttribute("aria-describedby", ids.join(" "));
    } else {
      field.removeAttribute("aria-describedby");
    }
  }

  function validateField(field) {
    var value = (field.value || "").trim();
    if (field.hasAttribute("required") && !value) {
      return fieldLabelText(field) + " is required.";
    }
    if (field.type === "email" && value && !EMAIL_PATTERN.test(value)) {
      return "Enter a valid email address.";
    }
    return "";
  }

  function validateForm(form) {
    var fields = form.querySelectorAll("input, select, textarea");
    var firstInvalid = null;
    fields.forEach(function (field) {
      var message = validateField(field);
      setFieldError(field, message);
      if (message && !firstInvalid) firstInvalid = field;
    });
    if (firstInvalid) firstInvalid.focus();
    return !firstInvalid;
  }

  function initContactFormValidation() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    form.setAttribute("novalidate", "");
    /* Capture on document so invalid submits are stopped before the
       page-level submit handler runs; valid submits pass through. */
    document.addEventListener(
      "submit",
      function (event) {
        if (event.target !== form) return;
        if (!validateForm(form)) {
          event.preventDefault();
          event.stopPropagation();
        }
      },
      true
    );
    form.addEventListener("input", function (event) {
      var field = event.target;
      if (field && field.getAttribute("aria-invalid") === "true") {
        setFieldError(field, validateField(field));
      }
    });
  }

  onReady(initContactFormValidation);

  window.site.resetHeroMetrics = resetHeroMetrics;
  window.site.bindHeroMetrics = bindHeroMetrics;
  window.site.validateForm = validateForm;
})();
