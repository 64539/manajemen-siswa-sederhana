"use client";

import { useTransition } from "react";
import { deleteStudent } from "@/actions";
import { Trash2, Users } from "lucide-react";

interface StudentTableProps {
  students: Array<{
    id: number;
    nis: number;
    nama: string;
    kelasId: number;
    kelas: { nama_kelas: string };
  }>;
}

export default function StudentTable({ students }: StudentTableProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: number, nama: string, nis: number) => {
    if (confirm(`Hapus data siswa "${nama}" (NIS: ${nis})?`)) {
      startTransition(async () => {
        await deleteStudent(id);
      });
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* ── Table header ── */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
          <Users className="w-4 h-4 text-indigo-600" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-800 leading-tight">Daftar Siswa</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">{students.length} siswa terdaftar</p>
        </div>
      </div>

      {/* ── Table body ── */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100">
              <th className="py-3 pl-6 pr-3 w-12 text-center">#</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">NIS</th>
              <th className="py-3 px-4 text-left">Nama Siswa</th>
              <th className="py-3 px-4 text-left whitespace-nowrap">Kelas</th>
              <th className="py-3 pl-3 pr-6 w-20 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 px-6 text-center text-sm text-slate-400">
                  Belum ada siswa. Isi form di atas untuk mendaftarkan siswa baru.
                </td>
              </tr>
            ) : (
              students.map((s, idx) => (
                <tr key={s.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 pl-6 pr-3 text-xs text-slate-400 font-mono text-center">
                    {idx + 1}
                  </td>
                  <td className="py-3.5 px-4 text-left whitespace-nowrap">
                    <span className="inline-block font-mono text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {s.nis}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-medium text-slate-800 text-left">
                    {s.nama}
                  </td>
                  <td className="py-3.5 px-4 text-left whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                      {s.kelas.nama_kelas}
                    </span>
                  </td>
                  <td className="py-3.5 pl-3 pr-6 text-center">
                    <button
                      onClick={() => handleDelete(s.id, s.nama, s.nis)}
                      disabled={isPending}
                      title="Hapus Siswa"
                      aria-label={`Hapus siswa ${s.nama}`}
                      className="inline-flex items-center justify-center p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
