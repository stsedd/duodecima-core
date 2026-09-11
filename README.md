# Guia da Duodécima · v2.1 Core

Versão GitHub Pages do Guia da Duodécima conectada ao **Duodécima Core**.

- Visual v2.0 preservado.
- 51 kits continuam disponíveis.
- Regras compartilhadas são carregadas do Core em runtime.
- `content.js` funciona como snapshot local/fallback.
- Sem build, npm ou servidor.

Consulte `CORE-INTEGRATION.md` para detalhes da sincronização e `DEPLOY-GITHUB.md` para publicação.

## Compatibilidade Core schema v2

A partir da v2.4, a aba **Deuses** entende `resources[]`, `choices[]` e variantes com `tiers`, mantendo fallback para os campos legados. O conteúdo canônico continua vindo de `https://stsedd.github.io/duodecima-core`.

