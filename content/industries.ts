import type { Industry } from './types';
import { media } from './media';
export const industries:Industry[] = [
  {id:'fashion',title:'Fashion',media:media.fashion,description:'A point of view in every silhouette.'},
  {id:'hospitality',title:'Hospitality',media:media.hospitality,description:'Make them feel a place before they arrive.'},
  {id:'lifestyle',title:'Lifestyle',media:media.fashion,description:'Find the extraordinary in the everyday.'},
  {id:'food',title:'Food',media:media.hospitality,description:'Stories to be savoured.'},
  {id:'experiences',title:'Experiences',media:media.hospitality,description:'Capture the feeling, not just the moment.'},
  {id:'consumer',title:'Consumer brands',media:media.product,description:'Give an object a world of its own.'},
  {id:'other',title:'And your world',media:media.product,description:'Every industry has a story worth telling.'},
];
