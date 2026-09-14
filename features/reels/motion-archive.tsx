import type { VideoItem } from '@/content/types';
import { editorial } from '@/content/editorial';
import { SectionLabel } from '@/components/primitives/section-label';
import { VideoTrigger } from './video-trigger';

export function MotionArchive({videos}:{videos:VideoItem[]}) {
  if(!videos.length) return null;
  return <section className="motion-archive section-pad scene" id="motion">
    <SectionLabel number="04">Stories in motion</SectionLabel>
    <div className="section-heading"><h2 data-reveal>{editorial.motion.title}<em>{editorial.motion.serif}</em></h2><p>{editorial.motion.description}</p></div>
    <div className="reels-composition">{videos.map((item,i)=><div key={item.id} className={`reel-item reel-${i%3}`} data-reveal="image"><span className="reel-index mono">Frame {String(i+1).padStart(3,'0')}</span><VideoTrigger item={item}/></div>)}</div>
    {videos.some(v=>v.concept) && <p className="concept-note">{editorial.motion.note}</p>}
  </section>;
}
