/# PRD: Website Portofolio Pribadi — Tema Retro Game

**Versi:** 1.2
**Tanggal:** 3 September 2026
**Pemilik Produk:** [Nama Kamu]
**Status:** Draft — tema diganti dari Game Boy (DMG) ke Game Boy Advance; Open Questions v1.0 sudah diputuskan (lihat Section 17)

---

## 1. Ringkasan (Overview)

Website portofolio pribadi satu halaman (atau multi-section) dengan estetika **retro game** (pixel art, palet warna 8-bit/16-bit, font monospace/pixel, efek CRT/scanline opsional). Tujuannya menampilkan profil, kontak, sertifikat, dan proyek dengan cara yang **menarik secara visual namun tetap mudah dipahami** — bukan sekadar gimmick tema tanpa fungsi.

Prinsip utama: **"Nostalgia look, modern clarity."** Tema retro hanya boleh memperkuat pengalaman, tidak boleh mengorbankan keterbacaan atau navigasi.

---

## 2. Latar Belakang & Masalah

- Portofolio generik sering terlihat mirip satu sama lain dan gagal meninggalkan kesan.
- Tema kreatif (seperti retro game) berisiko membuat pengunjung bingung: teks sulit dibaca, navigasi tidak jelas, animasi mengganggu.
- Dibutuhkan pendekatan yang menyeimbangkan **identitas visual unik** dengan **hierarki informasi yang jelas**, sehingga rekruter/klien bisa menemukan info penting dalam hitungan detik.

---

## 3. Tujuan (Goals)

1. Menampilkan identitas personal & brand yang playful tapi profesional.
2. Rekruter/klien dapat menemukan **About, Project, Certificate, dan Contact** dalam ≤3 klik / ≤10 detik.
3. Meningkatkan tingkat kontak (email/LinkedIn click) dari pengunjung.
4. Membedakan diri dari template portofolio pada umumnya lewat tema retro game.

### Non-Goals (bukan tujuan)
- Tidak dibuat sebagai game interaktif penuh (bukan portofolio berbentuk game yang harus "dimainkan" untuk mengakses info).
- Tidak menyediakan blog/CMS di versi awal (bisa jadi fase berikutnya).

---

## 4. Target Pengguna

| Persona | Kebutuhan Utama |
|---|---|
| Recruiter / HR | Scan cepat skill, project, cara kontak |
| Hiring Manager / Tech Lead | Detail teknis project, link GitHub, sertifikasi relevan |
| Klien freelance | Bukti kredibilitas (project + sertifikat) & cara menghubungi |
| Sesama developer / komunitas | Eksplorasi project & GitHub |

---

## 5. Ruang Lingkup (Scope)

### In Scope
- Landing/Home dengan navigasi utama bertema "Main Menu"
- Section **About Me**
- Section **Contact** (Email, GitHub, LinkedIn)
- Section **Certificate**
- Section **Project Portfolio**
- Desain responsif (desktop, tablet, mobile)

### Out of Scope (fase awal)
- Sistem blog/artikel
- Backend/CMS dinamis (data bisa hardcode/JSON statis)
- Multi-bahasa (bisa ditambah nanti)
- Fitur game interaktif kompleks (mini-game, dsb.) — opsional easter egg saja, bukan penghalang akses info

---

## 6. Tema & Prinsip Desain: Retro Game

### 6.1 Konsep Visual — Tema Game Boy Advance (GBA)
- **Palet warna**: berbeda dari layar monokrom Game Boy klasik, GBA punya layar LCD **full-color 16-bit**, jadi tema mengambil palet warna khas shell **Indigo GBA** dipadu warna UI 16-bit yang tetap ringkas (bukan pelangi bebas), dengan dua mode (lihat 6.1.1 di bawah):
  - `#1a1a2e` (navy-ungu gelap — teks/outline/background layar mati)
  - `#4a4a6a` (ungu abu-abu — elemen sekunder)
  - `#7b68c4` (ungu-indigo terang khas shell GBA — highlight/hover)
  - `#e0e0f0` (lavender sangat muda — background layar/teks terang)
  - **1 warna aksen wajib untuk CTA**: `#ff6b6b` (merah-koral, terinspirasi warna tombol A/B pada beberapa varian GBA) — dipakai HANYA untuk aksi utama (tombol "Lihat Detail", "Hubungi Saya") agar tidak bersaing dengan warna UI lain.

