import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, Shield, Brain, Zap, Calendar, ExternalLink } from "lucide-react";

const newsItems = [
  { date: "Abril 2025", category: "NIST", icon: <Award className="w-5 h-5 text-yellow-500" />, title: "NEC #1 no NIST FRTE 1:N 2025", description: "A NEC Corporation foi ranqueada como a tecnologia de reconhecimento facial mais precisa do mundo no benchmark NIST FRTE 1:N. Taxa de erro de apenas 0.07% em banco de 12 milhões de rostos.", impact: "Alta", source: "https://www.nec.com/en/press/202504/global_20250409_01.html" },
  { date: "Julho 2025", category: "NIST", icon: <Award className="w-5 h-5 text-yellow-500" />, title: "Paravision Gen 7 - Top 5 Global", description: "A Paravision lançou sua 7ª geração, alcançando top 5 global no NIST FRTE. Redução de 66.6% em erros para perfis 90° e 22.8% em aging border cases.", impact: "Alta", source: "https://www.paravision.ai/news/paravision-delivers-world-class-performance-in-latest-nist-frte-evaluations-ranking-in-top-5-globally-for-both-face-verification-and-identification/" },
  { date: "Março 2025", category: "NIST", icon: <Award className="w-5 h-5 text-yellow-500" />, title: "Facephi Lidera Ranking NIST 1:1", description: "O novo SDK facephi-002 alcançou posição de destaque no ranking global de verificação NIST FRTE 1:1. 99.9999% de precisão em autenticação.", impact: "Alta", source: "https://facephi.com/en/noticias/facephi-leads-nist-ranking/" },
  { date: "2024-2025", category: "Responsible AI", icon: <Shield className="w-5 h-5 text-blue-500" />, title: "Microsoft Restringe Azure Face API", description: "Em sua política de Responsible AI, a Microsoft removeu detecção de emoção e estimativa de gênero do Azure Face API. Movimento seguido por outras big techs.", impact: "Alta", source: "https://azure.microsoft.com/en-us/pricing/details/cognitive-services/face-api/" },
  { date: "Maio 2026", category: "Open Source", icon: <Brain className="w-5 h-5 text-purple-500" />, title: "InsightFace 1.0 com GUI Desktop", description: "O InsightFace lançou a versão 1.0 com GUI desktop demo. Continua sendo o padrão ouro para precisão (99.86% LFW) com código aberto.", impact: "Média", source: "https://github.com/deepinsight/insightface" },
  { date: "2024-2025", category: "Restauração", icon: <Zap className="w-5 h-5 text-green-500" />, title: "GFPGAN v1.4 - Restauração Facial Avançada", description: "A Tencent lançou a versão 1.4 do GFPGAN, tornando-se o padrão para restauração de faces em vídeo antigo. Disponível via Replicate por $0.0029 por imagem.", impact: "Alta", source: "https://replicate.com/tencentarc/gfpgan" },
  { date: "2024", category: "Pesquisa", icon: <Brain className="w-5 h-5 text-pink-500" />, title: "Benchmark RFV-LQ para Vídeo de Baixa Qualidade", description: "Novo benchmark 'Real-world Low-Quality Face Video' com 329 tracks de vídeo degradado coletados de talk shows antigos, séries de TV e filmes.", impact: "Alta", source: "https://arxiv.org/abs/2410.11828" },
  { date: "2024-2025", category: "Documentários", icon: <Zap className="w-5 h-5 text-orange-500" />, title: "Topaz Video AI Usado em Produções Reais", description: "O documentário 'Secret Mall Apartment' (2024) usou Topaz Video AI para upscaling de 25 horas de footage para release teatral HD.", impact: "Média", source: "https://www.topazlabs.com/topaz-video" },
];

export default function NewsSection() {
  return (
    <section id="novidades" className="py-20 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300">Atualizado 2024-2025</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Novidades & Tendências</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">As principais novidades do mundo do reconhecimento facial: resultados NIST, lançamentos de ferramentas, e pesquisas relevantes para documentários.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((news, i) => (
            <Card key={i} className="hover:shadow-lg transition-all group">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">{news.icon}<Badge variant="outline" className="text-xs">{news.category}</Badge></div>
                  <span className="text-xs text-muted-foreground flex items-center gap-1"><Calendar className="w-3 h-3" />{news.date}</span>
                </div>
                <CardTitle className="text-base leading-tight group-hover:text-primary transition-colors">
                  <a href={news.source} target="_blank" rel="noopener noreferrer" className="flex items-start gap-1">{news.title}<ExternalLink className="w-3 h-3 mt-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" /></a>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{news.description}</p>
                <Badge variant={news.impact === "Alta" ? "default" : "secondary"} className="text-xs">Impacto: {news.impact}</Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
