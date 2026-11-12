# Auditoria do caminho do lead — Maple Bear Maringá

Data: 11/11/2026. Somente leitura: site em `C:\dev\maplebearmaringa.com.br`, Lumied em `origin/main` do `lumied-next`, blog-lead em `C:\dev\insta-publisher`. Nenhum banco foi consultado; o que depende de dado (cadência ativa, linha de WhatsApp, `ciclo`, variáveis da Vercel) está marcado como "confirmar".

Convenção das citações: `site:` = repositório do site; `lumied:` = `apps/web/src/...` do lumied-next; `ip:` = insta-publisher.

---

## 1. Fluxo desenhado

```
ANÚNCIO / ORGÂNICO
   |
   v
PÁGINA DO SITE  (assets/analytics.js carrega em todas as páginas)
   |-- grava sessão anônima (sessionStorage lumied_sessao) ........ analytics.js:155-197
   |-- beacon pageview -> mbmaringa.lumied.com.br/api/track/pageview  analytics.js:191
   |-- guarda utm/gclid (mb_utm) .................................. components.js:7-31
   |-- lê IDs de GA4/Ads/Pixel em /api/rastreamento (hoje vazio) .. analytics.js:110-123
   |
   +--> CAPTURA A: formulário  --> POST /api/visit-lead (edge, Vercel)
   |        campos: nome, telefone, email, data_nascimento, período, mensagem,
   |        utm_source/medium/campaign, gclid, sessao, pagina
   |        |-- (paralelo) e-mail Resend -> LEAD_NOTIFY_TO (secretaria@)  visit-lead.js:318
   |        |-- (paralelo) POST mbmaringa.lumied.com.br/api/leads ......  visit-lead.js:222-248
   |        |       Lumied: triagem -> rate limit -> dedupe -> crm_lead (1ª etapa aberta,
   |        |       rodízio de dono) -> liga lp_evento da sessão ao lead   lumied: api/leads/route.ts:53-203
   |        |-- responde ok se QUALQUER um dos dois funcionou ......... visit-lead.js:336-369
   |        v
   |   tela de sucesso + conversão (mbFormLead) + "Vamos te chamar em até um dia útil"
   |
   +--> CAPTURA B: clique no WhatsApp (5544991783232), texto pré-preenchido
   |        + marcador "(ref: XXXXXXXX)" = 8 primeiros caracteres da sessão  analytics.js:258-279
   |        evento: generate_lead + conversão Ads de WhatsApp (se cadastrada)  analytics.js:284-300
   |        v
   |   conversa chega ao Lumied (linha de WhatsApp) -> lib/ads/lp-atribuicao.ts
   |   extrairRefSessao -> acha a sessão -> grava gclid/utm no lead
   |
   +--> CAPTURA C: formulários do BLOG (24 artigos) --> POST insta-publisher.vercel.app/api/blog/lead
            NÃO passa pelo Lumied nem pelo e-mail da escola. Ver falha ALTO-1.
```

### 1.1 Pontos de captura (inventário)

| Ponto | Onde | Destino | Sessão / UTM / gclid | Conversão disparada |
|---|---|---|---|---|
| Página /visite/ (formulário) | `visite/index.html:80-215`, envio em :166 | /api/visit-lead, origem `site-visite` (default) | UTM/gclid sim (:160). Sessão NÃO. Página NÃO. | `mbFormLead` (:186) |
| 12 landing pages com `data-lp-visita` (escola-bilingue, creche, colegio, em-maringa, ensino-fundamental, fundamental-2, pre-escola, educacao-infantil, escola-infantil, escola-particular, experience-day, summer-camp) | ex. `escola-bilingue-maringa/index.html:286`; JS `assets/lp-visita.js:58` | /api/visit-lead; origem cai em `site-visite` porque o JS não manda origem (`lp-visita.js:7-9`, `visit-lead.js:110`) | UTM/gclid sim (`lp-visita.js:46-49`), sessão sim (:50), página sim (:51) | `mbFormLead` + `visit_request` (:70-72) |
| Exit-intent (todas as páginas com lead-capture.js) | `assets/lead-capture.js:24-75` (popup), envio :104-154 | /api/visit-lead, origem `exit-intent` | UTM/gclid sim, sessão sim (:126), página sim | `mbFormLead` (:137) |
| Newsletter da home e do blog | `index.html:937`, `blog/index.html` (9 ocorrências); mesmo handler | origem `newsletter` | idem | idem |
| Lead magnets (22 perguntas, inglês em casa) | `materiais/22-perguntas/index.html:67`, envio :160; `materiais/ingles-em-casa/index.html:157` | origem `lead-magnet-*` | UTM/gclid sim (:154); sessão NÃO; página NÃO | só `lead_magnet_download` (:192). Sem conversão do Ads, sem Enhanced Conversions |
| Blog (24 artigos): form inline e modal de saída | ex. `blog/escola-bilingue-maringa/index.html:427,488`, envio :604-614 | insta-publisher.vercel.app/api/blog/lead | nada (só nome, telefone, source, article_slug) | nenhuma; abre wa.me direto (:614) sem `mbWhatsApp` |
| Modal "Agendar visita" | `assets/components.js:223-346` | /api/visit-lead | — | CÓDIGO MORTO: `buildVisitModal` nunca é chamada (só definida em :223) |
| CTA "Agendar visita" (topo, barra mobile) | `components.js:362-381` | NÃO abre formulário: intercepta links para /visite/ e abre WhatsApp | ref de sessão via `mbWhatsApp` | `generate_lead` + `visit_whatsapp_click` |
| Botão WhatsApp flutuante, barra mobile, links no texto | 331 ocorrências de `wa.me/5544991783232` no site; barra mobile `components.js:182` | WhatsApp (44) 99178-3232 | ref carimbado pelo listener `analytics.js:295-300` | `generate_lead` + conversão Ads WhatsApp |
| Telefone clicável | só `index.html:886` (`tel:+554432000327`) | ligação | nenhum | nenhuma |
| E-mail | 71 `mailto:secretaria@maplebearmaringa.com.br` | caixa da secretaria | nenhum | nenhuma |
| Trabalhe conosco | `trabalhe-conosco/index.html:240` -> `api/curriculos.js` | Lumied /api/talentos + e-mail | n/a (RH, não é lead) | n/a. Se o Lumied falha, devolve 502 e o usuário vê erro (`curriculos.js:177-181`): comportamento correto, ao contrário do lead |

