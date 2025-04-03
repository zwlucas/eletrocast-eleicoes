"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { BarChart3 } from "lucide-react";

export default function Home() {
  const [rm, setRm] = useState("");
  const [nome, setNome] = useState("");
  const [errors, setErrors] = useState<{
    rm?: string;
    nome?: string;
  }>({});
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { rm?: string; nome?: string } = {};

    if (!/^\d{5}$/.test(rm)) {
      newErrors.rm = "O RM deve conter exatamente 5 dígitos numéricos.";
    }

    const validPrefixes = ["22", "23", "24", "25", "19", "20", "21", "10", "13"];
    if (!validPrefixes.includes(rm.substring(0, 2))) {
      newErrors.rm = "O RM não é valido";
    }

    if (!nome || nome.trim().length < 3) {
      newErrors.nome = "Por favor, insira seu nome completo.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    router.push(`/confirmar?rm=${rm}&nome=${encodeURIComponent(nome)}`);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f0f5fa] px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="mb-2 text-center text-2xl sm:text-3xl font-bold text-[#004a93]">
              JUSTIÇA ELEITORAL ESTUDANTIL
            </div>
            <div className="h-2 w-full bg-gradient-to-r from-[#009c3b] via-[#ffdf00] to-[#002776]"></div>
          </div>
        </div>

        <Card className="border-2 border-[#004a93] shadow-lg overflow-hidden">
          <CardHeader className="bg-[#004a93] text-center text-white">
            <CardTitle className="text-xl sm:text-2xl">
              ELEIÇÕES ESTUDANTIS
            </CardTitle>
            <CardDescription className="text-gray-100">
              Identificação do Eleitor
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p>As eleições foram encerradas, obrigado pelo seu voto!</p>
            </div>
            {/* <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="rm"
                  className="text-sm font-medium text-[#004a93]"
                >
                  Digite seu RM:
                </label>
                <Input
                  id="rm"
                  type="text"
                  value={rm}
                  onChange={(e) => {
                    setRm(e.target.value);
                    if (errors.rm) {
                      setErrors((prev) => ({ ...prev, rm: undefined }));
                    }
                  }}
                  placeholder="Digite os 5 dígitos do seu RM"
                  className="border-2 border-[#004a93]"
                  maxLength={5}
                />
                {errors.rm && (
                  <p className="text-sm text-red-500">{errors.rm}</p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="nome"
                  className="text-sm font-medium text-[#004a93]"
                >
                  Digite seu nome completo:
                </label>
                <Input
                  id="nome"
                  type="text"
                  value={nome}
                  onChange={(e) => {
                    setNome(e.target.value);
                    if (errors.nome) {
                      setErrors((prev) => ({ ...prev, nome: undefined }));
                    }
                  }}
                  placeholder="Digite seu nome completo"
                  className="border-2 border-[#004a93]"
                />
                {errors.nome && (
                  <p className="text-sm text-red-500">{errors.nome}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-[#004a93] text-white hover:bg-[#003a73]"
              >
                CONFIRMAR
              </Button>
            </form> */}
          </CardContent>
          <CardFooter className="flex justify-center border-t border-[#004a93] bg-[#f8f8f8] py-3 text-sm text-[#004a93] rounded-b-lg">
            Seu voto é secreto e seguro.
          </CardFooter>
        </Card>

        <div className="mt-4 flex justify-center gap-2">
          <div className="text-center text-sm text-[#004a93]">
            © {new Date().getFullYear()} Justiça Eleitoral Estudantil
          </div>
          <Link href="/resultados" className="flex items-center gap-1 text-sm text-[#004a93] hover:underline">
            <BarChart3 className="h-4 w-4" />
            Ver Resultados
          </Link>
        </div>
      </div>
    </div>
  );
}
