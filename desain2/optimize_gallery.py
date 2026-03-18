import os
import re

images_dir = r"e:\projek\request\anwar\web\desain2\images"
index_file = r"e:\projek\request\anwar\web\desain2\index.html"

# Get all images (only jpeg/jpg/png, skip mp4 from grid for performance)
files = os.listdir(images_dir)
image_files = [f for f in files if f.endswith(('.jpeg', '.jpg', '.png'))]
video_files = [f for f in files if f.endswith('.mp4')]

# Put kartu-nama.jpeg first
if 'kartu-nama.jpeg' in image_files:
    image_files.remove('kartu-nama.jpeg')
    image_files.insert(0, 'kartu-nama.jpeg')

# Combine: images first, videos at end
all_files = image_files + video_files

INITIAL_SHOW = 8

# Build initial visible items HTML
initial_html = ""
hidden_data = []

for idx, f in enumerate(all_files):
    path = f"./images/{f}"
    is_video = f.endswith('.mp4')
    is_highlight = (f == 'kartu-nama.jpeg')

    if idx < INITIAL_SHOW:
        # Render directly in HTML
        extra_cls = ""
        if is_highlight:
            extra_cls = "col-span-2 row-span-2 ring-1 ring-[#1fa2ff]/30 shadow-[0_0_20px_rgba(31,162,255,0.15)]"

        initial_html += f'          <a href="{path}" data-fancybox="gallery" class="gallery-thumb rounded-xl overflow-hidden relative group {extra_cls}">\n'
        if is_video:
            initial_html += f'            <video src="{path}" class="w-full h-full object-cover" preload="metadata" muted></video>\n'
            initial_html += f'            <div class="absolute inset-0 bg-black/40 flex items-center justify-center"><i class="ph-fill ph-play-circle text-4xl text-white/80"></i></div>\n'
        else:
            initial_html += f'            <img src="{path}" alt="" loading="lazy" decoding="async" class="w-full h-full object-cover" />\n'
            initial_html += f'            <div class="gallery-overlay"><i class="ph-bold ph-arrows-out text-2xl text-white"></i></div>\n'
        initial_html += f'          </a>\n'
    else:
        # Store data for JS lazy injection
        hidden_data.append({"path": path, "isVideo": is_video})


gallery_section = f"""
    <!-- Gallery Section -->
    <section id="gallery" class="py-20 md:py-24 relative z-10 border-t border-white/5" style="content-visibility:auto; contain-intrinsic-size: auto 800px;">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-12 md:mb-16" data-aos="fade-up">
          <div class="inline-block px-3 py-1 rounded-full border border-[#1fa2ff]/30 text-[#1fa2ff] text-xs font-semibold mb-4 tracking-wider uppercase">
            Portofolio
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-3">
            Galeri <span class="text-[#1fa2ff]">Proyek</span>
          </h2>
          <p class="text-gray-400 text-sm max-w-2xl mx-auto">
            Dokumentasi hasil pengerjaan tim kami di berbagai lokasi.
          </p>
        </div>

        <div class="gallery-grid" id="gallery-grid" data-aos="fade-up" data-aos-delay="100">
{initial_html}
        </div>

        <div class="mt-10 md:mt-12 text-center" id="load-more-wrap">
            <button id="btn-load-more" class="inline-flex justify-center items-center gap-2 bg-[#1fa2ff]/10 text-[#1fa2ff] border border-[#1fa2ff]/30 font-semibold text-sm py-3 px-8 rounded-full hover:bg-[#1fa2ff]/20 hover:border-[#1fa2ff]/50 transition-colors">
              Lihat Lebih Banyak
              <i class="ph ph-caret-down"></i>
            </button>
        </div>
      </div>
    </section>

    <script>
    (function() {{
      var data = {str([{"p": d["path"], "v": d["isVideo"]} for d in hidden_data])};
      var grid = document.getElementById('gallery-grid');
      var btn = document.getElementById('btn-load-more');
      var wrap = document.getElementById('load-more-wrap');
      var idx = 0;
      var batch = 8;

      if(data.length === 0 && wrap) wrap.style.display='none';

      function loadMore() {{
        var frag = document.createDocumentFragment();
        var end = Math.min(idx + batch, data.length);
        for(var i = idx; i < end; i++) {{
          var a = document.createElement('a');
          a.href = data[i].p;
          a.setAttribute('data-fancybox','gallery');
          a.className = 'gallery-thumb rounded-xl overflow-hidden relative group';
          if(data[i].v) {{
            a.innerHTML = '<video src="'+data[i].p+'" class="w-full h-full object-cover" preload="metadata" muted></video><div class="absolute inset-0 bg-black/40 flex items-center justify-center"><i class="ph-fill ph-play-circle text-4xl text-white/80"></i></div>';
          }} else {{
            a.innerHTML = '<img src="'+data[i].p+'" alt="" loading="lazy" decoding="async" class="w-full h-full object-cover" /><div class="gallery-overlay"><i class="ph-bold ph-arrows-out text-2xl text-white"></i></div>';
          }}
          frag.appendChild(a);
        }}
        grid.appendChild(frag);
        idx = end;
        if(idx >= data.length) wrap.style.display='none';
        // Re-init fancybox
        if(typeof Fancybox !== 'undefined') Fancybox.bind('[data-fancybox="gallery"]');
      }}

      if(btn) btn.addEventListener('click', loadMore);
    }})();
    </script>
"""

with open(index_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace existing gallery section (including the load-more script)
pattern = re.compile(r'\s*<!-- Gallery Section -->.*?</script>\s*\n\s*<!-- Get in Touch -->', re.DOTALL)
content = re.sub(pattern, '\n' + gallery_section + '\n    <!-- Get in Touch -->', content)

# Now add optimized CSS for the gallery (replace card-dark hover effects that cause lag)
gallery_css = """
      /* Gallery Grid - GPU optimized */
      .gallery-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0.5rem;
      }
      @media (min-width: 768px) {
        .gallery-grid {
          grid-template-columns: repeat(3, 1fr);
          gap: 0.75rem;
          grid-auto-rows: 200px;
        }
      }
      @media (min-width: 1024px) {
        .gallery-grid {
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
        }
      }
      .gallery-thumb {
        aspect-ratio: 1;
        background: #111827;
        cursor: pointer;
        transform: translateZ(0);
      }
      @media (min-width: 768px) {
        .gallery-thumb {
          aspect-ratio: auto;
        }
      }
      .gallery-thumb img,
      .gallery-thumb video {
        transition: transform 0.5s ease;
        will-change: transform;
      }
      .gallery-thumb:hover img,
      .gallery-thumb:hover video {
        transform: scale(1.08);
      }
      .gallery-overlay {
        position: absolute;
        inset: 0;
        background: rgba(31, 162, 255, 0.15);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      .gallery-thumb:hover .gallery-overlay {
        opacity: 1;
      }
"""

# Inject gallery CSS before </style>
if '.gallery-grid' not in content:
    content = content.replace('    </style>', gallery_css + '    </style>')

with open(index_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Gallery fully optimized for performance and mobile.")