Número de WhatsApp único em todo o site: 5544991783232 (grep: 331 ocorrências, nenhuma variante). Texto padrão: "Olá! Vim do site da Maple Bear Maringá e gostaria de agendar uma visita." (`components.js:362`, `lead-capture.js:10`, `lp-visita.js:13`). Os artigos do blog têm textos próprios por artigo (ex. "Li o guia sobre escola bilíngue...").

---

## 2. Falhas ordenadas por impacto

### ALTO

**ALTO-1. Todos os formulários do blog (24 artigos) vão para outro sistema, podem cair na empresa errada e escondem erro.**
- Evidência: `blog/escola-bilingue-maringa/index.html:604-614` (e nos outros 23): `fetch('https://insta-publisher.vercel.app/api/blog/lead', ...).catch(function(){})`, depois mostra "Cadastro realizado!" (:436) ou `alert('Obrigado! Entraremos em contato...')` (:601) sem olhar a resposta.
- O payload não leva `company_id` (`{name, phone, source, article_slug}`). No `ip: src/app/api/blog/lead/route.ts:47-65`, sem `company_id` o código usa o "fallback": "pega qualquer empresa com blog configurado" (`.limit(1).maybeSingle()`). Se o insta-publisher atende mais de uma empresa com blog (Wozy, Construfare, outras escolas), o lead da Maringá é gravado, pontuado e notificado na empresa errada (`route.ts:118`, `notifyNewLead`). Confirmar em produção qual empresa é devolvida.
- Mesmo quando cai certo, o lead não entra no CRM da Maringá, não gera e-mail para a secretaria, não tem sessão/UTM/gclid e não dispara nenhuma conversão. Quem fecha o formulário vê sucesso mesmo com falha.
- O blog é a maior fonte de tráfego orgânico (94 artigos no README, 24 com formulário nesta branch). Hoje é o ponto de maior perda silenciosa.
- Correção: trocar `sendLead()` nos 24 arquivos por um helper único em `assets/` que faça `POST /api/visit-lead` com `origem: 'blog-inline' | 'blog-exit'` (adicionar ao `ALLOWED_ORIGINS_LEAD` em `visit-lead.js:47-57` e tratar como "light lead"), enviando `sessao`, `pagina`, UTM e `artigo`; mostrar sucesso só com `r.ok && json.ok`; abrir o WhatsApp via `window.mbWhatsApp(url, 'blog-form')` para contar a conversão e carimbar o ref. Em paralelo, desligar o endpoint `/api/blog/lead` para a Maringá no insta-publisher ou exigir `company_id`.

