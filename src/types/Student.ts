export interface Student {
  _id?: string;
  fullName: string;
  email: string;
  nis: string;
  kelas: string;
  noTelp: string;
}

export const kelasList = [
  'VII-A', 'VII-B', 'VII-C',
  'VIII-A', 'VIII-B', 'VIII-C',
  'IX-A', 'IX-B', 'IX-C'
] as const;
