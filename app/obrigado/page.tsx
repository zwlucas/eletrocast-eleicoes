"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckCircle2, AlertTriangle } from "lucide-react";
import { getSupabaseClient } from "@/lib/supabase";

export default function ObrigadoPage() {
  const searchParams = useSearchParams();
  const rm = searchParams.get("rm") || "";
  const name = searchParams.get("nome") || "";
  const option = searchParams.get("option") || "";

  const [countdown, setCountdown] = useState(5);
  const [saveStatus, setSaveStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const hasRun = useRef(false);

  useEffect(() => {
    if (!rm || !name || !option) {
      window.location.href = "/";
      return;
    }

    const saveVote = async () => {
      try {
        const supabase = getSupabaseClient();
        
        const { error } = await supabase.from("votes").insert([
          {
            rm,
            name,
            option: option,
          },
        ]);

        if (error) {
          console.error("Erro ao salvar voto:", error);
          setSaveStatus("error");

          if (error.code === "23505") {
            setErrorMessage(
              "Você já votou anteriormente. Cada eleitor pode votar apenas uma vez."
            );
          } else {
            setErrorMessage(
              "Ocorreu um erro ao registrar seu voto. Por favor, informe ao responsável."
            );
          }
          return;
        }

        setSaveStatus("success");
      } catch (error) {
        console.error("Erro ao salvar voto:", error);
        setSaveStatus("error");
        setErrorMessage(
          "Ocorreu um erro ao registrar seu voto. Por favor, informe ao responsável."
        );
      }
    };

    if (!hasRun.current) {
      hasRun.current = true;
      saveVote();
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = "/";
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [rm, name, option]);

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

      <Card className="border-2 border-[#004a93] text-center shadow-lg overflow-hidden">
        <CardHeader
        className={`${
          saveStatus === "error" ? "bg-red-600" : "bg-[#004a93]"
        } text-white`}
        >
        <div className="mx-auto mb-4 rounded-full bg-white p-2">
          {saveStatus === "loading" ? (
          <div className="h-12 w-12 sm:h-16 sm:w-16 animate-spin rounded-full border-4 border-[#004a93] border-t-transparent"></div>
          ) : saveStatus === "success" ? (
          <CheckCircle2 className="h-12 w-12 sm:h-16 sm:w-16 text-[#009c3b]" />
          ) : (
          <AlertTriangle className="h-12 w-12 sm:h-16 sm:w-16 text-red-600" />
          )}
        </div>
        <CardTitle className="text-lg sm:text-2xl">
          {saveStatus === "loading"
          ? "PROCESSANDO SEU VOTO..."
          : saveStatus === "success"
          ? "VOTO REGISTRADO COM SUCESSO!"
          : "ERRO AO REGISTRAR VOTO"}
        </CardTitle>
        <CardDescription className="text-gray-100">
          {saveStatus === "success" ? "FIM" : ""}
        </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-6 rounded-b-lg">
        {saveStatus === "loading" ? (
          <p className="text-[#004a93] text-sm sm:text-base">
          Aguarde enquanto registramos seu voto...
          </p>
        ) : saveStatus === "success" ? (
          <>
          <p className="text-base sm:text-lg font-bold text-[#004a93]">
            Você votou em:{" "}
            <span className="text-[#009c3b]">{option}</span>
          </p>
          <p className="mt-4 text-sm sm:text-base text-[#004a93]">
            Obrigado por participar das eleições.
          </p>
          <p className="mt-4 text-xs sm:text-sm text-[#004a93]">
            Retornando à tela inicial em {countdown} segundos...
          </p>
          </>
        ) : (
          <>
          <p className="text-base sm:text-lg font-bold text-red-600">
            {errorMessage}
          </p>
          <p className="mt-4 text-xs sm:text-sm text-[#004a93]">
            Retornando à tela inicial em {countdown} segundos...
          </p>
          </>
        )}
        </CardContent>
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
