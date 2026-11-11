# Rodada 3 — passada cirúrgica (meta: todos ≥ 8,5 na avaliação independente)

Base: `editorial/avaliacao-blog-3.md` (leia a linha de cada artigo seu e a seção "Problemas graves").
Fontes: `editorial/fatos.md`, `editorial/maringa.md`. Régua e técnico: `editorial/REESCRITA-BLOG.md`.

## Decisões do dono (não mexer)
- O pop-up "Família de Maringá agendou uma visita" e a faixa "Vagas limitadas para 2027" do molde FICAM.
  Mas no TEXTO do artigo não escreva "vagas limitadas por turma" nem relações causais inventadas sobre vagas.

## Donos únicos de blocos (em qualquer outro artigo: no máximo 1 frase + link para o dono)
- Tabela/conta de trajeto "4 trechos por dia": `maple-bear-e-boa-vale-a-pena` e `mudando-para-maringa-escola-dos-filhos`.
  Os demais citam no máximo um tempo de /em-maringa/ e linkam /em-maringa/.
- Corte etário 31/3 + Resolução CNE/CEB 2/2018 + obrigatoriedade aos 4 anos: `educacao-infantil-em-maringa`.
- Episódio da tempestade de 02/11/2026: `escola-infantil-segura-maringa` (sem especular sobre crianças assustadas).
- Máxima de 29–30 °C (Climatempo): `turno-da-tarde-escola-infantil-maringa`.
- "Anote por duas semanas quando acorda, come e dorme": `adaptacao-bear-care-1-ano`.
- Teste de visita para saber se é imersão de verdade: `escola-bilingue-maringa`
  (`imersao-ingles-vs-aulas-ingles` fica com a conta de horas e o "como saber se aprende").
- Atividades de inglês em casa (livro repetido, desenho em áudio original, aplicativos): `pais-que-nao-falam-ingles-escola-bilingue`
  (`ferias-escolares-ingles-atividades` fica com o que é específico de férias: viagem, calor/chuva de janeiro, Maple Summer Camp, rotina sem escola).
- Bloco do Maple Summer Camp: `ferias-escolares-ingles-atividades` (integral: 1 frase + link).
- Adaptação do bebê: `adaptacao-bear-care-1-ano` (creche: 1 parágrafo + link).
- "Cinco perguntas para a visita": `melhor-escola-educacao-infantil-maringa` (particular-ou-pública: perguntas próprias sobre público x particular).

## Regras
- Nada sobre a escola fora de fatos.md. Exemplos a corrigir: "o valor depende do nível e do turno",
  "não troca de prédio, de equipe nem de amigos", "a escola anunciou o primeiro dia em 6/2", "a escola recebeu essa
  pergunta de famílias", cena "wash your hands" como se fosse da escola, CTA "salas de imersão", "o inglês quase nunca some".
- Pop-ups de lead/saída: nunca prometer material/proposta ("proposta personalizada", "guia"). Use: "Deixe seu nome e
  WhatsApp e a equipe entra em contato."
- Telefone no corpo quando houver CTA de contato: WhatsApp (44) 99178-3232.
- Datas: se o artigo cita fato posterior ao datePublished, mostre "Atualizado em 11 de novembro de 2026" junto da data
  visível (dateModified 2026-11-11 no JSON-LD).
- Corpo ≤ 1.400 palavras (hub `escola-bilingue-maringa` ≤ 1.700). Corte repetição, não substância.
- Maringá: situação concreta que muda a decisão; se o tema não tiver ângulo real, não force — prefira um fato da escola forte.
- Estrutura: ao gravar, confira 1 `</head>`, 1 `<body`, `<header class="site-header"`, `<nav class="breadcrumbs"`, `\n<article>`
  (cuidado: o CSS tem o comentário "O conteúdo do <article>" — não confunda com a tag).
- Sem commit/deploy; não mexa em blog/index.html, sitemap, vercel.json nem em artigos de outra frente.
- Ao fim: rode `node "C:/Users/Ivy_l/AppData/Local/Temp/claude/3ef4828863b3dfa0/f3d59989-b09e-4b5d-be4d-8f07ef911109/scratchpad/qa.mjs" .`
