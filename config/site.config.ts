export interface SiteConfig {
  brand: {
    name: string; shortName: string; legalName: string; descriptor: string;
    tagline: string; statement: string;
    logo: { light: string; dark: string; mark: string; favicon: string; ogImage: string; watermark: string; loader: string };
  };
  contact: { email: string; phone: string; whatsapp: string; location: string };
  social: { instagram: string; linkedin: string; youtube: string; facebook: string; behance: string };
  seo: { title: string; titleTemplate: string; description: string; siteUrl: string; ogImage: string; keywords: string[] };
  navigation: { label: string; href: string; requires?: 'clients' }[];
  cta: { primary: string; secondary: string };
  experience: { intro: boolean; showConcepts: boolean; instagramEmbeds: boolean };
}

const name = 'PulseCraft Mediahouse';
export const siteConfig: SiteConfig = {
  brand: {
    name, shortName: 'PulseCraft', legalName: name, descriptor: 'Mediahouse',
    tagline: 'Every frame is a story.',
    statement: 'We bring the mindset of filmmaking into social media.',
    logo: {light:'', dark:'', mark:'/brand/mark.svg', favicon:'/favicon.svg', ogImage:'/brand/og-image.jpg', watermark:'', loader:''},
  },
  // Enter verified details here. Empty fields never produce links or contact rows.
  contact: { email:'hello@pulsecraftmediahouse.com', phone:'+911234567890', whatsapp:'https://wa.me/1234567890', location:'' },
  social: { instagram:'', linkedin:'', youtube:'', facebook:'', behance:'' },
  seo: {
    title: name, titleTemplate: `%s | ${name}`,
    description: 'A cinematic media house and social media marketing agency. Creative direction, photography, brand films and social stories created to be experienced.',
    siteUrl: 'https://pulsecraft-mediahouse.mayankgoel2342.chatgpt.site',
    ogImage: '/brand/og-image.jpg', keywords:['cinematic content','creative direction','social media marketing','brand shoots','fashion photography'],
  },
  navigation: [
    {label:'Home',href:'/'}, {label:'Work',href:'/#work'}, {label:'Services',href:'/#services'},
    {label:'Studio',href:'/#about'}, {label:'Process',href:'/#process'},
    {label:'Clients',href:'/#clients',requires:'clients'}, {label:'Contact',href:'/#contact'},
  ],
  cta: {primary:'Explore the stories', secondary:'Let’s talk'},
  experience: {intro:true, showConcepts:true, instagramEmbeds:true},
};


// contact: {
//   email: "hello@pulsecraftmediahouse.com",
//   phone: "9034565331",
//   whatsapp: "https://wa.me/919034565331",
//   location: "",
// },

// social: {
//   instagram: "https://www.instagram.com/YOUR_INSTAGRAM_USERNAME/",
//   linkedin: "https://www.linkedin.com/company/YOUR_COMPANY_NAME/",
//   youtube: "https://www.youtube.com/@YOUR_CHANNEL_NAME",
//   facebook: "https://www.facebook.com/YOUR_PAGE_NAME",
//   behance: "https://www.behance.net/YOUR_USERNAME",
// },