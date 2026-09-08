# v5.2 · Duodécima Core

- Adicionado `core-bridge.js`.
- Adicionado `bootstrap.js` para só iniciar `app.js` depois da tentativa de sincronização.
- Deuses, habilidades, perícias, talentos e condições passam a usar o Core quando online.
- Adicionado indicador `CORE / SNAPSHOT LOCAL` no cabeçalho.
- Habilidades com blocos `variants` e `options` agora são renderizadas na ficha.
- Sub-habilidades com estacas próprias podem registrar progressão independente.
- BP, níveis de atributo/talento/treinamento, Energia, Exaustão e descanso consultam dados do Core quando disponíveis.
- Removidos textos residuais que ainda mencionavam penalidade cumulativa por retorno após 0 HP.
- Mantido fallback local completo e compatibilidade com saves v21.
