(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (reducedMotion.matches) return;

  document.documentElement.classList.add("motion-ready");

  const revealItems = new Set();

  const addReveal = (element, variant = "reveal-up", delay = 0) => {
    if (!element) return;
    element.classList.add("scroll-reveal", variant);
    element.style.setProperty("--reveal-delay", `${delay}ms`);
    revealItems.add(element);
  };

  addReveal(document.querySelector(".sunset-note"), "reveal-soft");
  addReveal(document.querySelector(".home-routes > h2"));
  addReveal(document.querySelector(".story-photo"), "reveal-left");
  addReveal(document.querySelector(".gift-detail-image"), "reveal-right");
  addReveal(document.querySelector(".site-footer .footer-inner"), "reveal-soft");

  document.querySelectorAll(".route-link").forEach((item, index) => {
    addReveal(item, "reveal-left", index * 85);
  });

  document.querySelectorAll(".product-intro > *").forEach((item, index) => {
    addReveal(item, "reveal-up", index * 90);
  });

  document.querySelectorAll(".collection-cta > *").forEach((item, index) => {
    addReveal(item, index === 0 ? "reveal-left" : "reveal-right", index * 90);
  });

  document.querySelectorAll(".product").forEach((item, index) => {
    const direction = index % 2 === 0 ? "reveal-left" : "reveal-right";
    addReveal(item, direction, Math.min(index * 90, 180));
  });

  document.querySelectorAll(".story-text > *, .gift-detail-copy > *").forEach((item, index) => {
    addReveal(item, "reveal-up", Math.min((index % 5) * 70, 280));
  });

  if (!("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -9% 0px",
      threshold: 0.12,
    },
  );

  revealItems.forEach((item) => observer.observe(item));
})();
