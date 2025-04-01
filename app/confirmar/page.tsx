"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function ConfirmPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rm = searchParams.get("rm") || "";
  const nome = searchParams.get("nome") || "";
  const cpf = searchParams.get("cpf") || "";

  useEffect(() => {
    if (!rm || !nome || !cpf) {
      router.push("/");
      return;
    }
  }, [rm, nome, cpf, router]);

  const handleConfirm = () => {
    router.push(`/votar?rm=${rm}&nome=${encodeURIComponent(nome)}&cpf=${cpf}`);
  };

  const handleCancel = () => {
    router.push("/");
  };

  const formatCPFDisplay = (cpf: string) => {
    if (cpf.includes(".") || cpf.includes("-")) return cpf;

    const cpfClean = cpf.replace(/\D/g, "");

    if (cpfClean.length === 11) {
      return `${cpfClean.substring(0, 3)}.${cpfClean.substring(
        3,
        6
      )}.${cpfClean.substring(6, 9)}-${cpfClean.substring(9, 11)}`;
    }

    return cpf;
  };

  const maskCPF = (cpf: string) => {
    const formatted = formatCPFDisplay(cpf);
    const parts = formatted.split(".");
    if (parts.length === 3) {
      const lastPart = parts[2].split("-");
      if (lastPart.length === 2) {
        return `${parts[0]}.${parts[1]}.${"***"}-${lastPart[1]}`;
      }
    }
    return formatted;
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f0f5fa] px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
      <div className="mb-6 flex items-center justify-center">
        <div className="flex flex-col items-center">
        <div className="mb-2 text-center text-2xl font-bold text-[#004a93] sm:text-3xl lg:text-4xl">
          JUSTIÇA ELEITORAL ESTUDANTIL
        </div>
        <div className="h-2 w-full bg-gradient-to-r from-[#009c3b] via-[#ffdf00] to-[#002776]"></div>
        </div>
      </div>

      <Card className="border-2 border-[#004a93] shadow-lg overflow-hidden">
        <CardHeader className="bg-[#004a93] text-center text-white">
        <CardTitle className="text-lg sm:text-xl lg:text-2xl">
          CONFIRME SEUS DADOS
        </CardTitle>
        <CardDescription className="text-gray-100 text-sm sm:text-base">
          Verifique se as informações estão corretas
        </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
        <div className="rounded-lg border-2 border-[#004a93] bg-white p-4">
          <div className="grid grid-cols-2 gap-2">
          <div className="text-xs sm:text-sm font-medium text-[#004a93]">
            RM:
          </div>
          <div className="text-xs sm:text-sm font-bold text-[#004a93]">
            {rm}
          </div>

          <div className="text-xs sm:text-sm font-medium text-[#004a93]">
            Nome:
          </div>
          <div className="text-xs sm:text-sm font-bold text-[#004a93]">
            {nome}
          </div>

          <div className="text-xs sm:text-sm font-medium text-[#004a93]">
            CPF:
          </div>
          <div className="text-xs sm:text-sm font-bold text-[#004a93]">
            {maskCPF(cpf)}
          </div>
          </div>
        </div>

        <div className="rounded-lg border-2 border-amber-500 bg-amber-50 p-4">
          <div className="flex items-start gap-2">
          <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0 text-amber-500" />
          <div className="text-xs sm:text-sm text-amber-800">
            <strong>ATENÇÃO:</strong> Verifique se seus dados estão
            corretos. Caso as informações estejam incorretas, seu voto não
            será computado.
          </div>
          </div>
        </div>

        <div className="text-center text-xs sm:text-sm font-bold text-[#004a93]">
          Estas informações estão corretas?
        </div>
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 border-t border-[#004a93] bg-[#f8f8f8] py-3 rounded-b-lg">
        <Button
          variant="outline"
          onClick={handleCancel}
          className="flex-1 border-2 border-[#004a93] text-[#004a93] hover:bg-[#e6f0fa] hover:text-[#003a73]"
        >
          CORRIGIR
        </Button>
        <Button
          onClick={handleConfirm}
          className="flex-1 bg-[#004a93] text-white hover:bg-[#003a73]"
        >
          CONFIRMAR
        </Button>
        </CardFooter>
      </Card>

      <div className="mt-4 flex justify-center">
        <div className="text-center text-xs sm:text-sm text-[#004a93]">
        © {new Date().getFullYear()} Justiça Eleitoral Estudantil
        </div>
      </div>
      </div>
    </div>
  );
}
