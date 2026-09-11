import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..');
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const m=read('manifest.json');
const d=read(m.files.gods),s=read(m.files.skills),t=read(m.files.talents),c=read(m.files.conditions),a=read(m.files.aliases);
const errors=[];
function unique(arr,label){const seen=new Set();for(const x of arr){if(seen.has(x.id))errors.push(`ID duplicado em ${label}: ${x.id}`);seen.add(x.id)}}
function deity(id){return d.deities.find(x=>x.id===id)}
function ability(god,id){return [...(god?.passives||[]),...(god?.actives||[])].find(x=>x.id===id)}
function resource(god,id){return (god?.resources||[]).find(x=>x.id===id)}
function hasAll(arr, expected){return expected.every(x=>arr.includes(x)) && arr.length===expected.length}
function validateSkillEffect(effect, godId, abilityId){
  const ids=[];
  if(effect?.skill) ids.push(effect.skill);
  if(Array.isArray(effect?.skills)) ids.push(...effect.skills);
  if(Array.isArray(effect?.options)) ids.push(...effect.options);
  for(const id of ids) if(!skillIds.has(id)) errors.push(`${godId}/${abilityId} skillEffect referencia perícia inexistente: ${id}`);
}
function validateChoices(ab,godId){
  for(const choice of ab.choices||[]){
    if(!choice.id) errors.push(`${godId}/${ab.id} tem choice sem id.`);
    const opts=choice.options||[];
    const seen=new Set();
    for(const opt of opts){
      if(!opt.id) errors.push(`${godId}/${ab.id}/${choice.id} tem opção sem id.`);
      else if(seen.has(opt.id)) errors.push(`${godId}/${ab.id}/${choice.id} tem opção duplicada: ${opt.id}`);
      seen.add(opt.id);
    }
    if(typeof choice.choose==='number' && choice.choose<1) errors.push(`${godId}/${ab.id}/${choice.id} deve escolher ao menos 1 opção.`);
  }
}

unique(d.deities,'deuses');unique(s.skills,'perícias');unique(t.talents,'talentos');unique(c.conditions,'condições');
if(d.deities.filter(x=>x.kitAvailable).length!==51) errors.push('Esperados 51 kits disponíveis.');
if(!deity('minerva')||deity('minerva').kitAvailable) errors.push('Minerva deve existir sem kit.');
const skillIds=new Set(s.skills.map(x=>x.id));
const validScopes=new Set(['personal','collective','target','ability']);
const validMaxTypes=new Set(['fixed','levelFormula','stakeProgression','described']);
for(const god of d.deities){
  for(const id of [...(god.grantedSkills||[]),...(god.skillChoices||[])]) if(!skillIds.has(id)) errors.push(`${god.id} referencia perícia inexistente: ${id}`);
  const ids=new Set();
  for(const ab of [...(god.passives||[]),...(god.actives||[])]){
    if(ids.has(ab.id)) errors.push(`${god.id} tem habilidade duplicada: ${ab.id}`); ids.add(ab.id);
    for(const effect of ab.skillEffects||[]) validateSkillEffect(effect,god.id,ab.id);
    validateChoices(ab,god.id);
  }
  const resourceIds=new Set();
  for(const r of god.resources||[]){
    if(!r.id) errors.push(`${god.id} tem resource sem id.`);
    else if(resourceIds.has(r.id)) errors.push(`${god.id} tem resource duplicado: ${r.id}`);
    resourceIds.add(r.id);
    if(!validScopes.has(r.scope)) errors.push(`${god.id}/${r.id} usa scope inválido: ${r.scope}`);
    if(!r.max||!validMaxTypes.has(r.max.type)) errors.push(`${god.id}/${r.id} tem max inválido ou ausente.`);
    if(r.max?.type==='fixed' && typeof r.max.value!=='number') errors.push(`${god.id}/${r.id} max fixed precisa de value numérico.`);
    if(r.max?.type==='levelFormula' && !r.max.formula) errors.push(`${god.id}/${r.id} max levelFormula precisa de formula.`);
    if(r.max?.type==='stakeProgression' && !Array.isArray(r.max.progression)) errors.push(`${god.id}/${r.id} max stakeProgression precisa de progression.`);
  }
}

// Regras canônicas e invariantes desta versão.
const iuppiter=deity('iuppiter');
const jupiterFormula=iuppiter?.resource?.maxFormula;
if(jupiterFormula!=='8 + floor(nível/10)') errors.push('Raiva do Trovão deve usar 8 + floor(nível/10).');
for(const [godId,resId,label] of [
  ['netuno','mare-crescente','Maré Crescente'],
  ['plutao','acumulo-necromantico','Acúmulo Necromântico'],
  ['summanus','carga-noturna','Carga Noturna']
]){
  const g=deity(godId),r=resource(g,resId);
  if(g?.resource?.maxFormula!==jupiterFormula) errors.push(`${label} deve repetir a fórmula de Raiva do Trovão.`);
  if(r?.max?.type!=='levelFormula'||r?.max?.formula!==jupiterFormula) errors.push(`${label} em resources[] deve repetir a fórmula de Raiva do Trovão.`);
}
const metus=deity('metus');
if(metus?.resource?.scope!=='target'||resource(metus,'tensao')?.scope!=='target') errors.push('Tensão de Metus deve ser recurso por alvo.');
if(resource(deity('somnos'),'fadiga-somnos')?.scope!=='target') errors.push('Fadiga de Somnos deve ser recurso por alvo.');