**ALTO-2. Se o Lumied recusar ou falhar, a família vê sucesso e o lead fica só no e-mail; nada avisa que o CRM ficou sem ele.**
- Evidência: `visit-lead.js:336` só devolve erro se os DOIS canais falharem; com e-mail ok e Lumied 4xx/5xx a resposta é 200 `{ok:true, channels:{lumied:'failed'}}` (:362-369). Nenhum `console.error` nesse caso (o log de :337 só roda quando ambos falham), nenhuma fila de reenvio, nenhum alerta.
- Consequências: lead sem registro no funil, sem cadência, sem SLA, sem `gclid` para a conversão offline e sem ligação da sessão. A secretaria só tem o e-mail.
- Divergências de validação entre site e Lumied que produzem exatamente esse caso (o site aceita, o Lumied devolve 422 e o usuário vê "Recebemos seu pedido"):
  - telefone: site aceita 10 a 13 dígitos (`visit-lead.js:124,129`); Lumied só aceita 10 ou 11 dígitos depois de tirar o 55, com DDD válido, e recusa sequências "de teste" (`lumied: lib/lead-publico.ts:86-98`). Exemplo: "044 99178-3232" (12 dígitos sem 55) passa no site e é recusado no CRM.
  - nome: site aceita 2 caracteres (`visit-lead.js:121`); Lumied exige 3 (`api/leads/route.ts:60`).
  - nome com "<", ":" ou "//" é tratado como robô e finge sucesso (`lead-publico.ts:31`), sem gravar.
- Correção: (a) no `visit-lead.js` logar `console.error` e marcar o e-mail da equipe com um banner "NÃO ENTROU NO CRM: cadastrar manualmente" quando `!lumiedOk`; (b) alinhar a validação (telefone 10/11 dígitos após remover 55 e zeros à esquerda, nome mínimo 3) e devolver 400 com a mensagem para o usuário corrigir; (c) adicionar `AbortController` de 8 s no fetch ao Lumied (hoje não há timeout, `visit-lead.js:227`; a função fica pendurada até o limite de 15 s do Lumied) e uma nova tentativa única em 5xx/429.

**ALTO-3. O limitador por IP do Lumied enxerga o IP do servidor da Vercel, não o da família; em campanha, leads reais podem tomar 429 e ficar só no e-mail.**
- Evidência: `lumied: api/leads/route.ts:89-96` limita 6 leads em 10 min e 20 por hora por IP, `failClosed: true`. O IP vem de `clientIp()` (`lib/ratelimit.ts:148-165`), que usa `x-real-ip` ou o último salto do `X-Forwarded-For`. A chamada é feita pela função edge (`visit-lead.js:227-245`), sem repassar nenhum cabeçalho do visitante. Logo o Lumied vê o IP de saída da Vercel, compartilhado por todos os visitantes (e possivelmente por outros clientes da Vercel).
- Com 7 envios em 10 minutos (um dia bom de anúncio) ou 21 em 1 hora, os seguintes recebem 429 "muitas tentativas" e, pela falha ALTO-2, o usuário ainda vê sucesso. O teto por escola de 60/h (`route.ts:124`) é folgado; o gargalo é o teto por IP.
- Confirmar: simular 7 POSTs consecutivos em homologação (não em produção) e checar `channels.lumied`.
- Correção: no Lumied, aceitar um segredo de servidor do site (ex. cabeçalho `x-site-chave` validado contra variável de ambiente) e nesse caso usar o IP do cabeçalho `x-forwarded-for` enviado pelo site; ou pular o limite por IP para chamadas autenticadas e manter só o teto por escola. No site, repassar `x-forwarded-for` do visitante no fetch.

**ALTO-4. Ninguém é avisado na hora no Lumied; o aviso ao vivo é só o e-mail do site, para uma única caixa, com a promessa "em até um dia útil".**
- Evidência: `/api/leads` só dispara push para o tenant comercial da Lumied (`lumied: lib/staff/push.ts:238-249`, `if (escolaId !== LUMIED_COMERCIAL) return`). Para escola, não há notificação de lead novo. O que existe: alerta de "leads sem 1º contato" uma vez por dia às 10h de Brasília (`vercel.json` do app: `crm-sla` `0 13 * * *`; `api/cron/crm-sla/route.ts:105-137`, SLA padrão 6 h, deduplicado por dia); rodízio só em horário comercial e hoje desligado enquanto não houver fila (`mig 0307`); autoatribuição ao comercial menos carregado no INSERT (`mig 0093`) sem aviso a ele.
- O e-mail da equipe (`visit-lead.js:283`) vai para `LEAD_NOTIFY_TO` (default `secretaria@maplebearmaringa.com.br`): uma caixa, sem WhatsApp, sem plantão, sem escalonamento. Sem Resend ou com a caixa sem ninguém olhando, o lead esfria.
- A promessa ao usuário é "em até um dia útil" (`lp-visita.js:68`, `lead-capture.js:145`, `visite/index.html` e nas LPs `lp-form-note`). Para mãe que fez uma pesquisa às 21h, um dia útil é o suficiente para ela fechar com outra escola.
- Correção: (a) no Lumied, notificar `comercial`/`secretaria`/`gerente` (sino + push + WhatsApp da escola) a cada lead novo de site, com o botão "Chamar agora"; (b) configurar `LEAD_NOTIFY_TO` com 2 ou 3 pessoas, incluindo a diretora; (c) reduzir `crm_sla_1contato_horas` para 1 e rodar o `crm-sla` de hora em hora no horário comercial; (d) mudar a promessa para "em até 1 hora no horário comercial (seg a sex, 8h às 18h)" somente depois de cumprir (a) a (c).

