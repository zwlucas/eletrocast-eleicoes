"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function VotarPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rm = searchParams.get("rm") || "";
  const nome = searchParams.get("nome") || "";
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [audioElement, setAudioElement] = useState<HTMLAudioElement>();
  const [confirmNull, setConfirmNull] = useState(false);

  useEffect(() => {
    if (!rm || !nome) {
      router.push("/");
      return;
    }

    const audio = new Audio("/confirma.mp3");
    setAudioElement(audio);
  }, [rm, nome, router]);

  const handleVote = (option: string) => {
    if (option === "NULL" && !confirmNull) {
      setConfirmNull(true);
      return;
    }

    setSelectedOption(option);

    if (!audioElement) return;
    audioElement.play();

    setTimeout(() => {
      router.push(
        `/obrigado?rm=${rm}&nome=${encodeURIComponent(nome)}&option=${option}`
      );
    }, 500);
  };

  const cancelNull = () => {
    setConfirmNull(false);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f0f5fa] p-4">
      <div className="w-full max-w-md md:max-w-2xl">
        <div className="mb-6 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="mb-2 text-center text-2xl font-bold text-[#004a93] md:text-3xl">
              JUSTIÇA ELEITORAL ESTUDANTIL
            </div>
            <div className="h-2 w-full bg-gradient-to-r from-[#009c3b] via-[#ffdf00] to-[#002776]"></div>
          </div>
        </div>

        {confirmNull ? (
          <Card className="border-2 border-[#004a93] shadow-lg overflow-hidden">
            <CardHeader className="bg-[#004a93] text-center text-white">
              <CardTitle className="text-xl md:text-2xl">
                CONFIRMAR VOTO NULO
              </CardTitle>
              <CardDescription className="text-gray-100">
                Você está prestes a anular seu voto
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 p-4 md:space-y-6 md:p-6">
              <div className="rounded-lg border-2 border-amber-500 bg-amber-50 p-3 md:p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 flex-shrink-0 text-amber-500 md:h-6 md:w-6" />
                  <div className="text-sm text-amber-800 md:text-base">
                    <strong>ATENÇÃO:</strong> Você está prestes a anular seu
                    voto. Votos nulos não são contabilizados para nenhum
                    candidato.
                  </div>
                </div>
              </div>

              <div className="text-center text-sm font-bold text-[#004a93] md:text-base">
                Deseja realmente anular seu voto?
              </div>

              <div className="flex flex-col gap-3 md:flex-row md:gap-4">
                <Button
                  onClick={cancelNull}
                  className="flex-1 border-2 border-[#004a93] bg-white text-[#004a93] hover:bg-[#e6f0fa] text-sm md:text-base"
                  variant="outline"
                >
                  CANCELAR
                </Button>
                <Button
                  onClick={() => handleVote("NULO")}
                  className="flex-1 bg-red-600 text-white hover:bg-red-700 text-sm md:text-base"
                >
                  CONFIRMAR VOTO NULO
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-2 border-[#004a93] shadow-lg overflow-hidden">
            <CardHeader className="bg-[#004a93] text-center text-white">
              <CardTitle className="text-xl md:text-2xl">
                SEU VOTO PARA
              </CardTitle>
              <CardDescription className="text-gray-100">
                CHAPA DO GREMIO ESTUDANTIL
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-4 md:p-6 rounded-b-lg">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
                <Button
                  onClick={() => handleVote("Liderança Jovem")}
                  className="flex h-32 flex-col items-center justify-center border-2 border-[#004a93] bg-white p-4 text-lg font-bold text-[#004a93] hover:bg-[#e6f0fa] md:h-40 md:text-xl"
                  variant="outline"
                >
                  <div className="mb-2 text-3xl md:text-4xl">1</div>
                  Liderança Jovem 💙
                </Button>
                <Button
                  onClick={() => handleVote("SIE")}
                  className="flex h-32 flex-col items-center justify-center border-2 border-[#004a93] bg-white p-4 text-lg font-bold text-[#004a93] hover:bg-[#e6f0fa] md:h-40 md:text-xl"
                  variant="outline"
                >
                  <div className="mb-2 text-3xl md:text-4xl">2</div>
                  Sociedade Inovadora 🐯
                </Button>
              </div>
              <div className="mt-4 text-center text-sm text-[#004a93] md:text-base">
                Toque no quadro correspondente para VOTAR
              </div>

              <div className="pt-2">
                <Button
                  onClick={() => handleVote("NULL")}
                  className="w-full border-2 border-red-600 bg-white text-red-600 hover:bg-red-50"
                  variant="outline"
                >
                  VOTAR NULO
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="mt-4 flex justify-center">
          <div className="text-center text-sm text-[#004a93] md:text-base">
            © {new Date().getFullYear()} Justiça Eleitoral Estudantil
          </div>
        </div>
      </div>
    </div>
  );
}
