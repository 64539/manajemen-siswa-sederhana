"use client";

import { useActionState, useEffect, useRef } from "react";
import { addStudent, FormState } from "@/actions";
import { UserPlus, CheckCircle2, AlertCircle } from "lucide-react";

interface StudentFormProps {
  classes: Array<{ id: number; nama_kelas: string }>;
}

const initialState: FormState = {
  success: false,
};

export default function StudentForm({ classes }: StudentFormProps) {
  const [state, formAction, isPending] = useActionState(addStudent, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
      <div className="mb-4">
        <h2 className="text-base font-bold text-slate-900 tracking-tight">
          Tambah Siswa Baru
        </h2>
        <p className="text-xs text-slate-500">
          Daftarkan siswa dengan NIS angka dan asosiasikan ke kelas
        </p>
      </div>

      {state.success && state.message && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      {!state.success && state.message && !state.errors && (
        <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-lg text-xs font-medium flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
          <span>{state.message}</span>
        </div>
      )}

      <form ref={formRef} action={formAction} className="space-y-4" noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Input NIS */}
          <div>
            <label
              htmlFor="nis"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5"
            >
              NIS (Nomor Induk Siswa) *
            </label>
            <input
              id="nis"
              name="nis"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={15}
              required
              placeholder="Contoh: 20240101"
              className={`w-full px-3.5 py-2 text-sm rounded-lg border ${
                state.errors?.nis
                  ? "border-red-500 focus:ring-1 focus:ring-red-500 focus:border-red-500"
                  : "border-slate-200 focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
              } text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors`}
            />
            {state.errors?.nis && (
              <p className="text-red-500 text-xs mt-1.5 font-medium">
                {state.errors.nis[0]}
              </p>
            )}
          </div>

          {/* Select Kelas */}
          <div>
            <label
              htmlFor="kelasId"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5"
            >
              Pilih Kelas *
            </label>
            <select
              id="kelasId"
              name="kelasId"
              required
              defaultValue=""
              className={`w-full px-3.5 py-2 text-sm rounded-lg border ${
                state.errors?.kelasId
                  ? "border-red-500 focus:ring-1 focus:ring-red-500 focus:border-red-500"
                  : "border-slate-200 focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
              } bg-white text-slate-900 focus:outline-none transition-colors`}
            >
              <option value="" disabled>
                -- Pilih Kelas Terdaftar --
              </option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nama_kelas}
                </option>
              ))}
            </select>
            {state.errors?.kelasId && (
              <p className="text-red-500 text-xs mt-1.5 font-medium">
                {state.errors.kelasId[0]}
              </p>
            )}
          </div>
        </div>

        {/* Input Nama */}
        <div>
          <label
            htmlFor="nama"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5"
          >
            Nama Lengkap Siswa *
          </label>
          <input
            id="nama"
            name="nama"
            type="text"
            required
            maxLength={100}
            placeholder="Contoh: Ahmad Rizky Pratama"
            className={`w-full px-3.5 py-2 text-sm rounded-lg border ${
              state.errors?.nama
                ? "border-red-500 focus:ring-1 focus:ring-red-500 focus:border-red-500"
                : "border-slate-200 focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
            } text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors`}
          />
          {state.errors?.nama && (
            <p className="text-red-500 text-xs mt-1.5 font-medium">
              {state.errors.nama[0]}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending || classes.length === 0}
          className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-4 py-2.5 rounded-lg transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
        >
          <UserPlus className="w-4 h-4" />
          <span>{isPending ? "Menyimpan Siswa..." : "Simpan Siswa"}</span>
        </button>

        {classes.length === 0 && (
          <p className="text-center text-xs text-amber-600 bg-amber-50 py-2 px-3 rounded-lg border border-amber-200">
            Peringatan: Buat minimal satu kelas terlebih dahulu di form samping sebelum mendaftarkan siswa.
          </p>
        )}
      </form>
    </div>
  );
}
