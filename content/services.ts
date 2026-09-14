import type { Service } from './types';
import { media } from './media';
export const services:Service[] = [
  {id:'social',title:'Social media marketing',description:'Strategy, planning and communication that give your social presence a point of view. Beautiful content, with a reason to exist.',capabilities:['Social strategy','Content planning','Community & management','Campaigns'],media:media.hospitality},
  {id:'content',title:'Content creation',description:'Ideas translated into visual stories built for the way people actually watch, feel and share.',capabilities:['Reels & short films','Photography','Editing & motion','Visual storytelling'],media:media.product},
  {id:'shoots',title:'Shoots',description:'From the first reference to the final frame. Mood, movement, composition and a story worth showing up for.',capabilities:['Concept development','Pre-production','Photography & video','Post-production'],media:media.hospitality},
  {id:'brand',title:'Brand shoots',description:'Your identity, brought into focus. Visual campaigns that turn what a brand stands for into something people can feel.',capabilities:['Creative direction','Campaign imagery','Product photography','Brand films'],media:media.product},
  {id:'fashion',title:'Fashion shoots',description:'Editorial-led imagery shaped through direction, styling and cinematic storytelling. Never just another look.',capabilities:['Fashion editorials','Styling direction','Lookbooks','Fashion films'],media:media.fashion},
];
