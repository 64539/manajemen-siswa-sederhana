"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { classSchema, studentSchema, FormState } from "@/lib/schemas";

export type { FormState };

/**
 * Server Action: Tambah Kelas Baru
 */
export async function addClass(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawInput = {
    nama_kelas: formData.get("nama_kelas"),
  };

  const validated = classSchema.safeParse(rawInput);
  if (!validated.success) {
    const errors: Record<string, string[]> = {};
    for (const issue of validated.error.issues) {
      const field = issue.path[0]?.toString() || "form";
      if (!errors[field]) errors[field] = [];
      errors[field].push(issue.message);
    }
    return {
      success: false,
      message: validated.error.issues[0]?.message || "Validasi gagal",
      errors,
    };
  }

  try {
    const existing = await prisma.kelas.findUnique({
      where: { nama_kelas: validated.data.nama_kelas },
    });

    if (existing) {
      return {
        success: false,
        message: "Nama kelas sudah terdaftar",
        errors: {
          nama_kelas: ["Nama kelas ini sudah digunakan"],
        },
      };
    }

    await prisma.kelas.create({
      data: {
        nama_kelas: validated.data.nama_kelas,
      },
    });

    revalidatePath("/");
    return {
      success: true,
      message: `Kelas "${validated.data.nama_kelas}" berhasil ditambahkan!`,
    };
  } catch (err) {
    console.error("addClass error:", err);
    return {
      success: false,
      message: "Terjadi kesalahan server saat menyimpan data kelas.",
    };
  }
}

/**
 * Server Action: Tambah Siswa Baru
 */
export async function addStudent(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const rawInput = {
    nis: formData.get("nis"),
    nama: formData.get("nama"),
    kelasId: formData.get("kelasId"),
  };

  const validated = studentSchema.safeParse(rawInput);
  if (!validated.success) {
    const errors: Record<string, string[]> = {};
    for (const issue of validated.error.issues) {
      const field = issue.path[0]?.toString() || "form";
      if (!errors[field]) errors[field] = [];
      errors[field].push(issue.message);
    }
    return {
      success: false,
      message: validated.error.issues[0]?.message || "Validasi gagal",
      errors,
    };
  }

  try {
    // 1. Cek keunikan NIS
    const existingNis = await prisma.siswa.findUnique({
      where: { nis: validated.data.nis },
    });

    if (existingNis) {
      return {
        success: false,
        message: "NIS sudah terdaftar",
        errors: {
          nis: ["NIS ini sudah terdaftar pada siswa lain"],
        },
      };
    }

    // 2. Cek apakah Kelas benar-benar ada
    const existingKelas = await prisma.kelas.findUnique({
      where: { id: validated.data.kelasId },
    });

    if (!existingKelas) {
      return {
        success: false,
        message: "Kelas yang dipilih tidak ditemukan",
        errors: {
          kelasId: ["Kelas yang dipilih tidak valid atau sudah dihapus"],
        },
      };
    }

    // 3. Simpan data siswa dengan tipe data terjamin (Integer nis, Integer kelasId)
    await prisma.siswa.create({
      data: {
        nis: validated.data.nis,
        nama: validated.data.nama,
        kelasId: validated.data.kelasId,
      },
    });

    revalidatePath("/");
    return {
      success: true,
      message: `Siswa "${validated.data.nama}" (NIS: ${validated.data.nis}) berhasil ditambahkan!`,
    };
  } catch (err) {
    console.error("addStudent error:", err);
    return {
      success: false,
      message: "Terjadi kesalahan server saat menyimpan data siswa.",
    };
  }
}

/**
 * Server Action: Hapus Kelas
 */
export async function deleteClass(id: number) {
  try {
    await prisma.kelas.delete({
      where: { id },
    });
    revalidatePath("/");
    return { success: true, message: "Kelas berhasil dihapus" };
  } catch (err) {
    console.error("deleteClass error:", err);
    return { success: false, message: "Gagal menghapus kelas" };
  }
}

/**
 * Server Action: Hapus Siswa
 */
export async function deleteStudent(id: number) {
  try {
    await prisma.siswa.delete({
      where: { id },
    });
    revalidatePath("/");
    return { success: true, message: "Siswa berhasil dihapus" };
  } catch (err) {
    console.error("deleteStudent error:", err);
    return { success: false, message: "Gagal menghapus siswa" };
  }
}
