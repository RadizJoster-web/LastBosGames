import { RectangleAd, AdRow } from "../../components/ads";
import { SHELL, PRINCIPLES } from "./constants";

export default function PrinciplesSection() {
  return (
    <section id="prinsip" className={`${SHELL} py-20 md:py-24`}>
      <p className="kicker">
        <span className="font-jp not-italic">五箇条</span>
        <span>Lima prinsip</span>
      </p>
      <ol className="mt-10 divide-y divide-line-soft border-y border-line-soft">
        {PRINCIPLES.map((p) => (
          <li key={p.n} className="flex gap-6 py-7">
            <span className="font-jp text-3xl text-accent">{p.n}</span>
            <div>
              <h3 className="font-head text-lg font-semibold text-ink">
                {p.t}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                {p.d}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <AdRow className="mt-14">
        <RectangleAd />
        <RectangleAd />
      </AdRow>
    </section>
  );
}
