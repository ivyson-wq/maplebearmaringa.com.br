# Auditoria de conversão e UX — Maple Bear Maringá

Data: 11/11/2026. Escopo: leitura do código + navegação local (celular 390x844 e desktop 1366x800).
Páginas percorridas: `/creche-bilingue-maringa/` (persona A), `/escola-bilingue-maringa/` e `/` (persona B), `/blog/mudando-para-maringa-escola-dos-filhos/` (persona C), mais `/visite/`, `/matriculas/`, `/valores/`, `/depoimentos/`.
Limite: `/api/*` não roda local. O formulário foi avaliado pelo código (`assets/lp-visita.js`, `assets/lead-capture.js`, `assets/components.js`, `api/visit-lead.js`) e simulando respostas da API (sucesso e erro).
Prints em `editorial/auditoria-img/`.

## Resumo executivo

O site é bem escrito e tem fotos reais, mas hoje deixa leads na mesa por seis motivos:

1. O blog, que é a porta de entrada de quem vem de busca informacional, usa um sistema de captação paralelo e quebrado. Tem prova social falsa ("Família Silva agendou uma visita há 2 minutos"). Os dois formulários mandam o lead para um serviço de terceiros (`insta-publisher.vercel.app`) sem conversão do Ads, sem UTM e sem tratamento de erro.
2. Na home, o CTA principal fica abaixo da primeira tela, no celular e no desktop.
3. Não há prova social real e visível. A seção de depoimentos é só um link para o Instagram, sem nenhum texto de família, nota do Google, número de alunos ou ano de fundação.
4. A principal objeção, o preço, fica sem nenhuma referência. As outras objeções (alimentação, integral, vagas) estão respondidas só em páginas secundárias.
5. O formulário não tem próximo passo depois do envio, e a promessa é "em até um dia útil", lenta para um lead quente.
6. Há excesso de camadas competindo no celular: cookie no topo, faixa de topo, header, barra fixa de baixo com WhatsApp e pop-up que abre ao voltar ao topo.

---

## ALTO impacto

### A1. Blog: captação paralela, quebrada e com prova social FALSA
- Onde: as 24 páginas de `/blog/*/` (exemplo: `mudando-para-maringa-escola-dos-filhos`). O CSS e o JS estão inline em cada artigo.
- Evidência de código, linhas ~446–565 do artigo:
  - `social-proof` inventa visitas: nomes sorteados de uma lista ("Família Silva", "Maria e João"…) e "há 2/5/12 minutos agendou uma visita", disparado aos 20 s e a cada 45 s. É prova social fabricada. Se o Procon, a Meta ou um pai perceber, queima a confiança e é publicidade enganosa (CDC). Em escola, o dano de reputação pesa mais que qualquer ganho.
  - `sendLead()` faz POST em `https://insta-publisher.vercel.app/api/blog/lead`, e não em `/api/visit-lead`. Esse lead não passa pelo funil e pelo drip do Lumied, a menos que o outro serviço encaminhe (não verificado). Também não dispara `mbFormLead` (conversão do Google Ads / Enhanced Conversions), não manda UTM/gclid/sessão, e o `catch(function(){})` engole qualquer falha.
  - O formulário inline (`handleLeadCapture`) esconde o form e mostra "Cadastro realizado!" antes de a resposta chegar. Com falha de rede, o pai acredita que foi atendido e ninguém liga.
  - O exit-modal do blog termina com `alert('Obrigado!…')` e abre uma aba do WhatsApp à força (`window.open`), o que o bloqueador de pop-up do celular costuma barrar. O lead some ou fica confuso.
  - Duas "urgências" sem lastro verificável: "Vagas limitadas para 2027 — Garanta a vaga" e, na faixa de topo, "vagas limitadas".
  - Os artigos não carregam `lead-capture.js` nem `lp-visita.js`. São dois ecossistemas diferentes de popup, exit-intent e CTA fixo no mesmo site.
