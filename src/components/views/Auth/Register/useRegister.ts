import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import authServices from "@/services/auth.service";
import { IRegister } from "@/types/Auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";

const registerSchema = yup.object().shape({
  fullName: yup.string().required("Tolong masukkan Nama Lengkap anda"),
  username: yup.string().required("Tolong masukkan Username anda"),
  email: yup
    .string()
    .email("Format Email tidak valid")
    .required("Tolong masukkan Email anda"),
  password: yup
    .string()
    .min(8, "Minimal 8 Karakter")
    .matches(/[A-Z]/, "Password harus mengandung setidaknya satu huruf kapital")
    .required("Tolong masukkan Password anda"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "Password Confirmation tidak sesuai")
    .required("Tolong masukkan Password Confirmation"),
});

const useRegister = () => {
  const router = useRouter();
  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleVisiblePassword = (key: "password" | "confirmPassword") => {
    setVisiblePassword({
      ...visiblePassword,
      [key]: !visiblePassword[key],
    });
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const registerService = async (payload: IRegister) => {
    const result = await authServices.register(payload);
    return result;
  };

  const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
    mutationFn: registerService,
    onError(error) {
      setError("root", {
        message: error.message,
      });
    },
    onSuccess: () => {
      router.push("/auth/register/success");
      reset();
    },
  });

  const handleRegister = (data: IRegister) => mutateRegister(data)

  return {
    visiblePassword,
    handleVisiblePassword,
    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  };
};

export default useRegister;
