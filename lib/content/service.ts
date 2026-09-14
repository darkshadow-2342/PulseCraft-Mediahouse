import { campaigns } from '@/content/campaigns';
import { services } from '@/content/services';
import { videos } from '@/content/videos';
import { clients } from '@/content/clients';
import { metrics } from '@/content/metrics';
import { process } from '@/content/process';
import { industries } from '@/content/industries';
import { team } from '@/content/team';
import { siteConfig } from '@/config/site.config';

// Replace this adapter with a CMS fetch; the feature components consume the same models.
export const content = {
  async getCampaigns() {return campaigns.filter(c => siteConfig.experience.showConcepts || !c.concept)},
  async getCampaign(slug:string) {return (await this.getCampaigns()).find(c => c.slug === slug)},
  async getVideos() {return videos.filter(v => siteConfig.experience.showConcepts || !v.concept)},
  async getHome() {return {campaigns:await this.getCampaigns(), videos:await this.getVideos(), services, clients, metrics, process, industries, team}},
};
