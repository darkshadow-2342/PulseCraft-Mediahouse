import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { editorial } from '@/content/editorial';
import { contactLinks } from '@/lib/media/contact-links';
import { SectionLabel } from '@/components/primitives/section-label';

export function Contact() {
  const links=contactLinks();
  return <section id="contact" className="contact scene section-pad">
    <SectionLabel number="09">The next chapter</SectionLabel>
    <h2 data-reveal>{editorial.contact.title}<em>{editorial.contact.serif}</em></h2>
    <div className="contact-bottom"><p>{editorial.contact.description}</p><div className="contact-details">
      {links.map(l=><a key={l.label} href={l.href} target={l.external?'_blank':undefined} rel={l.external?'noopener noreferrer':undefined}><span className="mono">{l.label}</span><span>{l.value}</span><ArrowUpRight size={20}/></a>)}
      {siteConfig.contact.location && <div className="contact-location"><span className="mono">Location</span><span>{siteConfig.contact.location}</span></div>}
      {!links.length && !siteConfig.contact.location && <p className="contact-empty">{editorial.contact.empty}</p>}
    </div></div>
  </section>;
}
