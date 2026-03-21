/* ===================================================
   Anwar Technology – Main JavaScript
   (Extracted from deployed version)
   =================================================== */

/* --- Gallery Load More --- */
(function () {
  var data = [
    { "p": "./images/(47).jpeg", "v": false },
    { "p": "./images/(48).jpeg", "v": false },
    { "p": "./images/(49).jpeg", "v": false },
    { "p": "./images/(50).jpeg", "v": false },
    { "p": "./images/(51).jpeg", "v": false },
    { "p": "./images/(52).jpeg", "v": false },
    { "p": "./images/(53).jpeg", "v": false },
    { "p": "./images/(54).jpeg", "v": false },
    { "p": "./images/(55).jpeg", "v": false },
    { "p": "./images/(56).jpeg", "v": false },
    { "p": "./images/(57).jpeg", "v": false },
    { "p": "./images/(58).jpeg", "v": false },
    { "p": "./images/(59).jpeg", "v": false },
    { "p": "./images/(60).jpeg", "v": false },
    { "p": "./images/(61).jpeg", "v": false },
    { "p": "./images/(62).jpeg", "v": false },
    { "p": "./images/(63).jpeg", "v": false },
    { "p": "./images/(64).jpeg", "v": false },
    { "p": "./images/(65).jpeg", "v": false },
    { "p": "./images/(68).jpeg", "v": false },
    { "p": "./images/(69).jpeg", "v": false },
    { "p": "./images/(70).jpeg", "v": false },
    { "p": "./images/(71).jpeg", "v": false },
    { "p": "./images/(73).jpeg", "v": false },
    { "p": "./images/(74).jpeg", "v": false },
    { "p": "./images/(75).jpeg", "v": false },
    { "p": "./images/(76).jpeg", "v": false },
    { "p": "./images/(77).jpeg", "v": false },
    { "p": "./images/(78).jpeg", "v": false },
    { "p": "./images/(79).jpeg", "v": false },
    { "p": "./images/(80).jpeg", "v": false },
    { "p": "./images/(41).mp4", "v": true },
    { "p": "./images/(42).mp4", "v": true }
  ];
  var grid = document.getElementById('gallery-grid');
  var btn = document.getElementById('btn-load-more');
  var wrap = document.getElementById('load-more-wrap');
  var idx = 0;
  var batch = 8;

  if (data.length === 0 && wrap) wrap.style.display = 'none';

  function loadMore() {
    var frag = document.createDocumentFragment();
    var end = Math.min(idx + batch, data.length);
    for (var i = idx; i < end; i++) {
      var a = document.createElement('a');
      a.href = data[i].p;

      var isLarge = false;
      if ((i - 6) % 6 === 0 || (i - 6) % 6 === 3) {
        isLarge = true;
      }

      a.className = 'glightbox gallery-thumb rounded-xl overflow-hidden relative group ' + (isLarge ? 'md:col-span-2 md:row-span-2 ring-1 ring-[#1fa2ff]/30 shadow-[0_0_20px_rgba(31,162,255,0.15)]' : '');
      a.setAttribute('data-gallery', 'portfolio');
      if (data[i].v) {
        a.setAttribute('data-type', 'video');
        a.innerHTML = '<video src="' + data[i].p + '" class="w-full h-full object-cover" preload="metadata" muted></video><div class="absolute inset-0 bg-black/40 flex items-center justify-center"><i class="ph-fill ph-play-circle text-4xl text-white/80"></i></div>';
      } else {
        a.innerHTML = '<img src="' + data[i].p + '" alt="" loading="lazy" decoding="async" class="w-full h-full object-cover" /><div class="gallery-overlay"><i class="ph-bold ph-arrows-out text-2xl text-white"></i></div>';
      }
      frag.appendChild(a);
    }
    grid.appendChild(frag);
    idx = end;
    if (idx >= data.length) wrap.style.display = 'none';
    if (window.galleryLightbox) window.galleryLightbox.destroy();
    window.galleryLightbox = GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true,
      openEffect: 'fade',
      closeEffect: 'fade',
    });
    window.galleryLightbox.on('open', function () { if (typeof lenis !== 'undefined') lenis.stop(); });
    window.galleryLightbox.on('close', function () { if (typeof lenis !== 'undefined') lenis.start(); });
  }

  if (btn) btn.addEventListener('click', loadMore);
})();

/* --- Tab Switching for Paket Harga --- */
function switchTab(tab) {
  var tabs = ['cctv', 'indihome'];
  tabs.forEach(function (t) {
    var btn = document.getElementById('tab-' + t);
    var panel = document.getElementById('panel-' + t);
    if (t === tab) {
      if (btn) { btn.classList.add('active'); }
      if (panel) { panel.classList.remove('hidden'); }
    } else {
      if (btn) { btn.classList.remove('active'); }
      if (panel) { panel.classList.add('hidden'); }
    }
  });
}

/* --- GLightbox init for identitas gallery --- */
document.addEventListener('DOMContentLoaded', function () {
  if (typeof GLightbox !== 'undefined') {
    var identitasLightbox = GLightbox({
      selector: '[data-gallery="identitas"]',
      touchNavigation: true,
      loop: true,
      openEffect: 'fade',
      closeEffect: 'fade',
    });
    identitasLightbox.on('open', function () { if (typeof lenis !== 'undefined') lenis.stop(); });
    identitasLightbox.on('close', function () { if (typeof lenis !== 'undefined') lenis.start(); });
  }
});

