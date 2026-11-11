# Avaliação independente do blog (rodada 4) — 11/11/2026

Somente leitura: nenhum arquivo do site foi alterado. Avaliação feita sobre o texto de `blog/<slug>/index.html` (24 artigos), contra `fatos.md`, `maringa.md`, `REESCRITA-BLOG.md` e `RODADA-3.md`. Nenhuma avaliação anterior foi lida antes de fixar as notas. Conferi também, nas páginas do site, `/em-maringa/` (tempos de carro) e `/niveis/infantil/` e `/niveis/fundamental-1/` (descrições por ano).

Nota = (3·relevância + 2·escola + 2·Maringá + 2·utilidade + 1·SEO) / 10. Decisões do dono (pop-up "Família de Maringá agendou uma visita" e faixa "Vagas limitadas para 2027") não contam contra a nota.

## Resumo

- Média: **8,1**
- Mínima: **7,4** (inteligencia-emocional-criancas) — Máxima: **8,8** (maple-bear-e-boa-vale-a-pena)
- Notas ≥ 8,5: **8** artigos
- Notas de 8,0 a 8,4: **7** artigos
- Notas < 8,0: **9** artigos
- Pontos fortes: nenhum valor em R$, nenhuma outra escola citada, dados de Maringá com fonte e arredondados, telefone certo, JSON-LD de FAQ igual ao FAQ visível nos 24, links internos sem quebra, `dateModified` correto, texto muito pouco reciclado (sobreposição de frases entre artigos é baixa).
- O que segura as notas: (1) a dimensão Maringá é fraca ou forçada em ao menos 7 artigos (entrar-escola-bilingue, metodologia, pais-que-nao-falam, inteligencia-emocional, crianca-chora, escola-bilingue-confunde, ferias); (2) um artigo com slug que não corresponde ao conteúdo; (3) violações pontuais das regras de dono único da Rodada 3; (4) um exit-modal que promete material inexistente.

## Problemas graves

### (f) Promessa de material/prazo inexistente
1. **telas-criancas-escola-e-casa** — o exit-modal diz "Receba gratuitamente dicas semanais sobre educação bilíngue + guia 'Como Criar uma Rotina de Inglês em Casa'" e o botão "Quero Receber Grátis". Não existe guia nem envio semanal. O pop-up de lead do mesmo artigo ("Receba as perguntas sobre telas para a visita no seu WhatsApp") também promete material. É o único exit-modal fora do padrão "Deixe seu nome e WhatsApp e a equipe entra em contato".
2. **escola-bilingue-confunde-crianca, ferias-escolares-ingles-atividades, imersao-ingles-vs-aulas-ingles, pais-que-nao-falam-ingles-escola-bilingue** — o box de lead promete "Receba dicas exclusivas… Cadastre-se e receba conteúdo semanal". Não há produção semanal declarada. **alfabetizacao-bilingue-fases** e **entrar-escola-bilingue-sem-ingles-year-3-4-5** usam "Receba dicas sobre educação bilíngue" (mais brando, mas ainda promete conteúdo).
3. **pais-que-nao-falam-ingles-escola-bilingue** — "Fale com a coordenação pedagógica… pelo WhatsApp — tudo em português": fatos.md só diz que a visita é com a coordenação e agendada pelo WhatsApp, não que a coordenação atenda no WhatsApp.
4. **imersao-ingles-vs-aulas-ingles** — remete ao "teste dos cinco minutos" que estaria em escola-bilingue-maringa. Esse teste não existe no hub (lá há "dez pontos para conferir"). Promessa de conteúdo que o leitor não encontra.

