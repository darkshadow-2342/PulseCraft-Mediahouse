'use client';
import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Play, X } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import type { VideoItem } from '@/content/types';
import { MediaFrame } from '@/components/primitives/media-frame';
const VideoPlayer=lazy(()=>import('./video-player'));

export function VideoTrigger({item,compact=false}:{item:VideoItem;compact?:boolean}) {
  const [open,setOpen]=useState(false);
  const [preview,setPreview]=useState(false);
  const ref=useRef<HTMLVideoElement>(null);
  const pause=()=>{ref.current?.pause();setPreview(false)};
  useEffect(()=>{
    const video=ref.current;if(!video)return;
    const stop=()=>{video.pause();setPreview(false)};
    const observer=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting)stop()});observer.observe(video);
    const visibility=()=>{if(document.hidden)stop()};
    const motion=matchMedia('(prefers-reduced-motion: reduce)');
    document.addEventListener('visibilitychange',visibility);motion.addEventListener('change',stop);
    return()=>{video.pause();observer.disconnect();document.removeEventListener('visibilitychange',visibility);motion.removeEventListener('change',stop)};
  },[]);
  const playPreview=()=>{
    const conn=(navigator as Navigator & {connection?:{saveData?:boolean}}).connection;
    if(conn?.saveData || !matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches || !ref.current) return;
    if(item.source.type==='file') {
      if(!ref.current.getAttribute('src')) ref.current.src=item.source.src;
      void ref.current.play().then(()=>setPreview(true)).catch(()=>setPreview(false));
    }
  };
  return <Dialog open={open} onOpenChange={value=>{pause();setOpen(value)}}>
    <DialogTrigger asChild><button className={compact?'film-button editorial-link':'reel-button'} onPointerEnter={playPreview} onPointerLeave={pause} onBlur={pause} aria-label={`Play ${item.title}`}>
      {compact ? <><span>Watch the motion study</span><Play size={18}/></> : <>
        <div className="reel-media"><MediaFrame media={item.poster} sizes="(max-width:700px) 80vw, 32vw"/>
          {item.source.type==='file' && <video ref={ref} aria-hidden="true" tabIndex={-1} className={preview?'reel-preview is-playing':'reel-preview'} muted loop playsInline preload="none"/>}
          <span className="reel-play"><Play size={19} fill="currentColor"/></span><span className="reel-duration mono">{item.duration || (item.source.type==='instagram'?'Instagram':'Play film')}</span>
          {item.concept && <span className="reel-concept mono">Concept</span>}
        </div><span className="reel-caption"><span>{item.title}</span><small>{item.category}</small></span>
      </>}
    </button></DialogTrigger>
    <DialogContent className="film-dialog" showCloseButton={false}>
      <div className="film-dialog-heading"><div><DialogTitle>{item.title}</DialogTitle><DialogDescription>{item.concept?'Concept motion study. Animated AI-generated imagery.':item.category}</DialogDescription></div><DialogClose asChild><button className="film-close" aria-label="Close video"><span>Close</span><X size={20}/></button></DialogClose></div>
      <Suspense fallback={<div className="film-loading">Setting the scene…</div>}><VideoPlayer item={item}/></Suspense>
    </DialogContent>
  </Dialog>;
}
