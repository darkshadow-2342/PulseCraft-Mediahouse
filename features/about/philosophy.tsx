import { SectionLabel } from '@/components/primitives/section-label';
import { editorial } from '@/content/editorial';
import { siteConfig } from '@/config/site.config';

export function Philosophy() {
  const copy=editorial.philosophy;
  return <section className="philosophy section-pad scene" id="philosophy">
    <SectionLabel number="02">{copy.label}</SectionLabel>
    <div className="philosophy-body"><h2 data-reveal>{copy.opening}<span>{copy.muted}</span><em>{copy.emphasis}</em></h2>
      <div className="philosophy-bottom"><p>{siteConfig.brand.statement}</p><div className="format-list">{copy.formats.map((f,i)=><span key={f}><small className="mono">0{i+1}</small>{f}</span>)}<p>{copy.end}</p></div></div>
    </div>
  </section>;
}
