import { Button } from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/router";

interface PropTypes {
  status: "success" | "failed";
}

const Activation = (props: PropTypes) => {
  const router = useRouter();
  const { status } = props;
  return (
    <div className="flex flex-col items-center justify-center gap-10 p-4">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          src={
            status === "success"
              ? "/images/illustrations/email-send.svg"
              : "/images/illustrations/pending.svg"
          }
          alt="success"
          width={300}
          height={300}
        />
      </div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-3xl font-bold text-blue-600">
          {status === 'success' ? 'Pembuatan Akun Berhasil' : 'Pembuatan Akun Gagal'}
        </h1>
        <p className="text-xl font-bold text-default-500">
        {status === 'success' ? 'Terima kasih telah mendaftar di E-Learning SMPN 37 Jakarta!' : 'Konfirmasi Kode invalid'}
          
        </p>
        <Button
          className="mt-4 w-fit"
          variant="bordered"
          color="primary"
          onClick={() => router.push("/")}
        >
          Kembali ke Home
        </Button>
      </div>
    </div>
  );
};

export default Activation;