#### 6.1.1 Dark Mode & Light Mode (Keputusan: dibutuhkan toggle)

Tema Game Boy Advance tetap jadi identitas visual utama, tapi disediakan 2 varian agar nyaman dibaca di kondisi pencahayaan berbeda — sekaligus menyinggung fakta bahwa layar GBA generasi awal tidak ber-backlight (butuh cahaya terang), sementara varian belakangan (GBA SP) ber-backlight:

| Mode | Background "layar" | Teks/outline | Highlight/hover | Sekunder | Aksen CTA |
|---|---|---|---|---|---|
| **Dark Mode** (default, evokes GBA SP backlit) | `#1a1a2e` (navy-ungu gelap) | `#e0e0f0` (lavender terang) | `#7b68c4` | `#4a4a6a` | `#ff6b6b` |
| **Light Mode** (evokes layar GBA non-backlit di cahaya terang) | `#e0e0f0` (lavender sangat muda) | `#1a1a2e` (navy-ungu gelap) | `#4a4a6a` | `#7b68c4` | `#ff6b6b` |

- Kedua mode tetap pakai palet indigo-lavender yang sama, hanya arah kontras yang dibalik (background↔teks) — sehingga identitas visual retro tetap konsisten, bukan tema baru. Warna aksen CTA (`#ff6b6b`) tetap sama di kedua mode agar CTA selalu mudah dikenali.
- Toggle mode berbentuk ikon kecil bergaya **tombol power/brightness konsol genggam**, ditempatkan di area menu utama yang selalu terlihat (bukan disembunyikan).
- Default mode ikut `prefers-color-scheme` browser pengguna saat kunjungan pertama, lalu pilihan disimpan (local storage) untuk kunjungan berikutnya.
- Wajib tetap lolos kontras WCAG AA di kedua mode (lihat Section 6.3 & 11).
- **Tipografi**: font pixel/monospace (mis. "Press Start 2P") HANYA untuk judul & elemen dekoratif. **Body text** tetap pakai font sans-serif yang mudah dibaca — pixel font kecil sulit dibaca dalam paragraf panjang.
- **Elemen UI**: bingkai konten meniru "layar LCD GBA" (border tebal, bentuk lebih ramping/horizontal khas bodi GBA dibanding DMG yang chunky-vertikal), tombol navigasi bergaya **D-Pad & tombol A/B** untuk aksi utama (mis. tombol A = "Lihat Detail", D-Pad = navigasi antar section/item). Tambahan tombol **L/R (shoulder button)** dipakai sebagai shortcut opsional untuk lompat ke section sebelumnya/berikutnya (pelengkap D-Pad, bukan pengganti).
- **Motif navigasi**: menu utama seperti **"Start Screen"** game, label utama tetap kata biasa agar tidak ambigu:
  - `> ABOUT ME`
  - `> PROJECTS`
  - `> CERTIFICATES`
  - `> CONTACT`
- Analogi tema boleh dipakai di label pendukung/dekorasi, tapi label utama harus tetap jelas.

### 6.2 Model Navigasi: Swipe (bukan scroll panjang)

Untuk menampung banyak project & sertifikat tanpa membuat halaman jadi scroll panjang yang melelahkan, situs menggunakan **navigasi swipe**, terinspirasi cara pindah "cartridge"/layar di perangkat genggam:

