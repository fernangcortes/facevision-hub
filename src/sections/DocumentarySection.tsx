import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Film, Camera, AlertTriangle, CheckCircle, 
  Lightbulb, Sparkles, ArrowRight, Info
} from "lucide-react";

const challenges = [
  {
    problem: "Imagens granuladas/VHS",
    description: "Footage de arquivo em fitas VHS, Hi8 ou filmes antigos com ruído e baixa resolução.",
    solution: "Use pré-processamento com GFPGAN ou CodeFormer para restauração facial antes do reconhecimento. APIs como Azure Face API têm atributos de qualidade (blur, noise) que ajudam a filtrar frames.",
    apis: ["Azure Face API", "InsightFace", "CompreFace"],
    tool: "Topaz Video AI (Starlight model)",
    toolLink: "https://www.topazlabs.com/topaz-video",
  },
  {
    problem: "Rostos pequenos ou distantes",
    description: "Em footage de rua, eventos ou multidões, os rostos podem ser muito pequenos para detecção.",
    solution: "RetinaFace e YuNet são os melhores detectores para rostos pequenos. Faça upscaling do vídeo antes (2x ou 4x) ou use modelos treinados especificamente para TinyFace.",
    apis: ["InsightFace (RetinaFace)", "DeepFace + RetinaFace backend"],
    tool: "Pixelift Video Face Restore",
    toolLink: "https://pixelift.pl/en/ai-video/face-restore",
  },
  {
    problem: "Iluminação ruim ou escura",
    description: "Footage noturno, interiores mal iluminados ou filmes com exposição irregular.",
    solution: "InsightFace com modelo 'buffalo_l' lida bem com iluminação variada. Para pré-processamento, use correção de exposição automática com OpenCV ou modelos de enhancement.",
    apis: ["InsightFace", "AWS Rekognition", "NEC"],
    tool: "Topaz Video AI (Iris model para rostos)",
    toolLink: "https://www.topazlabs.com/topaz-video",
  },
  {
    problem: "Múltiplos ângulos e poses",
    description: "Pessoas não olhando para câmera, perfis ou ângulos extremos comuns em footage documental.",
    solution: "NEC e Paravision são #1 em NIST para poses difíceis (MUGSHOT-PROFILE 90°). InsightFace também tem bom suporte a múltiplos ângulos.",
    apis: ["NEC", "Paravision", "InsightFace"],
    tool: "Apify Face Recognition (DeepFace)",
    toolLink: "https://apify.com/syntellect_ai/face-recognition-api",
  },
  {
    problem: "Envelhecimento facial",
    description: "Identificar a mesma pessoa em footage ao longo de décadas com mudanças naturais de aparência.",
    solution: "NEC é #1 em NIST FRTE Aging Tests (10+ anos de diferença). Para projetos documentais, treine uma coleção com fotos de diferentes épocas.",
    apis: ["NEC", "AWS Rekognition (Face Collections)", "Azure Face API"],
    tool: "CompreFace (self-hosted collection)",
    toolLink: "https://github.com/exadel-inc/CompreFace",
  },
];

const recommendedWorkflow = [
  {
    step: 1, title: "Extração de Frames",
    description: "Extraia frames do B-roll usando FFmpeg (1fps é suficiente para a maioria dos casos). Para vídeo de 30fps, 1 frame por segundo reduz processamento em 97%.",
    command: "ffmpeg -i input.mp4 -vf \"fps=1,scale=1280:-1\" frames/%04d.jpg",
    tip: "Use fps=0.5 para footage longo ou fps=2 para cenas com muito movimento.",
  },
  {
    step: 2, title: "Pré-processamento / Restauração",
    description: "Aplique restauração facial com GFPGAN ou enhancement geral com Topaz. Para batch processing, use Replicate API com GFPGAN ($0.0029/imagem).",
    command: "# Usando Replicate API\ncurl -X POST https://api.replicate.com/v1/predictions",
    tip: "Pule este passo se a qualidade já for boa. Use apenas para VHS, filmes antigos ou footage comprimido.",
  },
  {
    step: 3, title: "Detecção e Agrupamento Facial",
    description: "Use CompreFace (self-hosted) ou AWS Rekognition Face Collections para detectar e agrupar rostos. Crie uma 'collection' por projeto ou episódio.",
    command: "# AWS Rekognition\naws rekognition create-collection --collection-name doc_project_001",
    tip: "CompreFace é ideal para documentários: sem custo por chamada, web UI para gerenciar coleções, e mantém dados locais.",
  },
  {
    step: 4, title: "Identificação Manual ou Assistida",
    description: "Revise os grupos de rostos gerados e atribua nomes. Use a interface web do CompreFace ou construa uma UI simples com os resultados da API.",
    command: "# Buscar rosto em coleção\ncurl -X POST http://localhost:8000/api/v1/recognition/recognize",
    tip: "Sempre revise manualmente. Nenhuma API é 100% precisa com footage de arquivo.",
  },
  {
    step: 5, title: "Integração com Edit (Optional)",
    description: "Exporte metadados com timestamps para seu NLE (Premiere, DaVinci Resolve, Final Cut). Crie markers ou subclips automaticamente.",
    command: "# Gerar EDL ou XML com timestamps\npython3 generate_markers.py --faces \"John Doe,Jane Smith\"",
    tip: "Formatos como CSV com timecode são universalmente compatíveis.",
  },
];

