import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { content } from '@/lib/content/service';
import { pageMetadata } from '@/lib/seo/metadata';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { MediaFrame } from '@/components/primitives/media-frame';
import { VideoTrigger } from '@/features/reels/video-trigger';
import { Contact } from '@/features/contact/contact';

type Props={params:Promise<{slug:string}>};
export async function generateStaticParams(){return (await content.getCampaigns()).map(c=>({slug:c.slug}))}
export async function generateMetadata({params}:Props){const {slug}=await params;const c=await content.getCampaign(slug);return c?pageMetadata({title:c.title,description:c.description,path:`/work/${c.slug}`,image:c.cover.src}):pageMetadata({title:'Story not found'})}

export default async function CampaignPage({params}:Props){
  const {slug}=await params;
  const [campaign,all,videos]=await Promise.all([content.getCampaign(slug),content.getCampaigns(),content.getVideos()]);
  if(!campaign)notFound();
  const next=all[(all.findIndex(c=>c.id===campaign.id)+1)%all.length];
  const video=videos.find(v=>v.id===campaign.videoId);
  return <><Header/><main id="main-content" className="case-study">
    <section className="case-opening section-pad" style={{'--campaign-accent':campaign.accent} as React.CSSProperties}>
      <Link href="/#work" className="editorial-link case-back"><ArrowLeft size={18}/><span>Back to stories</span></Link>
      <div className="case-meta mono"><span>{campaign.category}</span><span>{campaign.concept?'Independent concept':campaign.brand}{campaign.year?` / ${campaign.year}`:''}</span></div>
      <h1>{campaign.title}</h1><p className="case-description">{campaign.description}</p>
      <MediaFrame media={campaign.cover} priority className="case-cover"/>
      <div className="case-services"><span className="mono">In the frame</span>{campaign.services.map(s=><span key={s}>{s}</span>)}</div>
      {campaign.concept && <p className="concept-note">Independent concept · AI-generated imagery · Not commissioned client work</p>}
    </section>
    <section className="case-story section-pad" aria-label="The campaign story">{campaign.story.map((s,i)=><article key={s.title} data-reveal><span className="mono">0{i+1} / {s.title}</span><h2>{s.title.replace('The ','')}.</h2><p>{s.text}</p></article>)}</section>
    {campaign.gallery.length>0 && <section className="case-gallery section-pad" aria-label="The content"><div className="case-gallery-label mono">The content / A closer look</div>{campaign.gallery.map((m,i)=><figure key={`${m.src}-${i}`} data-reveal="image"><MediaFrame media={m} sizes="(max-width:700px) 100vw, 50vw"/><figcaption className="mono">Frame {String(i+1).padStart(3,'0')}{campaign.concept?' / Concept study':''}</figcaption></figure>)}</section>}
    {video && <section className="case-film section-pad"><h2>The story <em>in motion.</em></h2><VideoTrigger item={video} compact/></section>}
    {campaign.metrics && campaign.metrics.length>0 && <section className="case-results section-pad"><h2>The result.</h2><div className="metrics-list">{campaign.metrics.map(m=><div key={m.id}><span className="metric-value">{m.prefix}{m.value}{m.suffix}</span><p>{m.label}</p>{m.source && <small>{m.source}</small>}</div>)}</div></section>}
    {all.length>1 && <Link className="next-case section-pad" href={`/work/${next.slug}`}><span className="mono">The next story</span><span>{next.title}<ArrowUpRight/></span></Link>}
    <Contact/>
  </main><Footer/></>;
}