- Print: `c-blog-mobile-primeira-tela.png`.
- Correção:
  1. Remover o bloco `social-proof` (HTML, CSS e JS) dos 24 artigos hoje. Não há versão honesta dessa mecânica; trocar por uma frase real (ver A3).
  2. Trocar `captureForm` e `exitModal` do blog pelo mesmo mecanismo da LP: `POST /api/visit-lead` com `origem` canônica, UTM, `mbFormLead` só após `r.ok && json.ok`, mensagem de erro com link de WhatsApp. Se precisar manter o endpoint antigo, ele precisa ser confirmado como alimentando o Lumied.
  3. Apagar o `alert()` e o `window.open` automático. Mostrar na própria página: "Recebemos! Quer adiantar? [Chamar no WhatsApp]".
  4. Manter só "vagas limitadas" se for verdade, e com número ("restam X vagas no Year 1"). Caso contrário, tirar.
  5. Fazer o patch num único script compartilhado (`/assets/blog-lead.js`) e remover o inline duplicado.

### A2. Home: o CTA principal está abaixo da primeira tela (celular e desktop)
- Evidência (medida):
  - Celular 390x844: H1 em y≈480–700, botões "Agendar uma visita" e "Falar no WhatsApp" em y=942 e y=1015 do documento. Primeira tela: 2 selos ("Maple Bear Canadian Schools", "Duplo diploma") e "olá, família!" ocupam metade da tela.
  - Desktop 1366x800: H1 em y≈500, botões em y=975, abaixo da dobra. O único CTA visível é o "Agendar visita" do cabeçalho (que abre o WhatsApp).
  - O H1 "Muito além do bilíngue." não diz "Maringá" nem a idade atendida na dobra.
- Prints: `b-home-mobile-primeira-tela-sem-cta.png`, `b-home-desktop-primeira-tela-sem-cta.png`.
- Correção: subir o hero. Tirar a cena dos 2 selos para uma faixa pequena abaixo do hero (ou ao lado do CTA). Reduzir o padding-top do hero (no desktop há ~190 px vazios antes do H1). Alvo: H1 + 1 linha de promessa + botão verde "Chamar no WhatsApp" + botão secundário "Agendar visita", todos antes de y=700 no celular e y=650 no desktop. Subtítulo curto: "Bear Care (1 ano) ao Year 5 · turmas reduzidas · matrículas 2027".

### A3. Prova social real é quase inexistente
- Evidência:
  - Creche LP: a seção "O que as famílias dizem" tem 1 cartão "Depoimento em vídeo: A Thaís, mãe da Lívia e do Theo… Assistir no Instagram →", sem citação, sem foto, sem nota. O link tira o visitante do site. Print: `a-creche-mobile-depoimento-so-link.png`.
  - `/depoimentos/`: página sem nenhum depoimento em texto, só links para Instagram, Google e o mesmo vídeo.
  - `/escola-bilingue-maringa/`: não existe seção de depoimentos nenhuma.
  - Sem nota do Google (ex.: "4,9 · 120 avaliações"). Sem `aggregateRating`/`Review` no JSON-LD (0 ocorrências).
  - Sem número de alunos, tempo de funcionamento em Maringá, certificações Cambridge reais com data, credenciais da coordenação. A home usa "1ª · a maior rede de escolas canadenses do mundo", que é dado da rede, não da unidade.
- Correção:
  1. Coletar com consentimento 4–6 depoimentos curtos em texto (2 linhas cada, com primeiro nome, idade do filho e "mãe do Theo, Year 2"), e 1 ou 2 vídeos embutidos (não link). Colocar um no hero da creche e um da escola logo abaixo da primeira dobra.
  2. Selo do Google com a nota real e link para as avaliações, logo abaixo dos CTAs do hero ("4,X no Google · N avaliações").
  3. Uma linha de fatos reais da unidade: ano de abertura, número de famílias, nº máximo de alunos por turma.
  4. Adicionar `aggregateRating` ao JSON-LD só com dados reais.

### A4. Preço: a objeção nº 1 não tem nenhuma âncora
- Evidência: "Valores sob consulta pelo WhatsApp" (creche, escola, `/matriculas/`, `/valores/`). A página `/valores/` é uma justificativa de por que não mostra o preço. O blog `mensalidade-maple-bear-maringa` existe, mas a LP não o destaca perto do CTA.
- Efeito: pai que compara 3 escolas no celular, à noite, sai para quem mostra faixa de preço ou pelo menos o que está incluso (material, alimentação, taxa de matrícula).
- Correção (decisão da direção, mas o recomendado é):
  - Mostrar "A partir de R$ X/mês (turno manhã, Bear Care)" ou uma faixa por nível, com "material didático e alimentação inclusos" em destaque.
  - Se a direção insistir em não publicar valor: criar um botão "Receber valores no WhatsApp" com mensagem pré-preenchida ("Quero saber o valor da mensalidade para meu filho de __ anos"), dentro de um bloco "Quanto custa?" no 1º terço da LP, e levar o resumo do que está incluso para esse bloco.

