import Link from 'next/link';
import { siteConfig } from '@/config/site.config';
export default function NotFound(){return <main className="error-page" id="main-content"><span className="mono">{siteConfig.brand.name} / Frame 404</span><h1>A missing <em>scene.</em></h1><p>This story isn’t in the archive.</p><Link href="/#work" className="editorial-link">Return to the stories ↗</Link></main>}
