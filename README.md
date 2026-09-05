# Duodécima Core

Fonte canônica compartilhada do ecossistema da **Legio XII Fulminata**.

O Guia, a Ficha e o Scutum Magistri continuam sites separados. Este repositório contém os dados mecânicos que eles devem compartilhar para não existirem três versões diferentes das mesmas regras.

## Conteúdo da fase 1

- 52 divindades registradas: **51 kits + Minerva sem kit**;
- 26 perícias usadas pelos kits/ficha atuais;
- 32 talentos;
- 27 condições;
- atributos e progressões;
- Energia, Sanidade, BP, Treinamento, Combate, Exaustão e Morte;
- materiais, armaduras e tipos de arma;
- aliases para nomes latinos/antigos e compatibilidade de saves;
- estrutura flexível de habilidades por blocos.

### Vulcano / Autômato

O Autômato já está modelado como habilidade complexa: **Bastião, Infiltrador e Utilitário** são variantes independentes. Bastião e Infiltrador têm suas próprias estacas internas; Utilitário não recebe uma progressão inventada. Esse formato (`blocks`) é o modelo para futuras habilidades fora do padrão.

## Regra de ouro

Depois que os três produtos estiverem integrados, uma regra compartilhada é alterada **aqui**, e não copiada manualmente para cada site.

## Publicação

Use GitHub Pages em `main / (root)`. Se o repositório se chamar `duodecima-core`, a URL esperada é:

`https://stsedd.github.io/duodecima-core/`

## Validação

Sem instalar dependências:

`node scripts/validate.mjs`

O workflow em `.github/workflows/validate.yml` também valida cada push.

## Escopo desta primeira fase

Nesta fase centralizamos primeiro o que realmente precisa sincronizar imediatamente entre os três produtos: deuses, perícias, talentos, condições e mecânicas comuns. Magia, Crafting e conteúdo editorial de Roma continuam no Guia por enquanto; depois que o pipeline estiver provado, podemos estruturá-los no Core também sem colocar tudo em risco de uma vez.
