import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Star, CheckCircle } from "lucide-react";

const openSourceTools = [
  {
    name: "InsightFace", repo: "deepinsight/insightface", stars: "24k+", language: "Python", license: "MIT", accuracy: "99.86% LFW",
    description: "Biblioteca open-source com state-of-the-art detection (SCRFD, RetinaFace) e recognition (ArcFace).",
    features: ["ArcFace embeddings 512-d", "RetinaFace detection", "Suporte a GPU/CPU", "Model Zoo completo"],
    bestFor: "Equipes com infraestrutura ML que precisam de controle total.", difficulty: "Avançado", docker: true, gpu: "Recomendado",
    link: "https://github.com/deepinsight/insightface",
  },
  {
    name: "CompreFace", repo: "exadel-inc/CompreFace", stars: "5.5k+", language: "Java/Python", license: "Apache 2.0", accuracy: "99.5% LFW",
    description: "Sistema de reconhecimento facial self-hosted com REST API e web UI. Deploy com Docker Compose em minutos.",
    features: ["REST API completa", "Web UI admin", "FaceNet + InsightFace", "Suporte GPU"],
    bestFor: "Documentários e projetos que precisam de self-hosted.", difficulty: "Iniciante", docker: true, gpu: "Opcional",
    link: "https://github.com/exadel-inc/CompreFace",
  },
  {
    name: "DeepFace", repo: "serengil/deepface", stars: "16k+", language: "Python", license: "MIT", accuracy: "99.4% LFW",
    description: "Wrapper Python unificado para 8+ backends. Ideal para prototipagem e benchmarking.",
    features: ["8 backends trocáveis", "Análise demográfica", "Pure Python", "API REST incluída"],
    bestFor: "Prototipagem rápida, hackathons, e benchmarking.", difficulty: "Iniciante", docker: false, gpu: "Opcional",
    link: "https://github.com/serengil/deepface",
  },
  {
    name: "face_recognition (Dlib)", repo: "ageitgey/face_recognition", stars: "53k+", language: "Python/C++", license: "Boost", accuracy: "99.38% LFW",
    description: "A biblioteca mais amigável para iniciantes. Wrapper Python do Dlib com API extremamente simples.",
    features: ["API em 10 linhas", "99.38% LFW", "Leve (CPU-only)", "Sem dependências pesadas"],
    bestFor: "Iniciantes, projetos educacionais, aplicações desktop sem GPU.", difficulty: "Iniciante", docker: true, gpu: "Não suportado",
    link: "https://github.com/ageitgey/face_recognition",
  },
  {
    name: "ClipCatalog", repo: "N/A (Desktop App)", stars: "N/A", language: "C++", license: "Proprietário (freemium)", accuracy: "Bom (YuNet + SFace)",
    description: "Software Windows 100% local para face recognition em bibliotecas de vídeo. Processa on-device.",
    features: ["100% offline", "Detecção YuNet", "Embeddings SFace", "FAISS index local"],
    bestFor: "Editores de documentário que trabalham com Windows.", difficulty: "Iniciante", docker: false, gpu: "Usa se disponível",
    link: "https://clipcatalogpro.com/features/face-recognition",
  },
];

export default function OpenSourceSection() {
  return (
    <section id="opensource" className="py-20 bg-muted/30 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300">Gratuito & Self-Hosted</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Open Source & Self-Hosted</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Ferramentas open-source com performance comparável às APIs pagas, sem custo por chamada.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {openSourceTools.map((tool) => (
            <Card key={tool.name} className="hover:shadow-lg transition-all overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800"><Github className="w-5 h-5" /></div>
                    <div>
                      <CardTitle className="text-lg">{tool.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">{tool.repo}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs flex items-center gap-1"><Star className="w-3 h-3" />{tool.stars}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">{tool.language}</Badge>
                  <Badge variant="secondary" className="text-xs">{tool.license}</Badge>
                  <Badge className="text-xs bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">{tool.accuracy}</Badge>
                </div>
                <p className="text-sm">{tool.description}</p>
                <ul className="text-sm space-y-1">
                  {tool.features.map((f) => (
                    <li key={f} className="flex items-start gap-2"><CheckCircle className="w-3 h-3 text-green-500 mt-1 shrink-0" />{f}</li>
                  ))}
                </ul>
                <Button size="sm" className="w-full" asChild><a href={tool.link} target="_blank" rel="noopener noreferrer"><Github className="w-4 h-4 mr-1" />Acessar</a></Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-12 p-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-xl border border-green-200 dark:border-green-800">
          <h4 className="font-bold text-lg mb-4">Self-Hosted vs Cloud?</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
            <div>
              <p className="font-semibold text-green-700 dark:text-green-300 mb-2">Escolha Self-Hosted quando:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Orçamento limitado</li><li>• Privacidade é crítica</li><li>• Volumes previsíveis</li><li>• Necessita customização</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Escolha Cloud quando:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Volume variável</li><li>• Não quer gerenciar infra</li><li>• Necessita SLA</li><li>• Time-to-market crítico</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
