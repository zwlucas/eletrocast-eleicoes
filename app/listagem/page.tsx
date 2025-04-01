"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSupabaseClient } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function ListVotes() {
  const [numberVotes, setNumberVotes] = useState<number>();
  const [sieNumberVotes, setSieNumberVotes] = useState<number>();
  const [ljNumberVotes, setLjNumberVotes] = useState<number>();

  const [saveStatus, setSaveStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const listVotes = async () => {
      const supabase = getSupabaseClient();

      const { data, error } = await supabase.from("votes").select();

      if (error) {
        console.error("Erro ao procurar votos:", error);
        setSaveStatus("error");

        setErrorMessage(
          "Ocorreu um erro ao procurar votos. Por favor, informe ao responsável."
        );
        return;
      }

      setNumberVotes(data.length);

      const sieData = data.filter((vote) => vote.option_voted == "SIE");
      setSieNumberVotes(sieData.length);

      const ljData = data.filter(
        (vote) => vote.option_voted == "Liderança Jovem"
      );
      setLjNumberVotes(ljData.length);
    };

    listVotes();
  });

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
            <CardTitle className="text-2xl">VOTOS ATUAIS</CardTitle>
            <CardDescription className="text-gray-100">
              CHAPA DO GREMIO ESTUDANTIL
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-6 rounded-b-lg">
            <div className="grid grid-cols-2 gap-6">
              <Button
                className="flex h-40 flex-col items-center justify-center border-2 border-[#004a93] bg-white p-4 text-xl font-bold text-[#004a93] hover:bg-[#e6f0fa]"
                variant="outline"
              >
                <div className="mb-2 text-4xl">{sieNumberVotes}</div>
                SIE
              </Button>
              <Button
                className="flex h-40 flex-col items-center justify-center border-2 border-[#004a93] bg-white p-4 text-xl font-bold text-[#004a93] hover:bg-[#e6f0fa]"
                variant="outline"
              >
                <div className="mb-2 text-4xl">{ljNumberVotes}</div>
                Liderança Jovem
              </Button>
            </div>
            <div className="mt-4 text-center text-sm text-[#004a93]">
              Todos os dados são em tempo real!
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
