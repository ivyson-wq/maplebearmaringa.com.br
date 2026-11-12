# Tempos de carro até a escola

Destino: Maple Bear Maringá, Av. Arquiteto Nildo Ribeiro da Rocha, 1201 (-23.450816, -51.925931).
Origem geocodificada com Nominatim (OpenStreetMap) em 11/11/2026, conferindo o bairro devolvido pelo
endereço reverso; rota calculada com OSRM (perfil `driving`, sem trânsito em tempo real).
Regra: minutos da rota arredondados para cima, mais ~30% de margem para o horário escolar,
de novo arredondados para cima. Os valores publicados são "~N min".

| Bairro / cidade | Coordenada usada (lat, lon) | Âncora | Rota OSRM | Publicado |
|---|---|---|---|---|
| Centro (Zona 1) | -23.4263174, -51.9382255 | Catedral, Av. Tiradentes | 5,7 min · 3,6 km | ~8 min |
| Vila Operária | -23.4273727, -51.9221406 | Praça Regente Feijó | 5,2 min · 3,8 km | ~8 min |
| Zona 5 | -23.4293644, -51.9594368 | ponto "Zona 05" (Nominatim) | 6,4 min · 5,0 km | ~10 min |
| Zona 7 | -23.4157451, -51.9537197 | Av. Colombo (Zona 07) | 8,9 min · 6,2 km | ~12 min |
| Jardim Universitário | -23.4078208, -51.9415087 | Jardim Universitário (Nominatim) | 9,1 min · 6,0 km | ~13 min |
| Sarandi | -23.4415828, -51.8784911 | Centro, Av. Maringá | 10,5 min · 7,1 km | ~15 min |
| Paiçandu | -23.4577348, -52.0480553 | Centro | 18,0 min · 16,0 km | ~25 min |
| Marialva | -23.4820987, -51.795788 | centro do município | 21,8 min · 17,7 km | ~29 min |

Páginas criadas: Centro, Vila Operária, Zona 5, Zona 7, Jardim Universitário, Sarandi, Paiçandu.
Marialva aparece só no hub (sem subpágina).

Observações:
- "Gleba Palhano" (sugerido na lista de candidatos) é bairro de Londrina, não de Maringá; ficou de fora.
- "Novo Centro" e "Jardim Novo Horizonte" não foram localizados com segurança no Nominatim; ficaram de fora.
- "Zona 7" e "Zona 5" caíram no centro da cidade na busca por nome; usei a Av. Colombo (rótulo Zona 07) e o ponto
  rotulado Zona 05 pelo endereço reverso, não o centroide da busca genérica.
