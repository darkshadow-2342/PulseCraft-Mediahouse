'use client';
import Image, { type ImageLoaderProps } from 'next/image';
import { useState } from 'react';
import type { MediaAsset } from '@/content/types';

const optimizedLoader = ({src,width}:ImageLoaderProps) => {
  const size = width <= 640 ? 640 : width <= 1024 ? 1024 : 1536;
  return size === 1536 ? src : src.replace(/\.webp$/,`-${size}.webp`);
};
const originalLoader = ({src}:ImageLoaderProps) => src;

export function MediaFrame({media,className='',priority=false,sizes='100vw'}:{media:MediaAsset;className?:string;priority?:boolean;sizes?:string}) {
  const [failed,setFailed] = useState(false);
  return <div className={`media-frame ${className}`}>
    {failed ? <div className="media-fallback" role="img" aria-label={media.alt}><span>Frame unavailable</span></div> :
    <Image src={media.src} alt={media.alt} width={media.width} height={media.height}
      loader={media.responsive ? optimizedLoader : originalLoader} sizes={sizes}
      style={{objectPosition:media.position || 'center'}} preload={priority}
      loading={priority ? undefined : 'lazy'} onError={() => setFailed(true)} />}
  </div>;
}