export default function DocumentarySection() {
  return (
    <section id="documentarios" className="py-20 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">Foco Especial</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">B-Roll de Documentário & Arquivo</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Reconhecimento facial em footage documental apresenta desafios únicos:
            baixa resolução, iluminação ruim, múltiplos ângulos e envelhecimento.
          </p>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><AlertTriangle className="w-6 h-6 text-yellow-500" />Desafios Comuns e Soluções</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {challenges.map((c) => (
              <Card key={c.problem} className="border-l-4 border-l-yellow-400 hover:shadow-lg transition-all">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2"><Film className="w-4 h-4 text-yellow-500" />{c.problem}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{c.description}</p>
                  <div>
                    <span className="text-xs font-semibold text-green-600 dark:text-green-400 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Solução</span>
                    <p className="text-sm mt-1">{c.solution}</p>
                  </div>
                  <div className="flex items-center gap-2 pt-1">
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    <span className="text-xs font-medium">Ferramenta:</span>
                    <a href={c.toolLink} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline font-medium">{c.tool}</a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><Camera className="w-6 h-6 text-blue-500" />Workflow Recomendado para Documentários</h3>
          <div className="space-y-4">
            {recommendedWorkflow.map((w) => (
              <Card key={w.step} className="overflow-hidden hover:shadow-md transition-all">
                <div className="flex flex-col sm:flex-row">
                  <div className="sm:w-12 bg-gradient-to-b from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shrink-0">{w.step}</div>
                  <div className="p-4 flex-1">
                    <h4 className="font-bold text-lg mb-1">{w.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{w.description}</p>
                    <div className="bg-muted rounded-lg p-3 mb-2"><code className="text-xs font-mono text-foreground break-all">{w.command}</code></div>
                    <div className="flex items-start gap-2 text-xs text-yellow-700 dark:text-yellow-300"><Lightbulb className="w-3 h-3 mt-0.5 shrink-0" /><span>{w.tip}</span></div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2"><Sparkles className="w-6 h-6 text-purple-500" />Top 3 Escolhas para Documentários</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { badge: "#1 Custo-Benefício", badgeColor: "bg-yellow-500", title: "CompreFace", desc: "Self-hosted, sem custo por chamada",
                features: ["Sem custo por minuto de vídeo", "Web UI para gerenciar coleções", "Docker, GPU opcional", "Dados permanecem locais"],
                link: "https://github.com/exadel-inc/CompreFace" },
              { badge: "#1 Escala Cloud", badgeColor: "bg-blue-500", title: "AWS Rekognition", desc: "Melhor para grandes volumes",
                features: ["Face Collections: milhões de rostos", "Análise de vídeo nativa", "$0.001/imagem (até 1M)", "Free tier 5K/mês x 12 meses"],
                link: "https://aws.amazon.com/rekognition/pricing/" },
              { badge: "#1 Precisão", badgeColor: "bg-purple-500", title: "NEC", desc: "#1 NIST FRTE 2025",
                features: ["99.93% precisão (NIST #1)", "#1 em aging test (10+ anos)", "Excelente com baixa qualidade", "Enterprise (sob consulta)"],
                link: "https://www.nec.com/en/global/solutions/biometrics/face/" },
            ].map((pick) => (
              <Card key={pick.title} className={`border-2 ${pick.badgeColor === 'bg-yellow-500' ? 'border-yellow-400' : pick.badgeColor === 'bg-blue-500' ? 'border-blue-400' : 'border-purple-400'}`}>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2"><Badge className={`${pick.badgeColor} text-white`}>{pick.badge}</Badge></div>
                  <CardTitle className="text-xl">{pick.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">{pick.desc}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ul className="text-sm space-y-1">
                    {pick.features.map((f) => (
                      <li key={f} className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />{f}</li>
                    ))}
                  </ul>
                  <Button size="sm" className="w-full mt-2" asChild>
                    <a href={pick.link} target="_blank" rel="noopener noreferrer">Ver <ArrowRight className="w-4 h-4 ml-1" /></a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-12 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <h4 className="font-bold text-lg mb-3 flex items-center gap-2"><Info className="w-5 h-5 text-blue-500" />Estimativa de Custo para Projeto Documental</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="bg-white dark:bg-slate-900 rounded-lg p-4">
              <p className="font-bold text-blue-600 dark:text-blue-400">Projeto Pequeno</p>
              <p className="text-2xl font-bold my-1">$0 - $50</p>
              <p className="text-muted-foreground text-xs">10h de footage, CompreFace self-hosted + free tiers cloud</p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-lg p-4">
              <p className="font-bold text-indigo-600 dark:text-indigo-400">Projeto Médio</p>
              <p className="text-2xl font-bold my-1">$200 - $800</p>
              <p className="text-muted-foreground text-xs">100h de footage, AWS Rekognition + pré-processamento</p>
            </div>
            <div className="bg-white dark:bg-slate-900 rounded-lg p-4">
              <p className="font-bold text-purple-600 dark:text-purple-400">Projeto Grande</p>
              <p className="text-2xl font-bold my-1">$2,000+</p>
              <p className="text-muted-foreground text-xs">500h+ de footage, solução híbrida ou NEC enterprise</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
