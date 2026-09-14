import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '@/config/site.config';
import { editorial } from '@/content/editorial';
import { BrandLogo } from '@/components/primitives/brand-logo';
import { contactLinks } from '@/lib/media/contact-links';

export function Footer() {
  const links=contactLinks();
  return <footer className="site-footer">
    <div className="footer-top"><Link href="/" aria-label={`${siteConfig.brand.name} home`}><BrandLogo light /></Link><p>{siteConfig.brand.statement}</p><a href="#main-content" className="back-top">Back to top<ArrowUpRight size={18} /></a></div>
    <div className="footer-credits"><div className="credit-capabilities">{editorial.footer.credits.map(c=><span key={c}>{c}</span>)}</div>
      {links.length>0 && <div className="footer-links">{links.map(l=><a key={l.label} href={l.href} target={l.external?'_blank':undefined} rel={l.external?'noopener noreferrer':undefined}>{l.label}<ArrowUpRight size={15}/></a>)}</div>}
      {siteConfig.contact.location && <p>{siteConfig.contact.location}</p>}
    </div>
    <div className="footer-bottom"><small>© {new Date().getFullYear()} {siteConfig.brand.legalName}</small><span className="mono">{editorial.footer.end}</span></div>
  </footer>;
}
