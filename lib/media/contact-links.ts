import { siteConfig } from '@/config/site.config';
export function contactLinks() {
  const { contact, social } = siteConfig;
  const items: { label: string; value: string; href: string; external?: boolean }[] = [];
  if (contact.email)
    items.push({ label: 'Email', value: contact.email, href: `mailto:${contact.email}` });
  if (contact.phone)
    items.push({
      label: 'Phone',
      value: contact.phone,
      href: `tel:${contact.phone.replace(/[^+\d]/g, '')}`,
    });
  if (contact.whatsapp)
    items.push({
      label: 'WhatsApp',
      value: 'Start a conversation',
      href: contact.whatsapp,
      external: true,
    });
  for (const [key, url] of Object.entries(social))
    if (url)
      items.push({
        label: key[0].toUpperCase() + key.slice(1),
        value:
          key === 'instagram'
            ? 'Find us on Instagram'
            : `Connect on ${key[0].toUpperCase() + key.slice(1)}`,
        href: url,
        external: true,
      });
  return items;
}

