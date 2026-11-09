const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("Memulai seeding database Manajemen Siswa & Kelas...");

  // 1. Bersihkan data lama
  await prisma.siswa.deleteMany();
  await prisma.kelas.deleteMany();

  // 2. Buat data Kelas
  const k1 = await prisma.kelas.create({ data: { nama_kelas: "XII RPL 1" } });
  const k2 = await prisma.kelas.create({ data: { nama_kelas: "XII RPL 2" } });
  const k3 = await prisma.kelas.create({ data: { nama_kelas: "XI TKJ 1" } });

  console.log("Kelas berhasil dibuat:", k1.nama_kelas, k2.nama_kelas, k3.nama_kelas);

  // 3. Buat data Siswa
  await prisma.siswa.createMany({
    data: [
      { nis: 1001, nama: "Ahmad Rizki", kelasId: k1.id },
      { nis: 1002, nama: "Budi Santoso", kelasId: k1.id },
      { nis: 1003, nama: "Citra Lestari", kelasId: k2.id },
      { nis: 1004, nama: "Dewi Anggraini", kelasId: k2.id },
      { nis: 1005, nama: "Eko Prasetyo", kelasId: k3.id },
    ],
  });

  console.log("Seeding selesai! 5 siswa dan 3 kelas berhasil ditambahkan.");
}

main()
  .catch((e) => {
    console.error("Error saat seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
