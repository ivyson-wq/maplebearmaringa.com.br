# Reescrita do blog (nov/2026) — regras comuns a todas as frentes

Objetivo: cada artigo final com nota ≥ 8,5 na régua abaixo e extremamente relevante para uma família
de Maringá com filho de 1 a 11 anos e para a realidade da Maple Bear Maringá.
O site ainda NÃO está no ar: pode trocar slug, fundir e apagar sem custo de SEO.

## Leia antes
- `editorial/fatos.md` — fatos da escola (inclui "Mais fatos do Instagram"). Única fonte sobre a escola.
- `editorial/maringa.md` — fatos da cidade COM FONTE. Use só o que está lá, números arredondados, nunca a
  seção "Pendentes de conferência". Pode citar a fonte no texto ("segundo o IBGE, Censo 2022").
- `editorial/avaliacao-blog.md` — a nota e "o que falta" de cada artigo atual.
- `editorial/COMO-ESCREVER.md` e `editorial/ADAPTACAO-MARINGA.md`.

## Régua (0–10 cada; nota = média ponderada)
- Relevância para família de Maringá com filho de 1 a 11 anos (peso 3)
- Ligação com a realidade da escola, com fatos reais de fatos.md onde cabem (peso 2)
- Ligação com Maringá, concreta e verdadeira, quando o tema pede — nada de "cidade arborizada, Parque do Ingá"
  como carimbo; use dados de maringa.md ou os tempos de /em-maringa/ (peso 2)
- Utilidade/concretude: critérios, exemplos, passos; zero frase vazia (peso 2)
- Intenção de busca/SEO: título responde a uma busca real; não canibaliza outro artigo (peso 1)

## Regras de escrita
- 900 a 1.400 palavras de corpo (artigo-hub pode ir a 1.700). Corte o que não ajuda a decidir/agir.
- PT-BR, tom de quem é da escola falando com a família; sem jargão; sem "Além disso", "É importante ressaltar",
  "Em suma", entusiasmo forçado, listas genéricas.
- A escola aparece no MEIO do texto, como exemplo concreto do tema (ex.: leitura → Book Signing Night;
  segurança → treinamento de abandono de área; transição → formatura do Senior Kindergarten), não só no fim.
- Nunca: valores em R$; outras escolas pelo nome; nomes de crianças/famílias; prometer vaga/data; inventar.
- Fatos-chave: Bear Care a partir de 1 ano; Bear Care, Toddler, Nursery, Junior e Senior Kindergarten;
  Year 1 ao Year 5; Year 6 (Fundamental II) abre em 2027; manhã 7h30–12h30 ou tarde 13h30–18h30; NÃO há
  integral; WhatsApp (44) 99178-3232; fixo (44) 3200-0327; Av. Arquiteto Nildo Ribeiro da Rocha, 1201,
  Jardim Higienópolis; Duplo Diploma; certificados Cambridge (cerimônia mar/2026).
- Pode linkar as páginas do site: /escola-infantil-maringa/ /educacao-infantil-bilingue-maringa/
  /creche-bilingue-maringa/ /pre-escola-maringa/ /colegio-maringa/ /escola-particular-maringa/
  /fundamental-2-maringa/ /eventos/ /eventos/terry-fox-run/ /eventos/experience-day/ /eventos/maple-summer-camp/
  /em-maringa/ /visite/ /matriculas/ /faq/ /niveis/infantil/ /niveis/fundamental-1/ /estrutura/ /equipe/

## Técnico (cada artigo)
- Mantenha o molde HTML do próprio artigo (head, scripts, popup socialProof, faixa "Vagas limitadas para 2027",
  CTAs, share-bar, layout). Atualize: title (≤ 60), meta description (≤ 155), keywords, og/twitter, canonical,
  H1, breadcrumb, sumário, corpo, FAQ visível (4–6 perguntas) e JSON-LD (Article + BreadcrumbList + FAQPage
  idêntico ao FAQ visível), datePublished pode ficar, dateModified = 2026-11-11.
- Cards "Leia também": apontar só para slugs do MAPA FINAL abaixo.
- FUSÃO: leve o melhor do artigo absorvido para o principal; depois APAGUE a pasta absorvida
  (`rm -r blog/<slug-absorvido>`). TROCA DE SLUG: `git mv blog/<velho> blog/<novo>` e troque as URLs internas.
- Registre cada slug que deixou de existir em `editorial/redirects-<frente>.txt`, uma linha `velho -> novo`.
- NÃO mexa em blog/index.html, sitemap.xml, vercel.json nem em artigos de outra frente. Sem commit/deploy.
- No fim, rode `node "C:/Users/Ivy_l/AppData/Local/Temp/claude/3ef4828863b3dfa0/f3d59989-b09e-4b5d-be4d-8f07ef911109/scratchpad/qa.mjs" .`
  (links para slugs do mapa final que outra frente ainda não criou podem aparecer — ignore só esses) e dê a si
  mesmo a nota na régua; reescreva o que ficar abaixo de 8,5.

## MAPA FINAL DE SLUGS (blog/<slug>/)

