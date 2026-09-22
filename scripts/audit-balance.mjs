import fs from 'node:fs';
import path from 'node:path';

const root=path.resolve(path.dirname(new URL(import.meta.url).pathname),'..');
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
const manifest=read('manifest.json');
const gods=read(manifest.files.gods).deities.filter(x=>x.kitAvailable);
const system=read(manifest.files.system);

const average=(rows,key)=>rows.reduce((sum,row)=>sum+Number(row[key]||0),0)/Math.max(1,rows.length);
const median=values=>{
  const a=[...values].sort((x,y)=>x-y),m=Math.floor(a.length/2);
  return a.length%2?a[m]:(a[m-1]+a[m])/2;
};

const rows=gods.map(g=>{
  const abilities=[...(g.passives||[]),...(g.actives||[])];
  const actives=g.actives||[];
  const costs=actives.map(a=>Number(a.cost)).filter(Number.isFinite);
  return {
    id:g.id,
    name:g.name,
    hpBase:Number(g.hp?.base||0),
    hpPerDecade:Number(g.hp?.perDecade||0),
    attributeBonus:Object.values(g.attributeBonuses||{}).reduce((a,b)=>a+Number(b||0),0),
    skills:(g.grantedSkills||[]).length+(g.skillChoices||[]).length,
    passives:(g.passives||[]).length,
    actives:actives.length,
    resources:(g.resources||[]).length,
    avgActiveCost:costs.length?Math.round(costs.reduce((a,b)=>a+b,0)/costs.length):0,
    structuredChoices:abilities.reduce((n,a)=>n+(a.choices||[]).length,0)
  };
});

const hpMedian=median(rows.map(x=>x.hpBase));
const decadeMedian=median(rows.map(x=>x.hpPerDecade));
const avgPassives=average(rows,'passives');
const avgActives=average(rows,'actives');
const avgResources=average(rows,'resources');

console.log(`Duodécima · auditoria de balanceamento · ${manifest.contentVersion}`);
console.log(`Kits: ${rows.length}`);
console.log(`Medianas: HP base ${hpMedian}; HP/década ${decadeMedian}`);
console.log(`Médias: passivas ${avgPassives.toFixed(2)}; ativas ${avgActives.toFixed(2)}; recursos ${avgResources.toFixed(2)}`);
console.log('');
console.table(rows);

const flags=[];
for(const row of rows){
  if(Math.abs(row.hpBase-hpMedian)>=10)flags.push(`${row.name}: HP base ${row.hpBase} (mediana ${hpMedian})`);
  if(Math.abs(row.hpPerDecade-decadeMedian)>=4)flags.push(`${row.name}: HP/década ${row.hpPerDecade} (mediana ${decadeMedian})`);
  if(row.passives>=avgPassives+2)flags.push(`${row.name}: ${row.passives} passivas (média ${avgPassives.toFixed(2)})`);
  if(row.actives>=avgActives+2)flags.push(`${row.name}: ${row.actives} ativas (média ${avgActives.toFixed(2)})`);
  if(row.resources>=avgResources+2)flags.push(`${row.name}: ${row.resources} recursos estruturados (média ${avgResources.toFixed(2)})`);
}

console.log('\nPossíveis outliers para revisão humana:');
if(flags.length)for(const flag of flags)console.log(`- ${flag}`);
else console.log('- Nenhum outlier simples detectado pelos limiares atuais.');
console.log('\nEste relatório não altera regras e não classifica kits como fortes ou fracos; ele apenas aponta diferenças estruturais para revisão manual.');
console.log(`Custos padrão de Energia: ${(system.abilityEnergyCosts||[]).map(x=>`${x.slots.join('/')}=${x.cost}`).join(' · ')}`);
