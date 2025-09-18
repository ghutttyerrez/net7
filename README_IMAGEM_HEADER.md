# Net7 - Provedor de Internet

Single Page Application moderna construída com React + Vite + Tailwind CSS.

## Tecnologias
- Vite (build rápido)
- React (componentização)
- Tailwind CSS (design system utilitário)

## Tema e Paleta
Paleta solicitada: `#adcc05` (lime), `#4966a0` (blue), `#f9f9f9` (light), `#ffffff` (white), `#000000` (black).
Modo claro/escuro controlado via classe `dark` no elemento `html`.

## Estrutura de Seções
- Hero
- Planos
- Vantagens
- Contato
- Footer

## Rodando o Projeto
```bash
npm install
npm run dev
```
Acesse: http://localhost:5173

## Build de Produção
```bash
npm run build
```
Saída em `dist/`.

## Acessibilidade e UX
- Navegação com âncoras e scroll suave
- Botão de alternância de tema persistido em `localStorage`
- Layout responsivo com grid e flex

## Personalização
Edite planos em `src/components/PlansSection.jsx` e vantagens em `src/components/AdvantagesSection.jsx`.

## Imagem do Hero (Cabeçalho)
O componente `Hero` agora aceita uma imagem de fundo (`public/hero-fibra.jpg`). Caso o arquivo não exista, apenas os gradientes de cor aparecem. Substitua por uma imagem que represente tecnologia, velocidade e confiança.

### Requisitos Técnicos
- Resolução recomendada: mínimo 1920×1080 (ideal 2400–3000px largura)
- Peso alvo (otimizado): 180–350 KB (formato preferencial: `.webp`)
- Ponto focal: manter área central relativamente “limpa” para o título
- Orientação: horizontal / landscape

### Workflow de Substituição
1. Escolha a imagem (ex: baixe `fibra-luz.webp`)
2. Otimize (sugestão de ferramenta: https://squoosh.app)
3. Renomeie para `hero-fibra.webp` (ou mantenha `.jpg` se não usar webp)
4. Coloque em `public/` (ex: `public/hero-fibra.webp`)
5. Ajuste o path em `src/components/Hero.jsx` se mudar o nome/extensão
6. Rode `npm run dev` e valide legibilidade do título e parágrafo

### Acessibilidade
- Inclua sempre `alt` descritivo (ex: "Cabos de fibra ótica iluminados em tons azul e verde")
- Não use texto embutido na imagem para conteúdo essencial

### Dicas de Otimização Extra
- Gere também uma versão `hero-fibra@2x.webp` (maior) e implemente `<picture>` se quiser servir variantes por largura
- Ative lazy-loading em imagens adicionais (no Hero deixamos como `loading="eager"` porque é elemento principal)
- Se quiser animação suave (efeito "zoom lento"), adicione uma classe com `scale-105` + `animate-[slowZoom_20s_ease-in-out_infinite_alternate]` e defina a keyframe em `index.css`

### Exemplo de Substituição com `<picture>` (Opcional)
```jsx
<picture>
	<source srcSet="/hero-fibra.webp" type="image/webp" />
	<img src="/hero-fibra.jpg" alt="Cabos de fibra ótica iluminados" className="w-full h-full object-cover" />
</picture>
```

### Checklist Antes de Publicar
- [ ] Texto principal legível em monitores claros e escuros
- [ ] Peso dentro da meta (< 350 KB)
- [ ] Sem direitos autorais restritivos (licença free ou própria)
- [ ] Sem elementos que conflitam com a marca (cores fora da paleta dominante)
- [ ] Fallback ok se a imagem não carregar

## Mensagem de Preços
Os preços foram removidos dos cards de plano. O texto padrão: "Para saber os valores, fale com nossa equipe." pode ser editado em `src/components/PlanCard.jsx`.

## Próximos Passos (Sugestões)
- Integração real de formulário (Formspree / backend)
- Página de verificação de cobertura (CEP)
- Otimização de imagens e ícones customizados
- Testes automatizados (React Testing Library)

---
© Net7 - 2025