### A5. Formulário: sem próximo passo após enviar, promessa lenta, e conversão registrada para lead de baixa intenção
- Evidência:
  - Sucesso (`lp-visita.js`): esconde o form e mostra "Recebemos seu pedido. Nossa equipe vai te chamar no WhatsApp em até um dia útil". Não tem link de WhatsApp, não repete o número da escola para o pai salvar, não mostra o que fazer enquanto espera, não leva a nenhuma página de obrigado (não existe URL `/obrigado/`). Print: `a-creche-mobile-form-sucesso-sem-proximo-passo.png`. Sem URL de agradecimento, o Ads/GA4 depende só do evento JS.
  - "Em até um dia útil" é a pior promessa de tempo de resposta para quem acabou de pesquisar. Lead de escola esfria em horas.
  - `lead-capture.js` (exit-intent da home/LPs e newsletter): `handleSubmit` chama `mbFormLead` para qualquer origem, inclusive `exit-intent` e `newsletter`. Isso envia ao Google Ads a conversão de formulário (`AW_FORMULARIO`) para quem só pediu um PDF/guia, ensinando o Smart Bidding a perseguir lead frio. Deveria contar como conversão secundária.
- Correção:
  1. No sucesso, mostrar: "Pronto, [Nome]! Vamos chamar você no WhatsApp (44) 99178-3232 hoje, em horário comercial." + botão verde "Adiantar pelo WhatsApp" (mensagem pré-preenchida com nome e idade da criança) + "Salve nosso número". Se possível, abrir o WhatsApp automaticamente em celulares.
  2. Prometer um tempo real e curto ("em até 1 hora útil / ainda hoje"), e garantir internamente. Se não for possível cumprir, escrever "mesmo dia útil".
  3. Criar `/obrigado/` (noindex) e redirecionar o submit para lá com `?origem=` (permite meta de conversão por URL e uma página com próximo passo: mapa, o que levar à visita, guia das 22 perguntas).
  4. Em `lead-capture.js`, não chamar `mbFormLead` quando `origem` for `exit-intent`, `newsletter` ou `lead-magnet*`. Disparar só `generate_lead` com `value` menor, ou um evento separado `lead_magnet`.

### A6. Pop-up de "exit-intent" dispara no celular ao voltar ao topo
- Evidência: em `lead-capture.js`, a regra `maxScroll > 800 && scrollY < 200` abre um modal "Antes de você ir..." (pede nome + WhatsApp) no celular quando o visitante simplesmente rola de volta ao topo (por exemplo, para chegar ao menu ou ao botão do hero). Foi reproduzido em 390x844. Print: `a-creche-mobile-exit-popup-ao-voltar-ao-topo.png`. No desktop, também abre em `mouseleave` com `clientY<10`, o que dispara ao ir até a barra de abas.
- Efeito: interrompe quem está decidindo, cobre o CTA e oferece um PDF (22 perguntas) que concorre com o pedido de visita (menor intenção). Sem verificação de que a pessoa já tem o formulário da página.
- Correção: desativar em telas ≤ 768 px (pop-up em celular tem alta taxa de rejeição e é penalizado pelo Google em interstitials de entrada). No desktop, manter só `mouseleave` por cima da viewport, uma vez por visitante, e só depois de 30 s ou 50% de rolagem. Trocar a oferta por "Quer ver a escola antes? Agende uma visita" com 2 campos, para empurrar visita e não PDF.

