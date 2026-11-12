"use client";

import { useActionState, useEffect, useRef } from "react";
import { addStudent, FormState } from "@/actions";
import { UserPlus, CheckCircle2, AlertCircle, Users } from "lucide-react";

interface StudentFormProps {
  classes: Array<{ id: number; nama_kelas: string }>;
}

const initialState: FormState = { success: false };

// ─── Shared input class builder ────────────────────────────────────────────
const inputCls = (hasError?: boolean) =>
  `w-full px-3.5 py-2.5 text-sm rounded-lg border ${
    hasError
      ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-400"
      : "border-slate-200 bg-white hover:border-slate-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
  } text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all`;

export default function StudentForm({ classes }: StudentFormProps) {
  const [state, formAction, isPending] = useActionState(addStudent, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state.success]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
      {/* ── Card header ── */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-100 flex items-center justify-center shrink-0">
          <Users className="w-4 h-4 text-indigo-600" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-800 leading-tight">Tambah Siswa Baru</h2>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Daftarkan siswa dengan NIS angka dan asosiasikan ke kelas
          </p>
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="px-6 py-5 flex-1 flex flex-col">
        {/* No class warning */}
        {classes.length === 0 && (
          <div className="mb-4 flex items-center gap-2 px-3.5 py-2.5 bg-amber-50 border border-amber-200 rounded-lg text-xs font-medium text-amber-700">
            <AlertCircle className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Belum ada kelas tersedia. Tambahkan kelas terlebih dahulu.</span>
          </div>
        )}

        {/* Alerts */}
        {state.success && state.message && (
          <div className="mb-4 flex items-center gap-2 px-3.5 py-2.5 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-medium text-emerald-700">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>{state.message}</span>
          </div>
        )}
        {!state.success && state.message && !state.errors && (
          <div className="mb-4 flex items-center gap-2 px-3.5 py-2.5 bg-red-50 border border-red-200 rounded-lg text-xs font-medium text-red-700">
            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            <span>{state.message}</span>
          </div>
        )}

        {/* Form */}
        <form ref={formRef} action={formAction} className="flex-1 flex flex-col justify-between gap-5" noValidate>
          <div className="space-y-4">
            {/* Row 1: NIS + Pilih Kelas sejajar & total lebar sama dengan Nama Lengkap di bawah */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* NIS */}
              <div>
                <label htmlFor="nis" className="block text-xs font-semibold text-slate-600 mb-1.5">
                  NIS <span className="text-red-400">*</span>
                </label>
                <input
                  id="nis"
                  type="number"
                  name="nis"
                  required
                  placeholder="Contoh: 20240101"
                  className={inputCls(!!state.errors?.nis)}
                  disabled={isPending}
                />
                {state.errors?.nis && (
                  <p className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {state.errors.nis[0]}
                  </p>
                )}
              </div>

              {/* Kelas */}
              <div>
                <label htmlFor="kelasId" className="block text-xs font-semibold text-slate-600 mb-1.5">
                  Kelas <span className="text-red-400">*</span>
                </label>
                <select
                  id="kelasId"
                  name="kelasId"
                  required
                  defaultValue=""
                  className={inputCls(!!state.errors?.kelasId)}
                  disabled={isPending || classes.length === 0}
                >
                  <option value="" disabled>
                    -- Pilih Kelas --
                  </option>
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nama_kelas}
                    </option>
                  ))}
                </select>
                {state.errors?.kelasId && (
                  <p className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1">
                    <AlertCircle className="w-3 h-3 shrink-0" />
                    {state.errors.kelasId[0]}
                  </p>
                )}
              </div>
            </div>

            {/* Row 2: Nama Lengkap – full width sejajar dengan Row 1 */}
            <div>
              <label htmlFor="nama" className="block text-xs font-semibold text-slate-600 mb-1.5">
                Nama Lengkap <span className="text-red-400">*</span>
              </label>
              <input
                id="nama"
                type="text"
                name="nama"
                required
                placeholder="Contoh: Ahmad Rizky Pratama"
                className={inputCls(!!state.errors?.nama)}
                disabled={isPending}
              />
              {state.errors?.nama && (
                <p className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  {state.errors.nama[0]}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending || classes.length === 0}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            {isPending ? "Menyimpan..." : "Simpan Siswa"}
          </button>
        </form>
      </div>
    </div>
  );
}
