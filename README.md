<div align="center">
	<h1>Net7 • Landing / PWA</h1>
	<p>SPA moderna para provedor de internet (fibra) com foco em conversão, indicação, compliance legal, acessibilidade e performance.</p>
</div>

## Sumário
1. Visão Geral
2. Stack & Decisões Técnicas
3. Estrutura de Pastas
4. Scripts NPM
5. Theming (Dark/Light) + Locale
6. Componentes Principais
7. Programa de Indicação
8. FAQ com Busca e Destaque
9. Modais Legais (LGPD / Cookies / Termos)
10. Consentimento de Cookies
11. Internacionalização (i18n)
12. Exportação PDF Assinada (Políticas)
13. Modal de Cobertura
14. PWA (Manifesto, SW, Instalação)
15. Otimização de Imagem (Hero)
16. Analytics de Eventos
17. Acessibilidade & UX
18. Customização Rápida
19. Deploy (Vercel)
20. Roadmap Futuro
21. Checklists de Publicação

---

## 1. Visão Geral
Aplicação construída em React + Vite + Tailwind para divulgar planos de internet fibra, captar leads e incentivar indicações. Evoluções recentes:
- Conteúdo legal versionado e centralizado (JSON por locale)
- Modais de Privacidade, Termos e Cookies com exportação PDF dinâmica (hash e versão)
- Banner de consentimento de cookies (LGPD)
- Internacionalização inicial (pt-BR / en-US) com carregamento sob demanda
- Import dinâmico do jsPDF para reduzir bundle inicial
- Hook reutilizável de acessibilidade para modais (`useModalA11y`)
- Seleção de idioma na Navbar

## 2. Stack & Decisões Técnicas
- Vite 7 (build rápido, code-splitting nativo)
- React 19 (sem roteador por enquanto; estrutura simples de seção âncora)
- Tailwind CSS (design utilitário coeso)
- Imports dinâmicos: conteúdo legal por locale + jsPDF on-demand
- PDF: geração com jsPDF apenas quando solicitado (redução de payload inicial ~358KB gzip fora do bundle principal)
- Consentimento: armazenamento em localStorage + eventos de auditoria
- Accessibility: focus management unificado via hook

## 3. Estrutura de Pastas (principal)
```
public/
	hero-fibra.(avif|webp|jpg)    Imagem hero (variante otimizada sugerida)
	manifest.json                 Manifesto PWA
	sw.js                         Service Worker básico
	icons/                        Ícones PWA (placeholders -> substituir)
src/
	App.jsx
	main.jsx                      Entrada + registro SW
	index.css                     Estilos globais/Tailwind
	utils/analytics.js            Sistema simples de eventos
	components/                   Componentes reutilizáveis
	context/                      Contextos (ex: LocaleProvider)
	content/legal/*.json          Conteúdo legal versionado por locale
	hooks/                        Hooks reutilizáveis (ex: useModalA11y)
	utils/legalPdf.js             Exportação dinâmica de PDFs (hash + versão)
```

## 4. Scripts NPM
| Script | Descrição |
|--------|-----------|
| `dev`  | Ambiente de desenvolvimento (HMR) |
| `build`| Build de produção em `dist/` |
| `preview` | Servir build local para testes PWA |

## 5. Theming (Dark/Light) + Locale
- Tema controlado por classe `dark` em `<html>` com persistência `localStorage`.
- Locale (`pt-BR` / `en-US`) via `LocaleContext` com fallback e persistência.
- Carregamento lazy do JSON de idioma somente quando necessário.

## 6. Componentes Principais
| Componente | Função | Destaques |
|------------|-------|-----------|
| `Hero` | Destaque inicial | `<picture>` com AVIF/WebP/JPG |
| `PlansSection` / `PlanCard` | Apresentação de planos | Preços removidos (call to action indireta) |
| `AdvantagesSection` | Vantagens competitivas | Grid responsivo |
| `ReferralSection` | Programa de indicação | Form persistente (localStorage), máscara telefone, copy WhatsApp |
| `ContactSection` | Formulário contato + atalhos | Modal de cobertura acionado aqui |
| `FAQModal` | Perguntas frequentes | Busca + highlight + accordion single-open |
| `CoverageModal` | Áreas atendidas | CTA WhatsApp e disclaimers |
| `InstallPWAButton` | Fluxo de instalação | Respeita `beforeinstallprompt` |
| `Navbar` / `Footer` | Navegação e ações globais | Tema + FAQ + PWA button |

