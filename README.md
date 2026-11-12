# maplebearmaringa.com.br

Site institucional da **Maple Bear Maringá** — escola bilíngue canadense em Maringá, PR
(Av. Arquiteto Nildo Ribeiro da Rocha, 1201 — Jardim Higienópolis).

Nasceu como cópia adaptada de `maplebearcaxiasdosul.com.br` (mesma estrutura, mesmo editorial).
Regras da adaptação: `editorial/ADAPTACAO-MARINGA.md`. Fatos da escola: `editorial/fatos.md`.

## Stack

- HTML/CSS/JS estático puro, sem build
- Hospedagem: Vercel (`vercel.json`: cleanUrls, redirect www → apex, headers de segurança)
- Funções edge em `api/`: `visit-lead` (formulário de visita), `curriculos` (trabalhe conosco), `instagram-feed`
- Blog: `/blog/` (94 artigos) + editorial quinzenal automático (`editorial/`, `.github/workflows/`)

## Publicação

Merge na `main` → a Vercel publica. Nunca publicar por CLI.

## Captura de leads

`/visite/`, landing pages, materiais, blog (formulário do artigo, pop-up de saída e índice) e exit-intent → `POST /api/visit-lead`
(núcleo no navegador: `window.mbLead` em `assets/components.js`; blog em `assets/blog-lead.js`). A API:
1. cria o lead no Lumied, tenant `mbmaringa` (`https://mbmaringa.lumied.com.br/api/leads`, público, sem chave), com timeout de 8 s e 1 nova tentativa;
2. manda o e-mail para a equipe (Resend, `LEAD_NOTIFY_TO`, default `secretaria@maplebearmaringa.com.br`). Se o Lumied falhar, o assunto começa com `[NÃO ENTROU NO CRM]` e o corpo traz o motivo.

Origens: lista fechada (`site-visite`, `lead-magnet-*`, `newsletter`, `exit-intent`...) mais `lp-<slug>` e `blog-<slug>` / `blog-exit-<slug>` por prefixo.
Telefone: BR, 10 ou 11 dígitos depois de tirar zeros e +55, DDD válido; nome com 3 letras ou mais (igual à triagem do Lumied).

O pixel first-party do Lumied (`assets/analytics.js` → `/api/track/pageview`) liga a navegação ao lead.

`/trabalhe-conosco/` → `POST /api/curriculos` → `app.lumied.com.br/api/talentos` (unidade `maringa`) + e-mail (`TALENTOS_NOTIFY_TO`).

Variáveis: ver `.env.example`.

## Rastreamento

A escola cadastra os próprios IDs (GA4, Meta Pixel, Google Ads e as conversões) no Lumied, em
Marketing › Rastreamento do site. O site lê de `/api/rastreamento` (repasse com cache da rota pública
`/api/site/rastreamento?escola=mbmaringa` do Lumied) e `assets/analytics.js` inicia as tags com o que vier.
Sem ID cadastrado, a tag não carrega. `blog/analytics.js` fica desligado de propósito (mediria em dobro).

## SEO

- `node scripts/gen-sitemap.mjs` regera o `sitemap.xml` a partir das páginas
- `robots.txt`, `llms.txt`, `llms-full.txt`
- JSON-LD: School + LocalBusiness + FAQPage + BreadcrumbList + Article
- Páginas por bairro: `/em-maringa/<bairro>/`

## WhatsApp

`wa.me/5544991783232` — (44) 99178-3232.
