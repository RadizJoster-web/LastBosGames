import { ExternalLink } from "lucide-react";
import { imgFor } from "../../services/sanity";
import { HOST_LABEL } from "./constants";

export function EmulatorSkeleton() {
  return (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-line-soft bg-panel p-6">
      <div className="skeleton h-14 w-14 rounded-lg" />
      <div className="skeleton h-4 w-20" />
      <div className="skeleton h-3 w-28" />
      <div className="skeleton h-3 w-20" />
      <div className="skeleton mt-2 h-9 w-full" />
    </div>
  );
}

export function EmulatorEmptyState({ onReset }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-line px-4 py-16 text-center">
      <span className="font-jp text-2xl text-ink-faint">該当なし</span>
      <p className="mt-4 max-w-md text-sm text-ink-dim">
        Belum ada emulator yang cocok dengan filter itu.
      </p>
      <button onClick={onReset} className="btn-outline mt-6">
        Lihat semua emulator
      </button>
    </div>
  );
}

export default function EmulatorGrid({ emulators, forConsole, onHost }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {emulators.map((emulator) => (
        <EmulatorCard
          key={emulator._id}
          emulator={emulator}
          forConsole={forConsole}
          onHost={onHost}
        />
      ))}
    </div>
  );
}

function EmulatorCard({ emulator, forConsole, onHost }) {
  const consoles = emulator.emulates || [];
  const hosts = emulator.runsOn || [];

  return (
    <article className="group flex flex-col rounded-xl border border-line-soft bg-panel p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center">
          {emulator.logo ? (
            <img
              src={imgFor(emulator.logo).width(96).url()}
              alt={`Logo ${emulator.name}`}
              loading="lazy"
              decoding="async"
              width={44}
              height={44}
              className="h-full w-full object-contain grayscale transition-all duration-300 group-hover:grayscale-0"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center rounded-lg bg-carbon font-jp text-base text-ink-faint">
              ？
            </div>
          )}
        </div>
        <h2 className="line-clamp-2 font-head text-sm font-semibold leading-tight text-ink">
          {emulator.name}
        </h2>
      </div>

      <div className="mb-auto mt-4 space-y-3">
        <LabelBlock title="Untuk game">
          {consoles.length ? (
            consoles.map((p) => (
              <span
                key={p.slug || p.name}
                className={`chip-tag ${
                  p.slug === forConsole
                    ? "!bg-accent/15 !text-accent-bright"
                    : ""
                }`}
              >
                {p.name}
              </span>
            ))
          ) : (
            <span className="text-[11px] text-ink-faint">belum dilabeli</span>
          )}
        </LabelBlock>

        <LabelBlock title="Berjalan di">
          {hosts.length ? (
            hosts.map((h) => (
              <span
                key={h}
                className={`chip-tag ${
                  h === onHost ? "!bg-accent/15 !text-accent-bright" : ""
                }`}
              >
                {HOST_LABEL[h] || h}
              </span>
            ))
          ) : (
            <span className="text-[11px] text-ink-faint">belum dilabeli</span>
          )}
        </LabelBlock>
      </div>

      <a
        href={emulator.downloadUrl || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className={`mt-5 flex items-center justify-between gap-2 rounded-lg border border-line bg-carbon px-3.5
          py-2.5 font-head text-[11px] font-semibold uppercase tracking-[0.16em] text-ink-dim transition-colors
          hover:border-accent hover:bg-accent hover:text-white`}
      >
        Situs resmi
        <ExternalLink
          size={13}
          className="shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
        />
      </a>
    </article>
  );
}

function LabelBlock({ title, children }) {
  return (
    <div>
      <p className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink-faint">
        {title}
      </p>
      <div className="mt-1.5 flex flex-wrap gap-1.5">{children}</div>
    </div>
  );
}
