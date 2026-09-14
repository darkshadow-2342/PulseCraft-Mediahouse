import type { MediaAsset } from './types';
export const media = {
  fashion: {src:'/media/fashion.webp',alt:'Concept fashion editorial: a woman in flowing oxblood couture against sculptural desert rock.',width:1536,height:1024,responsive:true,position:'55% 45%',credit:'AI-generated concept imagery'},
  hospitality: {src:'/media/hospitality.webp',alt:'Concept hospitality still: amber drinks, espresso and linen in warm afternoon light.',width:1536,height:1024,responsive:true,credit:'AI-generated concept imagery'},
  product: {src:'/media/product.webp',alt:'Concept product still: an unbranded amber fragrance bottle under theatrical light.',width:1536,height:1024,responsive:true,credit:'AI-generated concept imagery'},
} satisfies Record<string,MediaAsset>;