**ALTO-5. Sem medição pronta para anúncios: GA4, Pixel e Google Ads estão vazios, e as conversões estão desenhadas para inflar.**
- Evidência: IDs vêm só de `/api/rastreamento` (`analytics.js:23-27,110-123`; `api/rastreamento.js:269-285` devolve tudo `null` se vazio). Hoje vazio, então nenhuma tag carrega, nenhum `generate_lead` sai e nenhuma conversão do Ads existe. Anúncio rodando assim queima verba sem aprendizado.
- Mesmo preenchido: (1) `trackLead` dispara `generate_lead` tanto no clique de WhatsApp quanto no envio de formulário (`analytics.js:205-216,250,286`), e o botão flutuante aparece em todas as páginas: o mesmo visitante pode somar várias "conversões"; se o Ads importar o `generate_lead` do GA4 e também usar as conversões nativas, conta em dobro; (2) clique no WhatsApp não é lead, é intenção; otimizar por ele treina o Smart Bidding para curioso; (3) sem `transaction_id`/`value` nos eventos; (4) Meta Pixel só carrega após "Aceitar" (`analytics.js:128-144,304`), sem API de Conversões do servidor; (5) formulários de blog e materiais não disparam conversão nenhuma (ALTO-1 e MÉDIO-3).
- Correção no checklist abaixo (seção 4).

### MÉDIO

**MÉDIO-1. Contato repetido é engolido sem sinal.** `lumied: api/leads/route.ts:128-135`: se o telefone ou e-mail já existe no CRM (em qualquer época), devolve `{ok:true}` sem atualizar o lead, sem criar atividade, sem reabrir se estava "Perdido" ou "Esfriou", sem avisar ninguém. Mãe que preencheu em setembro e volta agora, em campanha, é o lead mais quente e fica invisível no Lumied (só o e-mail do site avisa). Correção: no dedupe, registrar `crm_atividade` ("preencheu o formulário de novo, página X"), mover de volta a etapa aberta quando estiver perdido/esfriou e acionar a notificação de lead novo.

**MÉDIO-2. Sessão e página faltam em /visite/ e nos materiais.** `visite/index.html:160-175` e `materiais/*/index.html:154-165` não enviam `sessao` nem `pagina` (ao contrário de `lp-visita.js:50-51` e `lead-capture.js:126-128`). Resultado: a ponte "comportamento do site -> lead" (`api/leads/route.ts:189-200`) não liga as visitas anteriores; o lead perde o score de engajamento; e a origem de página não aparece em `observacoes`. Correção: adicionar as duas linhas (`data.sessao = sessionStorage.getItem('lumied_sessao')`, `data.pagina = location.pathname`), ou, melhor, usar o mesmo `lp-visita.js` em /visite/.

**MÉDIO-3. Materiais não registram conversão e prometem o que não entregam.** `materiais/22-perguntas/index.html:90` ("Receber no WhatsApp"), :75 ("Vamos enviar o PDF aqui pra você") e :173 ("Também enviamos uma cópia para o seu e-mail"); o formulário só pede nome e WhatsApp (sem e-mail) e o site não envia nada por WhatsApp nem por e-mail para a família: só abre o download. O exit-intent também promete o guia "direto no seu WhatsApp" (`lead-capture.js:~39`). Se não houver cadência de WhatsApp para `lead-magnet-*`/`exit-intent` ativa no Lumied (confirmar), a promessa quebra no primeiro contato e o lead esfria. Os materiais também não chamam `mbFormLead` (linhas :192 e :191 só disparam `lead_magnet_download`). Correção: trocar os textos para "Baixe agora" ou configurar o envio automático do PDF e remover a frase do e-mail; chamar `mbFormLead` com a origem.

**MÉDIO-4. Origem das landing pages se perde.** `lp-visita.js:7-9` não manda `origem`, então todas as 12 LPs entram como `site-visite`; só a `pagina` identifica a LP (fica em `observacoes` do lead, não em campo filtrável). Para relatório por campanha/LP e para regras de cadência por origem, é preciso mandar a origem na lista fechada. Correção: aceitar `lp-*` no `ALLOWED_ORIGINS_LEAD` (`visit-lead.js:47`) e encaminhar `pagina` em campo próprio; alinhar com as regras `auto_enroll_regra` do Lumied (origem, página, utm).

