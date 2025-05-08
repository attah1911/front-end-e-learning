import React, { useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from "@nextui-org/react";

interface Student {
  _id?: string;
  fullName: string;
  email: string;
  nis: string;
  kelas: string;
  noTelp: string;
}

interface CreateEditStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Student) => void;
  initialData?: Student;
  mode: 'create' | 'edit';
}

const CreateEditStudentModal: React.FC<CreateEditStudentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode
}) => {
  const [formData, setFormData] = React.useState<Student>({
    fullName: '',
    email: '',
    nis: '',
    kelas: '',
    noTelp: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        fullName: '',
        email: '',
        nis: '',
        kelas: '',
        noTelp: ''
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const kelasList = [
    'VII-A', 'VII-B', 'VII-C',
    'VIII-A', 'VIII-B', 'VIII-C',
    'IX-A', 'IX-B', 'IX-C'
  ];

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      backdrop="blur"
      placement="center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {mode === 'create' ? 'Tambah Murid Baru' : 'Edit Murid'}
            </ModalHeader>
            <ModalBody>
              <form id="studentForm" onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Nama Lengkap"
                  value={formData.fullName}
                  onValueChange={(value) => setFormData({ ...formData, fullName: value })}
                  required
                  variant="bordered"
                  placeholder="Masukkan nama lengkap"
                />
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onValueChange={(value) => setFormData({ ...formData, email: value })}
                  required
                  variant="bordered"
                  placeholder="Masukkan email"
                />
                <Input
                  label="NIS"
                  value={formData.nis}
                  onValueChange={(value) => setFormData({ ...formData, nis: value })}
                  required
                  variant="bordered"
                  placeholder="Masukkan NIS"
                />
                <Select
                  label="Kelas"
                  selectedKeys={[formData.kelas]}
                  onChange={(e) => setFormData({ ...formData, kelas: e.target.value })}
                  variant="bordered"
                >
                  {kelasList.map((kelas) => (
                    <SelectItem key={kelas} value={kelas}>
                      {kelas}
                    </SelectItem>
                  ))}
                </Select>
                <Input
                  label="No. Telepon"
                  value={formData.noTelp}
                  onValueChange={(value) => setFormData({ ...formData, noTelp: value })}
                  required
                  variant="bordered"
                  placeholder="Masukkan nomor telepon"
                />
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Batal
              </Button>
              <Button color="primary" type="submit" form="studentForm">
                {mode === 'create' ? 'Tambah' : 'Simpan'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CreateEditStudentModal;
