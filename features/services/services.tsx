'use client';
import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Service } from '@/content/types';
import { editorial } from '@/content/editorial';
import { SectionLabel } from '@/components/primitives/section-label';
import { MediaFrame } from '@/components/primitives/media-frame';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export function Services({services}:{services:Service[]}) {
  const [value,setValue]=useState(services[0]?.id);
  if(!services.length)return null;
  return <section id="services" className="services section-pad scene">
    <SectionLabel number="05">What we do</SectionLabel>
    <div className="section-heading"><h2 data-reveal>{editorial.services.title}<em>{editorial.services.serif}</em></h2><p>{editorial.services.description}</p></div>
    <Tabs value={value} onValueChange={setValue} orientation="vertical" className="services-tabs">
      <TabsList className="service-list" aria-label="Explore services">{services.map((s,i)=><TabsTrigger key={s.id} value={s.id} className="service-trigger"><span className="mono">{String(i+1).padStart(2,'0')}</span><span>{s.title}</span><ArrowUpRight size={22}/></TabsTrigger>)}</TabsList>
      <div className="service-panels">{services.map(s=><TabsContent key={s.id} value={s.id} className="service-panel"><div className="service-art"><MediaFrame media={s.media} sizes="(max-width:800px) 100vw, 40vw"/><span className="mono">A different point of view</span></div><p>{s.description}</p><ul>{s.capabilities.map(c=><li key={c}>{c}</li>)}</ul></TabsContent>)}</div>
    </Tabs>
  </section>;
}