### A7. Atribuição do WhatsApp: a mensagem não diz de qual página veio, e 36 botões abrem conversa em branco
- Evidência:
  - Dos wa.me do número da escola, 186 links usam "Olá! Vim do site da Maple Bear Maringá e gostaria de agendar uma visita." (mensagem idêntica em home, blog, barra fixa, rodapé). Quem atende não sabe se o pai veio da creche, do Fundamental ou de um artigo. O marcador `(ref: XXXX)` só entra com consentimento de cookies (sessão Lumied). Quem clica "Rejeitar" chega sem marca nenhuma.
  - 36 links (`.wa-float` em desktop e vários rodapés) são `https://wa.me/5544991783232` sem `text=`, abrindo uma conversa vazia, sem origem e sem contexto. O balão flutuante do desktop ("Agende sua visita") é esse caso.
  - Número consistente em todo o site: 5544991783232 e "(44) 99178-3232". O telefone fixo (44) 3200-0327 aparece em 8 lugares, sem problema.
- Correção: padronizar a mensagem com a origem em texto curto e legível, por exemplo "Olá! Vim pela página da creche e quero agendar uma visita. (site: creche)". Gerar via `data-origem` no clique, em `analytics.js`, para todos os links (inclusive os sem `text=`), sem depender de consentimento. Manter o `(ref:)` quando houver sessão. Assim a equipe vê a origem na primeira mensagem, e é possível medir a conversão por página no Lumied.

---

## MÉDIO impacto

### M1. Primeira tela no celular: 4 camadas antes do conteúdo
- Evidência, creche 390x844 (primeira visita):
  - Banner de cookies fixo no topo, 142 px (17% da altura), cobrindo faixa de topo e cabeçalho; fica fixo até a pessoa decidir, inclusive nos artigos do blog. Print: `a-creche-mobile-1-cookie-cobre-topo.png`.
  - Depois do cookie: faixa vermelha "Matrículas 2027" 84 px (o × quebra para uma 2ª linha) + cabeçalho sticky 78 px = 162 px de "chrome" antes do H1.
  - Barra fixa de baixo 74 px com "Agendar visita guiada →" + botão do WhatsApp.
  - Resultado: ~236 de 844 px ocupados; sem cookie, o H1 começa em 250 px. Botões do hero em y=393–517 (bom, e a rolagem até um CTA claro é zero). Mas há 5 CTAs na primeira tela (faixa de topo, hero verde WhatsApp, hero "Agendar uma visita", barra fixa, botão redondo do WhatsApp), que dizem coisas parecidas ("Agendar visita", "Agendar visita guiada", "Agendar uma visita", "Falar no WhatsApp").
- Correção: (a) transformar o banner de cookies em faixa baixa e compacta, ou 1 linha com "Aceitar/Rejeitar", empilhada acima da barra fixa; (b) eliminar a faixa de topo no celular (a barra de baixo já cumpre o papel) ou deixar só "Matrículas 2027 abertas" sem botão; (c) deixar 1 CTA primário (WhatsApp) e 1 secundário (formulário) no hero e rotular a barra fixa igual ao primário.

### M2. Dois caminhos com o mesmo rótulo: "Agendar visita" ora abre WhatsApp, ora desce até o formulário
- Evidência: em `components.js`, todo link para `/visite/` vira `window.open` de WhatsApp (faixa de topo, cabeçalho, barra fixa, rodapé, blog). Já o botão "Agendar uma visita" do hero das LPs é `#agendar` (rola para o formulário no fim da página: y=9742 de 12735 na creche, y=7061 de 8870 na escola). O formulário `/visite/` fica órfão: nenhum CTA do site leva a ele. Só quem digita a URL chega lá.
- Efeito: em desktop, `wa.me` abre WhatsApp Web ou um prompt de app, atrito para quem não tem o app logado. A decisão "só WhatsApp" é boa no celular e ruim no desktop (pai pesquisando no trabalho).
- Correção: no celular (user-agent móvel / `matchMedia('(pointer:coarse)')`), CTA = WhatsApp. No desktop, o botão "Agendar visita" abre um modal curto (nome + WhatsApp + idade da criança, 3 campos) com o endpoint `/api/visit-lead`; o código do modal já existe em `components.js` (`buildVisitModal`), hoje morto (nunca é chamado), e precisa trocar `trackLead` por `mbFormLead`. Alternativamente, pôr uma versão curta do formulário já no hero da LP, a partir de 768 px.