**MÉDIO-5. Atribuição de clique pago incompleta.** `components.js:7` e `visit-lead.js:139` só guardam e enviam `utm_source`, `utm_medium`, `utm_campaign`, `gclid` (cortados em 120 caracteres). `wbraid`, `gbraid`, `fbclid`, `utm_term`, `utm_content` ficam de fora, embora o Lumied aceite todos (`api/leads/route.ts:30-38`) e o upload de conversão offline use `gclid`/`gbraid`/`wbraid` (`lumied: lib/ads/google.ts:585-619`). Tráfego iOS (gbraid/wbraid) não volta para o Google pelo caminho do formulário (o caminho do WhatsApp via sessão guarda `wbraid`/`gbraid` em `analytics.js:177-184`, mas só no pageview). Correção: ampliar `UTM_KEYS`, subir o corte para 512 e encaminhar os campos no `createLumiedLead`.

**MÉDIO-6. A escola está com `desativado_em` preenchido: parte da rotina do CRM ignora a escola, parte não.**
- Captura NÃO filtra: `/api/leads` (`route.ts:113-117`), `/api/track/pageview` (`route.ts:45-50`) e `/api/site/rastreamento` (`route.ts:38`) resolvem a escola só pelo slug. O middleware também não bloqueia (`middleware.ts`, sem tratamento de `desativado_em`). Cadência (`api/cron/crm-cadencias/route.ts:112`: `crm_cadencia.ativo = true`), `crm-sla` (`:48-68`), `digest-diario` (`:110`), `alertas` (`:681,879,926,986`) também não filtram.
- Mas tudo que passa pela fila de jobs (`lib/fila-jobs/enfileirar.ts:54`: `from("escola")...is("desativado_em", null)`) e `crm-casar-aluno` (`api/cron/crm-casar-aluno/route.ts:52`) PULA a escola. Jobs afetados: `crm-casar-aluno` (casa lead com a matrícula: é o que leva o lead a "ganho" e alimenta a conversão offline de matrícula), `crm-esfriar`, `crm-fatos-conversa`, `conversa-sla` (alerta de mensagem de família sem resposta), `familia-lembretes`, `ads-relatorio-mensal`, `risco-evasao`, `matricula-drip`, `newsletter`, `orquestrador` e outros da lista de `enfileirarEscolas`.
- Efeito prático: lead entra, mas conversa parada e SLA de conversa não geram alerta; matrícula não volta como ganho nem como conversão ao Google/Meta; relatório mensal de Ads não sai.
- Também confirmar `escola.ciclo`: o slug `mbmaringa` foi criado como tenant `demo` (`scripts/seed-demo-maringa.sql:58`); se continuar `demo`, parte das rotinas de cliente pode tratá-lo diferente.
- Correção: limpar `desativado_em` (decisão do dono) antes de ligar anúncios, ou documentar exatamente quais rotinas devem rodar para a Maringá e abrir exceção.

**MÉDIO-7. Cadência/boas-vindas: o disparo do site aponta para um projeto apagado e a cadência real depende de dado.**
- `visit-lead.js:189-215` dispara `crm-drip-send` em `brgorknbrjlfwvrrlwxj.supabase.co`, o projeto do Lumied v1 que foi DELETADO (conforme o comentário em `api/curriculos.js:6-11`). Só roda se `DRIP_SEND_KEY` e `LUMIED_ANON_KEY` existirem (`:197`); `.env.example` lista só `DRIP_SEND_URL/KEY`. Provavelmente retorna `skipped` (inócuo), mas é código morto que sugere um disparo imediato que não existe. O README do site não cita drip; o texto dos comentários sim.
- O motor real é `api/cron/crm-cadencias` (diário às 11h05 de Brasília e rodada "frequente" a cada 30 min, 8h às 20h, só quando há passo vencido ou lead na porta de cadência por acontecimento; janela de envio padrão 8h-20h, `route.ts:642-648`). Ele só envia se existir uma cadência `ativo=true` para a Maringá com passos de WhatsApp (com linha conectada) e/ou e-mail. Auto-inscrição exige e-mail OU WhatsApp conforme os canais dos passos (`:257-303`); como o e-mail é opcional no site, só passos de WhatsApp alcançam a maioria dos leads. Confirmar no Lumied: (1) existe cadência ativa para a Maringá; (2) tem passo de WhatsApp D+0; (3) os modelos de WhatsApp estão aprovados na Meta (fora da janela de 24 h) ou a linha é QR.
- Correção: remover `triggerImmediateDrip` ou apontar para uma rota do Lumied v2 (`/api/cron/crm-cadencias?rodada=frequente` exige `CRON_SECRET`, então o caminho certo é o evento "lead novo" do próprio Lumied).

