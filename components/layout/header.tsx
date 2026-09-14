'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { BrandLogo } from '@/components/primitives/brand-logo';
import { siteConfig } from '@/config/site.config';

export function Header({hasClients=false}:{hasClients?:boolean}) {
  const [open,setOpen]=useState(false);
  const [active,setActive]=useState('');
  const pathname=usePathname();
  const links=siteConfig.navigation.filter(n => n.requires !== 'clients' || hasClients);
  useEffect(() => {
    const obs=new IntersectionObserver(entries => {entries.forEach(e => {if(e.isIntersecting) setActive('/#'+e.target.id)})},{rootMargin:'-15% 0px -65% 0px'});
    document.querySelectorAll('main section[id]').forEach(s=>obs.observe(s));
    return ()=>obs.disconnect();
  },[pathname]);
  return <header className="site-header">
    <a href="#main-content" className="skip-link">Skip to content</a>
    <Link href="/" className="logo-link" aria-label={`${siteConfig.brand.name} home`}><BrandLogo /></Link>
    <nav className="desktop-nav" aria-label="Main navigation">{links.filter(n => !['/','/#contact'].includes(n.href)).map(n =>
      <Link key={n.href} href={n.href} aria-current={active===n.href ? 'location' : undefined}>{n.label}</Link>)}</nav>
    <Link className="header-contact" href="/#contact">{siteConfig.cta.secondary}<ArrowUpRight size={17} aria-hidden="true" /></Link>
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild><button className="mobile-menu-button icon-button" aria-label="Open navigation"><Menu size={24} /></button></DialogTrigger>
      <DialogContent className="mobile-menu" showCloseButton={false}>
        <div className="menu-top"><BrandLogo /><DialogClose asChild><button className="icon-button" aria-label="Close navigation"><X /></button></DialogClose></div>
        <DialogTitle className="sr-only">Navigation</DialogTitle><DialogDescription className="sr-only">Explore the studio, work, services and contact.</DialogDescription>
        <nav aria-label="Mobile navigation">{links.map((n,i) => <Link key={n.href} href={n.href} onClick={()=>setOpen(false)}><span className="mono">0{i+1}</span>{n.label}<ArrowUpRight /></Link>)}</nav>
        <p className="menu-end">{siteConfig.brand.tagline}</p>
      </DialogContent>
    </Dialog>
  </header>;
}
