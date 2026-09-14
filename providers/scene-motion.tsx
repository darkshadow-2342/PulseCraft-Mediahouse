'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { motionConfig } from '@/config/motion.config';

export function SceneMotion() {
  const pathname=usePathname();
  useEffect(() => {
    const preference=matchMedia('(prefers-reduced-motion: reduce)');
    const animations:Animation[]=[];
    const stop=() => animations.forEach(a => a.cancel());
    if(preference.matches) return;
    const observer=new IntersectionObserver(entries => {
      entries.forEach(({isIntersecting,target}) => {
        if(!isIntersecting) return;
        observer.unobserve(target);
        const kind=(target as HTMLElement).dataset.reveal;
        animations.push(target.animate(kind==='line' ? [{clipPath:'inset(0 100% 0 0)'},{clipPath:'inset(0 0 0 0)'}] :
          kind==='image' ? [{clipPath:'inset(8% 0 8% 0)',transform:'scale(.97)'},{clipPath:'inset(0)',transform:'scale(1)'}] :
          [{transform:'translateY(32px)',opacity:.15},{transform:'translateY(0)',opacity:1}],
          {duration:motionConfig.duration.slow,easing:motionConfig.easing.standard,fill:'none'}));
      });
    },{threshold:.1});
    document.querySelectorAll('[data-reveal]').forEach(node => observer.observe(node));
    preference.addEventListener('change',stop);
    return () => {observer.disconnect();stop();preference.removeEventListener('change',stop)};
  },[pathname]);
  return null;
}
