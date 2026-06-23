# FaceVision API Hub

Guia completo e pratico de APIs de reconhecimento facial com pipeline em cascata integrado ao [CapIAu Talho](https://github.com/fernangcortes/capiau-talho-v03).

## Sobre

Este site apresenta uma analise detalhada de 12+ APIs de visao com reconhecimento facial, com foco especial em:

- **Custo-beneficio** para documentaristas
- **Qualidade** com imagens de baixa resolucao (B-roll, VHS, arquivo)
- **Velocidade** de processamento
- **Pipeline em cascata** de 5 tiers (do local rapido ao manual preciso)

## Pipeline de Reconhecimento Facial (CapIAu Talho)

| Tier | Backend | Velocidade | Custo | Quando Usar |
|------|---------|------------|-------|-------------|
| 0 | YuNet + SFace (local) | ~2-5s/img | R$ 0 | Primeira passada em todos os arquivos |
| 1 | Azure Face API | ~300ms | R$ 0 (30K free) | Refinar faces com confianca < 0.7 |
| 2 | AWS Rekognition | ~400ms | $0.001/img | Material critico, Face Collections |
| 3 | InsightFace GPU | ~100ms | R$ 0 (energia) | Maxima precisao, arquivos especificos |
| 4 | Operador Manual | Tempo humano | R$ 0 | Confirmacao final — sempre prevalece |

## Deploy no Vercel

### Passo 1: Instalar dependencias
```bash
npm install
```

### Passo 2: Build
```bash
npm run build
```

### Passo 3: Deploy na Vercel
```bash
npm i -g vercel
vercel --prod
```

Ou conecte o repositorio diretamente no [vercel.com](https://vercel.com):
1. Importe o projeto
2. Framework preset: **Vite**
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy!

## Tecnologias

- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui
- 100% estatico — pronto para CDN

## Repositorios Relacionados

- [CapIAu Talho v03](https://github.com/fernangcortes/capiau-talho-v03) — Motor de inteligencia cinematografica
- [Branch Face Recognition](https://github.com/fernangcortes/capiau-talho-v03/tree/feature/face-recognition-disambiguation) — Pipeline cascata

## Licenca

MIT
