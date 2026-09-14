'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export function MagneticLink({href,children,className=''}:{href:string;children:React.ReactNode;className?:string}) {
  const ref=useRef<HTMLAnchorElement>(null);
  return <Link ref={ref} href={href} className={`editorial-link ${className}`}
    onPointerMove={e => {
      if(!matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches) return;
      const r=e.currentTarget.getBoundingClientRect();
      ref.current?.style.setProperty('--mx',`${(e.clientX-r.left-r.width/2)*.035}px`);
      ref.current?.style.setProperty('--my',`${(e.clientY-r.top-r.height/2)*.12}px`);
    }} onPointerLeave={() => {ref.current?.style.setProperty('--mx','0px'); ref.current?.style.setProperty('--my','0px')}}>
    <span>{children}</span><ArrowUpRight size={20} aria-hidden="true" />
  </Link>;
}