**MÉDIO-8. E-mail da equipe: entregabilidade e prioridade.**
- Remetente: o código usa `RESEND_FROM` (default `site@maplebearmaringa.com.br`, `visit-lead.js:168`). O pedido cita `leads@lumied.com.br`; se for esse o valor, o domínio `lumied.com.br` precisa de SPF/DKIM/DMARC alinhados e o destinatário (`secretaria@maplebearmaringa.com.br`) pode filtrar como spam por ser domínio diferente do da caixa. Confirmar o valor real de `RESEND_FROM` na Vercel e o status do domínio no Resend. Peça à secretaria para criar regra "nunca enviar para spam" e testar com um envio real.
- Assunto: leads leves (exit-intent, newsletter) saem como `[Visita] Nome — filho(a) ` com idade vazia (`visit-lead.js:320-322` só distingue `lead-magnet`) e título "Pedido de visita guiada" (:290): a secretaria não distingue visita agendável de download de PDF. Correção: assunto e título por tipo de origem; "VISITA" só quando houver data de nascimento.
- Link WhatsApp do e-mail: `https://wa.me/55${digits}` (`:295`) quebra quando a pessoa digita 55 ou 0 na frente (permitido pela validação de 10 a 13 dígitos): vira `5555...`. Correção: normalizar dígitos como o Lumied (`digitosTelefone`).
- Sem confirmação à família: nenhum e-mail ou WhatsApp automático de "recebemos" é enviado pelo site.

**MÉDIO-9. Sem captcha e sem limite no próprio `/api/visit-lead`.** Só honeypot `company` (`visit-lead.js:269`). Qualquer script pode inundar a caixa da secretaria e a cota do Resend; o Lumied tem triagem, mas o e-mail sai antes e independente dela (as duas chamadas são paralelas, :317). Correção: Turnstile (o Lumied já aceita o campo `captcha`, `route.ts:44,98-110`) e limite simples por IP no edge; ou só enviar e-mail depois da triagem.

**MÉDIO-10. Lead fora do horário: não há tratamento.** Nenhum formulário diz o horário de atendimento, nenhum envia resposta automática; o WhatsApp do botão não tem mensagem fora do expediente no site. No Lumied, recursos de caixa (`lib/wa/recursos.ts`) listam `ausencia_devolve`, `push_equipe`, `envio_agendado`, mas não há "mensagem automática fora do horário" no código lido; confirmar se a escola tem agente SDR/triagem em modo automático (`lib/agents/triagem.ts`: primeiro toque após o SLA, até 3 dias, só com linha QR). Correção: resposta automática de saudação com horário de atendimento e promessa realista; cadência D+0 de WhatsApp disparada às 8h para quem chegou à noite.

### BAIXO

- **BAIXO-1.** `lead-capture.js:61` chama `localStorage.getItem` sem try/catch; em navegador com armazenamento bloqueado o script lança no topo e o formulário de newsletter (:78-79 do arquivo) nunca recebe o handler, caindo no envio nativo (recarrega a página, lead perdido). Embrulhar em try/catch.
- **BAIXO-2.** `lead-capture.js:144-146` e `components.js` mostram a mesma mensagem para qualquer erro (a API devolve `errors` em 400 e o exit-popup descarta, `json.error || 'Erro'`): o usuário não descobre que o telefone está errado. `lp-visita.js:65,76` mostra o motivo; replicar.
- **BAIXO-3.** `trackLead` no clique de telefone/e-mail: nada. `index.html:886` é o único `tel:`; sem conversão de ligação (Google Ads "chamadas do site").
- **BAIXO-4.** O listener de WhatsApp muda o `href` no clique (`analytics.js:299`); botões abertos com clique do meio/ctrl, "copiar link" e leitura no iOS compartilham o link sem ref. Aceitável; documentar.
- **BAIXO-5.** O ref usa só 8 caracteres da sessão (`analytics.js:261`): colisão improvável, mas o ref só existe se o visitante tem `sessionStorage` (modo privado de alguns navegadores = link limpo, perde atribuição).
- **BAIXO-6.** `api/rastreamento.js:271,276`: se o Lumied falhar, cacheia resposta vazia por 5 min; o primeiro acesso depois da configuração demora até 15 min para refletir (cache `s-maxage=900`). Na virada para anúncio, limpar o cache da Vercel ou testar com `?` diferente.
- **BAIXO-7.** Sem consentimento explícito (checkbox) nos formulários; há link para privacidade nas LPs (`lp-form-note`) e Consent Mode v2 ligado (`analytics.js:45-63`), o que é suficiente para o Google, mas confirmar texto LGPD com a escola.

---

## 3. Respostas objetivas às perguntas do pedido

