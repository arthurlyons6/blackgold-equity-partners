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
    /* ===== FADE / REVEAL OBSERVER ===== */
    var revealEls = document.querySelectorAll(
      ".fade-up, .reveal-left, .reveal-right, .scale-in"
    );
    if (revealEls.length) {
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
    toggleBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var current = document.documentElement.getAttribute("data-theme");
        var next = current === "light" ? "dark" : "light";
        document.documentElement.setAttribute("data-theme", next);
        localStorage.setItem(themeKey, next);
      });
    });

    /* ===== PAGE TRANSITIONS (inject transition div) ===== */
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

    /* ===== PARALLAX ===== */
    var parallaxEls = document.querySelectorAll(".parallax-slow, .parallax-medium");
    if (parallaxEls.length) {
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

  var HERO = {};
  function bindHeroMetrics() {
    var p = document.getElementById("m-pipeline");
    var d = document.getElementById("m-deals");
    var c = document.getElementById("m-ports");
    if (!p || !d || !c) return;
    p.textContent = HERO.pipelineValue || "$—";
    d.textContent = HERO.activeDeals || "—";
    c.textContent = HERO.portfolio || "—";
  }
  function resetHeroMetrics() {
    var p = document.getElementById("m-pipeline");
    var d = document.getElementById("m-deals");
    var c = document.getElementById("m-ports");
    if (!p || !d || !c) return;
    p.textContent = "$—";
    d.textContent = "—";
    c.textContent = "—";
  }

  window.site.resetHeroMetrics = resetHeroMetrics;
  window.site.bindHeroMetrics = bindHeroMetrics;
})();
