// GET /api/rastreamento
// IDs de rastreamento do site (GA4, Meta Pixel, Google Ads) cadastrados pela
// própria escola no Lumied (Marketing › Rastreamento do site). Este endpoint só
// repassa a resposta pública do Lumied com cache de CDN, para o site não
// depender do Lumied a cada visita. Os IDs não são segredo: aparecem no código
// de qualquer site que os usa.

export const config = { runtime: 'edge' };

const ESCOLA = 'mbmaringa';
const ORIGEM = `https://${ESCOLA}.lumied.com.br/api/site/rastreamento?escola=${ESCOLA}`;

const FORMATOS = {
  ga4_id: /^G-[A-Z0-9]{6,12}$/,
  meta_pixel_id: /^[0-9]{10,20}$/,
  google_ads_id: /^AW-[0-9]{6,12}$/,
  google_ads_conv_whatsapp: /^AW-[0-9]{6,12}\/[A-Za-z0-9_-]{6,40}$/,
  google_ads_conv_formulario: /^AW-[0-9]{6,12}\/[A-Za-z0-9_-]{6,40}$/,
};

function limpar(dados) {
  const out = {};
  for (const [campo, re] of Object.entries(FORMATOS)) {
    const v = dados && typeof dados[campo] === 'string' ? dados[campo].trim() : '';
    out[campo] = re.test(v) ? v : null;
  }
  return out;
}

export default async function handler() {
  let corpo = limpar({});
  let cache = 'public, s-maxage=300, stale-while-revalidate=3600';
  try {
    const r = await fetch(ORIGEM, { headers: { accept: 'application/json' } });
    if (r.ok) {
      corpo = limpar(await r.json());
      cache = 'public, s-maxage=900, stale-while-revalidate=86400';
    }
  } catch (e) {
    // Lumied fora: o site segue sem tags (vazio), nunca quebra.
  }
  return new Response(JSON.stringify(corpo), {
    status: 200,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': cache },
  });
}