- **Antar section utama** (About → Projects → Certificates → Contact): swipe kiri/kanan (atau klik tombol D-Pad di layar) untuk berpindah "layar", mirip berpindah menu di konsol genggam. Tetap sediakan menu titik/tab di atas agar pengguna bisa lompat langsung ke section manapun tanpa swipe berkali-kali.
- **Di dalam section Projects & Certificates**: tiap item ditampilkan sebagai **carousel swipe horizontal** (satu kartu besar per swipe, atau beberapa kartu terlihat sebagian di tepi layar sebagai isyarat "masih ada lagi"). Ini memungkinkan jumlah project/sertifikat yang banyak tanpa membuat satu layar padat.
- **Indikator wajib ada** di setiap area swipeable: dot/pagination (mis. `● ○ ○ ○`) dan/atau penomoran (`3 / 12`) supaya pengguna selalu tahu ada berapa banyak item dan sedang di posisi mana.
- **Fallback non-touch**: di desktop tanpa layar sentuh, sediakan tombol panah kiri/kanan bergaya D-Pad yang bisa diklik, plus dukungan keyboard arrow key & scroll wheel horizontal.
- **Hindari swipe bersarang yang membingungkan** (Keputusan: arah dikonfirmasi):
  - Swipe **vertikal** = pindah antar-section utama (About ↔ Projects ↔ Certificates ↔ Contact).
  - Swipe **horizontal** = pindah antar-kartu di dalam satu section (Projects/Certificates).
  - Arah berbeda ini jadi isyarat spasial utama agar pengguna tidak salah gestur; tetap didampingi kontrol klik & indikator sesuai poin lain di section ini.

#### 6.2.1 Animasi Transisi Swipe (bergaya retro)

Supaya perpindahan section/kartu terasa konsisten dengan tema, bukan transisi generik:

- **Transisi antar-section (vertikal)**: efek mirip "ganti cartridge/layar konsol" — layar lama sedikit meredup dengan 1–2 frame flicker/scanline singkat (durasi <200ms), lalu layar baru masuk dari atas/bawah. Efek flicker ini termasuk yang dinonaktifkan otomatis saat toggle **"Reduce Effects"** aktif (fallback: cross-fade polos).
- **Transisi antar-kartu (horizontal)**: gerakan slide dengan easing "snap" bertahap (step/ease seperti gerakan sprite pixel, bukan smooth-easing modern), disertai sedikit efek "bounce" tipis di ujung swipe untuk menegaskan batas kartu pertama/terakhir.
- **Hint gestur pertama kali** (lihat poin 9 di Section 9) memakai animasi yang sama, bukan animasi terpisah, agar pengguna langsung terbiasa dengan "bahasa gerak" situs.
- Semua animasi transisi tunduk pada batasan Section 6.3 (maks. 1 elemen animasi bergerak per viewport, opsional & subtle).

### 6.3 Batasan agar Tidak Membingungkan
- Maksimal 1 elemen animasi bergerak per viewport pada satu waktu (hindari layar penuh elemen berkedip).
- Efek CRT/scanline/glitch bersifat **opsional & subtle**, dengan opsi toggle "Reduce Effects" untuk aksesibilitas.
- Kontras warna teks vs background wajib memenuhi standar WCAG AA minimum.
- Navigasi utama selalu terlihat/dapat diakses (sticky menu atau tombol "Menu" persisten), tidak tersembunyi di balik easter egg.
- Tidak ada informasi penting yang **hanya** bisa diakses lewat interaksi tersembunyi (mis. harus menemukan "rahasia" dulu untuk lihat kontak) — semua section utama harus terlihat/dapat dijangkau langsung dari menu.

---

## 7. Informasi Arsitektur (Struktur Halaman)

```
[Start Screen]  ⇄  [ABOUT ME]  ⇄  [PROJECTS]  ⇄  [CERTIFICATES]  ⇄  [CONTACT]
                        (swipe kiri/kanan antar "layar", tab menu tetap terlihat)

Di dalam PROJECTS:      [Card 1] ⇄ [Card 2] ⇄ [Card 3] ⇄ ... ⇄ [Card N]
Di dalam CERTIFICATES:  [Card 1] ⇄ [Card 2] ⇄ [Card 3] ⇄ ... ⇄ [Card N]
```

