import React from "react";
import { Input, Textarea, Button, Select, SelectItem } from "@nextui-org/react";
import { MataPelajaran, TeacherOption, kategoriList } from "../../../../types/MataPelajaran";
import BaseModal from "../../../commons/Modal/BaseModal";
import { useForm, Controller } from "react-hook-form";

interface CreateEditMataPelajaranModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: MataPelajaran) => Promise<void>;
  initialData?: Partial<MataPelajaran>;
  mode: 'create' | 'edit';
  isSubmitting?: boolean;
  teachers: TeacherOption[];
}

const CreateEditMataPelajaranModal: React.FC<CreateEditMataPelajaranModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
  isSubmitting = false,
  teachers
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<MataPelajaran>({
    defaultValues: {
      judul: initialData?.judul || "",
      kategori: initialData?.kategori || "",
      deskripsi: initialData?.deskripsi || "",
      guru: initialData?.guru || "",
      tingkatKelas: initialData?.tingkatKelas || "",
    },
  });

  const handleFormSubmit = async (data: MataPelajaran) => {
    await onSubmit(data);
    reset();
  };

  const modalTitle = mode === 'create' ? 'Tambah Mata Pelajaran' : 'Edit Mata Pelajaran';

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
      <form className="space-y-4" onSubmit={handleSubmit(handleFormSubmit)}>
        <Controller
          name="judul"
          control={control}
          rules={{ required: "Judul harus diisi" }}
          render={({ field }) => (
            <Input
              {...field}
              label="Judul"
              placeholder="Masukkan judul mata pelajaran"
              errorMessage={errors.judul?.message}
              isInvalid={!!errors.judul}
            />
          )}
        />

        <Controller
          name="kategori"
          control={control}
          rules={{ required: "Kategori harus diisi" }}
          render={({ field }) => (
            <Select
              {...field}
              label="Kategori"
              placeholder="Pilih kategori"
              errorMessage={errors.kategori?.message}
              isInvalid={!!errors.kategori}
              selectedKeys={field.value ? [field.value] : []}
              onChange={(e) => field.onChange(e.target.value)}
            >
              {kategoriList.map((kategori: string) => (
                <SelectItem key={kategori} value={kategori}>
                  {kategori}
                </SelectItem>
              ))}
            </Select>
          )}
        />

        <Controller
          name="tingkatKelas"
          control={control}
          rules={{ required: "Tingkat kelas harus diisi" }}
          render={({ field }) => (
            <Input
              {...field}
              label="Tingkat Kelas"
              placeholder="Masukkan tingkat kelas"
              errorMessage={errors.tingkatKelas?.message}
              isInvalid={!!errors.tingkatKelas}
            />
          )}
        />

        <Controller
          name="deskripsi"
          control={control}
          rules={{ required: "Deskripsi harus diisi" }}
          render={({ field }) => (
            <Textarea
              {...field}
              label="Deskripsi"
              placeholder="Masukkan deskripsi mata pelajaran"
              errorMessage={errors.deskripsi?.message}
              isInvalid={!!errors.deskripsi}
            />
          )}
        />

        <Controller
          name="guru"
          control={control}
          rules={{ required: "Guru harus dipilih" }}
          render={({ field }) => (
            <Select
              label="Guru"
              placeholder="Pilih guru"
              errorMessage={errors.guru?.message}
              isInvalid={!!errors.guru}
              selectedKeys={field.value ? [typeof field.value === 'string' ? field.value : field.value._id] : []}
              onChange={(e) => field.onChange(e.target.value)}
              classNames={{
                base: "w-full",
                trigger: "h-11"
              }}
            >
              {teachers.map((teacher) => (
                <SelectItem key={teacher._id} value={teacher._id}>
                  {teacher.fullName}
                </SelectItem>
              ))}
            </Select>
          )}
        />
      </form>
    </BaseModal>
  );
};

export default CreateEditMataPelajaranModal;
