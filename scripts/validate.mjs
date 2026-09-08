import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..');
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const m=read('manifest.json');
const d=read(m.files.gods),s=read(m.files.skills),t=read(m.files.talents),c=read(m.files.conditions),a=read(m.files.aliases);
const errors=[];
function unique(arr,label){const seen=new Set();for(const x of arr){if(seen.has(x.id))errors.push(`ID duplicado em ${label}: ${x.id}`);seen.add(x.id)}}
unique(d.deities,'deuses');unique(s.skills,'perícias');unique(t.talents,'talentos');unique(c.conditions,'condições');
if(d.deities.filter(x=>x.kitAvailable).length!==51) errors.push('Esperados 51 kits disponíveis.');
if(!d.deities.find(x=>x.id==='minerva'&&!x.kitAvailable)) errors.push('Minerva deve existir sem kit.');
const skillIds=new Set(s.skills.map(x=>x.id));
for(const god of d.deities){
  for(const id of [...(god.grantedSkills||[]),...(god.skillChoices||[])]) if(!skillIds.has(id)) errors.push(`${god.id} referencia perícia inexistente: ${id}`);
  const ids=new Set(); for(const ab of [...(god.passives||[]),...(god.actives||[])]){if(ids.has(ab.id)) errors.push(`${god.id} tem habilidade duplicada: ${ab.id}`); ids.add(ab.id);}
}

const vis=d.deities.find(x=>x.id==='vis');
if(vis?.castingAttribute!=='fe') errors.push('Vis deve conjurar com Fé.');
if(!(vis?.grantedSkills||[]).includes('intimidacao')) errors.push('Vis deve conceder Intimidação como perícia divina inicial.');
const lineage=m.files.system?read(m.files.system).lineage:null;
if(!lineage?.compound||lineage.compound.formula!=='DEUS + LEGADO') errors.push('Regra de Legado Composto ausente/incorreta.');
if(!lineage?.direct||lineage.direct.formula!=='LEGADO + LEGADO') errors.push('Regra de Legado Direto ausente/incorreta.');
const magicAwakening=m.files.system?read(m.files.system).magicAwakening:null;
if(magicAwakening?.canReduceBelowZero!==true) errors.push('Sacrifício mágico deve permitir atributo físico abaixo de 0.');
const vul=d.deities.find(x=>x.id==='vulcano'), auto=vul?.actives.find(x=>x.id==='automato');
const variants=auto?.blocks?.find(x=>x.type==='variants')?.items||[];
if(variants.length!==3) errors.push('Vulcano/Autômato deve ter 3 chassis estruturados.');
if((auto?.tiers||[]).length) errors.push('Autômato não deve ter estacas globais; pertencem aos chassis.');
if(errors.length){console.error('❌ Core inválido\n- '+errors.join('\n- '));process.exit(1)}
console.log('✅ Duodécima Core válido');
console.log(`   ${d.deities.length} divindades / ${d.deities.filter(x=>x.kitAvailable).length} kits`);
console.log(`   ${s.skills.length} perícias · ${t.talents.length} talentos · ${c.conditions.length} condições`);
console.log('   Vulcano/Autômato: '+variants.map(x=>x.name).join(', '));
