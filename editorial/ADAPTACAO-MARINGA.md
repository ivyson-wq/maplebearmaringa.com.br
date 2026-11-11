# Adaptação Caxias → Maringá (regras para quem mexe no conteúdo)

O site foi copiado de maplebearcaxiasdosul.com.br. A troca mecânica já foi feita
(domínio, slugs `-caxias-do-sul` → `-maringa`, telefone, endereço, "Caxias do Sul" → "Maringá",
"Serra Gaúcha" → "Norte do Paraná", IDs de GA/Pixel/Ads zerados). Falta o trabalho editorial.

## Fonte de verdade
- `editorial/fatos.md` — o que a escola é e oferece. Nada sobre a escola fora dele.
- Maringá, PR: cidade planejada do Norte do Paraná, ~430 mil habitantes, conhecida pela arborização,
  Catedral, Parque do Ingá e Parque do Japão, sede da UEM. Região metropolitana: Sarandi, Paiçandu,
  Marialva, Mandaguaçu. Pode usar esse contexto geral; não inventar estatística local específica.

## O que NÃO pode sobrar
- Bairros e cidades de Caxias: Exposição, São Pelegrino, Cinquentenário, Petrópolis, Sanvitto,
  Farroupilha, Flores da Cunha, Bento Gonçalves, Serra, RS, "gaúcho", BR-470, RS-122, frio/serra/uva/vinho.
- Fatos de Caxias: ano de chegada, número de alunos, nomes da equipe (Denise, Simone etc.),
  depoimentos de famílias de Caxias, eventos de Caxias, "Year 4 abre em 2027".
- Valores em R$ e qualquer preço (nem em FAQ nem em JSON-LD).
- Links para maplebearbg.com.br ou maplebearcaxiasdosul.com.br.
- Frases que ficaram quebradas pela troca automática (ex.: "Maringá do Sul", "no Norte do Paraná"
  onde não faz sentido, preposição errada).

## Fotos
- As fotos em `assets/photos/` são de Caxias e serão trocadas por fotos de Maringá (pendente).
  Não apague nem renomeie arquivos de foto; mantenha os `src`. Mas o `alt` e as legendas não podem
  afirmar coisas de Caxias (ex.: "fachada da escola na Rua Jacob Luchesi") — deixe genérico e verdadeiro.

## Onde falta dado da escola
- Marque no HTML com o comentário `<!-- PENDENTE: <o quê> -->` e escreva um texto neutro e verdadeiro
  (ex.: "Agende sua visita pelo WhatsApp" em vez de horário inventado).

## Técnico
- HTML estático; não mude estrutura de layout, classes, scripts nem o `<head>` além do conteúdo
  (title, meta description, keywords, og:*, JSON-LD). JSON-LD tem que continuar JSON válido e
  em sincronia com o texto visível (FAQ do JSON-LD = FAQ da página).
- `title` ≤ 60 caracteres, `meta description` ≤ 155.
- Não fazer commit. Não rodar deploy. Não mexer em arquivos fora do seu escopo.
- Proibido escrever o nome de qualquer IA/modelo em qualquer arquivo.
