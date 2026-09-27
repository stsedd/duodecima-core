window.DUODECIMA_SYSTEM = {
  conditions: [
    {name:'Abalado', mechanic:'Com medo ou receio. −2 em ataques e testes de habilidade, perícia e resistência; se receber novamente, fica Apavorado.'},
    {name:'Agarrado', mechanic:'−2 em ataques, só pode atacar com armas leves e não pode se mover.'},
    {name:'Apavorado', mechanic:'Não pode se aproximar voluntariamente da fonte do medo; enquanto ciente dela, tem desvantagem em ataques e testes de habilidade.'},
    {name:'Atordoado', mechanic:'Incapaz de agir e Desprevenido.', defenseMod:-4},
    {name:'Caído', mechanic:'Move-se com metade do deslocamento; ataques corpo a corpo contra ele recebem +3 e ataques à distância sofrem −3.'},
    {name:'Cego', mechanic:'Falha em testes que exijam visão; ataques contra ele têm vantagem; seus ataques e Defesa têm desvantagem.'},
    {name:'Confuso', mechanic:'No começo do turno role 1d6: 1 foge da fonte; 2–3 não faz nada; 4–5 ataca a criatura mais próxima; 6 age normalmente.'},
    {name:'Desorientado', mechanic:'−2 em Percepção, Investigação, testes de Destreza e Defesa.', defenseMod:-2, dexRollMod:-2},
    {name:'Desprevenido', mechanic:'−4 na Defesa.', defenseMod:-4},
    {name:'Enjoado', mechanic:'Só pode realizar uma ação por rodada; se receber novamente, fica Envenenado.'},
    {name:'Enredado', mechanic:'−2 em ataques, −4 em Destreza, metade do deslocamento e não pode correr ou fazer investidas.'},
    {name:'Envenenado', mechanic:'Desvantagem em ataques e testes de habilidade; nova aplicação de Enjoado/Envenenado causa +1d4 de dano de veneno e desvantagem em Defesa.'},
    {name:'Exausto', mechanic:'Cumulativa, 0–6. −2 em d20 e −2 m de deslocamento por nível. No nível 5, HP e Energia máximos pela metade; no nível 6, morte. Deslocamento padrão: 10 m.'},
    {name:'Fascinado', mechanic:'Fica parado observando a fonte e sofre −4 em Percepção. Ameaça óbvia encerra; outra criatura pode gastar uma ação padrão para sacudi-lo.'},
    {name:'Fatigado', mechanic:'−2 em Força e Destreza e não pode correr ou fazer investidas; nova aplicação torna Exausto.'},
    {name:'Inconsciente', mechanic:'Indefeso e incapaz de agir; ataques corpo a corpo contra ele são críticos.', fixedDefense:5},
    {name:'Incorpóreo', mechanic:'Imune a ataques não mágicos; ataques mágicos têm 50% de falha; atravessa sólidos exceto efeitos de essência e ignora bônus de CA de armadura, escudo e armadura natural.'},
    {name:'Indefeso', mechanic:'Não rola Defesa; Defesa / CA padrão passa a 5.', fixedDefense:5},
    {name:'Invisível', mechanic:'Vantagem na iniciativa se já invisível; não pode ser alvo de efeitos que exijam visão; ataques contra ele têm desvantagem e seus ataques têm vantagem, salvo contra quem puder percebê-lo.'},
    {name:'Lento', mechanic:'Só pode realizar uma ação padrão ou de movimento por rodada; −1 em ataques, Defesa e Destreza; metade do deslocamento.'},
    {name:'Ofuscado', mechanic:'−1 nas jogadas de ataque.'},
    {name:'Paralisado', mechanic:'Indefeso e incapaz de se mover; Força e Destreza efetivas −1; ações puramente mentais continuam possíveis.', fixedDefense:5},
    {name:'Pasmo', mechanic:'Incapaz de agir, mas pode se defender normalmente.'},
    {name:'Queimando', mechanic:'No início do turno, Destreza CD 15: sucesso apaga; falha causa 1d4 de dano e continua. Uma ação pode apagar as chamas.'},
    {name:'Sangrando', mechanic:'No início do turno, Constituição CD 15: sucesso estabiliza; falha causa 1d4 e continua. Receber cura remove a condição.'},
    {name:'Surdo', mechanic:'−4 em Iniciativa e Percepção; para lançar magia, teste de Fé CD 10 + nível da magia.'},
    {name:'Silenciado', mechanic:'Não pode usar magias ou habilidades que exijam som, fala clara, comando verbal ou conjuração verbal.'},
    {name:'Surpreendido', mechanic:'Não pode agir e fica Desprevenido durante a primeira rodada do combate.'}
  ],
  materials: [
    {id:'ferro-aco',name:'Ferro / Aço',attack:0,resistance:3,unbreakable:false,armorHint:'Leve'},
    {id:'mithril',name:'Mithril',attack:1,resistance:2,unbreakable:false,armorHint:'Defensiva'},
    {id:'bronze-celestial',name:'Bronze Celestial',attack:1,resistance:4,unbreakable:false,armorHint:'Defensiva'},
    {id:'uro',name:'Uro',attack:2,resistance:5,unbreakable:false,armorHint:'Responsiva'},
    {id:'ouro-imperial',name:'Ouro Imperial',attack:3,resistance:null,unbreakable:true,armorHint:'Sem armadura/escudo complexo'},
    {id:'ferro-estigio',name:'Ferro Estígio',attack:3,resistance:null,unbreakable:true,armorHint:'Não é normalmente forjável'}
  ],
  armorTypes: [
    {id:'nenhuma',name:'Sem armadura',defense:0,reduction:0},
    {id:'leve',name:'Leve',defense:1,reduction:1},
    {id:'defensiva',name:'Defensiva',defense:2,reduction:1},
    {id:'responsiva',name:'Responsiva',defense:1,reduction:2},
    {id:'pesada',name:'Pesada',defense:2,reduction:2}
  ],
  weaponTypes: [
    {id:'corpo-a-corpo',name:'Corpo a corpo',die:8},
    {id:'distancia',name:'À distância',die:6},
    {id:'desarmado',name:'Desarmado / improvisado',die:6}
  ]
};
