"use client";

import { useActionState, useEffect, useRef } from "react";
import { addClass, FormState } from "@/actions";
import { PlusCircle, CheckCircle2, AlertCircle, GraduationCap } from "lucide-react";

const initialState: FormState = { success: false };

// ─── Shared input class builder ────────────────────────────────────────────
const inputCls = (hasError?: boolean) =>
  `w-full px-3.5 py-2.5 text-sm rounded-lg border ${
    hasError
      ? "border-red-400 bg-red-50 focus:ring-2 focus:ring-red-200 focus:border-red-400"
      : "border-slate-200 bg-white hover:border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
  } text-slate-900 placeholder:text-slate-400 focus:outline-none transition-all`;

export default function ClassForm() {
  const [state, formAction, isPending] = useActionState(addClass, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state.success]);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full">
      {/* ── Card header ── */}
      <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
          <GraduationCap className="w-4 h-4 text-blue-600" />
        </div>
        <div>
          <h2 className="text-sm font-bold text-slate-800 leading-tight">Tambah Kelas Baru</h2>
          <p className="text-[11px] text-slate-400 mt-0.5">Daftarkan nama kelas unik ke sistem</p>
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="px-6 py-5 flex-1 flex flex-col">
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
          <div>
            <label htmlFor="nama_kelas" className="block text-xs font-semibold text-slate-600 mb-1.5">
              Nama Kelas <span className="text-red-400">*</span>
            </label>
            <input
              id="nama_kelas"
              name="nama_kelas"
              type="text"
              required
              disabled={isPending}
              placeholder="Contoh: X RPL 1, XII TKJ 2"
              className={inputCls(!!state.errors?.nama_kelas)}
            />
            {state.errors?.nama_kelas && (
              <p className="mt-1.5 text-xs text-red-500 font-medium flex items-center gap-1">
                <AlertCircle className="w-3 h-3 shrink-0" />
                {state.errors.nama_kelas[0]}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            {isPending ? "Menyimpan..." : "Simpan Kelas"}
          </button>
        </form>
      </div>
    </div>
  );
}