### (d) Violação das regras de dono único (Rodada 3) / texto reciclado
5. **escola-infantil-periodo-integral-maringa** — traz a tabela "Quatro trechos por dia" (Zona 7 / Sarandi / Paiçandu), cujos donos são `maple-bear-e-boa-vale-a-pena` e `mudando-para-maringa`. Também dedica um parágrafo inteiro e uma resposta de FAQ ao Maple Summer Camp (dono: `ferias-escolares-ingles-atividades`; aqui deveria ser 1 frase + link).
6. **ferias-escolares-ingles-atividades** — repete a máxima de 29–30 °C do Climatempo (dono: `turno-da-tarde`). Também usa a descrição do Parque do Japão (portal torii, lagos com carpas, pontes) que aparece de novo em `telas-criancas-escola-e-casa`.
7. Repetição moderada, sem ser grave: a frase da rede estadual (1º semestre até 10/7, 2º a partir de 27/7) aparece em crianca-chora, quando-trocar, ferias e mensalidade; o parágrafo do Experience Day (dia de vivência, inscrição por link nos destaques do Instagram) aparece em 5 artigos; "dor de barriga que some no sábado" aparece em crianca-chora e quando-trocar.

### (a/c) Afirmação sobre a escola ou a cidade sem base nos arquivos
8. **escola-bilingue-confunde-crianca** — "Na rede pública de Maringá… o inglês só vira disciplina obrigatória a partir do 6º ano". maringa.md só sustenta a regra da LDB (nacional); não diz o que a rede municipal de Maringá oferece. Pode estar errado para a rede local. Reescrever como regra nacional.
9. **escola-particular-ou-publica-maringa** e **melhor-escola-educacao-infantil-maringa** — "o número por turma varia por nível": fatos.md só autoriza "turmas reduzidas"; "varia por nível" é afirmação nova sobre a escola.
10. **educacao-infantil-em-maringa** e **inteligencia-emocional-criancas** — mapeiam Toddler = 2 anos, Junior = 4, Senior = 5. fatos.md só afirma Bear Care a partir de 1 ano e Nursery = 3 anos; os demais são inferência razoável, mas não explícita.
11. **transicao-educacao-infantil-ensino-fundamental** — "o 1º ano pode coincidir com a troca de unidade (do CMEI para uma escola municipal)": inferência a partir de "CMEI atende até 6 anos" (maringa.md); está hedgeada ("a Secretaria confirma"), mas é leitura própria.
12. **adaptacao-bear-care-1-ano** — pressupõe que quem entra no começo do ano adapta-se "no verão" e o card diz "calor de fevereiro"; a escola não publicou o calendário de 2027.

### Fontes externas (conferidas, citadas com precisão — sem problema, só registro)
Hartshorne/Tenenbaum/Pinker (Cognition, 2018, ~670 mil pessoas, ~17 anos); SBP "#MenosTelas #MaisSaúde" (2019, com aviso de atualização); Cambridge Young Learners (Pre A1–A2, sem aprovação/reprovação); Lei 13.185/2015; Lei 12.796/2013; Res. CNE/CEB 2/2018; Ideb do Maringá Post. Nenhuma está em maringa.md, mas todas vêm com nome, ano e ressalva.

### (e) Canibalização e SEO
13. **inteligencia-emocional-criancas** — o slug e os links internos (metodologia, crianca-chora) tratam o artigo como o de "inteligência emocional", mas título, H1 e conteúdo são "Autonomia e birras na primeira infância". Quem busca "inteligência emocional crianças" não encontra o tema no título. Além disso, o sumário diz "três atitudes", o H2 diz "quatro atitudes" e há três itens.
14. **imersao-ingles-vs-aulas-ingles** — slug fala em "imersão vs aulas", título e H1 em "escola bilíngue ou curso de inglês". Sobrepõe-se em parte a escola-bilingue-maringa (como reconhecer imersão), mitigado por link.
15. **metodologia-canadense-maple-bear** — compete com a página institucional /metodologia/; o FAQ "A escola tem STEAM?" é evasivo.
16. Datas: faltou o "Atualizado em 11 de novembro de 2026" visível em artigos que citam fatos posteriores à data de publicação — educacao-infantil-em-maringa (matrículas 2027 abertas), escola-bilingue-confunde-crianca (post de setembro), imersao-ingles-vs-aulas-ingles (Year 6/2027), transicao-educacao-infantil-ensino-fundamental (matrículas 2027). Estouros leves de tamanho (>1.400 palavras incluindo sumário e FAQ): adaptacao, crianca-chora, confunde, periodo-integral, maple-bear-e-boa, inteligencia (hub escola-bilingue-maringa está dentro do limite de 1.700).

