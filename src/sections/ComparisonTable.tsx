import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, X, ArrowUpRight, DollarSign, Award, Video } from "lucide-react";

const comparisonData = [
  {
    api: "Amazon Rekognition", type: "Cloud", pricePer1k: "$1.00", videoPrice: "$0.10/min",
    freeTier: "5K/mês (12mo)", accuracy: "99.8%+", speed: "Médio",
    faceDetect: true, faceRecognize: true, faceVerify: true, emotion: true, ageGender: true,
    liveness: false, videoAnalysis: true, onPremise: false, nistRank: "Top 10",
    docScore: 8, lowQScore: 8, overall: "Excelente para escala",
    link: "https://aws.amazon.com/rekognition/pricing/",
  },
  {
    api: "Azure Face API", type: "Cloud", pricePer1k: "$1.00", videoPrice: "N/A",
    freeTier: "30K/mês", accuracy: "99.8%+", speed: "Médio",
    faceDetect: true, faceRecognize: "Limited", faceVerify: true, emotion: "Retired", ageGender: "Restricted",
    liveness: true, videoAnalysis: false, onPremise: true, nistRank: "Top 10",
    docScore: 7, lowQScore: 8, overall: "Melhor compliance",
    link: "https://azure.microsoft.com/pricing/details/cognitive-services/face-api/",
  },
  {
    api: "Google Cloud Vision", type: "Cloud", pricePer1k: "$1.50", videoPrice: "N/A",
    freeTier: "1K/mês", accuracy: "99.5%", speed: "Médio",
    faceDetect: true, faceRecognize: false, faceVerify: false, emotion: true, ageGender: true,
    liveness: false, videoAnalysis: false, onPremise: false, nistRank: "N/A",
    docScore: 5, lowQScore: 6, overall: "Apenas detecção",
    link: "https://cloud.google.com/vision/pricing",
  },
  {
    api: "Face++ (Megvii)", type: "Cloud", pricePer1k: "Sob consulta", videoPrice: "Sob consulta",
    freeTier: "Sim", accuracy: "99.8%+", speed: "Rápido",
    faceDetect: true, faceRecognize: true, faceVerify: true, emotion: true, ageGender: true,
    liveness: true, videoAnalysis: true, onPremise: true, nistRank: "Top 20",
    docScore: 6, lowQScore: 7, overall: " Rico em features",
    link: "https://www.faceplusplus.com/",
  },
  {
    api: "Banuba Face API", type: "SDK On-device", pricePer1k: "MAU-based", videoPrice: "Incluído",
    freeTier: "14 dias", accuracy: "99.7%+", speed: "Muito Rápido",
    faceDetect: true, faceRecognize: true, faceVerify: true, emotion: true, ageGender: true,
    liveness: true, videoAnalysis: true, onPremise: true, nistRank: "N/A",
    docScore: 4, lowQScore: 5, overall: "Melhor para mobile",
    link: "https://www.banuba.com/face-api",
  },
  {
    api: "NEC", type: "Enterprise", pricePer1k: "Enterprise", videoPrice: "Enterprise",
    freeTier: "Não", accuracy: "99.93%", speed: "Rápido",
    faceDetect: true, faceRecognize: true, faceVerify: true, emotion: false, ageGender: false,
    liveness: true, videoAnalysis: true, onPremise: true, nistRank: "#1 Mundo",
    docScore: 7, lowQScore: 9, overall: "Mais preciso do mundo",
    link: "https://www.nec.com/en/global/solutions/biometrics/face/",
  },
  {
    api: "InsightFace", type: "Open Source", pricePer1k: "Grátis", videoPrice: "Self-hosted",
    freeTier: "Ilimitado", accuracy: "99.86%", speed: "Depende de HW",
    faceDetect: true, faceRecognize: true, faceVerify: true, emotion: true, ageGender: true,
    liveness: false, videoAnalysis: true, onPremise: true, nistRank: "Research",
    docScore: 9, lowQScore: 8, overall: "Full control",
    link: "https://github.com/deepinsight/insightface",
  },
  {
    api: "CompreFace", type: "Open Source", pricePer1k: "Grátis", videoPrice: "Self-hosted",
    freeTier: "Ilimitado", accuracy: "99.5%", speed: "Depende de HW",
    faceDetect: true, faceRecognize: true, faceVerify: true, emotion: true, ageGender: true,
    liveness: false, videoAnalysis: false, onPremise: true, nistRank: "N/A",
    docScore: 9, lowQScore: 7, overall: "Fácil self-host",
    link: "https://github.com/exadel-inc/CompreFace",
  },
  {
    api: "DeepFace", type: "Open Source", pricePer1k: "Grátis", videoPrice: "Local",
    freeTier: "Ilimitado", accuracy: "99.4%", speed: "Lento (Python)",
    faceDetect: true, faceRecognize: true, faceVerify: true, emotion: true, ageGender: true,
    liveness: false, videoAnalysis: false, onPremise: true, nistRank: "N/A",
    docScore: 8, lowQScore: 7, overall: "Prototipagem",
    link: "https://github.com/serengil/deepface",
  },
];

function FeatureIcon({ value }: { value: boolean | string }) {
  if (value === true) return <Check className="w-4 h-4 text-green-500" />;
  if (value === false) return <X className="w-4 h-4 text-red-400" />;
  if (value === "Retired" || value === "Restricted" || value === "Limited")
    return <span className="text-xs text-yellow-600 dark:text-yellow-400 font-medium">{value}</span>;
  return <span className="text-xs text-muted-foreground">{value}</span>;
}

