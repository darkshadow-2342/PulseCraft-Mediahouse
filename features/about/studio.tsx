'use client';
import { useState } from 'react';
import type { Industry, TeamMember } from '@/content/types';
import { siteConfig } from '@/config/site.config';
import { editorial } from '@/content/editorial';
import { SectionLabel } from '@/components/primitives/section-label';
import { MediaFrame } from '@/components/primitives/media-frame';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

export function Studio({industries,team}:{industries:Industry[];team:TeamMember[]}) {
  const [industry,setIndustry]=useState(industries[0]?.id);
  return <section id="about" className="studio scene section-pad">
    <SectionLabel number="07">The people behind the perspective</SectionLabel>
    <div className="studio-heading"><h2 data-reveal>{editorial.studio.title}<em>{siteConfig.brand.shortName}.</em></h2><p>{editorial.studio.statement}</p></div>
    <div className="studio-manifesto"><div className="studio-verbs">{editorial.studio.verbs.map((v,i)=><span key={v} data-reveal={i===6?'line':undefined}>{v}</span>)}</div><div className="studio-quote"><span className="quote-mark" aria-hidden="true">“</span>{editorial.studio.philosophy.map(p=><p key={p}>{p}</p>)}<span className="mono">Our point of view</span></div></div>
    {industries.length>0 && <Tabs value={industry} onValueChange={setIndustry} className="industry-tabs"><div className="industry-copy"><h3>{editorial.studio.industriesTitle}</h3><TabsList className="industry-list" aria-label="Explore industries">{industries.map(i=><TabsTrigger key={i.id} value={i.id} className="industry-trigger">{i.title}</TabsTrigger>)}</TabsList></div><div className="industry-media">{industries.map(i=><TabsContent key={i.id} value={i.id}><MediaFrame media={i.media} sizes="(max-width:700px) 100vw, 50vw"/><p>{i.description}</p></TabsContent>)}</div></Tabs>}
    {team.length>0 && <div className="team-section"><h3>The people in our frame.</h3><div className="team-list">{team.map(m=><article key={m.id}>{m.image && <MediaFrame media={m.image} sizes="(max-width:700px) 100vw, 33vw"/>}<h4>{m.name}</h4><p>{m.role}</p></article>)}</div></div>}
  </section>;
}
