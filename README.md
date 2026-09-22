# Duodécima Core

Fonte canônica compartilhada do ecossistema da **Legio XII Fulminata**.

O Guia, a Ficha e o Scutum Magistri continuam sites separados. Este repositório contém os dados mecânicos que eles devem compartilhar para não existirem três versões diferentes das mesmas regras.

## Conteúdo da fase 2

- 52 divindades registradas: **51 kits + Minerva sem kit**;
- 26 perícias usadas pelos kits/ficha atuais;
- 32 talentos;
- 27 condições;
- atributos e progressões;
- Energia, Sanidade, BP, Treinamento, Combate, Exaustão e Morte;
- materiais, armaduras, tipos de arma e restrições de alvo dos materiais;
- origem de personagens estrangeiros já estruturada para regras compartilhadas;
- procedência canônica de componentes especiais, incluindo Pó de Monstro;
- política de repetição/acumulação de talentos;
- aliases para nomes latinos/antigos e compatibilidade de saves;
- estrutura flexível de habilidades por blocos, recursos, escolhas persistentes e efeitos de perícia.

### Vulcano / Autômato

O Autômato já está modelado como habilidade complexa: **Bastião, Infiltrador e Utilitário** são variantes independentes. Bastião e Infiltrador têm suas próprias estacas internas; Utilitário não recebe uma progressão inventada. Esse formato (`blocks`) é o modelo para futuras habilidades fora do padrão.

## Regra de ouro

Depois que os produtos estiverem integrados, uma regra compartilhada é alterada **aqui**, e não copiada manualmente para cada site.

## Publicação

Use GitHub Pages em `main / (root)`. Se o repositório se chamar `duodecima-core`, a URL esperada é:

`https://stsedd.github.io/duodecima-core/`

## Validação

Sem instalar dependências:

`node scripts/validate.mjs`

O workflow em `.github/workflows/validate.yml` valida cada push e pull request.

Para uma leitura comparativa dos kits, sem alterar ou pontuar balanceamento:

`node scripts/audit-balance.mjs`

A auditoria só aponta diferenças estruturais como HP, quantidade de habilidades e recursos para revisão humana.

## Escopo da fase 2

A fase 2 consolida dados que precisam permanecer sincronizados entre os produtos: deuses, perícias, talentos, condições, progressões, Legados, materiais e regras compartilhadas de criação. Conteúdo editorial extenso de Roma e a lista completa de Magia/Crafting podem continuar sendo apresentados pelo Guia, mas toda regra com impacto em mais de um produto deve ganhar representação estruturada no Core antes de ser duplicada.

## Atualização 22/09/2026

- **Celtas estão liberados** e podem aparecer como **estrangeiros**; a regra está em `data/origens.json`.
- **Bronze Celestial não afeta criaturas mortais**; restrições de alvo agora ficam em `materials[].targeting`.
- **Pó de Monstro** só possui procedência válida em monstros mitológicos sujeitos ao ciclo de retorno pelo Tártaro; criaturas mortais, comuns ou não mitológicas não o geram.
- **Estratégia** e **Enganação** receberam descrições canônicas completas.
- Todos os talentos possuem política explícita em `data/talento-acumulo.json`: único, acumulativo, parametrizado ou repetível sem acúmulo adicional.
- O validador passou a conferir contagens do manifest, descrições de perícias, materiais, origem celta, políticas de talento e referências estruturadas.

## Atualização 21/09/2026

As regras de criação de Legados estão estruturadas dentro de `system.lineage` para o Guia e a Ficha consumirem diretamente:

- **Legado Direto:** HP inicial, bônus de atributos e perícia vêm do **deus principal**.
- **Legado Composto:** usa o **menor HP** entre as duas origens; escolhe **1 bônus de +2** entre as duas opções de +2, **1 bônus de +1** entre as duas opções de +1 e **1 perícia inicial** entre as perícias concedidas pelas duas divindades.
- O Legado Composto **não soma os bônus dos dois kits**; ele escolhe entre as opções disponíveis.

## Atualização 08/09/2026

- Vis conjura por **Fé** e concede **Intimidação** como perícia divina inicial.
- Legado Composto = **DEUS + LEGADO**; Legado Direto = **LEGADO + LEGADO**.
- Sacrifícios do despertar mágico podem reduzir FOR/DES/CON abaixo de 0, mantendo +25 Energia por ponto e limite total de 3.

## Schema v2

- `resource` continua disponível para consumidores antigos.
- `resources[]` é a fonte preferencial para novos consumidores e aceita múltiplos trackers, escopo `personal`, `collective`, `target` ou `ability`.
- Habilidades podem expor `choices[]` para escolhas persistentes/progressivas e `skillEffects[]` para efeitos de perícia estruturados.
- `equipment.materials[].targeting` registra restrições de alvo sem depender de interpretação de texto.
- `origins` registra regras de origem compartilhadas, começando pelos Celtas como estrangeiros.
- `talentPolicies` registra a semântica de repetição/acumulação dos talentos.
