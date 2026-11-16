import { ButtonLink } from "@/components/atoms/ButtonLink";
import { SectionContainer } from "@/components/atoms/SectionContainer";
import { ScrollReveal } from "@/components/molecules/ScrollReveal";
import { PageHeroBanner } from "@/components/organisms/PageHeroBanner";
import { PUBLIC_LOGIN_URL, PUBLIC_REGISTER_URL } from "@/lib/env";
import type {
  InfoBlock,
  InfoItem,
  InfoResult,
  RegulerInfoPage,
  RegulerInfoPagesContent,
} from "@/locales/reguler-info-pages";

const DEMO_LOGIN_URL = "https://demo.sgberjangka.com/login";

const cardClassName =
  "rounded-[22px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]";

const resultToneClassName: Record<NonNullable<InfoResult["tone"]>, string> = {
  profit: "text-emerald-400",
  loss: "text-red-400",
};

// Staggers sibling reveals, capped so long lists don't feel slow.
function staggerDelay(index: number) {
  return Math.min(index, 5) * 80;
}

function BlockHeading({ children }: { children: string }) {
  return (
    <div className="mb-6">
      <h2 className="font-mono text-2xl font-bold tracking-[-0.02em] text-yellow-400 sm:text-3xl">
        {children}
      </h2>
      <div
        aria-hidden="true"
        className="mt-3 h-1 w-16 rounded-full bg-yellow-500"
      />
    </div>
  );
}

function PointList({ points }: { points: string[] }) {
  return (
    <ul className="mt-4 space-y-2 text-sm leading-7 text-zinc-300">
      {points.map((point) => (
        <li key={point} className="flex gap-3">
          <span
            aria-hidden="true"
            className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-yellow-500"
          />
          <span>{point}</span>
        </li>
      ))}
    </ul>
  );
}

function ItemBody({ item }: { item: InfoItem }) {
  return (
    <>
      {item.body ? (
        <p className="mt-3 text-sm leading-7 text-zinc-300">{item.body}</p>
      ) : null}
      {item.points ? <PointList points={item.points} /> : null}
    </>
  );
}

