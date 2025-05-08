import React from "react";
import { Input, Button, Select, SelectItem } from "@nextui-org/react";
import BaseModal from "../../../commons/Modal/BaseModal";
import { useForm, Controller } from "react-hook-form";

export interface UserSubmitData {
  fullName: string;
  username: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  role: string;
}

interface CreateEditUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserSubmitData) => Promise<void>;
  initialData?: {
    fullName: string;
    username: string;
    email: string;
    role: string;
  };
  mode: 'create' | 'edit';
  isSubmitting?: boolean;
}

const ROLES = [
  { label: 'Admin', value: 'admin' },
  { label: 'Guru', value: 'guru' },
  { label: 'Murid', value: 'murid' },
];

const CreateEditUserModal: React.FC<CreateEditUserModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
  isSubmitting = false,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch
  } = useForm<UserSubmitData>({
    defaultValues: {
      fullName: initialData?.fullName || "",
      username: initialData?.username || "",
      email: initialData?.email || "",
      role: initialData?.role || "",
      password: "",
      confirmPassword: "",
    },
  });

  const handleFormSubmit = async (data: UserSubmitData) => {
    await onSubmit(data);
    reset();
  };

  const modalTitle = mode === 'create' ? 'Tambah Akun' : 'Edit Akun';

  const footer = (
    <>
      <Button
        color="danger"
        variant="light"
        onClick={onClose}
        disabled={isSubmitting}
      >
        Batal
      </Button>
      <Button
        color="primary"
        onClick={() => handleSubmit(handleFormSubmit)()}
        isLoading={isSubmitting}
      >
        {mode === 'create' ? 'Tambah' : 'Simpan'}
      </Button>
    </>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={modalTitle}
      footer={footer}
      size="2xl"
      isSubmitting={isSubmitting}
    >
      <form className="space-y-4">
        <Controller
          name="fullName"
          control={control}
          rules={{ required: "Nama lengkap harus diisi" }}
          render={({ field }) => (
            <Input
              {...field}
              label="Nama Lengkap"
              placeholder="Masukkan nama lengkap"
              errorMessage={errors.fullName?.message}
              isInvalid={!!errors.fullName}
            />
          )}
        />

        <Controller
          name="username"
          control={control}
          rules={{ required: "Username harus diisi" }}
          render={({ field }) => (
            <Input
              {...field}
              label="Username"
              placeholder="Masukkan username"
              errorMessage={errors.username?.message}
              isInvalid={!!errors.username}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email harus diisi",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Email tidak valid"
            }
          }}
          render={({ field }) => (
            <Input
              {...field}
              type="email"
              label="Email"
              placeholder="Masukkan email"
              errorMessage={errors.email?.message}
              isInvalid={!!errors.email}
            />
          )}
        />

        {mode === 'create' && (
          <>
            <Controller
              name="password"
              control={control}
              rules={{
                required: "Password harus diisi",
                minLength: {
                  value: 6,
                  message: "Password minimal 6 karakter"
                }
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  label="Password"
                  placeholder="Masukkan password"
                  errorMessage={errors.password?.message}
                  isInvalid={!!errors.password}
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                required: "Konfirmasi password harus diisi",
                validate: (value) =>
                  value === watch("password") || "Password tidak sesuai"
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="password"
                  label="Konfirmasi Password"
                  placeholder="Konfirmasi password"
                  errorMessage={errors.confirmPassword?.message}
                  isInvalid={!!errors.confirmPassword}
                />
              )}
            />
          </>
        )}

        <Controller
          name="role"
          control={control}
          rules={{ required: "Role harus dipilih" }}
          render={({ field }) => (
            <div>
              <Select
                label="Role"
                placeholder="Pilih role"
                errorMessage={errors.role?.message}
                isInvalid={!!errors.role}
                selectedKeys={field.value ? [field.value] : []}
                onChange={(e) => field.onChange(e.target.value)}
              >
                {ROLES.map((role) => (
                  <SelectItem key={role.value} value={role.value}>
                    {role.label}
                  </SelectItem>
                ))}
              </Select>
            </div>
          )}
        />
      </form>
    </BaseModal>
  );
};

export default CreateEditUserModal;