## 7. Programa de Indicação (`ReferralSection`)
- Campos: seu nome, e-mail, nome do amigo, telefone (máscara), plano de interesse.
- Gera mensagem formatada + link WhatsApp.
- Botão copiar (clipboard API).
- Animação com palavras rotativas: Ganhe / Junte / Lucre.
- Modal “Como funciona”.

## 8. FAQ com Busca e Destaque
- Busca com filtragem em categorias.
- Destaque (wrap `<mark>`) para múltiplos termos separados por espaço.
- Um item aberto por vez (estado `expanded`).

## 9. Modais Legais (LGPD / Cookies / Termos)
Localizados no footer, acessíveis via botões. Conteúdo carregado dinamicamente por locale, exibindo versão atual.

Funcionalidades:
- Versão exibida ao lado do título (ex: v1)
- Exportação PDF com: título + versão + trecho de hash SHA-256 de integridade (primeiros 32 chars)
- Fechamento por ESC, backdrop e botão;
- Foco inicial e trap de navegação por Tab via `useModalA11y`.

## 10. Consentimento de Cookies
Banner inicial solicita consentimento categorizado (estruturável). Armazena preferências e emite eventos de auditoria. Futuro: modal de gerenciamento dedicado.

## 11. Internacionalização (i18n)
Implementação inicial.
- `LocaleProvider` gerencia estado e persistência.
- Conteúdo legal e rótulos de modais já adaptados.
- Estrutura pronta para evoluir demais textos (Navbar, Footer, etc.).

## 12. Exportação PDF Assinada (Políticas)
- Import dinâmico de `jspdf` somente quando usuário solicita.
- Hash SHA-256 (client-side) do JSON de política incorporado no rodapé do PDF para referência/integridade.
- Nome do arquivo inclui locale (ex: `Política_de_Privacidade_pt-BR.pdf`).

## 13. Modal de Cobertura
- Lista inicial: Sidrolândia/MS (urbano + rural parcial).
- Eventos de fechamento (ESC, backdrop, botão) + CTA para WhatsApp.

## 14. PWA
| Item | Implementado |
|------|--------------|
| Manifesto | `public/manifest.json` |
| Ícones | Placeholders (`/public/icons`) – substituir por reais |
| Service Worker | Cache estático simples (`sw.js`) |
| Instalação | Botão dinâmico (`InstallPWAButton`) |
| Theme Color | `<meta name="theme-color">` |

### Substituir Ícones
Coloque PNGs reais:
```
icons/icon-192.png
icons/icon-512.png
icons/icon-512-maskable.png
icons/icon-180.png (Apple)
```

### Eventos PWA
- `pwa_beforeinstallprompt`
- `pwa_install_click`
- `pwa_install_choice` (outcome)
- `pwa_installed`

## 15. Otimização de Imagem (Hero)
- `<picture>` com fontes: AVIF > WebP > JPG fallback.
- Trocar imagens mantendo nome base ou ajustar em `Hero.jsx`.

## 16. Analytics de Eventos
Implementação simples em `utils/analytics.js` (fila + console em dev). Fácil de trocar por GA4 / Plausible.

| Área | Eventos |
|------|---------|
| Cobertura | `coverage_open`, `coverage_close_button`, `coverage_close_backdrop`, `coverage_close_esc`, `coverage_whatsapp_click` |
| Indicação | `referral_copy_message`, `referral_whatsapp_click`, `referral_info_open` |
| Contato | `contact_whatsapp_click`, `quick_whatsapp_click` |
| FAQ | `faq_open_question`, `faq_close_question`, `faq_search_change` |
| PWA | conforme seção anterior |

