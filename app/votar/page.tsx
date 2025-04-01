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

export default function VotarPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const rm = searchParams.get("rm") || "";
  const nome = searchParams.get("nome") || "";
  const cpf = searchParams.get("cpf") || "";
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    if (!rm || !nome || !cpf) {
      router.push("/");
      return;
    }

    setAudioContext(
      new (window.AudioContext || (window as any).webkitContext)()
    );
  }, [rm, nome, cpf, router]);

  const handleVote = (option: string) => {
    setSelectedOption(option);

    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.5, audioContext.currentTime);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.2);

    setTimeout(() => {
      router.push(
        `/obrigado?rm=${rm}&nome=${encodeURIComponent(
          nome
        )}&cpf=${cpf}&option=${option}`
      );
    }, 500);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f0f5fa]">
      <div className="w-full max-w-md">
        <div className="mb-6 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="mb-2 text-center text-3xl font-bold text-[#004a93]">
              JUSTIÇA ELEITORAL
            </div>
            <div className="h-2 w-full bg-gradient-to-r from-[#009c3b] via-[#ffdf00] to-[#002776]"></div>
          </div>
        </div>

        <Card className="border-2 border-[#004a93] shadow-lg overflow-hidden">
          <CardHeader className="bg-[#004a93] text-center text-white">
            <CardTitle className="text-2xl">SEU VOTO PARA</CardTitle>
            <CardDescription className="text-gray-100">
              CHAPA DO GREMIO ESTUDANTIL
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6 rounded-b-lg">
            <div className="grid grid-cols-2 gap-6">
              <Button
                onClick={() => handleVote("SIE")}
                className="flex h-40 flex-col items-center justify-center border-2 border-[#004a93] bg-white p-4 text-xl font-bold text-[#004a93] hover:bg-[#e6f0fa]"
                variant="outline"
              >
                <div className="mb-2 text-4xl">1</div>
                SIE
              </Button>
              <Button
                onClick={() => handleVote("Liderança Jovem")}
                className="flex h-40 flex-col items-center justify-center border-2 border-[#004a93] bg-white p-4 text-xl font-bold text-[#004a93] hover:bg-[#e6f0fa]"
                variant="outline"
              >
                <div className="mb-2 text-4xl">2</div>
                Liderança Jovem
              </Button>
            </div>
            <div className="mt-4 text-center text-sm text-[#004a93]">
              Toque no quadro correspondente para VOTAR
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 flex justify-center">
          <div className="text-center text-sm text-[#004a93]">
            © {new Date().getFullYear()} Justiça Eleitoral Estudantil
          </div>
        </div>
      </div>
    </div>
  );
}
