## 2026-09-21 · v2026.09.21.1
- Legado Direto: criação passa a usar HP inicial, bônus de atributos e perícia do deus principal.
- Legado Composto: usa o menor HP entre as duas origens; escolhe 1 bônus de +2 e 1 bônus de +1 entre as duas opções disponíveis; escolhe também a perícia inicial entre as duas origens.
- Legado Composto não soma os bônus dos dois kits; as escolhas são feitas entre as opções disponíveis.
- As regras foram estruturadas em `system.lineage.*.creation` para consumo pelo Guia e pela Ficha.

## 2026-09-11 · v2026.09.11.1
- Recursos divinos evoluíram para `resources[]`, mantendo `resource` legado para compatibilidade.
- Netuno, Plutão e Summanus: limite de acúmulo padronizado com Iuppiter (`8 + floor(nível/10)`).
- Metus: Tensão corrigida para recurso por alvo; Somnos: Fadiga estruturada por alvo.
- Proserpina, Timor e Invidia: recursos por estaca estruturados.
- Potestas: Imperium coletivo + Pontos de Potestas pessoais; escolha de perícia corrigida para Atletismo ou Intimidação.
- Vis/Victoria: Frenesi e Momentum modelados como recursos locais de habilidade.
- Aemulatio: Dedicação Compartilhada reescrita sem Pontos de Determinação (+1/+2/+3 por 1/1/2 turnos).
- Fortuna: bônus corrigido de Agilidade para Destreza.
- Escolhas persistentes estruturadas em Netuno, Febo, Cimopoleia, Marte, Mercúrio, Diana, Silvano e Libitina.
- Cimopoleia: Herança Monstruosa restaurada com Scaleskin, Dentes de Tubarão e Shimmerskin.
- Passivas selecionadas agora expõem `skillEffects` para proficiência/especialização automática na Ficha.
- Normalização de Conhecimento Religioso / Conhecimento Histórico e limpeza tipográfica de descrições.

## 2026-09-08 · v2026.09.08.1
- Vis: atributo de conjuração alterado para **Fé**.
- Vis: perícia divina inicial definida como **Intimidação**.
- Sistema: adicionadas definições canônicas de **Legado Composto (DEUS + LEGADO)** e **Legado Direto (LEGADO + LEGADO)**.
- Magia: sacrifício físico pode reduzir FOR/DES/CON abaixo de 0; cada ponto continua concedendo +25 Energia, até 3 pontos totais.


## 2026-09-05 · v2026.09.05.1
- Iuppiter Optimus Maximus: bônus iniciais ajustados de `+1 Força, +2 Fé` para `+1 Força, +1 Fé, +2 Constituição`.
- `manifest.json` atualizado para `contentVersion: 2026.09.05.1`.

# Changelog

## 2026.09.04.1

- primeira versão do Duodécima Core;
- 51 kits sincronizados + Minerva sem kit;
- 26 perícias, 32 talentos e 27 condições;
- mecânicas compartilhadas estruturadas;
- antiga penalidade cumulativa ao retornar de 0 HP explicitamente removida;
- Vulcano/Autômato reestruturado com três chassis e estacas internas corretas;
- aliases de compatibilidade;
- validador e GitHub Action.
