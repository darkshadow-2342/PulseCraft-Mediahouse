import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site.config';
export default function robots():MetadataRoute.Robots{return {rules:{userAgent:'*',allow:'/'},...(siteConfig.seo.siteUrl?{sitemap:`${siteConfig.seo.siteUrl}/sitemap.xml`}:{})}}