/* --- Brand marquee: pause on hover (CSS-only animation, no touch conflicts) --- */

/* --- Lenis Smooth Scroll --- */
var lenis = new Lenis({
  duration: 1.2,
  easing: function(t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
  direction: "vertical",
  gestureDirection: "vertical",
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

/* --- Smooth scroll for anchor links (via Lenis) --- */
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
  anchor.addEventListener('click', function(e) {
    var targetId = this.getAttribute('href');
    if (targetId === '#') return;
    var target = document.querySelector(targetId);
    if (target) {
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80, duration: 1.2 });
    }
  });
});

/* --- Gallery GLightbox (global) --- */
if (typeof GLightbox !== 'undefined' && document.querySelector('.glightbox')) {
  window.galleryLightbox = GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true,
    openEffect: 'fade',
    closeEffect: 'fade',
    cssEfects: {
      fade: { in: 'fadeIn', out: 'fadeOut' },
    },
    preload: false,
  });
  window.galleryLightbox.on('open', function () {
    if (typeof lenis !== 'undefined') lenis.stop();
  });
  window.galleryLightbox.on('close', function () {
    if (typeof lenis !== 'undefined') lenis.start();
  });
}

/* --- Set dynamic year --- */
var yearEl = document.getElementById("current-year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* --- Initialize AOS --- */
AOS.init({
  once: true,
  duration: 800,
  offset: 50,
});

/* --- Sticky Navigation --- */
(function() {
  var nav = document.getElementById('main-nav');
  if (!nav) return;
  window.addEventListener('scroll', function() {
    if (window.scrollY > 80) {
      nav.classList.remove('nav-transparent');
      nav.classList.add('nav-solid');
    } else {
      nav.classList.remove('nav-solid');
      nav.classList.add('nav-transparent');
    }
  }, { passive: true });
})();

/* --- Mobile Menu Toggle --- */
(function() {
  var btn = document.getElementById('mobile-menu-btn');
  var menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;
  btn.addEventListener('click', function() {
    menu.classList.toggle('hidden');
    var icon = btn.querySelector('i');
    if (menu.classList.contains('hidden')) {
      icon.className = 'ph ph-list text-2xl';
    } else {
      icon.className = 'ph ph-x text-2xl';
    }
  });
  // Close mobile menu on link click
  menu.querySelectorAll('a[href^="#"]').forEach(function(link) {
    link.addEventListener('click', function() {
      menu.classList.add('hidden');
      var icon = btn.querySelector('i');
      icon.className = 'ph ph-list text-2xl';
    });
  });
})();

/* --- FAQ Accordion --- */
(function() {
  var toggles = document.querySelectorAll('.faq-toggle');
  toggles.forEach(function(toggle) {
    toggle.addEventListener('click', function() {
      var item = toggle.closest('.faq-item');
      var answer = item.querySelector('.faq-answer');
      var icon = toggle.querySelector('.faq-icon');
      var isOpen = !answer.classList.contains('hidden');
      // Close all
      document.querySelectorAll('.faq-item').forEach(function(fi) {
        fi.classList.remove('active');
        fi.querySelector('.faq-answer').classList.add('hidden');
        fi.querySelector('.faq-icon').classList.remove('rotated');
        fi.querySelector('.faq-toggle').setAttribute('aria-expanded', 'false');
      });
      // Open clicked if it was closed
      if (!isOpen) {
        item.classList.add('active');
        answer.classList.remove('hidden');
        icon.classList.add('rotated');
        toggle.setAttribute('aria-expanded', 'true');
      }
    });
  });
})();

/* --- Instagram Dropdown Toggle --- */
function toggleIgDropdown(e) {
  e.preventDefault();
  e.stopPropagation();
  var menu = document.getElementById('ig-dropdown-menu');
  var icon = document.getElementById('ig-dropdown-icon');
  if (!menu) return;
  var isOpen = !menu.classList.contains('invisible');
  if (isOpen) {
    menu.classList.add('opacity-0', 'invisible', 'translate-y-[-8px]');
    menu.classList.remove('opacity-100', 'visible', 'translate-y-0');
    if (icon) icon.style.transform = 'rotate(0deg)';
  } else {
    menu.classList.remove('opacity-0', 'invisible', 'translate-y-[-8px]');
    menu.classList.add('opacity-100', 'visible', 'translate-y-0');
    if (icon) icon.style.transform = 'rotate(180deg)';
  }
}

// Close IG dropdown when clicking outside
document.addEventListener('click', function(e) {
  var menu = document.getElementById('ig-dropdown-menu');
  var btn = document.getElementById('ig-dropdown-btn');
  var icon = document.getElementById('ig-dropdown-icon');
  if (!menu || !btn) return;
  if (!btn.contains(e.target) && !menu.contains(e.target)) {
    menu.classList.add('opacity-0', 'invisible', 'translate-y-[-8px]');
    menu.classList.remove('opacity-100', 'visible', 'translate-y-0');
    if (icon) icon.style.transform = 'rotate(0deg)';
  }
});