function ScorePill({ score }: { score: number }) {
  const color = score >= 8 ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" :
    score >= 6 ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300" :
    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300";
  return <Badge className={`${color} font-bold`}>{score}/10</Badge>;
}

export default function ComparisonTable() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? comparisonData :
    filter === "cloud" ? comparisonData.filter(d => d.type === "Cloud") :
    filter === "opensource" ? comparisonData.filter(d => d.type === "Open Source") :
    comparisonData.filter(d => d.type === "SDK On-device" || d.type === "Enterprise");

  return (
    <section id="comparativo" className="py-20 bg-muted/30 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Tabela Comparativa Completa</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Compare lado a lado todas as APIs analisadas. Filtre por tipo e veja qual se encaixa no seu projeto.
          </p>
        </div>

        <div className="flex justify-center gap-2 mb-8 flex-wrap">
          {[
            { key: "all", label: "Todas" },
            { key: "cloud", label: "Cloud" },
            { key: "sdk", label: "SDK/Enterprise" },
            { key: "opensource", label: "Open Source" },
          ].map((f) => (
            <Button
              key={f.key}
              variant={filter === f.key ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </Button>
          ))}
        </div>

        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b-2 border-border">
                <th className="text-left p-3 font-bold">API</th>
                <th className="text-center p-3 font-bold">Tipo</th>
                <th className="text-center p-3 font-bold"><DollarSign className="w-3 h-3 inline" /> Preço/1K</th>
                <th className="text-center p-3 font-bold">Free Tier</th>
                <th className="text-center p-3 font-bold"><Award className="w-3 h-3 inline" /> Precisão</th>
                <th className="text-center p-3 font-bold">Detecção</th>
                <th className="text-center p-3 font-bold">Reconhec.</th>
                <th className="text-center p-3 font-bold">Liveness</th>
                <th className="text-center p-3 font-bold">Vídeo</th>
                <th className="text-center p-3 font-bold">On-prem</th>
                <th className="text-center p-3 font-bold"><Video className="w-3 h-3 inline" /> Doc</th>
                <th className="text-center p-3 font-bold">Low-Q</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <tr key={row.api} className={`border-b border-border/50 hover:bg-accent/50 ${i % 2 === 0 ? "bg-card" : "bg-card/50"}`}>
                  <td className="p-3 font-medium">
                    <a href={row.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary">
                      {row.api}<ArrowUpRight className="w-3 h-3 opacity-50" />
                    </a>
                  </td>
                  <td className="p-3 text-center"><Badge variant="outline" className="text-xs">{row.type}</Badge></td>
                  <td className="p-3 text-center font-mono text-xs">{row.pricePer1k}</td>
                  <td className="p-3 text-center text-xs">{row.freeTier}</td>
                  <td className="p-3 text-center font-bold text-xs">{row.accuracy}</td>
                  <td className="p-3 text-center"><FeatureIcon value={row.faceDetect} /></td>
                  <td className="p-3 text-center"><FeatureIcon value={row.faceRecognize} /></td>
                  <td className="p-3 text-center"><FeatureIcon value={row.liveness} /></td>
                  <td className="p-3 text-center"><FeatureIcon value={row.videoAnalysis} /></td>
                  <td className="p-3 text-center"><FeatureIcon value={row.onPremise} /></td>
                  <td className="p-3 text-center"><ScorePill score={row.docScore} /></td>
                  <td className="p-3 text-center"><ScorePill score={row.lowQScore} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="lg:hidden space-y-4">
          {filtered.map((row) => (
            <Card key={row.api}>
              <CardHeader className="p-4 pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">
                    <a href={row.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary">
                      {row.api}<ArrowUpRight className="w-3 h-3" />
                    </a>
                  </CardTitle>
                  <Badge variant="outline" className="text-xs">{row.type}</Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                  <div><span className="text-muted-foreground">Preço:</span> <span className="font-mono font-medium">{row.pricePer1k}</span></div>
                  <div><span className="text-muted-foreground">Free:</span> <span className="font-medium">{row.freeTier}</span></div>
                  <div><span className="text-muted-foreground">Precisão:</span> <span className="font-bold">{row.accuracy}</span></div>
                  <div><span className="text-muted-foreground">Velocidade:</span> <span className="font-medium">{row.speed}</span></div>
                </div>
                <div className="flex flex-wrap gap-3 text-xs mb-3">
                  <span>Detecção: <FeatureIcon value={row.faceDetect} /></span>
                  <span>Reconhec.: <FeatureIcon value={row.faceRecognize} /></span>
                  <span>Liveness: <FeatureIcon value={row.liveness} /></span>
                  <span>Vídeo: <FeatureIcon value={row.videoAnalysis} /></span>
                  <span>On-prem: <FeatureIcon value={row.onPremise} /></span>
                </div>
                <div className="flex gap-4">
                  <ScorePill score={row.docScore} /><ScorePill score={row.lowQScore} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>Nota sobre Documentários:</strong> A pontuação "Doc" considera viabilidade para B-roll,
            processamento de vídeo, custo-benefício para grandes volumes e integração com workflows de edição.
            "Low-Q" avalia performance específica com imagens granuladas, escuras, comprimidas ou de baixa resolução.
          </p>
        </div>
      </div>
    </section>
  );
}
