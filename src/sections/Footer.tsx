import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, Heart } from "lucide-react";

const quickLinks = [
  { label: "AWS Rekognition", href: "https://aws.amazon.com/rekognition/" },
  { label: "Azure Face API", href: "https://azure.microsoft.com/services/cognitive-services/face/" },
  { label: "Google Cloud Vision", href: "https://cloud.google.com/vision" },
  { label: "Face++ (Megvii)", href: "https://www.faceplusplus.com/" },
  { label: "Banuba Face API", href: "https://www.banuba.com/face-api" },
  { label: "NEC Face Recognition", href: "https://www.nec.com/en/global/solutions/biometrics/face/" },
];

const openSourceLinks = [
  { label: "InsightFace", href: "https://github.com/deepinsight/insightface" },
  { label: "CompreFace", href: "https://github.com/exadel-inc/CompreFace" },
  { label: "DeepFace", href: "https://github.com/serengil/deepface" },
  { label: "face_recognition", href: "https://github.com/ageitgey/face_recognition" },
  { label: "RetinaFace", href: "https://github.com/serengil/retinaface" },
  { label: "GFPGAN", href: "https://github.com/TencentARC/GFPGAN" },
];

const capiauLinks = [
  { label: "CapIAu Talho v03", href: "https://github.com/fernangcortes/capiau-talho-v03" },
  { label: "Branch Face Recognition", href: "https://github.com/fernangcortes/capiau-talho-v03/tree/feature/face-recognition-disambiguation" },
  { label: "Pipeline Cascata", href: "https://github.com/fernangcortes/capiau-talho-v03/blob/feature/face-recognition-disambiguation/src/vision/face_pipeline.py" },
  { label: "FaceService", href: "https://github.com/fernangcortes/capiau-talho-v03/blob/feature/face-recognition-disambiguation/src/services/face_service.py" },
  { label: "Schema DB", href: "https://github.com/fernangcortes/capiau-talho-v03/blob/feature/face-recognition-disambiguation/src/db/schema.py" },
  { label: "API Routes", href: "https://github.com/fernangcortes/capiau-talho-v03/blob/feature/face-recognition-disambiguation/src/api/routes/faces.py" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">FV</span>
              </div>
              <span className="font-bold text-lg text-white">FaceVision Hub</span>
            </div>
            <p className="text-sm text-slate-400 mb-4">
              Guia completo de APIs de reconhecimento facial com pipeline em cascata integrado ao CapIAu Talho.
            </p>
            <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
              Atualizado 2025
            </Badge>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">APIs Comerciais</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <ExternalLink className="w-3 h-3" /> {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Open Source</h4>
            <ul className="space-y-2">
              {openSourceLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <Github className="w-3 h-3" /> {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">CapIAu Talho</h4>
            <ul className="space-y-2">
              {capiauLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-1"
                  >
                    <Github className="w-3 h-3" /> {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            Pesquisa compilada de fontes públicas. Preços e features podem ter mudado.
            Sempre consulte o site oficial para informações atualizadas.
          </p>
          <p className="text-sm text-slate-500 flex items-center gap-1">
            Feito com <Heart className="w-3 h-3 text-red-500" /> para documentaristas
          </p>
        </div>
      </div>
    </footer>
  );
}
