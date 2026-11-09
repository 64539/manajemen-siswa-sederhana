import { z } from "zod";

// Zod Schema untuk Kelas
export const classSchema = z.object({
  nama_kelas: z
    .string({ message: "Nama kelas wajib diisi" })
    .trim()
    .min(1, { message: "Nama kelas tidak boleh kosong" })
    .max(50, { message: "Nama kelas maksimal 50 karakter" })
    .refine((val) => !/[<>]/.test(val), {
      message: "Nama kelas tidak boleh mengandung karakter < atau >",
    }),
});

// Zod Schema untuk Siswa dengan strict type coercion untuk integer columns
export const studentSchema = z.object({
  nis: z.coerce
    .number({
      message: "NIS wajib diisi dan harus berupa angka",
    })
    .int({ message: "NIS harus berupa bilangan bulat" })
    .positive({ message: "NIS harus berupa angka positif" }),
  nama: z
    .string({ message: "Nama siswa wajib diisi" })
    .trim()
    .min(1, { message: "Nama siswa tidak boleh kosong" })
    .max(100, { message: "Nama siswa maksimal 100 karakter" })
    .refine((val) => !/[<>]/.test(val), {
      message: "Nama siswa tidak boleh mengandung karakter < atau >",
    }),
  kelasId: z.coerce
    .number({
      message: "Kelas wajib dipilih",
    })
    .int({ message: "ID Kelas harus bilangan bulat" })
    .positive({ message: "Pilih kelas yang valid" }),
});

export type FormState = {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};
