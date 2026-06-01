/**
 * Jeremy Pernain — Parcours cinématique
 * Scène 1 : Tour Eiffel · Scène 2 : Arc de Triomphe · Biens · Contact
 */

(function () {
  'use strict';

  const properties = [
    {
      id: 1,
      title: 'Appartement haussmannien avec balcon',
      location: 'Saint-Germain-des-Prés, 6e arr.',
      price: '2 450 000 €',
      type: 'Vente',
      bedrooms: 3,
      bathrooms: 2,
      surface: '142 m²',
      image: 'assets/images/properties/propertie1.png'
    },
    {
      id: 2,
      title: 'Loft moderne avec vue sur la Tour Eiffel',
      location: 'Trocadéro, 16e arr.',
      price: '4 200 000 €',
      type: 'Vente',
      bedrooms: 4,
      bathrooms: 3,
      surface: '185 m²',
      image: 'assets/images/properties/propertie2.png'
    },
    {
      id: 3,
      title: 'Élégant pied-à-terre',
      location: 'Le Marais, 4e arr.',
      price: '3 800 € / mois',
      type: 'Location',
      bedrooms: 2,
      bathrooms: 1,
      surface: '68 m²',
      image: 'assets/images/properties/propertie3.png'
    },
    {
      id: 4,
      title: 'Appartement contemporain avec terrasse',
      location: 'Batignolles, 17e arr.',
      price: '1 890 000 €',
      type: 'Vente',
      bedrooms: 3,
      bathrooms: 2,
      surface: '98 m²',
      image: 'assets/images/properties/propertie4.png'
    }
  ];

  const heroZone = document.getElementById('hero');
  const heroBackground = document.querySelector('.hero-background');
  const heroOverlay = document.querySelector('.hero-overlay');
  const heroContent = document.querySelector('.hero-content');
  const heroName = document.getElementById('heroName');
  const heroTagline = document.getElementById('heroTagline');
  const heroServices = document.getElementById('heroServices');
  const scrollIndicator = document.querySelector('.hero-scroll-indicator');
  const mainNav = document.getElementById('mainNav');
  const whySection = document.getElementById('why-me');
  const arcBackground = document.getElementById('arcBackground');
  const arcOverlay = document.getElementById('arcOverlay');
  const whySceneItems = document.querySelectorAll('.why-scene-item');
  const propertyGrid = document.getElementById('propertyGrid');
  const contactForm = document.getElementById('contactForm');
  const contactSuccess = document.getElementById('contactSuccess');
  const footerYear = document.getElementById('footerYear');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  /**
   * Opacité avec entrée et sortie liées au scroll
   */
  function fadeInOut(progress, inStart, inEnd, outStart, outEnd) {
    if (progress < inStart) return 0;
    if (progress < inEnd) {
      return easeOutCubic((progress - inStart) / (inEnd - inStart));
    }
    if (progress < outStart) return 1;
    if (progress < outEnd) {
      return 1 - easeOutCubic((progress - outStart) / (outEnd - outStart));
    }
    return 0;
  }

  let ticking = false;

  function updateHeroScroll() {
    if (!heroZone) return;

    const rect = heroZone.getBoundingClientRect();
    const zoneHeight = heroZone.offsetHeight - window.innerHeight;
    const scrolled = Math.max(0, -rect.top);
    const progress = zoneHeight > 0 ? clamp(scrolled / zoneHeight, 0, 1) : 0;

    if (!prefersReducedMotion) {
      /* Dissolution cinématique — scène entière s'estompe progressivement */
      const dissolveStart = 0.38;
      const dissolve = easeInOutCubic(clamp((progress - dissolveStart) / (1 - dissolveStart), 0, 1));
      const sceneRemaining = 1 - dissolve;

      if (heroBackground) {
        heroBackground.style.opacity = sceneRemaining.toFixed(3);
        heroBackground.style.transform = 'none';
      }

      if (heroOverlay) {
        const overlayOpacity = Math.min(0.88 + progress * 0.08 + dissolve * 0.12, 1);
        heroOverlay.style.opacity = overlayOpacity.toFixed(3);
      }

      if (heroContent) {
        heroContent.style.opacity = sceneRemaining.toFixed(3);
      }

      if (heroName) {
        heroName.style.opacity = '1';
        heroName.style.transform = 'none';
        heroName.style.filter = 'none';
      }

      if (heroTagline) {
        heroTagline.style.opacity = sceneRemaining.toFixed(3);
        heroTagline.style.transform = 'none';
      }

      if (heroServices) {
        const servicesIn = easeOutCubic(clamp((progress - 0.06) / 0.28, 0, 1));
        const servicesY = 22 * (1 - servicesIn);
        heroServices.style.opacity = (servicesIn * sceneRemaining).toFixed(3);
        heroServices.style.transform = 'translate3d(0, ' + servicesY.toFixed(1) + 'px, 0)';
      }
    }

    if (scrollIndicator) {
      scrollIndicator.classList.toggle('is-hidden', progress > 0.05);
    }

    if (mainNav) {
      if (scrolled > 40) {
        mainNav.classList.add('nav-scrolled');
        mainNav.classList.remove('nav-transparent');
      } else {
        mainNav.classList.add('nav-transparent');
        mainNav.classList.remove('nav-scrolled');
      }
    }

    updateWhyScene();

    ticking = false;
  }

  function getWhyProgress() {
    if (!whySection) return 0;

    const rect = whySection.getBoundingClientRect();
    const vh = window.innerHeight;
    const scrollRange = rect.height + vh * 0.45;
    const scrolled = vh * 0.88 - rect.top;

    return clamp(scrolled / scrollRange, 0, 1);
  }

  function updateWhyScene() {
    if (!whySection || prefersReducedMotion) return;

    const progress = getWhyProgress();

    if (arcBackground) {
      const arcOpacity = fadeInOut(progress, 0.0, 0.24, 0.68, 0.96);
      arcBackground.style.opacity = arcOpacity.toFixed(3);
    }

    if (arcOverlay) {
      const overlayOut = progress < 0.68
        ? 1
        : 1 - easeOutCubic(clamp((progress - 0.68) / 0.28, 0, 1));
      arcOverlay.style.opacity = overlayOut.toFixed(3);
    }

    whySceneItems.forEach(function (item) {
      const order = parseInt(item.getAttribute('data-scene-order'), 10) || 1;
      const inStart = 0.08 + (order - 1) * 0.055;
      const inEnd = inStart + 0.17;
      const opacity = fadeInOut(progress, inStart, inEnd, 0.66, 0.94);
      const reveal = clamp((progress - inStart) / (inEnd - inStart), 0, 1);
      const translateY = 26 * (1 - easeOutCubic(reveal));

      item.style.opacity = opacity.toFixed(3);
      item.style.transform = 'translate3d(0, ' + translateY.toFixed(1) + 'px, 0)';
    });
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateHeroScroll);
      ticking = true;
    }
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();

        const navHeight = mainNav ? mainNav.offsetHeight : 0;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetTop,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });

        const navCollapse = document.getElementById('navbarNav');
        if (navCollapse && navCollapse.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navCollapse);
          if (bsCollapse) bsCollapse.hide();
        }
      });
    });
  }

  function initRevealObserver() {
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 }
    );

    document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(function (el) {
      if (!el.classList.contains('why-scene-item')) {
        observer.observe(el);
      }
    });
  }

  function renderProperties() {
    if (!propertyGrid) return;

    propertyGrid.innerHTML = properties.map(function (property, index) {
      return `
        <div class="col-md-6 col-lg-3">
          <a href="#" class="property-card reveal-up" data-delay="${index * 100}" aria-label="${property.title}">
            <div class="property-card__image-wrap">
              <img src="${property.image}"
                   alt="${property.title}"
                   class="property-card__image"
                   loading="lazy"
                   decoding="async"
                   width="800"
                   height="600">
              <div class="property-card__overlay" aria-hidden="true"></div>
              <span class="property-card__badge">${property.type}</span>
              <span class="property-card__view">Voir le bien</span>
            </div>
            <div class="property-card__body">
              <p class="property-card__location">${property.location}</p>
              <h3 class="property-card__title">${property.title}</h3>
              <p class="property-card__price">${property.price}</p>
              <div class="property-card__meta">
                <span><i class="bi bi-door-open" aria-hidden="true"></i> ${property.bedrooms} ch.</span>
                <span><i class="bi bi-droplet" aria-hidden="true"></i> ${property.bathrooms} sdb.</span>
                <span><i class="bi bi-arrows-angle-expand" aria-hidden="true"></i> ${property.surface}</span>
              </div>
            </div>
          </a>
        </div>
      `;
    }).join('');
  }

  function initContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.classList.add('was-validated');
        return;
      }

      const submitBtn = document.getElementById('contactSubmit');
      const btnText = submitBtn.querySelector('.btn-text');
      const btnLoading = submitBtn.querySelector('.btn-loading');

      submitBtn.disabled = true;
      btnText.classList.add('d-none');
      btnLoading.classList.remove('d-none');

      setTimeout(function () {
        contactForm.classList.add('d-none');
        contactSuccess.classList.remove('d-none');

        submitBtn.disabled = false;
        btnText.classList.remove('d-none');
        btnLoading.classList.add('d-none');
      }, 1200);
    });
  }

  function initReducedMotion() {
    if (!prefersReducedMotion) return;

    if (heroName) {
      heroName.style.opacity = '1';
      heroName.style.transform = 'none';
    }
    if (heroTagline) {
      heroTagline.style.opacity = '1';
      heroTagline.style.transform = 'none';
    }
    if (heroServices) {
      heroServices.style.opacity = '1';
      heroServices.style.transform = 'none';
    }
    if (heroBackground) {
      heroBackground.style.opacity = '1';
    }
    if (heroContent) {
      heroContent.style.opacity = '1';
    }
    if (arcBackground) {
      arcBackground.style.opacity = '1';
    }
    if (arcOverlay) {
      arcOverlay.style.opacity = '1';
    }
    whySceneItems.forEach(function (item) {
      item.style.opacity = '1';
      item.style.transform = 'none';
    });
  }

  function initHeroOnLoad() {
    if (prefersReducedMotion) return;

    if (heroName) {
      heroName.style.opacity = '1';
      heroName.style.transform = 'none';
    }
    if (heroTagline) {
      heroTagline.style.opacity = '1';
      heroTagline.style.transform = 'none';
    }
    if (heroServices) {
      heroServices.style.opacity = '0';
      heroServices.style.transform = 'translate3d(0, 22px, 0)';
    }
    if (heroContent) {
      heroContent.style.opacity = '1';
    }
  }

  function init() {
    if (footerYear) {
      footerYear.textContent = new Date().getFullYear();
    }

    whySceneItems.forEach(function (item) {
      item.classList.add('is-ready');
    });

    initHeroOnLoad();
    renderProperties();
    initSmoothScroll();
    initRevealObserver();
    initContactForm();
    initReducedMotion();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    updateHeroScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
