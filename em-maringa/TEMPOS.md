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
| Jardim Universitário | -23.4078208, -51.9415087 | Jardim Universitário (Nominatim) | 9,1 min · 6,0 km | ~13 min |
| Marialva | -23.4820987, -51.795788 | centro do município | 21,8 min · 17,7 km | ~29 min |

Marialva aparece só no hub (sem subpágina).

Observações:
- "Gleba Palhano" (sugerido na lista de candidatos) é bairro de Londrina, não de Maringá; ficou de fora.
- Zona 8, Jardim Cidade Monções, Novo Centro, Zona 2, Zona 4 e Jardim Cerro Azul têm página sem tempo de carro (sem rota calculada).
- "Zona 5" caiu no centro da cidade na busca por nome; usei o ponto rotulado Zona 05 pelo endereço reverso.
