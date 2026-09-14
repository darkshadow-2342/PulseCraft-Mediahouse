export const motionConfig = {
  duration: {fast:220, normal:650, slow:1000, cinematic:1400},
  easing: {standard:'cubic-bezier(.22,1,.36,1)', cinematic:'cubic-bezier(.76,0,.24,1)'},
  stagger: {text:35, media:80},
  perspective: {tilt:3, travel:12},
  intro: {frames:['001','014','027','048'], frameInterval:140, duration:850},
} as const;
