import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";

const RegisterSuccess = () => {
    const router = useRouter()
  return (
    <div className="flex flex-col items-center justify-center gap-10 p-4">
      <div className="gap-10 flex flex-col items-center justify-center">
        <Image
          src="/images/illustrations/email-send.svg"
          alt="success"
          width={300}
          height={300}
        />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-blue-600">
          Pembuatan Akun Berhasil
        </h1>
        <p className="text-xl font-bold text-default-500">
          Cek email kamu untuk aktivasi akun
        </p>
        <Button className="mt-4 w-fit" variant="bordered" color="primary" onClick={() => router.push('/')}>
          Kembali ke Home
        </Button>
      </div>
    </div>
  );
};

export default RegisterSuccess;
