import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Eye, Zap, Shield, Layers } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-purple-50/30 dark:from-slate-950 dark:via-blue-950/20 dark:to-indigo-950/10" />
      
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-400/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Badge 
          variant="secondary" 
          className="mb-6 px-4 py-1.5 text-sm font-medium bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300 border-orange-200 dark:border-orange-800"
        >
          Atualizado 2025 — CapIAu Talho Integration
        </Badge>

        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6">
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            APIs de Visão
          </span>
          <br />
          <span className="text-foreground">
            com Reconhecimento Facial
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
          Guia completo e prático com análise de custo-benefício, qualidade e velocidade. 
          Pipeline em <strong>cascata</strong> integrado ao <strong>CapIAu Talho</strong> — do reconhecimento rápido local à precisão máxima com GPU.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 flex-wrap">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 text-lg font-semibold shadow-lg shadow-blue-500/25"
            asChild
          >
            <a href="#apis">Explorar APIs</a>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="px-8 py-6 text-lg font-semibold border-2"
            asChild
          >
            <a href="#comparativo">Ver Comparativo</a>
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="px-8 py-6 text-lg font-semibold border-2 border-orange-300 text-orange-700 hover:bg-orange-50 dark:text-orange-300 dark:border-orange-700"
            asChild
          >
            <a href="#capiau">CapIAu Talho</a>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="flex flex-col items-center p-4 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-border/50">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-2">
              <Eye className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="font-semibold text-sm">12+ APIs Analisadas</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-border/50">
            <div className="w-10 h-10 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center mb-2">
              <Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <span className="font-semibold text-sm">Benchmark NIST 2025</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-sm border border-border/50">
            <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-2">
              <Shield className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <span className="font-semibold text-sm">Foco em Documentários</span>
          </div>
          <div className="flex flex-col items-center p-4 rounded-xl bg-orange-50 dark:bg-orange-950/20 backdrop-blur-sm border border-orange-200 dark:border-orange-800">
            <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-2">
              <Layers className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="font-semibold text-sm">Pipeline em Cascata</span>
          </div>
        </div>

        <div className="mt-12 animate-bounce">
          <a href="#apis" className="inline-flex flex-col items-center text-muted-foreground hover:text-foreground transition-colors">
            <span className="text-xs mb-1">Scroll</span>
            <ArrowDown className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
