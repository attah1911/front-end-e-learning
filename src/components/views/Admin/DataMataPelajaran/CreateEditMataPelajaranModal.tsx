import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { getTeachers } from "../../../../services/admin.service";
import { MataPelajaran, TeacherData } from "../../../../types/MataPelajaran";
import { Selection } from "@nextui-org/react";

interface CreateEditMataPelajaranModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MataPelajaran) => void;
  initialData?: MataPelajaran;
  mode: 'create' | 'edit';
}

const TINGKAT_KELAS = {
  KELAS_7: { value: "KELAS_7", label: "Kelas 7" },
  KELAS_8: { value: "KELAS_8", label: "Kelas 8" },
  KELAS_9: { value: "KELAS_9", label: "Kelas 9" },
} as const;

const KATEGORI = {
  MATEMATIKA: { value: "Matematika", label: "Matematika" },
  IPA: { value: "IPA", label: "IPA" },
  IPS: { value: "IPS", label: "IPS" },
  BAHASA_INDONESIA: { value: "Bahasa Indonesia", label: "Bahasa Indonesia" },
  BAHASA_INGGRIS: { value: "Bahasa Inggris", label: "Bahasa Inggris" },
  PENDIDIKAN_AGAMA: { value: "Pendidikan Agama", label: "Pendidikan Agama" },
  PPKN: { value: "PPKN", label: "PPKN" },
  SENI_BUDAYA: { value: "Seni Budaya", label: "Seni Budaya" },
  PENDIDIKAN_JASMANI: { value: "Pendidikan Jasmani", label: "Pendidikan Jasmani" },
  PRAKARYA: { value: "Prakarya", label: "Prakarya" },
} as const;

const CreateEditMataPelajaranModal: React.FC<CreateEditMataPelajaranModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode
}) => {
  const [formData, setFormData] = React.useState<MataPelajaran>({
    judul: '',
    deskripsi: '',
    tingkatKelas: '',
    kategori: '',
    guru: ''
  });

  const [teachers, setTeachers] = useState<TeacherData[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const response = await getTeachers({ limit: 100 });
      setTeachers(response.data);
    } catch (error) {
      console.error('Error fetching teachers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        guru: typeof initialData.guru === 'object' ? initialData.guru._id : initialData.guru
      });
    } else {
      setFormData({
        judul: '',
        deskripsi: '',
        tingkatKelas: '',
        kategori: '',
        guru: ''
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleSelectionChange = (keys: Selection, field: keyof MataPelajaran) => {
    const value = Array.from(keys)[0]?.toString() || '';
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      backdrop="blur"
      placement="center"
      size="2xl"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {mode === 'create' ? 'Tambah Mata Pelajaran Baru' : 'Edit Mata Pelajaran'}
        </ModalHeader>
        <ModalBody>
          <form id="mataPelajaranForm" onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Judul"
              value={formData.judul}
              onChange={(e) => setFormData({ ...formData, judul: e.target.value })}
              required
              variant="bordered"
              placeholder="Masukkan judul mata pelajaran"
            />
            <Textarea
              label="Deskripsi"
              value={formData.deskripsi}
              onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
              required
              variant="bordered"
              placeholder="Masukkan deskripsi"
            />
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="Tingkat Kelas"
                selectedKeys={formData.tingkatKelas ? [formData.tingkatKelas] : []}
                onSelectionChange={(keys) => handleSelectionChange(keys, 'tingkatKelas')}
                variant="bordered"
                required
              >
                {Object.values(TINGKAT_KELAS).map((tingkat) => (
                  <SelectItem key={tingkat.value} value={tingkat.value}>
                    {tingkat.label}
                  </SelectItem>
                ))}
              </Select>
              <Select
                label="Kategori"
                selectedKeys={formData.kategori ? [formData.kategori] : []}
                onSelectionChange={(keys) => handleSelectionChange(keys, 'kategori')}
                variant="bordered"
                required
              >
                {Object.values(KATEGORI).map((kategori) => (
                  <SelectItem key={kategori.value} value={kategori.value}>
                    {kategori.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
            <Select
              label="Guru"
              selectedKeys={formData.guru ? [formData.guru.toString()] : []}
              onSelectionChange={(keys) => handleSelectionChange(keys, 'guru')}
              variant="bordered"
              isLoading={loading}
              required
            >
              {teachers.map((teacher) => (
                <SelectItem key={teacher._id} value={teacher._id}>
                  {teacher.fullName}
                </SelectItem>
              ))}
            </Select>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Batal
          </Button>
          <Button color="primary" type="submit" form="mataPelajaranForm">
            {mode === 'create' ? 'Tambah' : 'Simpan'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateEditMataPelajaranModal;