function CardsBlock({ block }: { block: Extract<InfoBlock, { type: "cards" }> }) {
  return (
    <section>
      {block.title ? <BlockHeading>{block.title}</BlockHeading> : null}
      <div className="grid gap-4 md:grid-cols-2">
        {block.items.map((item, index) => (
          <ScrollReveal
            as="article"
            key={item.title}
            className={cardClassName}
            effect="fade-up"
            delay={staggerDelay(index % 2)}
          >
            <h3 className="text-lg font-semibold text-white">{item.title}</h3>
            <ItemBody item={item} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

function StepsBlock({ block }: { block: Extract<InfoBlock, { type: "steps" }> }) {
  return (
    <section>
      {block.title ? <BlockHeading>{block.title}</BlockHeading> : null}
      <ol className="space-y-4">
        {block.items.map((item, index) => (
          <ScrollReveal
            as="li"
            key={item.title}
            className={`${cardClassName} flex gap-4`}
            effect="fade-right"
            delay={staggerDelay(index % 3)}
          >
            <span
              aria-hidden="true"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#f4cf73]/70 bg-linear-to-b from-[#FF9600] to-[#FFDE00] font-mono text-sm font-bold text-[#1b1307]"
            >
              {index + 1}
            </span>
            <div className="min-w-0">
              <h3 className="text-base font-semibold leading-7 text-white sm:text-lg">
                {item.title}
              </h3>
              <ItemBody item={item} />
            </div>
          </ScrollReveal>
        ))}
      </ol>
    </section>
  );
}

function TableBlock({ block }: { block: Extract<InfoBlock, { type: "table" }> }) {
  return (
    <section>
      {block.title ? <BlockHeading>{block.title}</BlockHeading> : null}
      {block.intro ? (
        <p className="-mt-2 mb-5 max-w-3xl text-sm leading-7 text-zinc-300">
          {block.intro}
        </p>
      ) : null}
      <div className="overflow-x-auto rounded-[22px] border border-white/10 bg-black/30">
        <table className="w-full min-w-140 border-collapse text-left text-sm">
          <thead>
            <tr className="bg-yellow-500/10 text-yellow-300">
              {block.columns.map((column) => (
                <th
                  key={column}
                  scope="col"
                  className="px-4 py-3 font-mono text-xs font-semibold uppercase tracking-[0.12em]"
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {block.rows.map((row) => (
              <tr key={row.join("|")} className="border-t border-white/10">
                {row.map((cell, cellIndex) => (
                  <td
                    key={`${block.columns[cellIndex]}-${cell}`}
                    className={`px-4 py-3 align-top leading-6 ${
                      cellIndex === 0 ? "font-semibold text-white" : "text-zinc-300"
                    }`}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function FormulaBlock({
  block,
}: {
  block: Extract<InfoBlock, { type: "formula" }>;
}) {
  return (
    <section>
      <BlockHeading>{block.title}</BlockHeading>
      <div className={cardClassName}>
        <p className="overflow-x-auto rounded-2xl border border-[rgba(214,166,64,0.28)] bg-black/40 px-5 py-4 font-mono text-sm leading-7 text-[#f1cb74] sm:text-base">
          {block.formula}
        </p>
        {block.notesTitle ? (
          <h3 className="mt-6 text-lg font-semibold text-white">
            {block.notesTitle}
          </h3>
        ) : null}
        <PointList points={block.notes} />
      </div>
    </section>
  );
}

function CalloutBlock({
  block,
}: {
  block: Extract<InfoBlock, { type: "callout" }>;
}) {
  return (
    <section className={`${cardClassName} border-l-4 border-l-yellow-500`}>
      {block.title ? (
        <h3 className="text-lg font-semibold text-white">{block.title}</h3>
      ) : null}
      {block.paragraphs?.map((paragraph) => (
        <p
          key={paragraph}
          className={`${block.title ? "mt-3" : ""} text-sm leading-7 text-zinc-300 sm:text-base`}
        >
          {paragraph}
        </p>
      ))}
      {block.points ? <PointList points={block.points} /> : null}
      {block.results ? (
        <dl className="mt-5 divide-y divide-white/10 rounded-2xl border border-white/10 bg-black/30">
          {block.results.map((result) => (
            <div
              key={result.label}
              className="flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
            >
              <dt className="text-sm text-zinc-400">{result.label}</dt>
              <dd
                className={`font-mono text-sm font-semibold sm:text-base ${
                  result.tone ? resultToneClassName[result.tone] : "text-white"
                }`}
              >
                {result.value}
              </dd>
            </div>
          ))}
        </dl>
      ) : null}
    </section>
  );
}

function renderBlockContent(block: InfoBlock) {
  switch (block.type) {
    case "cards":
      return <CardsBlock block={block} />;
    case "steps":
      return <StepsBlock block={block} />;
    case "table":
      return <TableBlock block={block} />;
    case "formula":
      return <FormulaBlock block={block} />;
    case "callout":
      return <CalloutBlock block={block} />;
  }
}

// Cards and steps reveal item by item, so only the other blocks reveal as a whole.
function renderBlock(block: InfoBlock, index: number) {
  if (block.type === "cards" || block.type === "steps") {
    return <div key={index}>{renderBlockContent(block)}</div>;
  }

  return (
    <ScrollReveal key={index} effect="fade-up">
      {renderBlockContent(block)}
    </ScrollReveal>
  );
}

type RegulerInfoPageViewProps = {
  page: RegulerInfoPage;
  labels: RegulerInfoPagesContent["labels"];
};

export function RegulerInfoPageView({ page, labels }: RegulerInfoPageViewProps) {
  return (
    <>
      <PageHeroBanner
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        description={page.hero.description}
        className="pb-16 pt-28 md:pb-20 md:pt-36"
      />

      <div className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-linear-to-b from-black to-transparent"
        />

        <SectionContainer className="relative space-y-12 pb-20 pt-10 text-white">
          {page.blocks.map(renderBlock)}

          {page.cta ? (
            <ScrollReveal
              as="section"
              effect="zoom-in"
              className="rounded-[22px] border border-[rgba(214,166,64,0.28)] bg-[linear-gradient(180deg,rgba(31,24,11,0.96),rgba(12,12,12,0.98))] p-8 text-center shadow-[0_14px_34px_rgba(0,0,0,0.3)]"
            >
              <h2 className="font-mono text-2xl font-bold text-yellow-400 sm:text-3xl">
                {page.cta.title}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-zinc-300 sm:text-base">
                {page.cta.body}
              </p>
              <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink href={PUBLIC_REGISTER_URL} variant="primary">
                  {labels.openAccount}
                </ButtonLink>
                <ButtonLink href={PUBLIC_LOGIN_URL} variant="dark">
                  {labels.liveLogin}
                </ButtonLink>
                <ButtonLink href={DEMO_LOGIN_URL} variant="ghost">
                  {labels.demoLogin}
                </ButtonLink>
              </div>
            </ScrollReveal>
          ) : null}
        </SectionContainer>
      </div>
    </>
  );
}
