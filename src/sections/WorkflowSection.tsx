import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wrench, BookOpen, Link2, Code, Terminal, FileVideo, Database } from "lucide-react";

const tools = [
  {
    category: "Restauração de Vídeo",
    items: [
      { name: "Topaz Video AI", price: "$59/mês", desc: "Restauração profissional com modelos Starlight, Iris, Proteus. Usado em documentários reais.", link: "https://www.topazlabs.com/topaz-video" },
      { name: "Pixelift Face Restore", price: "2 créditos/vídeo", desc: "Restauração facial específica com GFPGAN. Automático, online.", link: "https://pixelift.pl/en/ai-video/face-restore" },
      { name: "Picsart AI Video", price: "Free start", desc: "Enhancement geral de vídeo com um clique. Bom para testes rápidos.", link: "https://picsart.com/video-enhancer/" },
    ],
  },
  {
    category: "Restauração de Imagem (Frames)",
    items: [
      { name: "GFPGAN (Replicate)", price: "$0.0029/img", desc: "State-of-the-art face restoration. ~3s por imagem. Preserva identidade.", link: "https://replicate.com/tencentarc/gfpgan" },
      { name: "Topaz Gigapixel", price: "$50/mês", desc: "Upscaling de imagens 6x com Face Recovery. Excelente para frames extraídos.", link: "https://www.topazlabs.com/gigapixel" },
      { name: "CodeFormer", price: "Grátis", desc: "Alternativa ao GFPGAN. Melhor para footage muito degradado.", link: "https://github.com/sczhou/CodeFormer" },
    ],
  },
  {
    category: "Extração & Conversão",
    items: [
      { name: "FFmpeg", price: "Grátis (Open Source)", desc: "Extração de frames, conversão, pré-processamento. Essencial.", link: "https://ffmpeg.org/" },
      { name: "ClipCatalog", price: "Free trial", desc: "Software Windows para indexação e busca facial em bibliotecas de vídeo. 100% local.", link: "https://clipcatalogpro.com/features/face-recognition" },
    ],
  },
  {
    category: "Bibliotecas Python",
    items: [
      { name: "OpenCV", price: "Grátis", desc: "Computer vision básico. Haar cascades e DNN para detecção rápida.", link: "https://opencv.org/" },
      { name: "RetinaFace", price: "Grátis", desc: "Detector de rostos de alta precisão. Melhor para rostos pequenos.", link: "https://github.com/serengil/retinaface" },
      { name: "FAISS (Meta)", price: "Grátis", desc: "Busca de similaridade em escala para embeddings faciais. Milhões de rostos em ms.", link: "https://github.com/facebookresearch/faiss" },
    ],
  },
];

const codeSnippets = [
  {
    title: "Extrair frames com FFmpeg", lang: "bash", icon: <Terminal className="w-4 h-4" />,
    code: `# Extrair 1 frame por segundo\nffmpeg -i documentario.mp4 -vf "fps=1,scale=1280:-1" frames/%04d.jpg\n\n# Extrair frames de segmento específico\nffmpeg -ss 00:10:00 -t 300 -i doc.mp4 -vf "fps=1" segmento/%04d.jpg\n\n# Manter qualidade original\nffmpeg -i doc.mp4 -vf "fps=0.5" -q:v 2 frames/%04d.jpg`,
  },
  {
    title: "Detectar rostos com InsightFace", lang: "python", icon: <Code className="w-4 h-4" />,
    code: `import cv2\nfrom insightface.app import FaceAnalysis\n\napp = FaceAnalysis(name="buffalo_l")\napp.prepare(ctx_id=0, det_size=(640, 640))\n\nimg = cv2.imread("frame_0001.jpg")\nfaces = app.get(img)\n\nfor face in faces:\n    bbox = face.bbox\n    embedding = face.embedding  # 512-d\n    print(f"Rosto: conf={face.det_score:.3f}")`,
  },
  {
    title: "Pipeline Cascata CapIAu", lang: "python", icon: <Code className="w-4 h-4" />,
    code: `from src.services.face_service import get_face_service\n\nservice = get_face_service()\n\n# Tier 0: local, rápido\nservice.detect_faces_in_photo(project_id=1, photo_id=15, image_path="foto.jpg")\n\n# Tier 1-2: refinar com cloud\nservice.refine_face(face_id=42, image_path="foto.jpg", max_tier=2)\n\n# Tier 3: precisão máxima (GPU)\nservice.process_with_precision(face_id=42, image_path="foto.jpg")\n\n# Tier 4: confirmação manual\nservice.confirm_face_identity(face_id=42, person_id=5)`,
  },
];

const resources = [
  { name: "NIST FRTE Results", desc: "Resultados oficiais dos benchmarks NIST", link: "https://pages.nist.gov/frvt/html/frvt1N.html" },
  { name: "NIST FRTE 1:1", desc: "Benchmark de verificação facial", link: "https://pages.nist.gov/frvt/html/frvt11.html" },
  { name: "Awesome Face Recognition", desc: "Curated list de recursos", link: "https://github.com/serengil/awesome-face" },
  { name: "CVF Open Access", desc: "Papers de computer vision (CVPR)", link: "https://openaccess.thecvf.com/" },
  { name: "arXiv CS.CV", desc: "Últimos papers de visão computacional", link: "https://arxiv.org/list/cs.CV/recent" },
];

export default function WorkflowSection() {
  return (
    <section id="workflow" className="py-20 bg-muted/30 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ferramentas & Códigos Práticos</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Coleção de ferramentas complementares, snippets de código e recursos para implementar seu pipeline de reconhecimento facial em documentários.</p>
        </div>
        <Tabs defaultValue="tools" className="w-full">
          <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="tools" className="flex items-center gap-2"><Wrench className="w-4 h-4" />Ferramentas</TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2"><Code className="w-4 h-4" />Código</TabsTrigger>
            <TabsTrigger value="resources" className="flex items-center gap-2"><BookOpen className="w-4 h-4" />Recursos</TabsTrigger>
          </TabsList>
          <TabsContent value="tools">
            <div className="space-y-8">
              {tools.map((cat) => (
                <div key={cat.category}>
                  <h3 className="text-lg font-bold mb-4 flex items-center gap-2"><FileVideo className="w-5 h-5 text-primary" />{cat.category}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {cat.items.map((tool) => (
                      <Card key={tool.name} className="hover:shadow-md transition-all">
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-bold">{tool.name}</h4>
                            <Badge variant="outline" className="text-xs">{tool.price}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">{tool.desc}</p>
                          <Button size="sm" variant="outline" className="w-full text-xs" asChild>
                            <a href={tool.link} target="_blank" rel="noopener noreferrer"><Link2 className="w-3 h-3 mr-1" />Acessar</a>
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="code">
            <div className="space-y-6">
              {codeSnippets.map((snippet) => (
                <Card key={snippet.title} className="overflow-hidden">
                  <CardHeader className="pb-2 bg-muted/50">
                    <div className="flex items-center gap-2">{snippet.icon}<CardTitle className="text-base">{snippet.title}</CardTitle></div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <pre className="p-4 overflow-x-auto text-sm bg-slate-950 text-slate-100"><code>{snippet.code}</code></pre>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {resources.map((res) => (
                <Card key={res.name} className="hover:shadow-md transition-all group">
                  <CardContent className="p-4">
                    <h4 className="font-bold group-hover:text-primary transition-colors flex items-center gap-2">
                      <Database className="w-4 h-4" />
                      <a href={res.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">{res.name}<Link2 className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" /></a>
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">{res.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