### M3. Formulário da LP: 4 obrigatórios + 3 opcionais, data nativa, validação só no servidor
- Evidência (`creche-bilingue-maringa`): Nome*, WhatsApp*, E-mail, Data de nascimento*, Melhor período, Mensagem (6 visíveis + honeypot). Altura total no celular ≈ 1 100 px; o botão fica abaixo da dobra e depois do textarea de 128 px. Print: `a-creche-mobile-form-com-barra-fixa.png` (a barra fixa "Agendar visita guiada" fica sobre o formulário e leva embora para o WhatsApp, competindo com o botão "Enviar").
  - `type="date"` no celular abre um seletor de calendário de rolagem longa; para um bebê de 1 ano, o pai precisa rolar até 2025 no calendário. `min="2010-01-01" max="2026-12-31"`: o `max` fixo quebra em 01/01/2027 (data de hoje de um recém-nascido de 2027).
  - Não há máscara nem `pattern` no telefone; erros só vêm da API ("Motivo: telefone inválido."), mostrados abaixo do botão e sem foco no campo. O texto "Motivo:" expõe strings técnicas do servidor (por exemplo "data de nascimento inválida"). Print: `a-creche-mobile-form-erro.png`.
  - Ótimo: campos com 48 px de altura, fonte 16 px (sem zoom do iOS), `autocomplete`, `inputmode="tel"` e link de WhatsApp no erro.
- Correção:
  1. Reduzir para 3 campos visíveis: nome, WhatsApp, idade da criança (select "meses/anos": 1 ano, 2 anos, 3, 4, 5, 6–10, 11+). Mover e-mail, período e mensagem para "Mais detalhes (opcional)" recolhido, ou removê-los. Mandar a idade ao servidor no formato que `ageToBracket` aceita (já suporta `crianca_idade` legado).
  2. Validação no cliente: máscara (44) 9XXXX-XXXX, mensagem em português por campo ("Faltou o DDD"), `aria-invalid`, foco no primeiro campo com erro e `scrollIntoView`.
  3. Trocar `max="2026-12-31"` por `max` calculado em JS (`new Date().toISOString().slice(0,10)`), como o modal já faz.
  4. Esconder a barra fixa de baixo quando o formulário estiver visível (`IntersectionObserver`), ou trocar o rótulo dela, para não competir com o botão de enviar.
  5. Mensagens amigáveis em lugar de "Motivo: …" cru.

### M4. Objeções respondidas em páginas secundárias, mas não nas páginas de entrada
- Evidência:
  - Alimentação: "A alimentação é inclusa" aparece em 3 páginas (escola bilíngue, fundamental e alguns artigos), mas não na LP da creche, na home, no FAQ geral nem em `/matriculas/`. A mãe do bebê não sabe se há lanche/almoço, papinha, berço.
  - Período integral: dito na LP da escola ("A escola não tem período integral") e no blog, mas a LP da creche fala só em "manhã 7h30–12h30 e tarde 13h30–18h30". Quem precisa de horário estendido (pais que trabalham o dia todo) descobre tarde e sai. Isso é um filtro: dizer cedo e com clareza economiza ligação e melhora a qualificação.
  - Segurança: a LP da creche tem 4 itens, todos perguntas genéricas ("Pergunte como a escola identifica quem entra e quem sai…") e não respostas. É transferir ao pai o ônus. Faltam fatos: câmeras, controle de acesso, ratio criança/adulto, ficha médica, quem faz a troca de fraldas.
  - Adaptação: promessa ("a coordenação explica na visita"), sem um dia a dia concreto (primeira semana, horários reduzidos, presença dos pais).
  - Vagas: "turmas reduzidas" sem número; "Vagas limitadas" sem número.
  - Mapa/estacionamento/como chegar: só o link "Como chegar"; sem mapa embutido (só `/contato/` tem iframe), sem referência de bairro ("Jardim Higienópolis, perto de…"), sem informação de estacionamento no horário de entrada.
- Correção: bloco "Resumo prático" (6 linhas, ícones) logo abaixo do hero em todas as LPs: Turnos · Alimentação inclusa · Sem período integral · Idades · Turma de até N crianças · Endereço/estacionamento. Em creche, acrescentar "Adaptação: primeira semana com horário reduzido e pais presentes" (se for verdade). FAQ com as 6 perguntas mais comuns, e as duas de preço e integral no topo.