### Frente 1 — Escolher escola em Maringá
- escola-bilingue-maringa  ← absorve como-escolher-escola-bilingue
- melhor-escola-educacao-infantil-maringa  ← absorve escolinha-infantil-maringa-como-escolher
- melhores-escolas-bilingues-maringa
- escola-internacional-maringa
- maple-bear-e-boa-vale-a-pena
- escolha-escola-particular-checklist
- educacao-infantil-em-maringa
- creche-maringa-idade-de-entrada
- bercario-bilingue-maringa
- mensalidade-maple-bear-maringa  ← absorve quanto-custa-escola-bilingue-2026
- matricula-escola-bilingue-maringa  (novo slug de escola-bilingue-maringa-matricula-2026) ← absorve matricula-escola-bilingue-documentacao
- montessori-reggio-waldorf-maringa  (novo slug de escola-infantil-montessori-maringa) ← absorve escola-reggio-emilia-maringa, escola-waldorf-maringa
- escola-infantil-acolhedora-maringa  ← absorve escola-respeita-ritmo-crianca-maringa
- escola-infantil-segura-maringa
- escola-infantil-turmas-pequenas-maringa
- escola-inclusiva-educacao-infantil-maringa
- escola-infantil-periodo-integral-maringa
- maple-bear-maringa-infraestrutura
- escola-infantil-sem-telas-maringa  ← absorve tecnologia-na-educacao-infantil
- quando-trocar-de-escola
- professor-bilingue-o-que-avaliar

### Frente 2 — Inglês e bilinguismo
- imersao-ingles-vs-aulas-ingles  ← absorve imersao-vs-ingles-contraturno, escola-bilingue-ou-curso-de-ingles-qual-escolher, escola-bilingue-maringa-imersao-de-verdade
- ingles-em-casa-rotina-familia  ← absorve como-apoiar-filho-bilingue-em-casa, atividades-bilingues-fim-de-semana-criancas
- ferias-escolares-ingles-atividades  ← absorve como-fortalecer-ingles-nas-ferias (citar Maple Summer Camp)
- cambridge-para-criancas  (novo slug de cambridge-young-learners-exam) ← absorve preparacao-cambridge-criancas (usar a cerimônia de mar/2026)
- idade-certa-escola-bilingue  ← absorve escola-bilingue-educacao-infantil-necessaria
- segundo-idioma-antes-dos-5-anos  ← absorve neurociencia-bilinguismo-cerebro, educacao-bilingue-beneficios-criancas
- como-saber-se-meu-filho-esta-aprendendo-ingles-de-verdade  ← absorve vocabulario-ingles-por-idade, ingles-fluente-quanto-tempo
- pais-que-nao-falam-ingles-escola-bilingue
- escola-bilingue-confunde-crianca
- como-motivar-filho-estudar-ingles
- ingles-para-criancas-timidas-introvertidas
- musica-e-bilinguismo
- screen-time-bilingue-criancas  (telas em casa; tecnologia na escola fica com a Frente 1)
- leitura-infantil-bilingue-livros
- alfabetizacao-bilingue-fases

### Frente 3 — Desenvolvimento e dia a dia
- curriculo-canadense-escola-bilingue  ← absorve metodo-canadense-vs-programa-bilingue
- metodologia-canadense-maple-bear  ← absorve metodologias-ativas-canadense, aprendizado-por-projetos-escola-bilingue
- aprendizado-steam-escola-bilingue
- inteligencia-emocional-criancas  ← absorve habilidades-socioemocionais-bncc, desenvolvimento-socioemocional-bilingue, inteligencia-emocional-criancas-escola
- habilidades-do-seculo-21-escola-bilingue  ← absorve protagonismo-infantil-como-desenvolver, pensamento-critico-criancas-como-desenvolver, criatividade-e-inovacao-escola-bilingue, competencias-globais-criancas
- birras-e-limites-primeira-infancia  ← absorve disciplina-positiva-criancas-pais
- licao-de-casa-escola-bilingue  ← absorve habitos-estudo-criancas-escola-bilingue
- adaptacao-escola-bilingue-dicas-pais  ← absorve primeiro-dia-escola-bilingue-pais
- bullying-escola-bilingue-prevencao
- parceria-escola-familia-aprendizado
- ansiedade-infantil-escola-sinais
- autonomia-criancas-escola-bilingue
- brincar-e-aprender
- rotina-escola-bilingue-dia-a-dia
- transicao-educacao-infantil-ensino-fundamental
- fundamental-1-escola-bilingue
- educacao-infantil-bilingue-fases  (novo slug de ed-infantil-bilingue-1-5-a-5-anos)

### Frente 4 — Temas novos (criar a partir do molde de um artigo existente)
- dia-a-dia-no-bear-care  (o que a criança de 1 a 2 anos vive no turno; o que a família observa)
- adaptacao-bear-care-1-ano  (adaptação aos 12–24 meses; o que combinar com a equipe)
- festa-junina-escola-bilingue-maringa  (o Arraiá da escola; tradição + bilinguismo)
- book-signing-night-criancas-autoras  (crianças autoras; leitura e escrita em dois idiomas)
- formatura-senior-kindergarten-year-1  (fim da educação infantil e chegada ao Year 1 na mesma escola)
- entrar-escola-bilingue-sem-ingles-year-3-4-5  (criança de 8–10 anos vindo de escola sem inglês)
- irmaos-em-etapas-diferentes-mesma-escola  (logística da família, turnos, continuidade)
- turno-da-tarde-escola-infantil-maringa  (rotina 13h30–18h30; calor de Maringá com dado de maringa.md; sono, lanche, hidratação)

### Removidos (não recriar; não linkar)
ingles-para-adolescentes-escola-bilingue, bilinguismo-e-carreira-futuro-filhos,
intercambio-e-bilinguismo-preparando-filhos, resultado-enem-escola-bilingue,
alimentacao-saudavel-criancas-escola, sono-criancas-aprendizado, como-escolher-extracurricular-filho,
escola-bilingue
