'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import type { Campaign } from '@/content/types';
import { editorial } from '@/content/editorial';
import { SectionLabel } from '@/components/primitives/section-label';
import { MediaFrame } from '@/components/primitives/media-frame';

export function WorkGallery({campaigns}:{campaigns:Campaign[]}) {
  const [index,setIndex]=useState(0);
  const touch=useRef<number|null>(null);
  const current=campaigns[index];
  if(!current) return null;
  const next=campaigns[(index+1)%campaigns.length];
  const change=(direction:number)=>setIndex(i=>(i+direction+campaigns.length)%campaigns.length);
  return <section className="work dark-scene scene section-pad" id="work" aria-labelledby="work-title">
    <SectionLabel number="03">The portfolio</SectionLabel>
    <div className="section-heading"><h2 id="work-title" data-reveal>{editorial.work.title}<em>{editorial.work.serif}</em></h2><p>{editorial.work.description}</p></div>
    <div className="work-exhibition" role="region" aria-roledescription="carousel" aria-label="Selected stories" tabIndex={0}
      onKeyDown={e=>{if(e.target!==e.currentTarget)return;if(e.key==='ArrowRight'){e.preventDefault();change(1)}if(e.key==='ArrowLeft'){e.preventDefault();change(-1)}}}
      onTouchStart={e=>{touch.current=e.touches[0].clientX}} onTouchEnd={e=>{if(touch.current!==null){const d=touch.current-e.changedTouches[0].clientX;if(Math.abs(d)>70)change(d>0?1:-1);touch.current=null}}}>
      <div className="work-active" key={current.id}>
        <Link href={`/work/${current.slug}`} className="project-image-link" aria-label={`Explore ${current.title}`}>
          <MediaFrame media={current.cover} sizes="(max-width:700px) 100vw, 78vw" />
          <div className="project-topline mono"><span>{current.concept?'Independent concept':current.brand || current.category}</span><span>{current.year || 'Visual direction'}</span></div>
          <div className="project-overlay"><div><span className="mono">{current.eyebrow}</span><h3>{current.title}</h3></div><span className="project-open">Explore project<ArrowUpRight size={22}/></span></div>
        </Link>
      </div>
      {campaigns.length>1 && <button className="next-preview" onClick={()=>change(1)} aria-label={`Next project: ${next.title}`}><span className="mono">Next in frame <ArrowUpRight size={15}/></span><MediaFrame media={next.cover} sizes="20vw"/><span>{next.title}</span></button>}
    </div>
    <div className="work-controls"><div className="work-current" aria-live="polite"><span className="work-count mono">{String(index+1).padStart(2,'0')}<span> / {String(campaigns.length).padStart(2,'0')}</span></span><span>{current.category}</span></div>
      <div className="work-dots" aria-label="Choose a project">{campaigns.map((p,i)=><button key={p.id} onClick={()=>setIndex(i)} className={i===index?'active':''} aria-label={`Show ${p.title}`} aria-pressed={i===index}><span /></button>)}</div>
      {campaigns.length>1 && <div className="work-arrows"><button className="icon-button" onClick={()=>change(-1)} aria-label="Previous project"><ArrowLeft /></button><button className="icon-button" onClick={()=>change(1)} aria-label="Next project"><ArrowRight /></button></div>}
    </div>
    {campaigns.some(c=>c.concept) && <p className="concept-note">{editorial.work.conceptNote}</p>}
    <div className="project-index"><span className="mono">Story index</span>{campaigns.map((p,i)=><Link href={`/work/${p.slug}`} key={p.id}><span className="mono">0{i+1}</span>{p.title}<ArrowUpRight size={17}/></Link>)}</div>
  </section>;
}
