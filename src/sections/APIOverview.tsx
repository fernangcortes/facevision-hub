import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Cloud, CloudRain, Sun, Star, Shield, Smartphone, CheckCircle, XCircle
} from "lucide-react";

const apis = [
  {
    name: "Amazon Rekognition",
    provider: "AWS",
    icon: <Cloud className="w-6 h-6" />,
    color: "from-orange-500 to-amber-500",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
    textColor: "text-orange-600 dark:text-orange-400",
    borderColor: "border-orange-200 dark:border-orange-800",
    tagline: "Melhor para escalabilidade em nuvem",
    pricing: "$0.001/imagem (1M) | $0.10/min vídeo",
    freeTier: "5,000 análises/mês (12 meses)",
    accuracy: "99.8%+",
    speed: "280-450ms (cloud)",
    bestFor: ["Análise em massa", "Vídeo em cloud", "KYC empresarial"],
    pros: ["Face Collections: indexa milhões de rostos", "Integração nativa AWS", "Análise de vídeo em tempo real"],
    cons: ["Lock-in AWS", "Custo escala rápido em vídeo", "Latência alta para uso real-time"],
    documentaryScore: 8,
    lowQualityScore: 7,
    link: "https://aws.amazon.com/rekognition/",
    docs: "https://docs.aws.amazon.com/rekognition/",
  },
  {
    name: "Azure Face API",
    provider: "Microsoft",
    icon: <CloudRain className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50 dark:bg-blue-950/20",
    textColor: "text-blue-600 dark:text-blue-400",
    borderColor: "border-blue-200 dark:border-blue-800",
    tagline: "Melhor para compliance empresarial",
    pricing: "$1/1,000 transações (até 1M)",
    freeTier: "30,000 transações/mês",
    accuracy: "99.8%+",
    speed: "200-350ms (cloud)",
    bestFor: ["Healthcare", "Banking", "Entreprise ID"],
    pros: ["Certificações HIPAA, FedRAMP High", "Liveness detection", "Docker container on-premise"],
    cons: ["Emoção/gender retirados (Responsible AI)", "Limited Access para identification", "Proibido para polícia EUA"],
    documentaryScore: 7,
    lowQualityScore: 8,
    link: "https://azure.microsoft.com/services/cognitive-services/face/",
    docs: "https://docs.microsoft.com/azure/cognitive-services/face/",
  },
  {
    name: "Google Cloud Vision",
    provider: "Google",
    icon: <Sun className="w-6 h-6" />,
    color: "from-green-500 to-teal-500",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    textColor: "text-green-600 dark:text-green-400",
    borderColor: "border-green-200 dark:border-green-800",
    tagline: "Detecção, NÃO reconhecimento",
    pricing: "$1.50/1,000 unidades",
    freeTier: "1,000 unidades/mês por feature",
    accuracy: "99.5% (detecção)",
    speed: "250-400ms (cloud)",
    bestFor: ["Análise geral de imagem", "OCR", "Content moderation"],
    pros: ["Excelente OCR multilingue", "Múltiplas features em uma API", "Documentação robusta"],
    cons: ["NÃO faz reconhecimento facial (1:N)", "Não identifica pessoas", "Apenas detecção + atributos"],
    documentaryScore: 5,
    lowQualityScore: 6,
    link: "https://cloud.google.com/vision",
    docs: "https://cloud.google.com/vision/docs",
  },
  {
    name: "Face++ (Megvii)",
    provider: "Megvii",
    icon: <Star className="w-6 h-6" />,
    color: "from-red-500 to-pink-500",
    bgColor: "bg-red-50 dark:bg-red-950/20",
    textColor: "text-red-600 dark:text-red-400",
    borderColor: "border-red-200 dark:border-red-800",
    tagline: "Líder na Ásia, rico em features",
    pricing: "Sob consulta (por volume)",
    freeTier: "Tier gratuito para testes",
    accuracy: "99.8%+",
    speed: "150-300ms",
    bestFor: ["Mercado asiático", "KYC fintech", "Análise demográfica"],
    pros: ["Reconhecimento de gestos", "Análise corporal", "Liveness detection avançado"],
    cons: ["U.S. Entity List", "Documentação inconsistente", "Performance varia por região"],
    documentaryScore: 6,
    lowQualityScore: 7,
    link: "https://www.faceplusplus.com/",
    docs: "https://console.faceplusplus.com/documents/5679127",
  },
  {
    name: "Banuba Face API",
    provider: "Banuba",
    icon: <Smartphone className="w-6 h-6" />,
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    textColor: "text-purple-600 dark:text-purple-400",
    borderColor: "border-purple-200 dark:border-purple-800",
    tagline: "Melhor para mobile e real-time",
    pricing: "Baseado em MAU (contato vendas)",
    freeTier: "14 dias trial completo",
    accuracy: "99.7%+",
    speed: "~18ms (on-device!)",
    bestFor: ["Apps mobile", "AR/try-on", "Real-time tracking"],
    pros: ["Processamento on-device", "68 landmarks 3D", "Funciona offline", "30-60 FPS"],
    cons: ["Preço não público", "Foco em mobile", "Menos para batch processing"],
    documentaryScore: 4,
    lowQualityScore: 5,
    link: "https://www.banuba.com/face-api",
    docs: "https://docs.banuba.com/face-ar-sdk-v1",
  },
  {
    name: "NEC Face Recognition",
    provider: "NEC",
    icon: <Shield className="w-6 h-6" />,
    color: "from-slate-600 to-slate-800",
    bgColor: "bg-slate-50 dark:bg-slate-950/20",
    textColor: "text-slate-600 dark:text-slate-400",
    borderColor: "border-slate-200 dark:border-slate-800",
    tagline: "#1 NIST FRTE 2025 - Mais preciso do mundo",
    pricing: "Enterprise (sob consulta)",
    freeTier: "Não disponível",
    accuracy: "99.93% (NIST #1)",
    speed: "100-200ms",
    bestFor: ["Governo", "Aeroportos", "Border control"],
    pros: ["Mais preciso do mundo (NIST)", "Top em aging tests", "80+ aeroportos globais"],
    cons: ["Preço enterprise exclusivo", "Foco governamental", "Complexo de integrar"],
    documentaryScore: 7,
    lowQualityScore: 9,
    link: "https://www.nec.com/en/global/solutions/biometrics/face/",
    docs: "https://www.nec.com/en/global/solutions/biometrics/face/index.html",
  },
];

