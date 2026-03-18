import os

images_dir = r"e:\projek\request\anwar\web\desain2\images"
index_file = r"e:\projek\request\anwar\web\desain2\index.html"

# Get all images
files = os.listdir(images_dir)
files = [f for f in files if f.endswith(('.jpeg', '.mp4', '.jpg', '.png'))]

# Put kartu-nama.jpeg first
if 'kartu-nama.jpeg' in files:
    files.remove('kartu-nama.jpeg')
    files.insert(0, 'kartu-nama.jpeg')

gallery_html = """
    <!-- Gallery Section -->
    <section id="gallery" class="py-24 relative z-10 border-t border-white/5 bg-dark-900">
      <!-- Glow effect -->
      <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-blue/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center mb-16" data-aos="fade-up">
          <div class="inline-block px-3 py-1 rounded-full border border-brand-blue/30 text-brand-blue text-xs font-semibold mb-4 tracking-wider uppercase">
            Portofolio
          </div>
          <h2 class="text-3xl md:text-4xl font-bold text-white mb-3">
            Galeri <span class="text-brand-blue">Proyek</span>
          </h2>
          <p class="text-gray-400 text-sm max-w-2xl mx-auto">
            Dokumentasi hasil pengerjaan tim kami di berbagai lokasi.
          </p>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5 auto-rows-[150px] md:auto-rows-[200px]" data-aos="fade-up" data-aos-delay="100">
"""

count = 0
for idx, f in enumerate(files):
    # Only showing up to a reasonable number to avoid too massive DOM if needed, 
    # but the user requested "masukkan semua gambarnya", so all it is.
    delay = (idx % 4) * 50
    path = f"./images/{f}"
    
    classes = "rounded-xl overflow-hidden relative group card-dark border-0 "
    
    # kartu-nama.jpeg is highlighted
    if f == 'kartu-nama.jpeg':
        classes += "col-span-2 row-span-2 shadow-[0_0_30px_rgba(31,162,255,0.2)] border border-brand-blue/30"
    
    is_video = f.endswith('.mp4')
    
    gallery_html += f"""
          <a href="{path}" data-fancybox="gallery" class="{classes}" data-aos="zoom-in" data-aos-delay="{delay}">
"""
    if is_video:
        gallery_html += f"""
            <video src="{path}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" preload="metadata"></video>
            <div class="absolute inset-0 bg-black/40 group-hover:bg-brand-blue/20 transition-colors duration-300 flex items-center justify-center">
              <i class="ph-fill ph-play-circle text-4xl text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all shadow-lg rounded-full"></i>
            </div>
"""
    else:
        gallery_html += f"""
            <img src="{path}" alt="Gallery {idx}" loading="lazy" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            <div class="absolute inset-0 bg-brand-blue/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <i class="ph-bold ph-arrows-out text-3xl text-white drop-shadow-md transform scale-50 group-hover:scale-100 transition-transform duration-300"></i>
            </div>
"""
            
    gallery_html += """
          </a>
"""

gallery_html += """
        </div>
      </div>
    </section>
"""

with open(index_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Inject Fancybox CSS
css_link = '    <!-- Fancybox CSS -->\n    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.css" />\n'
if 'fancybox.css' not in content:
    content = content.replace('    <!-- Tailwind CSS -->', css_link + '\n    <!-- Tailwind CSS -->')

# Inject Fancybox JS
js_link = """
    <!-- Fancybox JS -->
    <script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@5.0/dist/fancybox/fancybox.umd.js"></script>
    <script>
      Fancybox.bind('[data-fancybox="gallery"]', {
        Toolbar: {
            display: {
                left: ["infobar"],
                middle: [
                    "zoomIn",
                    "zoomOut",
                    "toggle1to1",
                    "rotateCCW",
                    "rotateCW",
                    "flipX",
                    "flipY",
                ],
                right: ["slideshow", "thumbs", "close"],
            },
        },
      });
    </script>
"""
if 'fancybox.umd.js' not in content:
    content = content.replace('    <!-- AOS JS -->', js_link + '\n    <!-- AOS JS -->')

# Inject Gallery section
if 'id="gallery"' not in content:
    content = content.replace('    <!-- Get in Touch -->', gallery_html + '\n    <!-- Get in Touch -->')

with open(index_file, 'w', encoding='utf-8') as f:
    f.write(content)

print("Gallery generated and index.html updated.")