- Struktur berupa **single-page app dengan navigasi swipe/paged**, bukan scroll panjang konvensional.
- Tab/menu utama (About, Projects, Certificates, Contact) tetap **selalu terlihat** sebagai acuan posisi, sehingga swipe menjadi opsi mempercepat, bukan satu-satunya cara berpindah.
- URL tetap bisa update per section (mis. `#projects`) agar section spesifik bisa dibagikan langsung sebagai link.

---

## 8. Requirement Fungsional per Fitur

### 8.1 About Me
- Foto/avatar (boleh gaya pixel-art avatar sebagai elemen tema).
- Nama & role/title singkat (mis. "Frontend Developer").
- Deskripsi singkat (3–5 kalimat, bahasa natural, BUKAN pixel font kecil).
- Daftar skill/tech stack — ditampilkan sebagai "badge" atau "inventory item" bergaya game, dikelompokkan per kategori (Bahasa, Framework, Tools) agar tidak jadi tumpukan tag acak.
- (Opsional) "Stats" bergaya RPG (mis. Experience: 2 tahun, Level: Junior/Mid) — hanya sebagai elemen tema, tetap dengan label yang jelas.

### 8.2 Contact
- Email — ditampilkan sebagai teks + tombol "Copy Email" dan `mailto:` link.
- GitHub — tombol/ikon dengan link ke profil GitHub.
- LinkedIn — tombol/ikon dengan link ke profil LinkedIn.
- Semua 3 kontak **selalu terlihat bersamaan** dalam satu section (bukan tersebar), dengan ikon yang jelas + label teks (jangan hanya ikon tanpa label, agar tidak ambigu).
- Section ini idealnya juga muncul ringkas di footer agar mudah diakses dari mana saja di halaman.

### 8.3 Certificate
- Ditampilkan sebagai **carousel swipe horizontal** (satu kartu penuh per swipe di mobile, atau 1 kartu utuh + intip kartu berikutnya di tepi layar pada desktop). Tiap kartu berisi:
  - Nama sertifikasi
  - Penerbit (issuer)
  - Tanggal terbit
  - Thumbnail/badge sertifikat
  - Link "Lihat Sertifikat" (PDF/URL verifikasi)
- Diurutkan dari terbaru ke terlama.
- Wajib ada indikator posisi (dot/pagination atau `x / total`) di bawah/atas carousel.
- Opsional: filter/kategori sebagai "tab kecil" di atas carousel (mis. per bidang), sehingga swipe tetap ringan meski sertifikat jumlahnya banyak.
- **Keputusan jumlah item (v1)**: konten awal berisi **3 sertifikat**. Struktur carousel & data JSON tetap dirancang scalable — kalau nanti jumlah sertifikat bertambah lebih dari 3, item tambahan otomatis "masuk antrean" (queue) di carousel yang sama tanpa perlu ubah komponen/section baru; indikator `x / total` otomatis menyesuaikan jumlah data. Saat total item ≤3, indikator posisi tetap ditampilkan (tidak disembunyikan) agar konsisten secara visual antar section.

### 8.4 Project Portfolio
- Ditampilkan sebagai **carousel swipe horizontal**, tiap kartu berisi:
  - Nama project
  - Thumbnail/screenshot
  - Deskripsi singkat (1–2 kalimat)
  - Tech stack yang dipakai (badge kecil)
  - Link Live Demo (jika ada)
  - Link Source Code (GitHub)