function ScoreBar({ score, label }: { score: number; label: string }) {
  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="text-muted-foreground w-24">{label}</span>
      <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full ${
            score >= 8 ? "bg-green-500" : score >= 6 ? "bg-yellow-500" : "bg-red-500"
          }`}
          style={{ width: `${score * 10}%` }}
        />
      </div>
      <span className="font-bold w-6 text-right">{score}/10</span>
    </div>
  );
}

export default function APIOverview() {
  return (
    <section id="apis" className="py-20 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Principais APIs de Reconhecimento Facial</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Análise detalhada das 6 principais APIs do mercado em 2025, com preços, 
            velocidade e pontuação específica para uso em documentários.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {apis.map((api) => (
            <Card 
              key={api.name} 
              className={`group hover:shadow-xl transition-all duration-300 border-2 ${api.borderColor} overflow-hidden`}
            >
              <CardHeader className={`${api.bgColor} border-b ${api.borderColor}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${api.color} text-white`}>
                      {api.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{api.name}</CardTitle>
                      <p className={`text-xs font-medium ${api.textColor}`}>{api.provider}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">{api.tagline}</Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-muted-foreground text-xs">Preço</span>
                    <p className="font-medium">{api.pricing}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Free Tier</span>
                    <p className="font-medium">{api.freeTier}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Precisão</span>
                    <p className="font-medium">{api.accuracy}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground text-xs">Velocidade</span>
                    <p className="font-medium">{api.speed}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <ScoreBar score={api.documentaryScore} label="Documentários" />
                  <ScoreBar score={api.lowQualityScore} label="Baixa Qualidade" />
                </div>

                <div>
                  <span className="text-xs text-muted-foreground">Melhor para:</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {api.bestFor.map((use) => (
                      <Badge key={use} variant="secondary" className="text-xs">{use}</Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-2">
                  <div>
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> Vantagens
                    </span>
                    <ul className="text-xs text-muted-foreground mt-1 space-y-0.5">
                      {api.pros.map((p) => (
                        <li key={p}>• {p}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <span className="text-xs text-red-600 dark:text-red-400 font-medium flex items-center gap-1">
                      <XCircle className="w-3 h-3" /> Desvantagens
                    </span>
                    <ul className="text-xs text-muted-foreground mt-1 space-y-0.5">
                      {api.cons.map((c) => (
                        <li key={c}>• {c}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button 
                    size="sm" 
                    className={`flex-1 bg-gradient-to-r ${api.color} text-white`}
                    asChild
                  >
                    <a href={api.link} target="_blank" rel="noopener noreferrer">Site Oficial</a>
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1" asChild>
                    <a href={api.docs} target="_blank" rel="noopener noreferrer">Documentação</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
