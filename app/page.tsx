import { prisma } from "@/lib/prisma";
import ClassForm from "@/components/ClassForm";
import StudentForm from "@/components/StudentForm";
import ClassTable from "@/components/ClassTable";
import StudentTable from "@/components/StudentTable";
import { School, GraduationCap, Users, PenLine, TableProperties } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [classes, students] = await Promise.all([
    prisma.kelas.findMany({
      orderBy: { nama_kelas: "asc" },
      include: { _count: { select: { siswa: true } } },
    }),
    prisma.siswa.findMany({
      orderBy: { nama: "asc" },
      include: { kelas: true },
    }),
  ]);

  return (
    <div className="min-h-screen bg-[#f1f5f9]">
      {/* ═══════════════════════════════════════
          NAVBAR
      ═══════════════════════════════════════ */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
              <School className="w-4 h-4 text-white" />
            </div>
            <div className="truncate">
              <span className="text-sm font-bold text-slate-900 tracking-tight">Panel Tata Usaha</span>
              <span className="hidden sm:inline text-slate-300 mx-2">·</span>
              <span className="hidden sm:inline text-xs text-slate-400">Sistem Administrasi Siswa &amp; Kelas</span>
            </div>
          </div>
          <span className="hidden md:inline-block text-[11px] text-slate-400 font-medium shrink-0">
            Next.js 15 · Prisma · SQLite
          </span>
        </div>
      </header>

      {/* ═══════════════════════════════════════
          MAIN
      ═══════════════════════════════════════ */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-12">
        {/* ─── STAT CARDS ─── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Kelas */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 px-6 py-5">
            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
              <GraduationCap className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Total Kelas</p>
              <p className="text-3xl font-black text-slate-900 leading-none mt-1">{classes.length}</p>
              <p className="text-xs text-slate-400 mt-1">kelas aktif terdaftar</p>
            </div>
          </div>

          {/* Siswa */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex items-center gap-4 px-6 py-5">
            <div className="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center shrink-0 border border-indigo-100">
              <Users className="w-5 h-5 text-indigo-600" />
            </div>
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400">Total Siswa</p>
              <p className="text-3xl font-black text-slate-900 leading-none mt-1">{students.length}</p>
              <p className="text-xs text-slate-400 mt-1">siswa terhubung dengan kelas</p>
            </div>
          </div>
        </div>

        {/* ─── SECTION: INPUT DATA ─── */}
        <section className="space-y-5">
          {/* Section label */}
          <div className="flex items-center gap-2">
            <PenLine className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Input Data</span>
            <div className="flex-1 h-px bg-slate-200 ml-1" />
          </div>

          {/* Grid 2 kolom setara — kelas kiri, siswa kanan */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            <ClassForm />
            <StudentForm classes={classes} />
          </div>
        </section>

        {/* ─── SECTION: DATA MASTER ─── */}
        <section className="space-y-5">
          {/* Section label */}
          <div className="flex items-center gap-2">
            <TableProperties className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-slate-400">Data Master Sistem</span>
            <div className="flex-1 h-px bg-slate-200 ml-1" />
          </div>

          {/* Grid 2 kolom setara */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
            <ClassTable classes={classes} />
            <StudentTable students={students} />
          </div>
        </section>
      </main>

      {/* ═══════════════════════════════════════
          FOOTER
      ═══════════════════════════════════════ */}
      <footer className="max-w-6xl mx-auto px-4 sm:px-6 py-6 border-t border-slate-200 mt-6">
        <p className="text-center text-[11px] text-slate-400">
          Panel Tata Usaha &bull; Dibangun dengan Next.js 15, Tailwind CSS, Prisma ORM, SQLite &amp; Zod
        </p>
      </footer>
    </div>
  );
}