- Tap/klik kartu → detail project (modal) berisi deskripsi lengkap, peran, tantangan, hasil. Modal punya tombol tutup yang jelas agar tidak "terjebak" di layar detail.
- Urutan default: project unggulan/terbaru di posisi paling awal carousel (swipe pertama).
- Nuansa "Level Select" bisa dipakai sebagai dekorasi (mis. label "Level 1" kecil di pojok kartu), namun **nama project tetap judul utama** yang paling menonjol.
- Wajib ada indikator posisi (dot/pagination atau `x / total`) agar pengunjung tahu masih ada berapa project lagi.
- **Keputusan jumlah item (v1)**: konten awal berisi **3 project**, sama seperti Certificates — 3 project unggulan/terbaru ditampilkan lebih dulu di posisi awal carousel. Data project disimpan di JSON statis (lihat Section 14) sehingga menambah project baru di kemudian hari hanya perlu menambah entri data; carousel & indikator `x / total` otomatis mengikuti tanpa perubahan desain/komponen.

---

## 9. Prinsip UX Anti-Bingung (Clarity Guidelines)

Karena tema retro game punya risiko mengaburkan makna, berlaku aturan berikut:

1. **Label jelas di atas gaya**: setiap istilah bertema game harus disertai label konvensional (mis. "Achievements — Certificates").
2. **Hierarki visual konsisten**: judul section > subjudul > body text, dengan ukuran & warna yang konsisten di semua section.
3. **Satu aksi utama per section**: hindari terlalu banyak tombol/CTA bersaing dalam satu layar.
4. **Navigasi selalu terlihat**: menu/nav bar persisten, indikator posisi (highlight menu aktif saat scroll).
5. **Feedback interaksi jelas**: hover/klik memberi respons visual instan (efek "tombol ditekan") agar pengguna yakin aksinya terdeteksi.
6. **Progressive disclosure**: detail panjang (deskripsi project, sertifikat) disembunyikan di balik "See More"/modal, bukan langsung memenuhi layar.
7. **Konsistensi ikon**: satu ikon = satu makna di seluruh halaman (jangan pakai ikon disket untuk "download" di satu tempat dan "save" di tempat lain).
8. **Uji keterbacaan**: seluruh body text lolos cek kontras & ukuran font minimum 14–16px di mobile.
9. **Isyarat swipe eksplisit**: saat pertama kali membuka carousel, tampilkan hint animasi singkat (mis. kartu bergeser sedikit lalu kembali) supaya pengunjung sadar konten bisa di-swipe, terutama di desktop yang tidak terbiasa gestur ini.
10. **Jangan andalkan swipe saja**: setiap area swipeable tetap punya kontrol klik (tombol panah/D-Pad) dan indikator jumlah item, agar pengguna yang tidak menyadari fitur swipe tetap bisa menjelajah semua konten.

---

## 10. User Flow Utama

```
Pengunjung tiba di Start Screen
   → Melihat menu utama (About / Projects / Certificates / Contact)
   → Swipe atau klik menu/tombol D-Pad → langsung ke section terkait
   → Di section Projects/Certificates: swipe antar kartu, lihat indikator posisi
   → Tap kartu untuk detail (modal) bila perlu
   → Tertarik → swipe/klik ke section Contact (Email/GitHub/LinkedIn)
```

Target: pengunjung baru bisa menjelaskan "situs ini tentang siapa dan bagaimana cara menghubunginya" dalam <15 detik pertama.

---

## 11. Non-Functional Requirements

| Aspek | Requirement |
|---|---|
| Performa | Load awal <3 detik di koneksi standar; aset pixel-art dioptimasi (sprite sheet/SVG bila memungkinkan) |
| Responsif | Layout menyesuaikan baik di mobile, tablet, desktop |
| Aksesibilitas | Kontras WCAG AA, alt text pada gambar, opsi "Reduce Effects" untuk animasi |
| SEO | Meta title/description, struktur heading semantik meski tema visual playful |
| Kompatibilitas browser | Chrome, Firefox, Safari, Edge versi terbaru |

---

## 12. Konten & Copy Guidelines

