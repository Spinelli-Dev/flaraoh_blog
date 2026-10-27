# Flaraoh — Portfólio de Game Design

Site estático (HTML + CSS + JS puro, sem build). Abra `index.html` no navegador. Publicado na HostGator via Git do cPanel (veja `.cpanel.yml`).

## Estrutura

```
index.html        Início: quem sou, o que faço, projetos em destaque, diário e artigos recentes
projects.html     Projetos: grade de projetos e o ciclo conceber → desenvolver → testar → melhorar
project-1.html    Modelo de case study (duplique para project-2.html, ...)
devlog.html       Diário: entradas de desenvolvimento ligadas a cada projeto (devlog-N.html)
articles.html     Artigos: análises sobre mecânicas, sistemas e experiências de jogo
article-1.html    Modelo de artigo (duplique para article-2.html, ...)
about.html        Sobre: trajetória, competências atuais e direção profissional
contact.html      Contato: formulário com assunto + perfis profissionais
spotlight.html    Divulgações: jogos de outros desenvolvedores
css/style.css     Tokens, base, componentes (BEM-like), media queries mobile-first
js/main.js        Menu responsivo, ano do rodapé, validação/envio do formulário
assets/           Favicon e imagens de placeholder (SVG)
.cpanel.yml       Deploy no cPanel (HostGator): copia *.html, css, js e assets para public_html
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