1. **O usuário vê sucesso se o Lumied falhar?** Sim, desde que o e-mail tenha saído (`visit-lead.js:336-369`). Se o Resend também falhar ou não tiver chave, vê erro 502 e o texto "Não conseguimos enviar" com atalho de WhatsApp (`lp-visita.js:76`). Falha parcial não é registrada nem reenviada.
2. **Dedupe por telefone?** Só no Lumied (`lead-por-telefone.ts`: chave DDI+DDD+8 dígitos, qualquer época) e por e-mail; o site não deduplica; o e-mail da equipe sai a cada envio (repetido ou não).
3. **Captcha / honeypot / rate limit?** Honeypot `company` no site; honeypot `website` no Lumied (o site não envia esse campo, então só o do site vale). Turnstile opcional no Lumied e não usado pelo site. Rate limit: 6 em 10 min e 20/h por IP e 60/h por escola (`route.ts:91-92,124`). 60/h por escola basta mesmo em campanha pesada; o problema é o limite por IP (ALTO-3).
4. **Validação de telefone BR?** Site: 10 a 13 dígitos, nada mais. Lumied: 10/11 dígitos, DDD 11-99 sem final 0, bloqueia sequências repetidas. Mensagens de erro aparecem só nos formulários que exibem `errors` (/visite/, LPs) e ficam genéricas no exit-popup, newsletter e materiais.
5. **Funil/etapa:** primeira etapa `crm_estagio` com `tipo='aberto'` e `recebe_lead_novo=true`, na ordem (`api/leads/route.ts:139-147`); dono pelo trigger de autoatribuição (menos leads abertos entre os de papel `comercial`, `mig 0093`) ou fica sem dono.
6. **Quem é avisado e como:** e-mail do site para `LEAD_NOTIFY_TO`; no Lumied, nada em tempo real para escola (ALTO-4). Alertas: sino diário às 10h (leads sem 1º contato há mais de 6 h), conversas paradas (`crm-conversas-paradas`), push da caixa de WhatsApp quando a conversa chega e o recurso `push_equipe` está ligado.
7. **Resposta automática/cadência para lead de site:** existe o motor (`crm-cadencias`) e o primeiro toque automático (`agents/triagem`), mas a existência de uma cadência ativa e de modelos aprovados para a Maringá é dado de banco: não verificável pelo código. O site em si não envia boas-vindas.
8. **SLA:** padrão 6 h (`escola_config.crm_sla_1contato_horas`), alerta diário. O site promete "um dia útil".
9. **WhatsApp (44) 99178-3232 é Business conectado ao Lumied?** O código mostra que a Maringá conectou o WhatsApp ao Lumied em 09/11/2026 e a caixa ficou vazia por falta da linha principal; a correção foi aplicada à mão em produção e entrou como migration (`supabase/migrations/20261109204000_escola_sem_linha_principal_do_whatsapp.sql`). Não há no código o número da linha da Maringá nem o tipo (API oficial ou QR). Não dá para afirmar que (44) 99178-3232 é a linha conectada: confirmar em Lumied > WhatsApp > Linhas, e testar enviando uma mensagem com "(ref: ...)" para ver se o lead aparece com o gclid/UTM.

---

## 4. Checklist "pronto para anúncios"

Marque cada item com data e responsável. Os itens 1 a 8 bloqueiam o início dos anúncios.

### Bloqueantes (antes de gastar R$ 1)
- [ ] 1. Blog: trocar o envio dos 24 artigos (e do template em `templates/`) para `/api/visit-lead` com `origem` própria, sucesso só após resposta ok, sessão/UTM/página e conversão (ALTO-1). Desativar `/api/blog/lead` para a Maringá.
- [ ] 2. Lumied: remover o limite por IP para chamadas do site (segredo de servidor) ou repassar o IP real; testar com 10 envios seguidos em homologação (ALTO-3).
- [ ] 3. `visit-lead.js`: marcar no e-mail "NÃO ENTROU NO CRM" quando o Lumied falhar; log de erro; timeout de 8 s e uma nova tentativa; alinhar validação de telefone (10/11 dígitos, sem 55/0) e nome (mínimo 3) (ALTO-2).
- [ ] 4. Notificação imediata no Lumied para lead novo de site (sino + push + WhatsApp) para comercial e secretaria; `LEAD_NOTIFY_TO` com pelo menos 2 pessoas; teste de entrega real (caixa de entrada, não spam) (ALTO-4, MÉDIO-8).
- [ ] 5. Definir e comunicar o SLA real: SLA do CRM em 1 h útil; trocar o texto "em até um dia útil" quando o SLA estiver rodando.
- [ ] 6. Lumied > Marketing > Rastreamento do site: cadastrar GA4 (`G-...`), Google Ads (`AW-...`), conversão de formulário (`AW-.../label`) e de WhatsApp, Meta Pixel. Conferir em `https://maplebearmaringa.com.br/api/rastreamento` (cache de 15 min) e no Tag Assistant / Realtime do GA4 (ALTO-5).
- [ ] 7. Decidir a conversão principal: marcar como principal no Google Ads só o envio de formulário e, no máximo, o WhatsApp como secundária (sem valor); não importar `generate_lead` do GA4 como conversão primária junto com a nativa (evita dobra).
- [ ] 8. `desativado_em` / `ciclo` da escola: limpar (ou formalizar a exceção) para `crm-casar-aluno`, `conversa-sla`, `crm-fatos-conversa`, `ads-relatorio-mensal` rodarem (MÉDIO-6).

