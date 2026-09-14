import { readFileSync, readdirSync, writeFileSync, mkdirSync, existsSync, mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { createRequire } from 'node:module';
import ts from 'typescript';

const root=process.cwd();
const tmp=mkdtempSync(join(tmpdir(),'content-check-'));
const errors=[];
const check=(condition,message)=>{if(!condition)errors.push(message)};
const http=(value)=>{try{return ['https:','http:'].includes(new URL(value).protocol)}catch{return false}};
const local=(value)=>{
  if(http(value))return;
  check(value.startsWith('/') && !value.includes('..'),`Invalid local asset path: ${value}`);
  check(existsSync(join(root,'public',value)),`Missing local asset: ${value}`);
};
const media=(asset)=>{
  local(asset.src);
  check(asset.width>0 && asset.height>0,`Invalid dimensions: ${asset.src}`);
  check(typeof asset.alt==='string' && asset.alt.trim().length>0,`Missing alt text: ${asset.src}`);
  if(asset.responsive){check(asset.src.endsWith('.webp'),`Responsive assets must be WebP: ${asset.src}`);for(const w of [640,1024])local(asset.src.replace(/\.webp$/,`-${w}.webp`))}
};
const unique=(records,key,group)=>check(new Set(records.map(r=>r[key])).size===records.length,`Duplicate ${key} in ${group}`);

try {
  writeFileSync(join(tmp,'package.json'),' {"type":"commonjs"} ');
  for(const dir of ['config','content']){
    mkdirSync(join(tmp,dir));
    for(const file of readdirSync(join(root,dir)).filter(f=>f.endsWith('.ts'))){
      const output=ts.transpileModule(readFileSync(join(root,dir,file),'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
      writeFileSync(join(tmp,dir,file.replace(/\.ts$/,'.js')),output);
    }
  }
  const req=createRequire(join(tmp,'index.cjs'));
  const {siteConfig}=req(join(tmp,'config/site.config.js'));
  const data={};
  for(const name of ['campaigns','videos','services','process','clients','team','metrics','industries']) data[name]=req(join(tmp,`content/${name}.js`))[name];
  for(const [name,records] of Object.entries(data))unique(records,'id',name);
  unique(data.campaigns,'slug','campaigns');
  for(const c of data.campaigns){
    check(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(c.slug),`Invalid project slug: ${c.slug}`);
    media(c.cover);c.gallery.forEach(media);
    if(c.videoId)check(data.videos.some(v=>v.id===c.videoId),`Missing linked video: ${c.videoId}`);
    check(c.story.length>0,`Missing story: ${c.slug}`);
  }
  for(const video of data.videos){
    media(video.poster);
    if(video.source.type==='file'){local(video.source.src);if(video.source.captions)local(video.source.captions)}
    else check(/^https:\/\/(www\.)?instagram\.com\/(p|reel|tv)\/[\w-]+\/?$/.test(video.source.url),`Invalid Instagram URL: ${video.id}`);
  }
  for(const item of [...data.services,...data.industries])media(item.media);
  data.team.forEach(m=>{if(m.image)media(m.image)});
  data.clients.forEach(c=>{if(c.logo)local(c.logo);if(c.website)check(http(c.website),`Invalid client URL: ${c.id}`)});
  data.metrics.forEach(m=>check(Number.isFinite(m.value),`Invalid metric: ${m.id}`));
  for(const asset of Object.values(siteConfig.brand.logo))if(asset)local(asset);
  if(siteConfig.seo.ogImage)local(siteConfig.seo.ogImage);
  if(siteConfig.seo.siteUrl)check(http(siteConfig.seo.siteUrl) && !siteConfig.seo.siteUrl.endsWith('/'),'Site URL must be an absolute HTTP(S) origin without a trailing slash');
  if(siteConfig.contact.email)check(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(siteConfig.contact.email),'Invalid contact email');
  if(siteConfig.contact.phone)check(/^\+?[\d\s()-]{6,}$/.test(siteConfig.contact.phone),'Invalid phone number');
  if(siteConfig.contact.whatsapp)check(/^https:\/\/(wa\.me|api\.whatsapp\.com)\//.test(siteConfig.contact.whatsapp),'Use a WhatsApp HTTPS URL');
  for(const [name,url] of Object.entries(siteConfig.social))if(url)check(http(url),`Invalid ${name} URL`);
  const targets=new Set(['/','/#work','/#services','/#about','/#process','/#clients','/#contact','/#motion','/#philosophy','/#opening']);
  for(const n of siteConfig.navigation)check(targets.has(n.href)||http(n.href),`Unrecognized navigation target: ${n.href}`);
  if(errors.length)throw new Error(errors.join('\n'));
  console.log(`Content passed: ${data.campaigns.length} projects, ${data.videos.length} videos, ${data.services.length} services. All local media, links and content references resolve.`);
} finally {rmSync(tmp,{recursive:true,force:true})}
