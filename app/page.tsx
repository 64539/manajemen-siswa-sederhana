import { prisma } from "@/lib/prisma";
import ClassForm from "@/components/ClassForm";
import StudentForm from "@/components/StudentForm";
import ClassTable from "@/components/ClassTable";
import StudentTable from "@/components/StudentTable";
import { School, GraduationCap, Users } from "lucide-react";

// Selalu fetch data terbaru saat request masuk (dynamic Server Component)
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [classes, students] = await Promise.all([
    prisma.kelas.findMany({
      orderBy: { nama_kelas: "asc" },
      include: {
        _count: {
          select: { siswa: true },
        },
      },
    }),
    prisma.siswa.findMany({
      orderBy: { nama: "asc" },
      include: {
        kelas: true,
      },
    }),
  ]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-2xs">
        <div className="w-full max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <School className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-slate-900 tracking-tight leading-tight">
                Panel Tata Usaha (TU)
              </h1>
              <p className="text-xs text-slate-500">
                Sistem Administrasi Pengelolaan Siswa & Kelas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
              Next.js 15 App Router
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
              Prisma + SQLite + Zod
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Metric Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Total Kelas
              </p>
              <p className="text-3xl font-bold text-slate-900 tracking-tight">
                {classes.length}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Kelas aktif terdaftar di database
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <GraduationCap className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                Total Siswa Terdaftar
              </p>
              <p className="text-3xl font-bold text-slate-900 tracking-tight">
                {students.length}
              </p>
              <p className="text-xs text-slate-400 mt-1">
                Siswa terhubung dengan kelas
              </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
              <Users className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Form Input Section (Two Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5">
            <ClassForm />
          </div>
          <div className="lg:col-span-7">
            <StudentForm classes={classes} />
          </div>
        </div>

        {/* Data Tables Section */}
        <div className="space-y-6">
          <div className="border-t border-slate-200 pt-6">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight mb-4">
              Data Master Sistem
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-5">
                <ClassTable classes={classes} />
              </div>
              <div className="lg:col-span-7">
                <StudentTable students={students} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 border-t border-slate-200 text-center text-xs text-slate-400">
        Dashboard Tata Usaha • Dibangun dengan Next.js 15, Tailwind CSS, Prisma, SQLite, dan Validasi Zod
      </footer>
    </div>
  );
}
