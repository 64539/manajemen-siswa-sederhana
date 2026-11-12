"use client";

import { useTransition } from "react";
import { deleteClass } from "@/actions";
import { Trash2, GraduationCap } from "lucide-react";

interface ClassTableProps {
  classes: Array<{
    id: number;
    nama_kelas: string;
    _count: { siswa: number };
  }>;
}

export default function ClassTable({ classes }: ClassTableProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: number, nama: string) => {
    if (confirm(`Hapus kelas "${nama}"? Semua siswa di kelas ini juga akan terhapus.`)) {
      startTransition(async () => {
        await deleteClass(id);
      });
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* ── Table header ── */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
          <GraduationCap className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-slate-800 leading-tight">Daftar Kelas</h3>
          <p className="text-[11px] text-slate-400 mt-0.5">{classes.length} kelas terdaftar</p>
        </div>
      </div>

      {/* ── Table body ── */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50/80 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100">
              <th className="py-3 pl-6 pr-3 w-12 text-center">#</th>
              <th className="py-3 px-4 text-left">Nama Kelas</th>
              <th className="py-3 px-4 text-center whitespace-nowrap">Siswa</th>
              <th className="py-3 pl-3 pr-6 w-20 text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {classes.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-12 px-6 text-center text-sm text-slate-400">
                  Belum ada kelas. Gunakan form di atas untuk menambah kelas.
                </td>
              </tr>
            ) : (
              classes.map((c, idx) => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 pl-6 pr-3 text-xs text-slate-400 font-mono text-center">
                    {idx + 1}
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-slate-800 text-left">
                    {c.nama_kelas}
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                      {c._count.siswa} siswa
                    </span>
                  </td>
                  <td className="py-3.5 pl-3 pr-6 text-center">
                    <button
                      onClick={() => handleDelete(c.id, c.nama_kelas)}
                      disabled={isPending}
                      title="Hapus Kelas"
                      aria-label={`Hapus kelas ${c.nama_kelas}`}
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