## 17. Acessibilidade & UX
- Modais: ESC para fechar, focus inicial, backdrop click.
- Melhorias futuras: verdadeiro focus trap cíclico / ARIA mais granular (role="dialog" + aria-describedby).
- Contrast ratio ajustado nos principais textos.

## 18. Customização Rápida
| Alvo | Local |
|------|-------|
| Cores | `tailwind.config.js` (extend) |
| Palavras rotativas | `ReferralSection.jsx` (array `rotatingWords`) |
| Texto planos | `PlanCard.jsx` |
| FAQ | Array `rawFaq` em `FAQModal.jsx` |
| Número WhatsApp indicação | Const `zapBase` em `ReferralSection.jsx` |
| Número WhatsApp contato | Const `zapBase` em `ContactSection.jsx` |

## 19. Deploy (Vercel)

### Configuração
- Arquivo `vercel.json` com:
	- Fallback SPA (`/(.*)` → `/index.html`)
	- Cache agressivo para `/assets/*` (immutable)
	- Cache controlado para `sw.js`

### Passos CLI
```bash
npm i -g vercel
vercel login
vercel        # primeira vez (definir build: npm run build / output: dist)
vercel --prod # promoção para produção
```

### Variáveis de Ambiente (futuras)
Adicionar em Settings → Environment Variables (ex: `VITE_API_BASE_URL`).

## 20. Roadmap Futuro (Sugestões)
- [ ] Reescrever SW usando Workbox / `vite-plugin-pwa` (cache runtime seletivo)
- [x] Focus trap básico compartilhado (hook `useModalA11y`)
- [ ] Internacionalizar todo o conteúdo textual
- [ ] Modal de gerenciamento de cookies (preferências granulares)
- [ ] Focus trap completo com retorno de foco ao trigger
- [ ] Debounce em `faq_search_change`
- [ ] Persistir tema no server (SSR futuro?)
- [ ] Endpoint real para leads / indicações
- [ ] Página /rota de cobertura dinâmica (CEP / geolocalização)
- [ ] Métricas real-time (ex: PostHog) com consentimento LGPD
- [ ] Compressão adicional de imagens (AVIF otimizado por largura)
- [ ] Testes unitários + snapshot (Jest + Testing Library)
- [ ] Modo offline personalizado (`offline.html`)
- [ ] SEO: meta tags dinâmicas / OpenGraph

## 21. Checklists de Publicação
### Técnica
- [ ] Executar `npm run build`
- [ ] Verificar Lighthouse (Performance > 85 / PWA installable)
- [ ] Testar instalação PWA (desktop + mobile)
- [ ] Validar ícones reais substituídos
- [ ] Checar links WhatsApp corretos
- [ ] Conferir que não há termos mock (ex: zapBase placeholder)

### Conteúdo
- [ ] FAQ atualizado
- [ ] Planos coerentes com estratégia comercial
- [x] Texto legal / política privacidade versionado e modal
- [x] Exportação PDF com hash de integridade
- [ ] CTA WhatsApp ativo e monitorado

### Acessibilidade / UX
- [ ] Títulos hierárquicos sem saltos (h1 -> h2 -> h3)
- [ ] Sem bloqueio de scroll ao fechar modais
- [ ] Foco retorna ao acionador (aprimorar se necessário)

## Hero Image Guidelines (Resumo)
Ver também documento complementar se necessário. Requisitos-chave:
- Resolução mínima 1920px largura
- Foco visual limpo atrás do título
- Peso otimizado (< 350 KB preferencial)
Substituição rápida: coloque arquivos `hero-fibra.avif`, `hero-fibra.webp`, `hero-fibra.jpg` em `/public`.

## Favicon & Ícones (Resumo)
Gerar multi-formato com fundo consistente. Incluir versão maskable (512x512 com padding). Ferramentas: Figma export + Squoosh / pwa-asset-generator.

## Licenciamento / Direitos
Certifique-se de que todas as imagens, ícones e fontes têm licença apropriada para uso comercial. Ajustar aviso LGPD e termos conforme expansão.

---
---
Atualizado em: 2025-09-18

© Net7 - 2025
