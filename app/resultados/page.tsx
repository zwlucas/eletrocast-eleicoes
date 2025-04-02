"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSupabaseClient } from "@/lib/supabase";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

type voteResult = {
  total: number;
  options: {
    [key: string]: {
      votes: number;
      percentage: number;
    };
  };
};

export default function Home() {
  const [results, setResults] = useState<voteResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setLoading(true);
        const supabase = getSupabaseClient();

        const { data, error } = await supabase.from("votes").select("option");

        if (error) throw new Error(error.message);

        if (!data || data.length === 0) {
          setResults({ total: 0, options: {} });
          return;
        }

        const total = data.length;
        const count: { [key: string]: number } = {};

        data.forEach((vote) => {
          const option = vote.option as string;
          count[option] = (count[option] || 0) + 1;
        });

        const options: {
          [key: string]: { votes: number; percentage: number };
        } = {};

        Object.keys(count).forEach((option) => {
          if (option !== "NULO") {
            options[option] = {
              votes: count[option],
              percentage: Number.parseFloat(
                ((count[option] / total) * 100).toFixed(2)
              ),
            };
          }
        });

        setResults({ total, options });
      } catch (error) {
        console.error("Erro ao buscar resultados:", error);
        setError("Ocorreu um erro ao carregar os resultados da votação.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);

  const getBarColor = (option: string) => {
    if (option === "SIE") return "bg-blue-500";
    if (option === "Liderança Jovem") return "bg-green-500";
    if (option === "NULO") return "bg-red-500";
    return "bg-purple-500";
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f0f5fa] px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl">
        <div className="mb-6 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="mb-2 text-center text-2xl font-bold text-[#004a93] sm:text-3xl">
              JUSTIÇA ELEITORAL ESTUDANTIL
            </div>
            <div className="h-2 w-full bg-gradient-to-r from-[#009c3b] via-[#ffdf00] to-[#002776]"></div>
          </div>
        </div>

        <Card className="border-2 border-[#004a93] shadow-lg overflow-hidden">
          <CardHeader className="bg-[#004a93] text-center text-white">
            <CardTitle className="text-lg sm:text-2xl">
              RESULTADOS DA VOTAÇÃO
            </CardTitle>
            <CardDescription className="text-sm text-gray-100 sm:text-base">
              Estatísticas de participação e votos por candidato
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-10">
                <Loader2 className="h-8 w-8 animate-spin text-[#004a93] sm:h-10 sm:w-10" />
                <p className="mt-4 text-sm text-[#004a93] sm:text-base">
                  Carregando resultados...
                </p>
              </div>
            ) : error ? (
              <div className="rounded-lg border-2 border-red-500 bg-red-50 p-4 text-center text-sm text-red-700 sm:text-base">
                {error}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="rounded-lg border-2 border-[#004a93] bg-white p-4 sm:p-6">
                  <h3 className="mb-4 text-lg font-bold text-[#004a93] sm:text-xl">
                    Total de Votos
                  </h3>
                  <div className="text-center">
                    <span className="text-4xl font-bold text-[#004a93] sm:text-5xl">
                      {results?.total || 0}
                    </span>
                    <p className="mt-2 text-xs text-gray-600 sm:text-sm">
                      eleitores participaram da votação
                    </p>
                  </div>
                </div>

                <div className="rounded-lg border-2 border-[#004a93] bg-white p-4 sm:p-6">
                  <h3 className="mb-4 text-lg font-bold text-[#004a93] sm:text-xl">
                    Distribuição dos Votos
                  </h3>

                  {results && results.total > 0 ? (
                    <div className="space-y-4 sm:space-y-6">
                      {Object.keys(results.options).map((opcao) => (
                        <div key={opcao} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-[#004a93] sm:text-base">
                              {opcao}
                            </span>
                            <span className="text-sm font-bold text-[#004a93] sm:text-base">
                              {/* {results.options[opcao].votes} votos (
                              {results.options[opcao].percentage}%) */}
                              {results.options[opcao].percentage}%
                            </span>
                          </div>
                          <div className="h-4 w-full overflow-hidden rounded-full bg-gray-200 sm:h-6">
                            <div
                              className={`h-full ${getBarColor(
                                opcao
                              )} transition-all duration-500 ease-in-out`}
                              style={{
                                width: `${results.options[opcao].percentage}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-center text-sm text-gray-500 sm:text-base">
                      Nenhum voto registrado até o momento.
                    </p>
                  )}
                </div>

                <div className="rounded-lg border-2 border-amber-500 bg-amber-50 p-4">
                  <p className="text-center text-xs text-amber-800 sm:text-sm">
                    Os resultados são atualizados automaticamente a cada vez que
                    a página é carregada.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="mt-4 flex justify-center">
          <div className="text-center text-xs text-[#004a93] sm:text-sm">
            © {new Date().getFullYear()} Justiça Eleitoral Estudantil
          </div>
        </div>
      </div>
    </div>
  );
}
