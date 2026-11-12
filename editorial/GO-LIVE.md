# Go-live do site maplebearmaringa.com.br

Estado em 12/11/2026: o site completo está na `main` e publicado em produção na Vercel
(projeto `maplebearmaringa`, time ivyson-wq's projects), **protegido por login** (ssoProtection = all).
Domínios já cadastrados no projeto: `maplebearmaringa.com.br` e `www.maplebearmaringa.com.br` (→ redireciona para o apex).

## No dia (na ordem)

1. **DNS no Registro.br** (zona do domínio maplebearmaringa.com.br). NÃO mexer nos registros MX (e-mail do Google Workspace).
   | Tipo  | Nome | Valor |
   |-------|------|-------|
   | A     | @    | 216.150.1.1 |
   | CNAME | www  | c0e0addf3eb15532.vercel-dns-016.com. |
   (Se já existir A/CNAME para @ ou www, substituir. A Vercel emite o certificado HTTPS sozinha.)

2. **Liberar o domínio na Vercel** (sem publicar nada): proteção volta ao padrão — domínio da escola público,
   endereços *.vercel.app continuam com login.
   `node scripts/vercel-proteger.mjs all_except_custom_domains`
   Conferir: `curl -I https://maplebearmaringa.com.br/` → 200 (depois do DNS propagar).

3. **Teste de lead real** (1 envio): formulário em /visite/ com um telefone da equipe → conferir
   o lead no Funil de matrículas do Lumied (Maple Bear Maringá, coluna Novo Lead) e o e-mail de recebimento
   (do Lumied ao comercial cadastrado; ou do site para secretaria@ se o Lumied ainda não tiver o PR #3993 publicado).
   Depois apagar/arquivar o lead de teste.

4. **Search Console e Bing Webmaster**: verificar a propriedade de domínio (registro TXT no Registro.br),
   enviar `https://maplebearmaringa.com.br/sitemap.xml` e `https://maplebearmaringa.com.br/blog/sitemap.xml`.

5. **Divulgar o endereço**: Perfil da Empresa no Google (site), bio do Instagram / linktr.ee, pedir à rede o link
   em maringa.maplebear.com.br. Passo a passo para a escola: `editorial/VISIBILIDADE-ESCOLA.md`.

6. **Rastreamento**: a escola cadastra GA4 / Meta Pixel / Google Ads no Lumied (Marketing › Rastreamento do site).
   O site lê em /api/rastreamento (até 15 min de cache).

## Depois

- Editorial quinzenal: religar o cron em `.github/workflows/artigo-quinzenal.yml` e cadastrar o site em
  `insta_publisher.approval_sites` (aprovação por e-mail); secrets ANTHROPIC_API_KEY, RESEND_API_KEY,
  APROVACAO_SITES_SECRET e GSC no repositório.
- Feed do Instagram (/api/instagram-feed): variáveis SUPABASE_REST_URL / SUPABASE_SERVICE_KEY (hoje vazio — a seção some).
- Pendências de conteúdo da escola: depoimentos autorizados, nota do Google, datas do Experience Day,
  condições de matrícula 2027 (ver `editorial/analise-mercado.md`).