### Sem problema grave encontrado em
Valores (nenhum R$), outras escolas por nome (nenhuma), nomes de crianças/famílias (nenhum), telefone, endereço, tempos de carro (25/29/15/12/8 min batem com /em-maringa/), contas de 4 trechos (48/60/100/116 min corretas), descrições do Year 1–5 e dos níveis infantis (batem com /niveis/), Ideb/CMEI/IBGE.

## Tabela completa (da menor para a maior nota)

| # | Artigo (slug) | Rel×3 | Escola×2 | Maringá×2 | Util×2 | SEO×1 | **Final** | Principal falta |
|---|---|---|---|---|---|---|---|---|
| 1 | inteligencia-emocional-criancas | 9 | 7,5 | 5 | 8,5 | 5 | **7,4** | Slug/links dizem "inteligência emocional", conteúdo é autonomia e birras; Maringá só no clima de julho; "três/quatro atitudes" inconsistente |
| 2 | metodologia-canadense-maple-bear | 8 | 9 | 4 | 8,5 | 8 | **7,5** | Sem ângulo de Maringá; competição com /metodologia/; FAQ de STEAM evasivo |
| 3 | pais-que-nao-falam-ingles-escola-bilingue | 9 | 7,5 | 3,5 | 9 | 8,5 | **7,5** | Sem Maringá; box de lead promete "conteúdo semanal"; CTA promete coordenação no WhatsApp |
| 4 | escola-bilingue-confunde-crianca | 9 | 7,5 | 5 | 8,5 | 8 | **7,6** | Afirma o que a rede pública de Maringá oferece sem fonte; lead promete material; falta "Atualizado em" |
| 5 | entrar-escola-bilingue-sem-ingles-year-3-4-5 | 8 | 9 | 5 | 8,5 | 8,5 | **7,7** | Quase nenhum dado de Maringá; lead "Receba dicas" |
| 6 | ferias-escolares-ingles-atividades | 8 | 8 | 7,5 | 8 | 8 | **7,7** | Repete a máxima do Climatempo (dono: turno-da-tarde); tabela de minutos sem base; lead promete "conteúdo semanal" |
| 7 | telas-criancas-escola-e-casa | 8,5 | 8,5 | 6,5 | 9 | 8 | **7,8** | Exit-modal promete guia e dicas semanais inexistentes; parquinhos/Parque do Japão soam a carimbo |
| 8 | quando-trocar-de-escola | 8,5 | 7 | 7 | 8,5 | 8,5 | **7,9** | Bloco da escola curto; repete trechos de crianca-chora; janela de julho apoiada só na rede estadual |
| 9 | imersao-ingles-vs-aulas-ingles | 9 | 8,5 | 5,5 | 8,5 | 9 | **7,9** | Remete a "teste dos cinco minutos" que não existe no hub; slug diferente do título; Maringá só por link; sem "Atualizado em" |
| 10 | crianca-chora-na-escola-adaptacao | 9 | 7,5 | 5,5 | 9 | 8,5 | **8,0** | Seção "Em Maringá" forçada (calendário estadual, susto); 1.493 palavras |
| 11 | mensalidade-maple-bear-maringa | 8,5 | 8,5 | 6 | 8 | 9 | **8,1** | Texto honesto mas de pouca substância própria; Maringá só calendário estadual e link |
| 12 | escola-infantil-periodo-integral-maringa | 9 | 8,5 | 8,5 | 9 | 8,5 | **8,3** | Duplica a tabela de 4 trechos e o bloco do Summer Camp (donos únicos); 1.464 palavras |
| 13 | alfabetizacao-bilingue-fases | 9 | 9 | 5,5 | 9 | 8,5 | **8,3** | Maringá só na data de corte (link); lead "Receba dicas" |
| 14 | adaptacao-bear-care-1-ano | 9 | 8,5 | 6,5 | 9 | 8 | **8,3** | Maringá só no calor (link); pressupõe calendário de verão; 1.479 palavras |
| 15 | melhor-escola-educacao-infantil-maringa | 9,5 | 7,5 | 6,5 | 9 | 9 | **8,3** | Escola quase só como exemplo genérico; "número por turma varia por nível" sem base; Maringá fraco (CMEI + trajeto) |
| 16 | transicao-educacao-infantil-ensino-fundamental | 9 | 9 | 7 | 9 | 8,5 | **8,4** | Inferência CMEI→escola municipal; falta "Atualizado em" |
| 17 | creche-maringa-idade-de-entrada | 9 | 8 | 8 | 8,5 | 9 | **8,5** | Boa; escola e Maringá poderiam ir além do trajeto de Paiçandu/Marialva/Sarandi |
| 18 | educacao-infantil-em-maringa | 9,5 | 7 | 8 | 9 | 9 | **8,5** | Bloco da Maple Bear raso; sem "Atualizado em" |
| 19 | turno-da-tarde-escola-infantil-maringa | 8,5 | 8,5 | 8,5 | 9 | 8 | **8,5** | Parte do conselho de sono é genérico; descrição do card de adaptação cita "calor de fevereiro" |
| 20 | escola-bilingue-maringa | 9,5 | 8,5 | 6,5 | 9,5 | 9 | **8,6** | Maringá só no parecer CNE e no trajeto; teste de visita citado por outro artigo não está nomeado aqui |
| 21 | escola-infantil-segura-maringa | 9 | 9 | 7,5 | 8,5 | 8,5 | **8,6** | Seção de espaço físico genérica; tempestade ocupa o centro mas rende pouco para a decisão |
| 22 | escola-particular-ou-publica-maringa | 9 | 8 | 9,5 | 8,5 | 8,5 | **8,6** | "Número por turma varia por nível" sem base; dependência de dado de imprensa para o Ideb |
| 23 | mudando-para-maringa-escola-dos-filhos | 8,5 | 8,5 | 9,5 | 9 | 8 | **8,6** | Repete o parágrafo do Experience Day; nicho de busca menor |
| 24 | maple-bear-e-boa-vale-a-pena | 9 | 9 | 8,5 | 9 | 8,5 | **8,8** | 1.464 palavras; poderia cortar o bloco de "fatos para conferir" que já está nas páginas do site |

## Recomendação de prioridade
1. Trocar o exit-modal de telas-criancas-escola-e-casa pelo padrão "Deixe seu nome e WhatsApp…" e tirar "conteúdo semanal/dicas exclusivas" dos 6 boxes citados.
2. Corrigir o slug/título de inteligencia-emocional-criancas (ou reescrever o conteúdo para o tema do slug, ou mover para `birras-e-limites-primeira-infancia`).
3. Tirar a tabela de 4 trechos e o parágrafo do Summer Camp de periodo-integral; tirar a máxima do Climatempo de ferias.
4. Reescrever como regra nacional a frase sobre a rede pública em escola-bilingue-confunde-crianca; apagar "varia por nível" em particular-ou-publica e melhor-escola.
5. Resolver a referência ao "teste dos cinco minutos" em imersao-ingles-vs-aulas-ingles.
6. Dar um ângulo concreto de Maringá, ou aceitar a nota, em metodologia, pais-que-nao-falam e entrar-escola-bilingue; acrescentar "Atualizado em" onde faltar.
