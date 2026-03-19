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

/* --- Brand marquee: touch-scrollable + infinite loop on mobile --- */
(function() {
  var wrap = document.querySelector('.brand-marquee-wrap');
  var track = document.querySelector('.brand-track');
  if (!wrap || !track) return;
  wrap.addEventListener('touchstart', function() {
    track.classList.add('touch-active');
  }, { passive: true });
  wrap.addEventListener('touchend', function() {
    var half = wrap.scrollWidth / 2;
    if (wrap.scrollLeft >= half) { wrap.scrollLeft -= half; }
    track.classList.remove('touch-active');
  }, { passive: true });
  wrap.addEventListener('scroll', function() {
    var half = wrap.scrollWidth / 2;
    if (wrap.scrollLeft >= half) { wrap.scrollLeft -= half; }
  }, { passive: true });
})();

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

/* --- Gallery GLightbox (global) --- */
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

/* --- Set dynamic year --- */
document.getElementById("current-year").textContent =
  new Date().getFullYear();

/* --- Initialize AOS --- */
AOS.init({
  once: true,
  duration: 800,
  offset: 50,
});
