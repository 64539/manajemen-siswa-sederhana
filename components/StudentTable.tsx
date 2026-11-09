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
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Daftar Siswa</h3>
            <p className="text-xs text-slate-500">
              Total {students.length} siswa terdaftar
            </p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50 text-[11px] font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-100">
            <tr>
              <th className="py-3 px-4 w-12 text-center">No</th>
              <th className="py-3 px-4">NIS</th>
              <th className="py-3 px-4">Nama Lengkap Siswa</th>
              <th className="py-3 px-4">Kelas</th>
              <th className="py-3 px-4 text-center w-20">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-8 text-center text-xs text-slate-400">
                  Belum ada siswa yang didaftarkan. Isi form di atas untuk mendaftarkan siswa baru.
                </td>
              </tr>
            ) : (
              students.map((s, idx) => (
                <tr key={s.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 text-center text-xs font-mono text-slate-400">
                    {idx + 1}
                  </td>
                  <td className="py-3 px-4 font-mono text-xs font-semibold text-blue-700">
                    {s.nis}
                  </td>
                  <td className="py-3 px-4 font-medium text-slate-900">
                    {s.nama}
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/60">
                      {s.kelas.nama_kelas}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDelete(s.id, s.nama, s.nis)}
                      disabled={isPending}
                      title="Hapus Siswa"
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
