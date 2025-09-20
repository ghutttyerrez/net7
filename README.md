# Net7 • Landing Page

<div align="center">
  <p>SPA moderna para provedor de internet (fibra) com foco em conversão, indicação, compliance legal, acessibilidade e performance.</p>
  
  ![React](https://img.shields.io/badge/React-19.1.1-blue?logo=react)
  ![Vite](https://img.shields.io/badge/Vite-7.1.2-purple?logo=vite)
  ![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4.10-blue?logo=tailwindcss)
  ![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)
</div>

## 📖 Sumário
1. [🚀 Deploy Rápido](#-deploy-rápido)
2. [📋 Pré-requisitos](#-pré-requisitos)
3. [🛠️ Instalação e Configuração](#️-instalação-e-configuração)
4. [🌐 Hospedagem](#-hospedagem)
5. [⚙️ Configurações Essenciais](#️-configurações-essenciais)
6. [🎨 Personalização](#-personalização)
7. [🔧 Manutenção](#-manutenção)
8. [📊 Monitoramento](#-monitoramento)
9. [🚨 Solução de Problemas](#-solução-de-problemas)
10. [📚 Documentação Técnica](#-documentação-técnica)

---

## 🚀 Deploy Rápido

### Opção 1: Vercel (Recomendado)
1. Faça fork ou clone este repositório
2. Acesse [vercel.com](https://vercel.com) e conecte sua conta GitHub
3. Clique em "New Project" → Selecione este repositório
4. Configure as variáveis de ambiente (se necessário)
5. Deploy automático! ✨

### Opção 2: Netlify
1. Faça build do projeto: `npm run build`
2. Arraste a pasta `dist/` para [netlify.com/drop](https://netlify.com/drop)
3. Configure domínio personalizado nas configurações

### Opção 3: GitHub Pages
```bash
npm run build
# Configure GitHub Pages para servir da pasta dist/
```

---

## 📋 Pré-requisitos

- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** 9+ (incluído com Node.js)
- **Git** ([Download](https://git-scm.com/))
- **Conta Vercel/Netlify** (para hospedagem)

### Verificação do Sistema
```bash
node --version  # v18.0.0+
npm --version   # 9.0.0+
git --version   # qualquer versão recente
```

---

## 🛠️ Instalação e Configuração

### 1. Clone o Repositório
```bash
git clone https://github.com/SEU_USUARIO/net7.git
cd net7
```

### 2. Instale as Dependências
```bash
npm install
```

### 3. Inicie o Servidor de Desenvolvimento
```bash
npm run dev
```
Acesse: `http://localhost:5173`

### 4. Build para Produção
```bash
npm run build
```
Arquivos gerados em: `dist/`

### 5. Teste o Build Local
```bash
npm run preview
```
Acesse: `http://localhost:4173`

---

## 🌐 Hospedagem

### Vercel (Recomendado)

#### Deploy via GitHub
1. **Fork** este repositório para sua conta GitHub
2. Acesse [vercel.com](https://vercel.com) → **New Project**
3. Importe o repositório
4. Configure as variáveis de ambiente:
   ```
   VITE_WHATSAPP_NUMBER=5511999999999
   VITE_COMPANY_NAME=Net7
   VITE_ANALYTICS_ID=your-analytics-id
   ```
5. Deploy automático!

#### Deploy via CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

#### Configurações do Domínio
1. **Vercel Dashboard** → Seu projeto → **Settings** → **Domains**
2. Adicione seu domínio personalizado
3. Configure DNS (se necessário):
   ```
   Type: CNAME
   Name: www
   Value: seu-projeto.vercel.app
   ```

### Netlify

#### Deploy via Interface
1. Build: `npm run build`
2. Arraste `dist/` para [netlify.com/drop](https://netlify.com/drop)
3. Configure domínio em **Site Settings** → **Domain Management**

#### Deploy via Git
1. Conecte repositório em [netlify.com](https://netlify.com)
2. Configurações de build:
   ```
   Build Command: npm run build
   Publish Directory: dist
   ```

### Hospedagem Própria (VPS/Servidor)

#### Usando PM2 + Nginx
```bash
# 1. Build do projeto
npm run build

# 2. Servir com servidor estático
npm install -g serve pm2
pm2 start "serve -s dist -p 3000" --name net7

# 3. Configurar Nginx
sudo nano /etc/nginx/sites-available/net7
```

**Configuração Nginx:**
```nginx
server {
    listen 80;
    server_name seudominio.com.br www.seudominio.com.br;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# 4. Ativar configuração
sudo ln -s /etc/nginx/sites-available/net7 /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx

# 5. SSL com Let's Encrypt
sudo certbot --nginx -d seudominio.com.br -d www.seudominio.com.br
```

---

## ⚙️ Configurações Essenciais

### 1. Variáveis de Ambiente
Crie um arquivo `.env` (desenvolvimento) ou configure no painel da hospedagem:

```env
# WhatsApp Business
VITE_WHATSAPP_NUMBER=5511999999999

# Informações da Empresa
VITE_COMPANY_NAME=Net7
VITE_COMPANY_EMAIL=contato@net7.com.br
VITE_COMPANY_ADDRESS=Sua Cidade, Estado

# Analytics (opcional)
VITE_ANALYTICS_ID=GA_TRACKING_ID
VITE_GTAG_ID=G-XXXXXXXXXX

# API (futuro)
VITE_API_BASE_URL=https://api.seudominio.com.br
```

### 2. Configuração do WhatsApp
1. **Número de WhatsApp Business:** Configure em `src/config/whatsapp.js`
   ```javascript
   export const WHATSAPP_CONFIG = {
     number: '5511999999999', // Seu número com código do país
     baseMessage: 'Olá! Gostaria de saber mais sobre os planos de internet.'
   }
   ```

### 3. Analytics
Configure Google Analytics em `src/utils/analytics.js`:
```javascript
// Substitua YOUR_GA_ID pelo seu ID do Google Analytics
const GA_ID = 'G-XXXXXXXXXX'
```

---

## 🎨 Personalização

### 1. Cores e Tema
Edite `tailwind.config.js`:
```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'brand-blue': '#1E40AF',    // Azul principal
        'brand-lime': '#84CC16',    // Verde destaque
        'brand-light': '#F8FAFC',   // Claro
        'brand-dark': '#0F172A',    // Escuro
      }
    }
  }
}
```

### 2. Imagens
Substitua as imagens em `public/`:
- `hero-fibra.avif` - Imagem principal do hero
- `hero-fibra.webp` - Fallback WebP
- `hero-fibra.jpg` - Fallback JPG
- `favicon.png` - Favicon do site

### 3. Conteúdo
- **Planos:** Edite `PlansSection.jsx`
- **FAQ:** Edite `FAQModal.jsx`
- **Informações legais:** Edite arquivos em `src/content/legal/`

---

## 🔧 Manutenção

### Scripts Disponíveis
```bash
npm run dev      # Desenvolvimento com hot reload
npm run build    # Build para produção
npm run preview  # Testar build localmente
npm run lint     # Verificar erros de código
```

### Atualizações
```bash
# Verificar dependências desatualizadas
npm outdated

# Atualizar dependências
npm update

# Atualizar versões principais (cuidado!)
npx npm-check-updates -u
npm install
```

### Backup Essencial
Mantenha backup dos seguintes arquivos personalizados:
- `.env` ou variáveis de ambiente
- `src/config/whatsapp.js`
- `src/content/legal/*.json`
- `public/hero-fibra.*`

---

## 📊 Monitoramento

### 1. Google Analytics
- Configure em `src/utils/analytics.js`
- Eventos trackados automaticamente:
  - Cliques em planos
  - Downloads de app
  - Envio de formulários
  - Cliques no WhatsApp

### 2. Lighthouse (Performance)
```bash
# Teste local
npm run build
npm run preview
# Abra DevTools → Lighthouse → Generate Report
```

**Metas:**
- Performance: >90
- Accessibility: >95
- Best Practices: >90
- SEO: >90

### 3. Uptime Monitoring
Configure monitores gratuitos:
- [UptimeRobot](https://uptimerobot.com/)
- [Pingdom](https://pingdom.com/)
- [StatusCake](https://statuscake.com/)

---

## 🚨 Solução de Problemas

### Build Falha
```bash
# Limpar cache
rm -rf node_modules package-lock.json
npm install

# Verificar versão do Node
node --version  # Deve ser 18+
```

### Performance Baixa
1. **Imagens:** Use formato WebP/AVIF
2. **Build:** Execute `npm run build` sempre
3. **CDN:** Configure CDN na Vercel/Netlify
4. **Lazy Loading:** Já implementado nos componentes

### WhatsApp Não Funciona
1. Verifique o número em `src/config/whatsapp.js`
2. Formato: `55` + `11` + `999999999` (país + área + número)
3. Teste o link manualmente

### Domínio Não Funciona
1. **DNS:** Aguarde propagação (até 48h)
2. **SSL:** Verifique certificado HTTPS
3. **Redirection:** Configure www → sem www (ou vice-versa)

---

## 📚 Documentação Técnica

### Stack Tecnológico
- **Frontend:** React 19.1.1 + Vite 7.1.2
- **Styling:** Tailwind CSS 3.4.10
- **PDF:** jsPDF 2.5.2 (lazy loaded)
- **Build:** Vite com otimizações automáticas

### Estrutura de Arquivos
```
public/
├── hero-fibra.avif          # Imagem principal (formato moderno)
├── hero-fibra.webp          # Fallback WebP
├── hero-fibra.jpg           # Fallback JPG
├── robots.txt               # SEO
├── sitemap.xml              # SEO

src/
├── App.jsx                  # Componente principal
├── main.jsx                 # Entry point
├── index.css                # Estilos globais
├── components/              # Componentes reutilizáveis
│   ├── Hero.jsx             # Seção principal com carousel
│   ├── Navbar.jsx           # Navegação e tema
│   ├── PlansSection.jsx     # Apresentação de planos
│   ├── ContactSection.jsx   # Formulário de contato
│   └── ...
├── config/
│   └── whatsapp.js          # Configuração WhatsApp
├── content/legal/           # Conteúdo legal versionado
│   ├── pt-BR.json
│   └── en-US.json
├── context/
│   └── LocaleContext.jsx    # Contexto de idioma
├── hooks/
│   └── useModalA11y.js      # Hook de acessibilidade
└── utils/
    ├── analytics.js         # Sistema de eventos
    ├── legalContent.js      # Loader de conteúdo legal
    └── legalPdf.js          # Geração de PDF
```

### Componentes Principais

| Componente | Responsabilidade |
|------------|------------------|
| `Hero` | Seção principal com carousel de imagens e detecção de tema |
| `Navbar` | Navegação, alternador de tema e idioma |
| `PlansSection` | Apresentação dos planos de internet |
| `ContactSection` | Formulário de contato e informações |
| `ReferralSection` | Sistema de indicação com integração WhatsApp |
| `FAQModal` | Perguntas frequentes com busca |

### Features Implementadas
- ✅ **Tema Dark/Light** com persistência
- ✅ **Internacionalização** (pt-BR/en-US)
- ✅ **Carousel responsivo** com detecção de tema
- ✅ **Sistema de indicação** com WhatsApp
- ✅ **Consentimento de cookies** (LGPD)
- ✅ **Modais legais** com exportação PDF
- ✅ **Analytics** de eventos
- ✅ **Otimização de imagens** (AVIF/WebP/JPG)
- ✅ **Acessibilidade** (A11y)

### Performance
- **Bundle Size:** ~200KB gzipped
- **First Paint:** <1.5s
- **Interactive:** <2.5s
- **PWA:** Installable
- **Lighthouse:** 90+ em todas as métricas

### Checklist de Deploy

#### ✅ Antes do Deploy
- [ ] Executar `npm run build` sem erros
- [ ] Testar `npm run preview` localmente
- [ ] Verificar variáveis de ambiente configuradas
- [ ] Validar links do WhatsApp
- [ ] Confirmar imagens otimizadas em `public/`
- [ ] Verificar ícones PWA substituídos

#### ✅ Pós-Deploy
- [ ] Testar instalação PWA (desktop + mobile)
- [ ] Verificar Lighthouse Score (>90 em todas métricas)
- [ ] Validar formulários de contato
- [ ] Testar tema dark/light
- [ ] Confirmar analytics funcionando
- [ ] Verificar SSL ativo (https://)

#### ✅ Monitoramento Contínuo
- [ ] Configurar monitoramento de uptime
- [ ] Acompanhar métricas do Google Analytics
- [ ] Verificar Performance Web Vitals
- [ ] Monitorar conversões WhatsApp

---

## 🎯 Próximos Passos

### Imediatos
1. **Configurar WhatsApp Business** com número real
2. **Substituir imagens** por conteúdo da marca
3. **Configurar domínio** personalizado
4. **Ativar Google Analytics** para tracking

### Curto Prazo (1-2 semanas)
1. **Testar PWA** em dispositivos reais
2. **Otimizar SEO** com meta tags específicas
3. **Configurar monitoring** de uptime
4. **Revisar conteúdo legal** com jurídico

### Médio Prazo (1-3 meses)
1. **Implementar A/B testing** nos CTAs
2. **Adicionar mais idiomas** se necessário
3. **Integrar CRM** para leads
4. **Implementar chat bot** avançado

---

## 📄 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

---

## 🤝 Suporte

- **Email:** desenvolvimento@net7.com.br
- **WhatsApp:** +55 11 99999-9999
- **Documentação:** Este README
- **Issues:** GitHub Issues

---

**Última atualização:** 19 de setembro de 2025
**Versão:** 2.0.0

© Net7 - 2025 • Todos os direitos reservados