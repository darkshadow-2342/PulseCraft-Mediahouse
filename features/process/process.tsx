'use client';
import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { ProcessStage } from '@/content/types';
import { editorial } from '@/content/editorial';
import { siteConfig } from '@/config/site.config';
import { SectionLabel } from '@/components/primitives/section-label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export function Process({stages}:{stages:ProcessStage[]}) {
  const [value,setValue]=useState(stages[0]?.id);
  const index=stages.findIndex(s=>s.id===value);
  if(!stages.length)return null;
  return <section className="process dark-scene section-pad scene" id="process">
    <SectionLabel number="06">The {siteConfig.brand.shortName} method</SectionLabel>
    <div className="section-heading"><h2 data-reveal>{editorial.process.title}<em>{editorial.process.serif}</em></h2><p>{editorial.process.label}</p></div>
    <Tabs value={value} onValueChange={setValue} className="process-tabs">
      <TabsList className="process-timeline" aria-label="Creative process stages">{stages.map((s,i)=><TabsTrigger key={s.id} value={s.id} className="process-trigger"><span className="process-dot"/><span className="mono">0{i+1}</span><span>{s.title}</span></TabsTrigger>)}</TabsList>
      {stages.map((s,i)=><TabsContent key={s.id} value={s.id} className="process-panel"><span className="process-number" aria-hidden="true">0{i+1}</span><div className="process-story"><span className="mono">Scene 0{i+1} / {String(stages.length).padStart(2,'0')}</span><h3>{s.title}</h3><p>{s.description}</p><span className="process-deliverable">{s.deliverable}</span></div></TabsContent>)}
    </Tabs>
    <div className="process-bottom"><span className="mono">One story. Every detail considered.</span><div><button className="icon-button" disabled={index===0} onClick={()=>setValue(stages[index-1].id)} aria-label="Previous process stage"><ArrowLeft/></button><button className="icon-button" disabled={index===stages.length-1} onClick={()=>setValue(stages[index+1].id)} aria-label="Next process stage"><ArrowRight/></button></div></div>
  </section>;
}