- Nada bahasa: santai-playful tapi tetap profesional (hindari jargon game berlebihan yang bikin bingung, mis. jangan sampai orang tidak paham "Achievements" itu sertifikat).
- Semua CTA menggunakan kata kerja jelas: "Lihat Project", "Hubungi Saya", "Download Sertifikat".
- Hindari singkatan/istilah game niche yang tidak umum diketahui audiens non-gamer.

---

## 13. Metrik Keberhasilan

- Click-through rate ke Contact (email/LinkedIn/GitHub) ≥ target tertentu (mis. 10% pengunjung unik).
- Bounce rate rendah pada section utama (menandakan pengunjung menjelajah, bukan langsung keluar).
- Waktu rata-rata di halaman cukup untuk membaca minimal 1 project + about.
- Feedback kualitatif: pengunjung uji coba (user testing 3–5 orang) bisa menyebutkan dengan benar apa isi tiap section tanpa dibantu.

---

## 14. Rekomendasi Teknologi (Opsional)

- Frontend: HTML/CSS/JS statis atau React (jika ingin mudah dikembangkan).
- Carousel/swipe: gunakan library ringan seperti **Embla Carousel** atau **Swiper.js** (mendukung touch, keyboard, dan indikator pagination bawaan) agar tidak build gestur swipe dari nol.
- Styling: CSS custom dengan CSS variables untuk palet Game Boy Advance (indigo-lavender + aksen koral di atas); font pixel via Google Fonts (mis. "Press Start 2P", "VT323").
- Hosting: Vercel/Netlify/GitHub Pages (gratis & cepat untuk portofolio statis).
- Data project/sertifikat: JSON statis agar mudah diupdate tanpa backend.

---

## 15. Risiko & Mitigasi

| Risiko | Mitigasi |
|---|---|
| Tema retro membuat teks sulit dibaca | Pisahkan font dekoratif (judul) vs font body (readable) |
| Terlalu banyak animasi mengganggu | Batasi animasi, sediakan toggle reduce-motion |
| Navigasi tema game membingungkan pengguna non-gamer | Selalu sandingkan label konvensional |
| Info kontak "tersembunyi" di balik tema | Pastikan Contact section selalu mudah dijangkau (nav + footer) |

---

## 16. Roadmap Singkat

1. **Fase 1** — Wireframe & pemilihan palet warna/tema retro
2. **Fase 2** — Desain UI (Figma) untuk 4 section utama
3. **Fase 3** — Development frontend + integrasi data project/sertifikat
4. **Fase 4** — Testing keterbacaan & usability (user testing ringan)
5. **Fase 5** — Deploy & iterasi berdasarkan feedback

---

## 17. Keputusan atas Open Questions (v1.0 → Resolved)

| # | Pertanyaan | Keputusan | Detail lengkap |
|---|---|---|---|
| 1 | Jumlah project & sertifikat di versi awal? | **3 item** untuk masing-masing (Project & Certificate), dengan mekanisme **queue** di carousel bila jumlah bertambah di kemudian hari — tidak perlu redesign, cukup tambah data JSON. | Lihat Section 8.3 & 8.4 |
| 2 | Perlu dark/light mode? | **Ya, dibutuhkan.** Toggle Dark/Light Mode dengan 2 varian palet (arah kontras dibalik, tetap palet indigo-lavender Game Boy Advance + aksen koral). Default ikut `prefers-color-scheme`. | Lihat Section 6.1.1 |
| 3 | Arah swipe section vs kartu? | **Dikonfirmasi sesuai proposal**: swipe **vertikal** untuk antar-section utama, swipe **horizontal** untuk antar-kartu dalam section. Ditambahkan spesifikasi animasi transisi bervibe retro (flicker/scanline singkat utk section, snap-step + bounce utk kartu). | Lihat Section 6.2 & 6.2.1 |

Tidak ada open question tersisa dari v1.0. Jika ada pertanyaan baru yang muncul selama desain/development, catat di sini sebagai baris baru.
