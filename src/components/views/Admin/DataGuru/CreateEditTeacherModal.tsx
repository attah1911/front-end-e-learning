import React, { useEffect } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input } from "@nextui-org/react";
import { Teacher, TeacherInput } from "../../../../types/TeacherTypes";

interface CreateEditTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TeacherInput) => void;
  initialData?: Teacher;
  mode: 'create' | 'edit';
  isSubmitting?: boolean;
}

const CreateEditTeacherModal: React.FC<CreateEditTeacherModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
  isSubmitting
}) => {
  const [formData, setFormData] = React.useState<TeacherInput>({
    fullName: '',
    email: '',
    nrk: '',
    noTelp: ''
  });

  useEffect(() => {
    if (initialData) {
      const { _id, ...rest } = initialData;
      setFormData(rest);
    } else {
      setFormData({
        fullName: '',
        email: '',
        nrk: '',
        noTelp: ''
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

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
              {mode === 'create' ? 'Tambah Guru Baru' : 'Edit Guru'}
            </ModalHeader>
            <ModalBody>
              <form id="teacherForm" onSubmit={handleSubmit} className="space-y-4">
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
                  label="NRK"
                  value={formData.nrk}
                  onValueChange={(value) => setFormData({ ...formData, nrk: value })}
                  required
                  variant="bordered"
                  placeholder="Masukkan NRK"
                />
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
              <Button color="primary" type="submit" form="teacherForm" isLoading={isSubmitting}>
                {mode === 'create' ? 'Tambah' : 'Simpan'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CreateEditTeacherModal;
