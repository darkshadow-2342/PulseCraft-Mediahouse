'use client';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import Image from 'next/image';
import { siteConfig } from '@/config/site.config';
import { motionConfig } from '@/config/motion.config';
import { editorial } from '@/content/editorial';
import type { MediaAsset } from '@/content/types';
import { MediaFrame } from '@/components/primitives/media-frame';
import { MagneticLink } from '@/components/primitives/magnetic-link';
import { BrandLogo } from '@/components/primitives/brand-logo';

function OpeningTitles() {
  const ref=useRef<HTMLDivElement>(null);
  const [frame,setFrame]=useState('001');
  useEffect(()=>{
    if(!siteConfig.experience.intro || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    try {if(sessionStorage.getItem('opening-seen')) return; sessionStorage.setItem('opening-seen','1')} catch {}
    const el=ref.current;if(!el) return;
    el.hidden=false;
    let n=0;
    const interval=setInterval(()=>setFrame(motionConfig.intro.frames[Math.min(++n,3)]),motionConfig.intro.frameInterval);
    const timer=setTimeout(()=>{clearInterval(interval);const a=el.animate([{clipPath:'inset(0)'},{clipPath:'inset(0 0 100% 0)'}],{duration:motionConfig.duration.normal,easing:motionConfig.easing.cinematic});a.onfinish=()=>{el.hidden=true}},motionConfig.intro.duration);
    return ()=>{clearInterval(interval);clearTimeout(timer)};
  },[]);
  return <div ref={ref} className="opening-titles" hidden aria-hidden="true"><span className="mono">Frame {frame}</span><>{siteConfig.brand.logo.loader ? <Image unoptimized src={siteConfig.brand.logo.loader} alt="" width={120} height={80}/> : <BrandLogo light />}</><p>{siteConfig.brand.tagline}</p><button onClick={()=>{if(ref.current) ref.current.hidden=true}} tabIndex={-1}>Skip intro</button></div>;
}

export function Hero({media}:{media?:MediaAsset}) {
  const ref=useRef<HTMLElement>(null);
  const copy=editorial.hero;
  useEffect(()=>{
    const el=ref.current; if(!el) return;
    const motion=matchMedia('(prefers-reduced-motion: no-preference) and (pointer: fine)');
    let raf=0;let visible=true;
    const observer=new IntersectionObserver(entries=>{visible=entries[0].isIntersecting});observer.observe(el);
    const move=(e:PointerEvent)=>{if(!motion.matches || !visible) return;cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{
      const r=el.getBoundingClientRect();el.style.setProperty('--rx',`${(e.clientX-r.left-r.width/2)/r.width*motionConfig.perspective.tilt}deg`);el.style.setProperty('--ry',`${-(e.clientY-r.top-r.height/2)/r.height*motionConfig.perspective.tilt}deg`);
    })};
    const reset=()=>{el.style.setProperty('--rx','0deg');el.style.setProperty('--ry','0deg')};
    el.addEventListener('pointermove',move);el.addEventListener('pointerleave',reset);motion.addEventListener('change',reset);
    return ()=>{cancelAnimationFrame(raf);observer.disconnect();el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',reset);motion.removeEventListener('change',reset)};
  },[]);
  return <>
    <OpeningTitles />
    <section ref={ref} className="hero scene" id="opening" aria-labelledby="hero-title">
      <div className="hero-meta mono"><span>{copy.label}</span><span>{copy.edition} <span className="edition-square" /></span></div>
      <div className="hero-stage">
        <h1 id="hero-title"><span className="hero-main">{copy.headline}</span><span className="hero-serif">{copy.serif}</span></h1>
        {media && <div className="hero-visual"><MediaFrame media={media} priority sizes="(max-width:700px) 100vw, 75vw" />{siteConfig.brand.logo.watermark && <Image unoptimized src={siteConfig.brand.logo.watermark} alt="" width={120} height={60} className="hero-watermark"/>}<div className="viewfinder" aria-hidden="true"><span>01 / 03</span><span>STORY IN FRAME</span></div><span className="hero-image-label mono">{copy.imageLabel}</span><a href="#work" className="hero-image-action" aria-label="Explore selected stories"><ArrowUpRight /></a></div>}
        <div className="hero-note"><span className="tiny-rule"/><p>{copy.description}</p><span>{copy.summary}</span><MagneticLink href="#work">{siteConfig.cta.primary}</MagneticLink></div>
        <span className="hero-side mono">{siteConfig.brand.name} — {siteConfig.brand.tagline}</span>
      </div>
      <div className="hero-bottom mono"><a href="#philosophy"><ArrowDown size={15} /> Scroll to feel something</a><span>{siteConfig.experience.showConcepts ? copy.conceptLabel : siteConfig.brand.tagline}</span></div>
    </section>
  </>;
}
