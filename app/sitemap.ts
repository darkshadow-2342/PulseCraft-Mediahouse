import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site.config';
import { content } from '@/lib/content/service';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const origin=siteConfig.seo.siteUrl;if(!origin)return [];return [{url:origin,changeFrequency:'monthly',priority:1},...(await content.getCampaigns()).map(c=>({url:`${origin}/work/${c.slug}`,changeFrequency:'monthly' as const,priority:.8}))]}
