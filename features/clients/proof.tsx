'use client';
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { SectionLabel } from '@/components/primitives/section-label';
import type { Client, Metric } from '@/content/types';
import { motionConfig } from '@/config/motion.config';

function MetricValue({metric}:{metric:Metric}) {
  const ref=useRef<HTMLSpanElement>(null);
  useEffect(()=>{
    if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    let raf=0;
    const obs=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)return;obs.disconnect();const start=performance.now();const draw=(now:number)=>{const t=Math.min((now-start)/motionConfig.duration.cinematic,1);if(ref.current)ref.current.textContent=new Intl.NumberFormat('en',{maximumFractionDigits:1}).format(metric.value*(1-(1-t)**3));if(t<1)raf=requestAnimationFrame(draw)};raf=requestAnimationFrame(draw)});
    if(ref.current)obs.observe(ref.current);
    return()=>{obs.disconnect();cancelAnimationFrame(raf)};
  },[metric.value]);
  return <span className="metric-value">{metric.prefix}<span ref={ref}>{new Intl.NumberFormat('en',{maximumFractionDigits:1}).format(metric.value)}</span>{metric.suffix}</span>;
}

export function Proof({clients,metrics}:{clients:Client[];metrics:Metric[]}) {
  if(!clients.length && !metrics.length)return null;
  return <section id="clients" className="proof section-pad scene"><SectionLabel number="08">Stories we’ve helped tell</SectionLabel>
    {clients.length>0 && <><h2>Brands in <em>our frame.</em></h2><div className="client-credits">{clients.map((c,i)=><div key={c.id} className="client-row"><span className="mono">{String(i+1).padStart(2,'0')}</span>{c.logo && <Image unoptimized src={c.logo} width={120} height={50} alt=""/>}{c.website?<a href={c.website} target="_blank" rel="noopener noreferrer">{c.name} ↗</a>:<span>{c.name}</span>}{c.industry && <small>{c.industry}</small>}</div>)}</div></>}
    {metrics.length>0 && <div className="metrics-list">{metrics.map(m=><div key={m.id}><MetricValue metric={m}/><p>{m.label}</p>{m.source && <small>{m.source}</small>}</div>)}</div>}
  </section>;
}
