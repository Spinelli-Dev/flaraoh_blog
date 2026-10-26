# Flaraoh — Portfólio & Blog

Site estático (HTML + CSS + JS puro, sem build). Abra `index.html` no navegador ou publique a pasta em GitHub Pages, Netlify ou Cloudflare Pages.

## Estrutura

```
index.html        Home (hero com H1 "gravado", projetos em destaque, últimos posts, CTA)
about.html        Sobre: apresentação, linha do tempo, habilidades, contato rápido
portfolio.html    Grade de projetos
project-1.html    Modelo de case study (duplique para project-2.html, ...)
blog.html         Lista de artigos
post-1.html       Modelo de artigo (duplique para post-2.html, ...)
contact.html      Formulário com validação + perfis profissionais
css/style.css     Tokens, base, componentes (BEM-like), media queries mobile-first
js/main.js        Menu responsivo, ano do rodapé, validação/envio do formulário
assets/           Favicon e imagens de placeholder (SVG)
```

## Personalização

- Procure por `EDITAR` e `seu-usuario` nos HTML para trocar textos, links e e-mail.
- **Formulário:** crie um formulário em [Formspree](https://formspree.io) e troque `SEU_ID` em `contact.html`. Enquanto `SEU_ID` estiver lá, o envio roda em modo demonstração.
- **Imagens:** substitua os SVGs de `assets/img/` por capturas reais em WebP/AVIF (≈1600px de largura, < 200 KB) mantendo `width`/`height` e `loading="lazy"`.
- **Cores e fontes:** todas as variáveis ficam no `:root` de `css/style.css`.
- Cabeçalho e rodapé se repetem em cada página. Ao mudar o menu, atualize todos os HTML.

## Acessibilidade

- Texto principal `#333` sobre `#FDF9ED` (~12:1); botões `#FDF9ED` sobre `#8B4513` (~7:1). O ouro (`#C8A265`/`#B8860B`) é usado só em detalhes decorativos, nunca em texto.
- Skip link, foco visível, `aria-current` no menu, menu operável por teclado (Esc fecha), erros de formulário ligados aos campos via `aria-describedby`, e respeito a `prefers-reduced-motion`.
- Sem JS, o menu fica sempre visível e o formulário usa a validação nativa do navegador.
