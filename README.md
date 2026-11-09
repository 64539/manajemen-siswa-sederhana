# 🏫 Aplikasi Manajemen Siswa & Kelas (Tugas Bu Melly)

Aplikasi web modern **Dashboard Tata Usaha (TU)** untuk manajemen data siswa dan kelas berbasis Next.js App Router, Tailwind CSS, Prisma ORM (SQLite), dan validasi schema Zod.

---

## ✨ Fitur Utama

1. **Manajemen Data Kelas (CRUD)**
   - Form input tambah kelas baru dengan validasi nama unik.
   - Tabel daftar kelas beserta penghitungan jumlah siswa per kelas.
   - Fitur hapus kelas (dengan cascade deletion siswa terkait).

2. **Manajemen Data Siswa (CRUD)**
   - Form input siswa baru (NIS integer, Nama Lengkap, dan Relasi ke Kelas).
   - Validasi ketat sisi server menggunakan **Zod Schema** & pencegahan NIS duplikat.
   - Tabel daftar siswa terelasi lengkap dengan badge kelas dan tombol aksi hapus siswa.

3. **Statistik Cepat (Metric Cards)**
   - Ringkasan total siswa aktif dan total kelas terdaftar secara real-time.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/) & React 19
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Database & ORM:** SQLite (`prisma/dev.db`) dengan [Prisma ORM](https://www.prisma.io/)
- **Validasi Data:** [Zod](https://zod.dev/) & Server Actions
- **Ikon:** [Lucide React](https://lucide.dev/)

---

## 🚀 Panduan Menjalankan Aplikasi

### 1. Jalankan Migrasi & Seeding Data Awal (Opsional)
Database SQLite `prisma/dev.db` sudah otomatis ter-generate dan terisi sample data:
```bash
npx prisma db push
npm run seed
```

### 2. Jalankan Server Development
```bash
npm run dev
```
Buka browser di [http://localhost:3000](http://localhost:3000).

### 3. Build untuk Produksi
```bash
npm run build
npm run start
```
