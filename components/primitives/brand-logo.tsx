import { siteConfig } from '@/config/site.config';
import Image from 'next/image';

export function BrandLogo({light=false}:{light?:boolean}) {
  const custom = light ? siteConfig.brand.logo.light : siteConfig.brand.logo.dark;
  if(custom) return <Image unoptimized src={custom} alt={siteConfig.brand.name} width={200} height={60} className="custom-logo" />;
  return <span className="brand-logo" aria-label={siteConfig.brand.name}>
    {siteConfig.brand.logo.mark && <Image unoptimized src={siteConfig.brand.logo.mark} alt="" width={35} height={35} className="brand-mark"/>}
    <span className="brand-wordmark">{siteConfig.brand.shortName}<span>{siteConfig.brand.descriptor}</span></span>
  </span>;
}