const potestas=deity('potestas');
if(!hasAll(potestas?.skillChoices||[],['atletismo','intimidacao'])) errors.push('Potestas deve escolher exatamente entre Atletismo e Intimidação.');
if((potestas?.grantedSkills||[]).includes('lideranca')||(potestas?.skillChoices||[]).includes('lideranca')) errors.push('Potestas não pode referenciar Liderança.');
if(!resource(potestas,'imperium')||!resource(potestas,'pontos-potestas')) errors.push('Potestas deve possuir Imperium e Pontos de Potestas em resources[].');

const fortuna=deity('fortuna');
if(fortuna?.attributeBonuses?.des!==1) errors.push('Fortuna deve receber +1 Destreza.');
if(fortuna?.skillBonuses?.agilidade!=null) errors.push('Fortuna não deve receber bônus de Agilidade.');

const aemulatio=deity('aemulatio');
const dedicacao=ability(aemulatio,'dedicacao-compartilhada');
const dt=dedicacao?.tiers||[];
if(dt.length!==3||!dt[0]?.text?.includes('+1')||!dt[0]?.text?.includes('1 turno')||!dt[1]?.text?.includes('+2')||!dt[1]?.text?.includes('1 turno')||!dt[2]?.text?.includes('+3')||!dt[2]?.text?.includes('2 turnos')) errors.push('Dedicação Compartilhada não corresponde à progressão +1/+2/+3 por 1/1/2 turnos.');
if((aemulatio?.resources||[]).some(r=>/determina/i.test(r.name)||/determina/i.test(r.id))) errors.push('Aemulatio não deve possuir recurso de Pontos de Determinação.');

const cimopoleia=deity('cimopoleia');
const heranca=ability(cimopoleia,'heranca-monstruosa');
const herancaChoice=(heranca?.choices||[]).find(x=>x.id==='heranca-monstruosa');
const heritageIds=(herancaChoice?.options||[]).map(x=>x.id);
if(!hasAll(heritageIds,['scaleskin','dentes-tubarao','shimmerskin'])) errors.push('Herança Monstruosa deve conter Scaleskin, Dentes de Tubarão e Shimmerskin.');
if(herancaChoice?.allowReplace!==false) errors.push('Herança Monstruosa não pode permitir troca posterior.');

for(const [godId,resId] of [['proserpina','carga-crepuscular'],['timor','pavor'],['invidia','ressentimento']]){
  if(resource(deity(godId),resId)?.max?.type!=='stakeProgression') errors.push(`${godId}/${resId} deve usar progressão por estaca.`);
}
if(resource(deity('vis'),'frenesi-conquista')?.scope!=='ability') errors.push('Frenesi de Conquista de Vis deve ser recurso local de habilidade.');
if(resource(deity('victoria'),'momentum-triunfal')?.scope!=='ability') errors.push('Momentum Triunfal de Victoria deve ser recurso local de habilidade.');

const vis=deity('vis');
if(vis?.castingAttribute!=='fe') errors.push('Vis deve conjurar com Fé.');
if(!(vis?.grantedSkills||[]).includes('intimidacao')) errors.push('Vis deve conceder Intimidação como perícia divina inicial.');
const lineage=m.files.system?read(m.files.system).lineage:null;
if(!lineage?.compound||lineage.compound.formula!=='DEUS + LEGADO') errors.push('Regra de Legado Composto ausente/incorreta.');
if(!lineage?.direct||lineage.direct.formula!=='LEGADO + LEGADO') errors.push('Regra de Legado Direto ausente/incorreta.');
const magicAwakening=m.files.system?read(m.files.system).magicAwakening:null;
if(magicAwakening?.canReduceBelowZero!==true) errors.push('Sacrifício mágico deve permitir atributo físico abaixo de 0.');
const vul=deity('vulcano'), auto=ability(vul,'automato');
const variants=auto?.blocks?.find(x=>x.type==='variants')?.items||[];
if(variants.length!==3) errors.push('Vulcano/Autômato deve ter 3 chassis estruturados.');
if((auto?.tiers||[]).length) errors.push('Autômato não deve ter estacas globais; pertencem aos chassis.');

if(m.schemaVersion!==2||d.schemaVersion!==2) errors.push('Manifest e deuses.json devem declarar schemaVersion 2.');
if(errors.length){console.error('❌ Core inválido\n- '+errors.join('\n- '));process.exit(1)}
console.log('✅ Duodécima Core válido');
console.log(`   schema v${m.schemaVersion} · conteúdo ${m.contentVersion}`);
console.log(`   ${d.deities.length} divindades / ${d.deities.filter(x=>x.kitAvailable).length} kits`);
console.log(`   ${s.skills.length} perícias · ${t.talents.length} talentos · ${c.conditions.length} condições`);
console.log('   Acúmulos equivalentes a Iuppiter: Netuno, Plutão, Summanus');
console.log('   Recursos v2: pessoal, coletivo, alvo e habilidade');
console.log('   Escolhas persistentes e skillEffects: validados');
console.log('   Vulcano/Autômato: '+variants.map(x=>x.name).join(', '));
