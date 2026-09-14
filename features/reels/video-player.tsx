'use client';
import { useRef, useState } from 'react';
import { ArrowUpRight, Maximize, Volume2, VolumeX } from 'lucide-react';
import type { VideoItem } from '@/content/types';
import { siteConfig } from '@/config/site.config';

function instagramEmbed(url:string):string|null {
  try {const parsed=new URL(url);if(!['instagram.com','www.instagram.com'].includes(parsed.hostname))return null;
    const match=parsed.pathname.match(/^\/(?:p|reel|tv)\/([A-Za-z0-9_-]+)\/?$/);
    return match?`https://www.instagram.com/p/${match[1]}/embed/`:null;
  }catch{return null}
}

export default function VideoPlayer({item}:{item:VideoItem}) {
  const ref=useRef<HTMLVideoElement>(null);
  const [loading,setLoading]=useState(true);
  const [error,setError]=useState(false);
  const [muted,setMuted]=useState(true);
  const [playing,setPlaying]=useState(false);
  const [embed,setEmbed]=useState(false);
  const [message,setMessage]=useState('');
  if(item.source.type==='instagram') {
    const src=instagramEmbed(item.source.url);
    return <div className="instagram-player">
      {embed && src ? <iframe src={src} title={item.title} loading="lazy" allow="encrypted-media; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /> : <><p>Watch this story on Instagram.</p>{siteConfig.experience.instagramEmbeds && src && <button className="light-button" onClick={()=>setEmbed(true)}>Load Instagram player</button>}<p className="embed-disclosure">Loading the player connects to Instagram. You can also open the original post.</p></>}
      {src && <a className="editorial-link" href={item.source.url} target="_blank" rel="noopener noreferrer">Open on Instagram<ArrowUpRight size={18}/></a>}
      {!src && <p>This Instagram link is unavailable.</p>}
    </div>;
  }
  return <div className="file-player">
    <div className="player-stage">
      {!error && <video ref={ref} src={item.source.src} poster={item.poster.src} controls autoPlay muted={muted} playsInline preload="metadata" aria-label={item.title}
        onLoadedData={()=>setLoading(false)} onCanPlay={()=>setLoading(false)} onWaiting={()=>setLoading(true)}
        onPlaying={()=>{setPlaying(true);setLoading(false)}} onPause={()=>setPlaying(false)} onEnded={()=>setPlaying(false)} onError={()=>{setError(true);setLoading(false)}}
        onVolumeChange={()=>setMuted(ref.current?.muted ?? true)}>
        {item.source.captions && <track kind="captions" src={item.source.captions} srcLang="en" label="English" default/>}
      </video>}
      {loading && !error && <div className="player-loading" role="status">Setting the scene<span>—</span></div>}
      {error && <div className="player-error" role="status"><p>This film couldn’t be loaded.</p><p>Please try again, or open the original file.</p><button className="light-button" onClick={()=>{setError(false);setLoading(true)}}>Try again</button><a href={item.source.src} className="editorial-link" target="_blank" rel="noopener noreferrer">Open video<ArrowUpRight size={17}/></a></div>}
    </div>
    <div className="player-controls"><span className="mono" aria-live="polite">{error?'Unavailable':loading?'Loading':playing?'Playing':'Paused'}{item.source.silent?' / Silent film':''}</span><div>
      {!item.source.silent && <button onClick={()=>{if(ref.current){ref.current.muted=!muted;setMuted(!muted)}}} aria-label={muted?'Unmute video':'Mute video'}>{muted?<VolumeX size={20}/>:<Volume2 size={20}/>}<span>{muted?'Sound off':'Sound on'}</span></button>}
      <button onClick={async()=>{try {const v=ref.current as (HTMLVideoElement&{webkitEnterFullscreen?:()=>void})|null;if(v?.requestFullscreen)await v.requestFullscreen();else if(v?.webkitEnterFullscreen)v.webkitEnterFullscreen();else setMessage('Use your browser’s video controls for fullscreen.')}catch{setMessage('Use your browser’s video controls for fullscreen.')}}} aria-label="View video fullscreen"><Maximize size={19}/><span>Fullscreen</span></button>
    </div></div>{message && <p role="status" className="player-message">{message}</p>}
  </div>;
}
