import { content } from '@/lib/content/service';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/features/hero/hero';
import { Philosophy } from '@/features/about/philosophy';
import { Interlude } from '@/features/about/interlude';
import { WorkGallery } from '@/features/work/work-gallery';
import { MotionArchive } from '@/features/reels/motion-archive';
import { Services } from '@/features/services/services';
import { Process } from '@/features/process/process';
import { Studio } from '@/features/about/studio';
import { Proof } from '@/features/clients/proof';
import { Contact } from '@/features/contact/contact';
import { siteConfig } from '@/config/site.config';

export default async function Home() {
  const data = await content.getHome();
  return <>
    <Header hasClients={data.clients.length > 0} />
    <main id="main-content">
      <Hero media={data.campaigns[0]?.cover} />
      <Philosophy />
      <WorkGallery campaigns={data.campaigns} />
      <MotionArchive videos={data.videos} />
      <Interlude />
      <Services services={data.services} />
      <Process stages={data.process} />
      <Studio industries={data.industries} team={data.team} />
      <Proof clients={data.clients} metrics={data.metrics} />
      <Contact />
    </main>
    <Footer />
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
      '@context':'https://schema.org', '@type':'Organization', name:siteConfig.brand.name,
      description:siteConfig.seo.description, url:siteConfig.seo.siteUrl || undefined,
      email:siteConfig.contact.email || undefined, telephone:siteConfig.contact.phone || undefined,
      sameAs:Object.values(siteConfig.social).filter(Boolean),
    }).replace(/</g, '\\u003c')}} />
  </>;
}
