export interface MediaAsset {
  src: string; alt: string; width: number; height: number;
  responsive?: boolean; position?: string; credit?: string;
}
export interface Campaign {
  id:string; slug:string; title:string; eyebrow:string; category:string; year?:string;
  brand?:string; description:string; services:string[]; cover:MediaAsset;
  gallery:MediaAsset[]; videoId?:string; accent:string; concept:boolean;
  story:{title:string; text:string}[];
  metrics?:Metric[];
}
export interface Service {id:string; title:string; description:string; capabilities:string[]; media:MediaAsset}
export interface VideoItem {
  id:string; title:string; category:string; poster:MediaAsset; concept:boolean;
  duration?:string; source:
    | {type:'file'; src:string; mime?:string; captions?:string; silent?:boolean}
    | {type:'instagram'; url:string};
}
export interface Client {id:string; name:string; logo?:string; industry?:string; website?:string}
export interface Metric {id:string; label:string; value:number; prefix?:string; suffix?:string; source?:string}
export interface TeamMember {id:string; name:string; role:string; image?:MediaAsset}
export interface ProcessStage {id:string; title:string; description:string; deliverable:string}
export interface Industry {id:string; title:string; media:MediaAsset; description:string}
