// Duodécima Core browser client — reutilizável em Guia, Ficha ou Scutum.
export class DuodecimaCore {
  constructor(baseUrl){ this.baseUrl=baseUrl.replace(/\/$/,''); this.manifest=null; this.cache=new Map(); }
  async getManifest(){
    if(this.manifest) return this.manifest;
    const r=await fetch(this.baseUrl+'/manifest.json',{cache:'no-store'});
    if(!r.ok) throw new Error('Core manifest '+r.status);
    return this.manifest=await r.json();
  }
  async get(key,{force=false}={}){
    const m=await this.getManifest(); const rel=m.files[key];
    if(!rel) throw new Error('Dataset desconhecido: '+key);
    if(!force && this.cache.has(key)) return this.cache.get(key);
    const r=await fetch(this.baseUrl+'/'+rel,{cache:'no-store'});
    if(!r.ok) throw new Error('Core '+key+' '+r.status);
    const data=await r.json(); this.cache.set(key,data); return data;
  }
  async loadShared(){
    const keys=['attributes','skills','talents','conditions','pantheons','gods','system','equipment','aliases'];
    const vals=await Promise.all(keys.map(k=>this.get(k)));
    return Object.fromEntries(keys.map((k,i)=>[k,vals[i]]));
  }
}
