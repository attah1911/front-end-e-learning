import React, { useEffect, useState } from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from "@nextui-org/react";

interface User {
  _id?: string;
  fullName: string;
  username: string;
  email: string;
  password?: string;
  role: string;
  profilePicture?: string;
}

// Separate interface for create/update operations
export interface UserSubmitData {
  fullName: string;
  username: string;
  email: string;
  role: string;
  password?: string;
}

interface CreateEditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserSubmitData) => void;
  initialData?: User;
  mode: 'create' | 'edit';
  isSubmitting?: boolean;
}

interface ValidationErrors {
  [key: string]: string;
}

const CreateEditUserModal: React.FC<CreateEditUserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
  isSubmitting = false
}) => {
  const [formData, setFormData] = useState<User>({
    fullName: '',
    username: '',
    email: '',
    password: '',
    role: 'murid',
    profilePicture: 'user.jpg'
  });

  const [errors, setErrors] = useState<ValidationErrors>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        fullName: '',
        username: '',
        email: '',
        password: '',
        role: 'murid',
        profilePicture: 'user.jpg'
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Nama lengkap harus diisi';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username harus diisi';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email harus diisi';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      newErrors.email = 'Format email tidak valid';
    }

    // Password validation for create mode or if password is provided in edit mode
    if (mode === 'create' || formData.password) {
      if (mode === 'create' && !formData.password) {
        newErrors.password = 'Password harus diisi';
      } else if (formData.password) {
        if (formData.password.length < 6) {
          newErrors.password = 'Password setidaknya harus 6 karakter';
        }
        if (!/[A-Z]/.test(formData.password)) {
          newErrors.password = 'Password harus memiliki setidaknya satu huruf kapital';
        }
        if (!/\d/.test(formData.password)) {
          newErrors.password = 'Password harus memiliki setidaknya satu angka';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const submitData: UserSubmitData = {
        fullName: formData.fullName,
        username: formData.username,
        email: formData.email,
        role: formData.role,
        ...(formData.password && { password: formData.password })
      };
      onSubmit(submitData);
    }
  };

  const roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'guru', label: 'Guru' },
    { value: 'murid', label: 'Murid' }
  ];

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose}
      backdrop="opaque"
      placement="center"
      scrollBehavior="inside"
      classNames={{
        backdrop: "bg-black/50"
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {mode === 'create' ? 'Tambah User Baru' : 'Edit User'}
            </ModalHeader>
            <ModalBody>
              <form id="userForm" onSubmit={handleSubmit} className="space-y-4">
                <Input
                  label="Nama Lengkap"
                  value={formData.fullName}
                  onValueChange={(value) => setFormData({ ...formData, fullName: value })}
                  required
                  variant="bordered"
                  placeholder="Masukkan nama lengkap"
                  errorMessage={errors.fullName}
                  isInvalid={!!errors.fullName}
                />
                <Input
                  label="Username"
                  value={formData.username}
                  onValueChange={(value) => setFormData({ ...formData, username: value })}
                  required
                  variant="bordered"
                  placeholder="Masukkan username"
                  errorMessage={errors.username}
                  isInvalid={!!errors.username}
                />
                <Input
                  label="Email"
                  type="email"
                  value={formData.email}
                  onValueChange={(value) => setFormData({ ...formData, email: value })}
                  required
                  variant="bordered"
                  placeholder="Masukkan email"
                  errorMessage={errors.email}
                  isInvalid={!!errors.email}
                />
                <Input
                  label="Password"
                  type="password"
                  value={formData.password || ''}
                  onValueChange={(value) => setFormData({ ...formData, password: value })}
                  required={mode === 'create'}
                  variant="bordered"
                  placeholder={mode === 'create' ? "Masukkan password" : "Kosongkan jika tidak ingin mengubah password"}
                  errorMessage={errors.password}
                  isInvalid={!!errors.password}
                  description="Password harus memiliki minimal 6 karakter, 1 huruf kapital, dan 1 angka"
                />
                <Select
                  label="Role"
                  selectedKeys={[formData.role]}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  variant="bordered"
                >
                  {roles.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      {role.label}
                    </SelectItem>
                  ))}
                </Select>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Batal
              </Button>
              <Button 
                color="primary" 
                type="submit" 
                form="userForm"
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
              >
                {mode === 'create' ? 'Tambah' : 'Simpan'}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CreateEditUserModal;
