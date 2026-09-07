import { Plus } from "lucide-react";
import { LeaderboardAd } from "../../components/ads";
import { SHELL, FAQ } from "./constants";

export default function FaqSection() {
  return (
    <section id="faq" className="border-y border-line-soft bg-carbon">
      <div className={`${SHELL} py-20 md:py-24`}>
        <p className="kicker">
          <span>Pertanyaan umum</span>
          <span className="font-jp not-italic">問答</span>
        </p>
        <div className="mt-10 space-y-3">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="group rounded-xl border border-line-soft bg-panel px-5 open:border-accent/30"
            >
              <summary
                className={`flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-head
                  text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden`}
              >
                {item.q}
                <Plus
                  size={16}
                  className="shrink-0 text-ink-faint transition-transform duration-300 group-open:rotate-45 group-open:text-accent"
                />
              </summary>
              <p className="pb-5 text-sm leading-relaxed text-ink-dim">
                {item.a}
              </p>
            </details>
          ))}
        </div>

        <LeaderboardAd className="mt-14" />
      </div>
    </section>
  );
}
