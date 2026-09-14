import type { Metadata } from 'next';
import { siteConfig } from '@/config/site.config';

export function pageMetadata({title,description,path='/',image}:{title?:string;description?:string;path?:string;image?:string}={}):Metadata {
  const seo=siteConfig.seo;
  const fullTitle=title?seo.titleTemplate.replace('%s',title):seo.title;
  const desc=description || seo.description;
  const origin=seo.siteUrl;
  const preview=image || seo.ogImage || siteConfig.brand.logo.ogImage;
  const absoluteImage=preview && origin?new URL(preview,origin).href:undefined;
  return {
    title:fullTitle,description:desc,keywords:seo.keywords,
    ...(origin?{metadataBase:new URL(origin),alternates:{canonical:new URL(path,origin).href}}:{}),
    openGraph:{title:fullTitle,description:desc,type:'website',siteName:siteConfig.brand.name,...(origin?{url:new URL(path,origin).href}:{}),images:absoluteImage?[{url:absoluteImage,alt:fullTitle}]:[]},
    twitter:{card:absoluteImage?'summary_large_image':'summary',title:fullTitle,description:desc,images:absoluteImage?[absoluteImage]:[]},
    icons:{icon:siteConfig.brand.logo.favicon,shortcut:siteConfig.brand.logo.favicon},
  };
}
