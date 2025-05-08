export interface MataPelajaran {
  _id?: string;
  judul: string;
  deskripsi: string;
  tingkatKelas: string;
  kategori: string;
  guru: string | TeacherData;
}

export interface TeacherData {
  _id: string;
  fullName: string;
  email?: string;
  nip?: string;
}

export const kategoriList = [
  'Matematika',
  'IPA',
  'IPS',
  'Bahasa Indonesia',
  'Bahasa Inggris',
  'Pendidikan Agama',
  'PPKN',
  'Seni Budaya',
  'Pendidikan Jasmani',
  'Prakarya'
] as const;

export interface TeacherOption {
  _id: string;
  fullName: string;
}
