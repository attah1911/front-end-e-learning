import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import authServices from "@/services/auth.service";
import { ILogin } from "@/types/Auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const loginSchema = yup.object().shape({
  identifier: yup.string().required("Tolong masukkan email atau password anda"),
  password: yup.string().required("Tolong masukkan Password anda"),
});

const useLogin = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const callbackUrl: string = (router.query.callbackUrl as string) || "";

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const loginService = async (payload: ILogin): Promise<ILogin> => {
    try {
      const result = await authServices.login(payload);
      if (!result.data.data) {
        throw new Error("Login Gagal");
      }
      return payload;
    } catch (error) {
      throw new Error("Login Gagal");
    }
  };

  const { mutate: mutateLogin, isPending: isPendingLogin } = useMutation({
    mutationFn: loginService,
    onError(error) {
      setError("root", {
        message: error.message,
      });
    },
    onSuccess: async (data) => {
      try {
        // First login to get the token
        const loginResult = await authServices.login(data);
        const token = loginResult.data.data;

        // Get user profile with token to get role
        const profileResult = await authServices.getProfileWithToken(token);
        const role = profileResult.data.data.role;

        // Now sign in with NextAuth
        const result = await signIn("credentials", {
          ...data,
          redirect: false,
        });

        if (result?.ok) {
          let redirectUrl = callbackUrl;

          if (!redirectUrl) {
            switch (role) {
              case "admin":
                redirectUrl = "/admin/dashboard";
                break;
              case "guru":
                redirectUrl = "/guru/dashboard";
                break;
              case "murid":
                redirectUrl = "/murid/dashboard";
                break;
              default:
                redirectUrl = "/";
            }
          }

          router.push(redirectUrl);
          reset();
        }
      } catch (error) {
        console.error("Error during login process:", error);
        setError("root", {
          message: "Gagal mendapatkan informasi pengguna",
        });
      }
    },
  });

  const handleLogin = (data: ILogin) => mutateLogin(data);

  return {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  };
};

export default useLogin;
