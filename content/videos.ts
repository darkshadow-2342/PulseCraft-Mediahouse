import type { VideoItem } from './types';
import { media } from './media';
export const videos:VideoItem[] = [
  {id:'afterglow-motion',title:'In the last light',category:'Fashion / motion study',poster:media.fashion,concept:true,duration:'00:08',source:{type:'file',src:'/media/afterglow.mp4',mime:'video/mp4',silent:true}},
  {id:'slow-hours-motion',title:'Stay a little longer',category:'Hospitality / motion study',poster:media.hospitality,concept:true,duration:'00:08',source:{type:'file',src:'/media/slow-hours.mp4',mime:'video/mp4',silent:true}},
  {id:'objects-motion',title:'Light, bottled',category:'Product / motion study',poster:media.product,concept:true,duration:'00:08',source:{type:'file',src:'/media/objects.mp4',mime:'video/mp4',silent:true}},
];
