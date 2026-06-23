import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Layers, Cpu, Cloud, CloudRain, Shield, Brain,
  Hand, Database, GitBranch, CheckCircle, ArrowRight,
  Code, Settings, ExternalLink, Info
} from "lucide-react";

const tierPipeline = [
  {
    tier: 0, name: "YuNet + SFace", subtitle: "Local CPU — Offline — Gratuito",
    color: "from-green-500 to-emerald-600", bgColor: "bg-green-50 dark:bg-green-950/20",
    borderColor: "border-green-200 dark:border-green-800", textColor: "text-green-600 dark:text-green-400",
    icon: <Cpu className="w-6 h-6" />, speed: "~2-5s por imagem", cost: "R$ 0,00", accuracy: "Boa (85%+)",
    embedding: "128 dimensões", when: "PRIMEIRA PASSADA em todos os arquivos",
    description: "Detecção YuNet + embeddings SFace 100% local em CPU. Sem internet, sem custo.",
    setup: "pip install opencv-python-headless numpy", envVars: [],
  },
  {
    tier: 1, name: "Azure Face API", subtitle: "Cloud — Free Tier 30K/mês",
    color: "from-blue-500 to-cyan-500", bgColor: "bg-blue-50 dark:bg-blue-950/20",
    borderColor: "border-blue-200 dark:border-blue-800", textColor: "text-blue-600 dark:text-blue-400",
    icon: <CloudRain className="w-6 h-6" />, speed: "200-400ms", cost: "R$ 0,00 (free tier)", accuracy: "Muito boa (92%+)",
    embedding: "Atributos de qualidade", when: "REFINAR faces com confiança < 0.7",
    description: "Detecção avançada com atributos de qualidade (blur, noise, exposure).",
    setup: "Criar recurso no portal.azure.com → tier Free F0",
    envVars: [
      { name: "AZURE_FACE_ENDPOINT", example: "https://seu-nome.cognitiveservices.azure.com/" },
      { name: "AZURE_FACE_KEY", example: "sua-chave-aqui" },
    ],
  },
  {
    tier: 2, name: "AWS Rekognition", subtitle: "Cloud — Free Tier 1K/mês x 12 meses",
    color: "from-orange-500 to-amber-500", bgColor: "bg-orange-50 dark:bg-orange-950/20",
    borderColor: "border-orange-200 dark:border-orange-800", textColor: "text-orange-600 dark:text-orange-400",
    icon: <Cloud className="w-6 h-6" />, speed: "300-500ms", cost: "$0.001/imagem", accuracy: "Excelente (95%+)",
    embedding: "Face Collections 1:N", when: "MATERIAL CRÍTICO e grande volume",
    description: "Face Collections indexam milhões de rostos. Melhor para identificar pessoas recorrentes.",
    setup: "IAM user + AmazonRekognitionFullAccess policy",
    envVars: [
      { name: "AWS_ACCESS_KEY_ID", example: "AKIAXXXXXXXXXXXXXXXX" },
      { name: "AWS_SECRET_ACCESS_KEY", example: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" },
      { name: "AWS_REGION", example: "us-east-1" },
    ],
  },
  {
    tier: 3, name: "InsightFace (ArcFace)", subtitle: "GPU Local — State-of-the-Art",
    color: "from-purple-500 to-violet-600", bgColor: "bg-purple-50 dark:bg-purple-950/20",
    borderColor: "border-purple-200 dark:border-purple-800", textColor: "text-purple-600 dark:text-purple-400",
    icon: <Brain className="w-6 h-6" />, speed: "50-200ms (GPU)", cost: "R$ 0,00 (energia)", accuracy: "99.86% LFW — SOTA",
    embedding: "512 dimensões", when: "ARQUIVOS ESPECÍFICOS selecionados pelo usuário",
    description: "RetinaFace detection + ArcFace embeddings 512-d. Requer GPU NVIDIA + CUDA.",
    setup: "pip install insightface onnxruntime-gpu", envVars: [],
  },
  {
    tier: 4, name: "Operador Manual", subtitle: "Julgamento Humano — 100% Precisão",
    color: "from-red-500 to-pink-500", bgColor: "bg-red-50 dark:bg-red-950/20",
    borderColor: "border-red-200 dark:border-red-800", textColor: "text-red-600 dark:text-red-400",
    icon: <Hand className="w-6 h-6" />, speed: "Tempo humano", cost: "R$ 0,00 (seu tempo)", accuracy: "100% contextual",
    embedding: "N/A", when: "CONFIRMAÇÃO FINAL de identidades importantes",
    description: "O operador confirma manualmente. Status 'confirmed' SEMPRE prevalece sobre todos os modelos.",
    setup: "Interface web inclusa no CapIAu Talho", envVars: [],
  },
];

const awsServices = [
  { priority: "Alta", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300", service: "Amazon Rekognition", useInCapiau: "Tier 2 do pipeline — Face Collections, detecção e reconhecimento", cost: "$0.001/imagem (free: 1K/mês x 12)", status: "Implementado" },
  { priority: "Alta", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300", service: "Amazon S3", useInCapiau: "Backup de projetos, armazenar crops de faces, exports", cost: "~R$ 0-5/mês", status: "Recomendado" },
  { priority: "Alta", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300", service: "Amazon Transcribe", useInCapiau: "Fallback do AssemblyAI — transcrição pt-BR com diarização", cost: "$0.024/min", status: "Recomendado" },
  { priority: "Média", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300", service: "Amazon Bedrock", useInCapiau: "Fallback do OpenRouter — Claude 3.5 Sonnet", cost: "Similar ao OpenRouter", status: "Útil depois" },
  { priority: "Média", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300", service: "Amazon Comprehend", useInCapiau: "NLP: entity extraction, sentiment analysis", cost: "$0.0001/char", status: "Útil depois" },
  { priority: "Baixa", color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300", service: "Polly, SageMaker, Lambda, SES", useInCapiau: "Não justifica agora — complexidade sem benefício imediato", cost: "Variável", status: "Não agora" },
];

const iamPolicy = `{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "RekognitionFaceRecognition",
      "Effect": "Allow",
      "Action": [
        "rekognition:DetectFaces", "rekognition:CompareFaces",
        "rekognition:SearchFacesByImage", "rekognition:IndexFaces",
        "rekognition:CreateCollection", "rekognition:DescribeCollections"
      ],
      "Resource": "*"
    },
    {
      "Sid": "TranscribeAudio",
      "Effect": "Allow",
      "Action": ["transcribe:StartTranscriptionJob", "transcribe:GetTranscriptionJob"],
      "Resource": "*"
    },
    {
      "Sid": "S3Storage",
      "Effect": "Allow",
      "Action": ["s3:PutObject", "s3:GetObject", "s3:DeleteObject", "s3:ListBucket"],
      "Resource": ["arn:aws:s3:::capiau-backups-*", "arn:aws:s3:::capiau-backups-*/*"]
    }
  ]
}`;

export default function CapIAuTalho() {
  const [activeTier, setActiveTier] = useState(0);

  return (
    <section id="capiau" className="py-20 bg-gradient-to-b from-orange-50/50 to-transparent dark:from-orange-950/10 dark:to-transparent scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 px-4 py-1.5 text-sm bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800">Pipeline em Cascata</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">CapIAu Talho — Reconhecimento Facial Inteligente</h2>
          <p className="text-muted-foreground max-w-3xl mx-auto text-lg">
            Sistema de <strong>5 tiers em cascata</strong> que vai do reconhecimento mais rápido possível
            (offline, grátis) até a confirmação manual com precisão humana. Sem conflitos no banco de dados.
          </p>
        </div>

        {/* Pipeline Visual */}
        <div className="mb-16">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Layers className="w-6 h-6 text-orange-500" />O Pipeline — 5 Tiers</h3>
          <div className="flex flex-col lg:flex-row gap-4 items-stretch">
            {tierPipeline.map((t, i) => (
              <div key={t.tier} className="flex-1 flex flex-col">
                {i > 0 && <div className="hidden lg:flex items-center justify-center mb-2"><ArrowRight className="w-4 h-4 text-muted-foreground" /></div>}
                <Card className={`flex-1 border-2 ${t.borderColor} cursor-pointer transition-all hover:shadow-lg ${activeTier === t.tier ? "ring-2 ring-offset-2 ring-orange-400" : ""}`} onClick={() => setActiveTier(t.tier)}>
                  <CardHeader className={`${t.bgColor} pb-3`}>
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${t.color} text-white`}>{t.icon}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold bg-white dark:bg-slate-800 px-2 py-0.5 rounded">Tier {t.tier}</span>
                          <CardTitle className="text-base">{t.name}</CardTitle>
                        </div>
                        <p className={`text-xs ${t.textColor} font-medium`}>{t.subtitle}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-2 text-sm">
                    <p className="text-muted-foreground">{t.description}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div><span className="text-muted-foreground">Velocidade:</span> <span className="font-medium">{t.speed}</span></div>
                      <div><span className="text-muted-foreground">Custo:</span> <span className="font-medium">{t.cost}</span></div>
                      <div><span className="text-muted-foreground">Precisão:</span> <span className="font-medium">{t.accuracy}</span></div>
                      <div><span className="text-muted-foreground">Embedding:</span> <span className="font-medium">{t.embedding}</span></div>
                    </div>
                    <div className={`text-xs font-semibold ${t.textColor} bg-white dark:bg-slate-900 rounded p-2 border ${t.borderColor}`}><Info className="w-3 h-3 inline mr-1" />{t.when}</div>
                    {t.envVars.length > 0 && (
                      <div className="bg-muted rounded p-2 text-xs font-mono space-y-1">
                        {t.envVars.map((env) => <div key={env.name}><span className="text-green-600 dark:text-green-400">{env.name}</span>=<span className="text-muted-foreground">{env.example}</span></div>)}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Banco de Dados */}
        <div className="mb-16">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Database className="w-6 h-6 text-blue-500" />Como o Banco Evita Conflitos</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-2 border-blue-200 dark:border-blue-800">
              <CardHeader><CardTitle className="text-lg flex items-center gap-2"><GitBranch className="w-5 h-5 text-blue-500" />Separação de Entidades</CardTitle></CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="bg-muted rounded-lg p-3">
                  <p className="font-semibold text-blue-600 dark:text-blue-400">face</p>
                  <p className="text-muted-foreground">Entidade física — uma detecção em um frame/foto. <strong>NUNCA muda.</strong></p>
                </div>
                <div className="flex justify-center"><ArrowRight className="w-4 h-4 text-muted-foreground rotate-90" /></div>
                <div className="bg-muted rounded-lg p-3">
                  <p className="font-semibold text-purple-600 dark:text-purple-400">face_recognition</p>
                  <p className="text-muted-foreground">Evento versionado — um reconhecimento por modelo. <strong>SEMPRE acrescenta.</strong></p>
                </div>
                <div className="flex justify-center"><ArrowRight className="w-4 h-4 text-muted-foreground rotate-90" /></div>
                <div className="bg-muted rounded-lg p-3">
                  <p className="font-semibold text-green-600 dark:text-green-400">person</p>
                  <p className="text-muted-foreground">Identidade consolidada — uma pessoa real. <strong>Confirmada pelo operador.</strong></p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-2 border-purple-200 dark:border-purple-800">
              <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Shield className="w-5 h-5 text-purple-500" />Hierarquia de Precedência</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {[
                  { rule: "status='confirmed'", desc: "Manual sempre ganha", color: "text-red-600 dark:text-red-400" },
                  { rule: "tier DESC", desc: "Modelo mais preciso prevalece", color: "text-purple-600 dark:text-purple-400" },
                  { rule: "recognized_at DESC", desc: "Mais recente prevalece", color: "text-blue-600 dark:text-blue-400" },
                  { rule: "confidence DESC", desc: "Maior score estatístico", color: "text-green-600 dark:text-green-400" },
                ].map((r, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-muted">
                    <span className="w-6 h-6 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                    <div><code className={`text-xs font-bold ${r.color}`}>{r.rule}</code><p className="text-xs text-muted-foreground">{r.desc}</p></div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div className="mt-6 p-4 bg-slate-950 rounded-xl overflow-x-auto">
            <p className="text-xs text-slate-400 mb-2">Exemplo: mesma face analisada por 3 modelos + manual</p>
            <pre className="text-xs text-slate-300">{`face (id=42, photo_id=15)
├── face_recognition (tier=0, model=yunet_sface,    status=auto,       confidence=0.65)
├── face_recognition (tier=1, model=azure_face,      status=auto,       confidence=0.82)
├── face_recognition (tier=3, model=insightface,     status=reviewed,   confidence=0.91)
└── face_recognition (tier=4, model=manual,          status=confirmed,  confidence=1.00)  ← PREVALECE`}</pre>
          </div>
        </div>

        {/* AWS Services */}
        <div className="mb-16">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Cloud className="w-6 h-6 text-orange-500" />Serviços AWS Úteis para o CapIAu Talho</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead><tr className="border-b-2 border-border">
                <th className="text-left p-3 font-bold">Prioridade</th><th className="text-left p-3 font-bold">Serviço AWS</th>
                <th className="text-left p-3 font-bold">Uso no CapIAu Talho</th><th className="text-left p-3 font-bold">Custo</th><th className="text-center p-3 font-bold">Status</th>
              </tr></thead>
              <tbody>
                {awsServices.map((s, i) => (
                  <tr key={i} className={`border-b border-border/50 ${i % 2 === 0 ? "bg-card" : "bg-card/50"}`}>
                    <td className="p-3"><Badge className={`text-xs ${s.color}`}>{s.priority}</Badge></td>
                    <td className="p-3 font-medium">{s.service}</td>
                    <td className="p-3 text-muted-foreground">{s.useInCapiau}</td>
                    <td className="p-3 font-mono text-xs">{s.cost}</td>
                    <td className="p-3 text-center">{s.status === "Implementado" ? <span className="flex items-center justify-center gap-1 text-green-600 dark:text-green-400"><CheckCircle className="w-4 h-4" />{s.status}</span> : <span className="text-muted-foreground">{s.status}</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* IAM Policy */}
        <div className="mb-16">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Settings className="w-6 h-6 text-slate-500" />Política IAM Recomendada</h3>
          <Card>
            <CardContent className="p-0">
              <div className="flex items-center justify-between p-3 bg-muted/50 border-b">
                <span className="text-sm font-medium">capiau-rekognition-policy.json</span>
                <Button size="sm" variant="outline" className="text-xs" onClick={() => navigator.clipboard.writeText(iamPolicy)}>Copiar</Button>
              </div>
              <pre className="p-4 text-xs bg-slate-950 text-slate-300 overflow-x-auto">{iamPolicy}</pre>
            </CardContent>
          </Card>
        </div>

        {/* Tabs: .env + Código */}
        <div className="mb-16">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Code className="w-6 h-6 text-green-500" />Configuração e Código</h3>
          <Tabs defaultValue="env" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
              <TabsTrigger value="env">.env Completo</TabsTrigger>
              <TabsTrigger value="python">Python</TabsTrigger>
              <TabsTrigger value="endpoints">API REST</TabsTrigger>
            </TabsList>
            <TabsContent value="env">
              <Card><CardContent className="p-0">
                <pre className="p-4 text-xs bg-slate-950 text-slate-300 overflow-x-auto">{`# ============================================================
# PIPELINE DE RECONHECIMENTO FACIAL — CapIAu Talho
# ============================================================

# --- Tier 1: Azure Face API (30K free/mês) ---
AZURE_FACE_ENDPOINT=https://SEU-NOME.cognitiveservices.azure.com/
AZURE_FACE_KEY=sua_chave_azure

# --- Tier 2: AWS Rekognition (1K free/mês x 12 meses) ---
AWS_ACCESS_KEY_ID=AKIAXXXXXXXXXXXXXXXX
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
AWS_REGION=us-east-1

# --- AWS S3 (backup de projetos) ---
AWS_S3_BUCKET=capiau-backups-seu-nome

# --- OpenRouter (DeepSeek + Gemini) ---
OPENROUTER_API_KEY=sua_chave_openrouter
TEXT_MODEL=deepseek/deepseek-chat
VISION_MODEL=google/gemini-2.5-flash

# --- AssemblyAI (transcrição principal) ---
ASSEMBLYAI_API_KEY=sua_chave_assemblyai`}</pre>
              </CardContent></Card>
            </TabsContent>
            <TabsContent value="python">
              <Card><CardContent className="p-0">
                <pre className="p-4 text-xs bg-slate-950 text-slate-300 overflow-x-auto">{`# Uso do pipeline em cascata no CapIAu Talho
from src.services.face_service import get_face_service

service = get_face_service()

# 1. PRIMEIRA PASSADA — Tier 0 (local, rápido, grátis)
count = service.detect_faces_in_photo(
    project_id=1, photo_id=15, image_path="/caminho/foto.jpg"
)

# 2. REFINAR face com baixa confiança — Tier 1 (Azure free)
result = service.refine_face(
    face_id=42, image_path="/caminho/foto.jpg", max_tier=2
)

# 3. MÁXIMA PRECISÃO — Tier 3 (InsightFace GPU)
result = service.process_with_precision(
    face_id=42, image_path="/caminho/foto.jpg"
)

# 4. CONFIRMAÇÃO MANUAL — Tier 4 (operador)
service.confirm_face_identity(
    face_id=42, person_id=5, user_id="fernando"
)`}</pre>
              </CardContent></Card>
            </TabsContent>
            <TabsContent value="endpoints">
              <Card><CardContent className="p-4 space-y-2 text-sm">
                {[
                  { method: "GET", path: "/api/faces/pipeline/status", desc: "Quais backends estão disponíveis" },
                  { method: "POST", path: "/api/faces/photo/{id}/detect", desc: "Tier 0 em uma foto" },
                  { method: "POST", path: "/api/faces/video/{id}/frame/detect", desc: "Tier 0 em frame de vídeo" },
                  { method: "POST", path: "/api/faces/face/{id}/refine", desc: "Refina com Tier 1-2" },
                  { method: "POST", path: "/api/faces/face/{id}/precise", desc: "Processa com Tier 3 (GPU)" },
                  { method: "GET", path: "/api/faces/project/{id}/faces", desc: "Todas as faces com reconhecimento autoritativo" },
                  { method: "POST", path: "/api/faces/project/{id}/cluster", desc: "DBSCAN clustering" },
                  { method: "POST", path: "/api/faces/confirm-identity", desc: "Confirma manualmente (Tier 4)" },
                ].map((ep) => (
                  <div key={ep.path} className="flex items-center gap-3 p-2 rounded bg-muted">
                    <Badge variant={ep.method === "GET" ? "default" : "secondary"} className="text-xs w-16 justify-center">{ep.method}</Badge>
                    <code className="text-xs font-mono">{ep.path}</code>
                    <span className="text-xs text-muted-foreground ml-auto">{ep.desc}</span>
                  </div>
                ))}
              </CardContent></Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* GitHub Link */}
        <div className="text-center p-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <h3 className="text-xl font-bold mb-3">Código Fonte no GitHub</h3>
          <p className="text-muted-foreground mb-4 max-w-xl mx-auto">
            O pipeline completo está implementado na branch <code className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded">feature/face-recognition-disambiguation</code> do repositório CapIAu Talho v03.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white" asChild>
            <a href="https://github.com/fernangcortes/capiau-talho-v03/tree/feature/face-recognition-disambiguation" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />Ver Código no GitHub
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
