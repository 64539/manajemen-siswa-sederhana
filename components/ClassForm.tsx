"use client";

import { useActionState, useEffect, useRef } from "react";
import { addClass, FormState } from "@/actions";
import { PlusCircle, CheckCircle2, AlertCircle } from "lucide-react";

const initialState: FormState = {
  success: false,
};

export default function ClassForm() {
  const [state, formAction, isPending] = useActionState(addClass, initialState);
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
          Tambah Kelas Baru
        </h2>
        <p className="text-xs text-slate-500">
          Masukkan nama kelas unik untuk didaftarkan ke sistem
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
        <div>
          <label
            htmlFor="nama_kelas"
            className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5"
          >
            Nama Kelas *
          </label>
          <input
            id="nama_kelas"
            name="nama_kelas"
            type="text"
            required
            placeholder="Contoh: X RPL 1, XII TKJ 2"
            className={`w-full px-3.5 py-2 text-sm rounded-lg border ${
              state.errors?.nama_kelas
                ? "border-red-500 focus:ring-1 focus:ring-red-500 focus:border-red-500"
                : "border-slate-200 focus:ring-1 focus:ring-blue-600 focus:border-blue-600"
            } text-slate-900 placeholder:text-slate-400 focus:outline-none transition-colors`}
          />
          {state.errors?.nama_kelas && (
            <p className="text-red-500 text-xs mt-1.5 font-medium">
              {state.errors.nama_kelas[0]}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs px-4 py-2.5 rounded-lg transition-colors shadow-xs disabled:opacity-50 cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>{isPending ? "Menyimpan Kelas..." : "Simpan Kelas"}</span>
        </button>
      </form>
    </div>
  );
}