### Medição e atribuição
- [ ] 9. Enviar `sessao` e `pagina` em /visite/ e nos materiais (MÉDIO-2). Chamar `mbFormLead` nos materiais e no blog.
- [ ] 10. Ampliar `UTM_KEYS` (gbraid, wbraid, fbclid, utm_term, utm_content), corte de 512 e repasse ao Lumied (MÉDIO-5). Padronizar URL final dos anúncios com `{lpurl}?utm_source=google&utm_medium=cpc&utm_campaign={campaignid}&utm_term={keyword}` e auto-tagging ligado.
- [ ] 11. Ativar no Lumied a conexão do Google Ads (OAuth em `/api/ads/oauth`) e as ações de conversão offline: matrícula (já ativa por padrão), reserva, e as opcionais `lead_qualificado` e `visita_realizada` (`lib/ads/conversao-eventos.ts`). Sem `ads_conexao` e sem `google_conversao_*` preenchidas nada volta ao Google (`google.ts:585-590` lança "conector pendente").
- [ ] 12. Teste ponta a ponta de atribuição por WhatsApp: abrir a LP com `?gclid=TESTE123`, clicar no WhatsApp, enviar a mensagem com o "(ref: ...)", e conferir no lead do Lumied o gclid e a linha do tempo de visitas. Repetir no iPhone (Safari) e em aba anônima.
- [ ] 13. Meta: Pixel + (recomendado) API de Conversões pelo servidor; usar `Contact` ou `Lead` só para envio de formulário; deduplicar com `event_id`.
- [ ] 14. Enhanced Conversions: conferir no Google Ads (Metas > Conversões > diagnóstico) que o `user_data` (e-mail/telefone) está chegando; lembrar que só vale com consentimento concedido (`analytics.js:45-63`).
- [ ] 15. Banner de consentimento: validar com o jurídico/escola o texto; conferir o Consent Mode v2 nas duas escolhas (aceitar e recusar).

### Operação e conteúdo
- [ ] 16. Lumied: cadência ativa para `site-visite`, `exit-intent`, `newsletter` e `lead-magnet-*` com passo D+0 de WhatsApp (modelo aprovado, se API oficial) e e-mail; janela de envio 8h-20h; pare quando houver contato humano (MÉDIO-7, MÉDIO-3).
- [ ] 17. Confirmar a linha (44) 99178-3232 em Lumied > WhatsApp > Linhas (API oficial ou QR), com a equipe respondendo pela caixa do Lumied, e não só pelo celular. Teste de ida e volta com um número externo.
- [ ] 18. Resposta automática de saudação e de fora do horário (WhatsApp Business ou Lumied), com horário de atendimento e atalho para /visite/.
- [ ] 19. Corrigir os textos dos materiais (PDF por WhatsApp/e-mail) e do exit-intent para o que de fato acontece (MÉDIO-3).
- [ ] 20. Remover `triggerImmediateDrip` (ou apontar para o v2) e a variável `DRIP_*` do `.env.example` (MÉDIO-7); remover `buildVisitModal` não usado ou ligá-lo (código morto em `components.js:223`).
- [ ] 21. Origem por LP: aceitar `lp-*` no `ALLOWED_ORIGINS_LEAD` e criar o relatório de leads por LP/campanha no Lumied (MÉDIO-4).
- [ ] 22. Turnstile no site (MÉDIO-9) e try/catch no `localStorage` do `lead-capture.js` (BAIXO-1).
- [ ] 23. Teste de fumaça diário automatizado: POST sintético para `/api/visit-lead` em horário de baixa (com telefone de teste que o Lumied aceite e depois exclua) e alerta se `channels.lumied != 'created'`.
- [ ] 24. Painel de acompanhamento no primeiro mês: leads por origem, tempo até o 1º contato, % de contato em até 1 h, visitas agendadas, matrículas; comparar leads do site (e-mail) com leads do CRM por dia para detectar perda silenciosa.

---

## 5. Itens que dependem de dado e não puderam ser verificados pelo código

- Valores reais de `RESEND_FROM`, `LEAD_NOTIFY_TO`, `DRIP_SEND_KEY`, `LUMIED_ANON_KEY` na Vercel e status do domínio de envio no Resend.
- Se existe cadência ativa para a Maringá e quais canais/modelos tem.
- Qual linha de WhatsApp está conectada, tipo de conexão, e se o recurso `push_equipe` está ligado.
- `escola.desativado_em` e `escola.ciclo` atuais.
- Se o insta-publisher tem mais de uma empresa com blog configurado (define se ALTO-1 é perda por rota errada ou só por sistema paralelo). O repositório local do insta-publisher está 2 commits atrás do remoto; conferir a versão em produção.
- Se há conexão Google Ads/Meta autorizada no Lumied para a Maringá (`ads_conexao`).
