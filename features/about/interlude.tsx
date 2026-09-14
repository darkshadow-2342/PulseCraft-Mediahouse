import { editorial } from '@/content/editorial';
export function Interlude() {
  return (
    <section className="cinematic-interlude" aria-label="Creative philosophy">
      <span className="mono">A change of perspective</span>
      <h2 data-reveal="line">
        {editorial.interlude.first}
        <em>{editorial.interlude.second}</em>
      </h2>
      <span className="mono">Make them stop. Make them watch. Make them remember.</span>
    </section>
  );
}
