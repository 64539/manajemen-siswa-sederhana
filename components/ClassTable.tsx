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
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <GraduationCap className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Daftar Kelas</h3>
            <p className="text-xs text-slate-500">
              Total {classes.length} kelas terdaftar
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
            <tr>
              <th className="py-3 px-4 w-12 text-center">No</th>
              <th className="py-3 px-4">Nama Kelas</th>
              <th className="py-3 px-4 text-center">Jumlah Siswa</th>
              <th className="py-3 px-4 text-center w-20">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {classes.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-8 text-center text-xs text-slate-400">
                  Belum ada kelas yang didaftarkan. Gunakan form di atas untuk menambah kelas.
                </td>
              </tr>
            ) : (
              classes.map((c, idx) => (
                <tr key={c.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 text-center text-xs font-mono text-slate-400">
                    {idx + 1}
                  </td>
                  <td className="py-3 px-4 font-semibold text-slate-900">
                    {c.nama_kelas}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                      {c._count.siswa} siswa
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDelete(c.id, c.nama_kelas)}
                      disabled={isPending}
                      title="Hapus Kelas"
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
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
