import { pageMetadata } from '@/lib/seo/metadata';
import { SceneMotion } from '@/providers/scene-motion';
import './globals.css';
export const metadata=pageMetadata();
export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en"><body>{children}<SceneMotion/></body></html>;
}