### M5. Fotos reais aparecem tarde; o hero do celular não tem rosto
- Evidência: na creche (12 735 px de altura), a primeira galeria está em y≈7000, e na dobra do celular só há texto. A foto do hero existe, mas aparece só após o texto. A galeria é boa (crianças reais, uniformes, professora). Print: `a-creche-mobile-galeria.png`. Na escola, a foto do hero (crianças no parquinho) funciona no desktop. Imagem do hero em `loading="auto"` e sem `fetchpriority="high"`.
- Correção: no celular, colocar a foto do hero (ou uma tira de 3 fotos) entre H1 e botões, com `fetchpriority="high"`; subir a galeria para logo depois do "Resumo prático"; legendas com nome da atividade já ajudam. Reduzir o comprimento da LP: a creche tem 12 seções antes do formulário, e o conteúdo SEO (como escolher, por que bilíngue) pode ir para depois do CTA ou virar acordeões.

### M6. Blog (persona C): CTA tardio e duas camadas fixas
- Evidência (`mudando-para-maringa-escola-dos-filhos`, 9 215 px): o primeiro CTA no corpo do artigo ("Falar pelo WhatsApp") está em y=3782 (≈41%); o formulário e a caixa "Vai se mudar para Maringá?" em y≈6 000–6 700. Antes disso só há a barra fixa genérica ("Vim do site…") e a faixa de topo. Há 2 formulários, 3 caixas de CTA, 2 faixas fixas (`sticky-cta` escondida por CSS, `mobile-cta-bar`) e o banner de cookies persistindo no topo durante a leitura. O texto do artigo é bom e responde à persona (tempo de trajeto por bairro, Experience Day, mensagem sugerida para o WhatsApp). Falta um CTA no começo que diga "mande a idade e o bairro e respondemos hoje".
- Correção: logo depois do 2º parágrafo, um bloco de 1 linha: "Está se mudando? Mande a idade do seu filho e o bairro que você considera: respondemos com o trajeto e as vagas. [WhatsApp]". Usar essa mensagem pré-preenchida em todos os CTAs do artigo (a mensagem do CTA "Agendar Minha Visita" já é boa). Remover a duplicação (`sticky-cta`, `float-wa` escondidos por `!important`) do HTML dos artigos.

### M7. Tempo e canal de resposta não são prometidos com credibilidade
- Evidência: "Respondemos pelo WhatsApp em até um dia útil", "atendemos em dias úteis" (sem horário), e `/visite/` diz "Nossa equipe responde no horário comercial" sem dizer qual é. Não há horário de visita fixo ("recebemos visitas ao longo de todo o dia"), nem agendamento direto (calendário).
- Correção: mostrar "Atendimento: seg–sex, 8h–18h" ao lado do botão, e "Resposta média: 15 min em horário comercial" (se medido). Considerar um link de agendamento com horários de visita (Calendly/Lumied) como segunda opção para quem não quer conversar.

### M8. Faixa "vagas limitadas" e outras urgências sem lastro
- Evidência: "vagas limitadas" na faixa de topo do blog e "Vagas limitadas para 2027 — Garanta a vaga do seu filho" (`cta-box .urgency`); `/matriculas/` repete "as vagas por turma são limitadas".
- Correção: manter só com número ou data real ("Matrículas 2027 abertas até DD/MM", "Bear Care: restam N vagas"). Escassez genérica é ignorada, e a falsa vira argumento contra a escola.

---

## BAIXO impacto

### B1. Dados estruturados com telefone de outra cidade
- `blog/index.html` linha 43: `"telephone": "+55-54-99939-6742"` (DDD 54 = Rio Grande do Sul, número de outra unidade). As demais 24 páginas usam `+55-44-99178-3232`. Corrigir para o número de Maringá (afeta NAP e Google Meu Negócio).

### B2. Horário do verão (13h30 às 17h30) em 9 arquivos
- Coerente com o evento citado (Maple Summer Camp), mas convém rotular "horário do camp" para não conflitar com os 13h30–18h30 do turno regular.

### B3. Alvos de toque pequenos
- No celular: `×` da faixa de topo 20x26 px e do banner; links dentro de parágrafo com 17–18 px de altura (`Como chegar`, `pré-escola`, `Instagram…`); itens de menu e rodapé com 36 px. Mínimo recomendado: 44x44 px (Apple) / 48 dp (Material). O botão `×` e os links de "Como chegar" são os mais relevantes para o funil.
- Contrastes medidos estão ok: texto principal 17,7:1; rótulos 10,9:1; eyebrow vermelho sobre bege 4,82:1 (passa AA para texto normal). O link vermelho "Política de Privacidade" sobre o fundo preto do banner de cookies é o ponto mais fraco; mudar para branco sublinhado.

### B4. Rolagem suave global (`scroll-behavior: smooth`) atrasa o salto para o formulário
- O clique em `#agendar` percorre ~9 000 px animados em tela longa. Com `prefers-reduced-motion` ok, mas na prática o pai vê um borrão de 1 s. Usar `scroll-behavior: auto` para âncoras longas, ou levar o formulário mais para cima.

### B5. Chamado de CDN e console local
- `/api/instagram-feed` e `/api/rastreamento` retornam 404 só no servidor local (esperado). Em produção, conferir que a galeria do Instagram da home tem fallback visual quando a API falha (o console registra "vazio: error"). O cache de configuração de rastreamento fica em `localStorage` sem prazo (`CFG_KEY`); um ID de teste antigo ficaria carregando até a próxima resposta. Colocar TTL.

### B6. Página de depoimentos sem função
- `/depoimentos/` fica no menu principal, mas é mais fraca que a LP. Ver A3; após ter depoimentos reais, ela vira a página mais forte do site. Até lá, tirar do menu ou renomear ("Avaliações e Instagram").

---

## O que está bom e deve ser mantido
- Número do WhatsApp (5544991783232), endereço (Av. Arquiteto Nildo Ribeiro da Rocha, 1201, CEP 87060-390) e CEP idênticos em todas as páginas, com `Como chegar` em Google Maps.
- Mensagens pré-preenchidas contextuais nas LPs e no blog ("Quero saber sobre a creche bilíngue…", "Estou me mudando para Maringá…"): é o padrão certo.
- Campos do formulário com altura de 48 px e fonte de 16 px, `autocomplete`, honeypot oculto, UTM/gclid e `sessao` enviados, conversão disparada só após a API confirmar.
- Texto direto e honesto sobre limites (sem integral, valores no WhatsApp), fotos reais de atividades, linguagem acolhedora, sem rolagem horizontal no celular.

---

## As 10 mudanças de maior impacto, em ordem

1. Remover a prova social falsa do blog (24 artigos): bloco "Família Silva agendou uma visita" e "vagas limitadas" sem lastro.
2. Unificar a captação do blog no `/api/visit-lead` (conversão do Ads, UTM, erro visível, sem `alert` nem `window.open` automático).
3. Subir o hero da home: H1 + botão de WhatsApp antes de y=700 no celular e antes de y=650 no desktop; mover os selos para baixo.
4. Adicionar prova social real em texto e nota do Google nas LPs (creche, escola) e no hero: 4–6 depoimentos curtos, 1 vídeo embutido, nota e número de avaliações, fatos da unidade.
5. Responder preço e "o que está incluso" logo na primeira tela das LPs: faixa de valor ou bloco "Quanto custa?" com alimentação e material inclusos; "sem período integral" dito cedo.
6. Reescrever o pós-envio do formulário: mensagem personalizada, botão "Adiantar pelo WhatsApp", número para salvar, página `/obrigado/`, promessa de resposta em horas e não em "um dia útil".
7. Desligar o exit-intent no celular e reduzir no desktop; tirar a conversão de Ads dos leads de guia/newsletter (`mbFormLead` só para visita/WhatsApp).
8. Encurtar o formulário da LP para 3 campos (nome, WhatsApp, idade em select), com máscara e erros claros; esconder a barra fixa quando o formulário estiver na tela; corrigir o `max` fixo da data.
9. Limpar o topo do celular: banner de cookies compacto e inferior, sem faixa de topo, 1 CTA primário por tela e rótulos iguais ("Chamar no WhatsApp" / "Agendar visita").
10. Padronizar a mensagem do WhatsApp com a página de origem em texto (mesmo sem consentimento), incluir `text=` nos 36 links em branco e, no desktop, oferecer um modal curto de formulário em vez de abrir o WhatsApp Web.
