import PageTemplates from "@/components/templates/PageTemplates";
import { useI18n } from "@/i18n/useI18n";

export default function MiniAccountPage() {
  const { t } = useI18n();
  const journeySteps = [
    {
      title: t("miniAccount.journey.1.title"),
      desc: t("miniAccount.journey.1.desc"),
    },
    {
      title: t("miniAccount.journey.2.title"),
      desc: t("miniAccount.journey.2.desc"),
    },
    {
      title: t("miniAccount.journey.3.title"),
      desc: t("miniAccount.journey.3.desc"),
    },
    {
      title: t("miniAccount.journey.4.title"),
      desc: t("miniAccount.journey.4.desc"),
    },
  ];
  const educationItems = [
    t("miniAccount.education.items.1"),
    t("miniAccount.education.items.2"),
    t("miniAccount.education.items.3"),
  ];
  return (
    <PageTemplates title={t("miniAccount.title")}>
      <section className="relative overflow-hidden rounded-3xl border border-yellow-500/20 bg-gradient-to-br from-neutral-950 via-neutral-900/80 to-yellow-500/10 p-8 md:p-12">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-16 -right-20 h-64 w-64 rounded-full bg-yellow-500/20 blur-3xl" />
          <div className="absolute -bottom-16 -left-20 h-64 w-64 rounded-full bg-yellow-500/10 blur-3xl" />
        </div>
        <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-yellow-500/40 bg-yellow-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.3em] text-yellow-300">
              {t("miniAccount.hero.badge")}
            </div>
            <h1 className="mt-4 text-3xl font-bold text-white md:text-5xl">
              {t("miniAccount.hero.title")}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-neutral-300 md:text-lg">
              {t("miniAccount.hero.desc")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="btn-primary rounded-full px-6 py-3" href="/kontak">
                {t("miniAccount.hero.cta.primary")}
              </a>
              <a
                className="rounded-full border border-yellow-500/60 px-6 py-3 text-yellow-300 transition hover:border-yellow-400 hover:text-yellow-200"
                href="/kontak"
              >
                {t("miniAccount.hero.cta.secondary")}
              </a>
            </div>
            <div className="mt-6 flex flex-wrap gap-2 text-xs text-neutral-300">
              {[
                t("miniAccount.hero.chips.1"),
                t("miniAccount.hero.chips.2"),
                t("miniAccount.hero.chips.3"),
                t("miniAccount.hero.chips.4"),
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-neutral-700/60 bg-neutral-900/60 px-3 py-1"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="grid gap-4">
            <div className="rounded-2xl border border-yellow-500/30 bg-neutral-900/70 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-yellow-400">{t("miniAccount.hero.summary.label")}</p>
              <h3 className="mt-3 text-lg font-semibold text-white">{t("miniAccount.hero.summary.title")}</h3>
              <p className="mt-2 text-sm text-neutral-300">{t("miniAccount.hero.summary.desc")}</p>
            </div>
            <div className="rounded-2xl border border-neutral-700/50 bg-neutral-900/60 p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-yellow-400">{t("miniAccount.hero.target.label")}</p>
              <h3 className="mt-3 text-lg font-semibold text-white">{t("miniAccount.hero.target.title")}</h3>
              <p className="mt-2 text-sm text-neutral-300">{t("miniAccount.hero.target.desc")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-700/40 bg-neutral-900/40 p-8" data-aos="fade-up">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-yellow-400">{t("miniAccount.section2.badge")}</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{t("miniAccount.section2.title")}</h2>
            <p className="mt-3 text-sm text-neutral-300">{t("miniAccount.section2.desc")}</p>
          </div>
          <div className="h-px w-full bg-neutral-700/60 md:h-16 md:w-px" />
          <div className="grid gap-4 md:grid-cols-3">
            {[
              t("miniAccount.section2.items.1"),
              t("miniAccount.section2.items.2"),
              t("miniAccount.section2.items.3"),
            ].map((item, index) => (
              <div
                key={item}
                className="group rounded-2xl border border-neutral-700/40 bg-neutral-900/60 p-5 text-sm text-neutral-200 transition hover:-translate-y-1 hover:border-yellow-500/40"
              >
                <div className="text-xs text-yellow-400/80">0{index + 1}</div>
                <div className="mt-2 font-semibold text-white">{item}</div>
                <p className="mt-2 text-xs text-neutral-400">{t("miniAccount.section2.cardDesc")}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-700/40 bg-neutral-900/40 p-8" data-aos="fade-up">
        <p className="text-xs uppercase tracking-[0.3em] text-yellow-400">{t("miniAccount.starter.badge")}</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">{t("miniAccount.starter.title")}</h2>
        <p className="mt-3 text-sm text-neutral-300">{t("miniAccount.starter.desc")}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            {
              title: t("miniAccount.starter.items.1.title"),
              desc: t("miniAccount.starter.items.1.desc"),
            },
            {
              title: t("miniAccount.starter.items.2.title"),
              desc: t("miniAccount.starter.items.2.desc"),
            },
            {
              title: t("miniAccount.starter.items.3.title"),
              desc: t("miniAccount.starter.items.3.desc"),
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-neutral-700/40 bg-neutral-900/60 p-5">
              <div className="text-xs uppercase tracking-[0.3em] text-yellow-400">{t("miniAccount.starter.itemBadge")}</div>
              <h3 className="mt-3 text-base font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-neutral-300">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-700/40 bg-neutral-900/40 p-8" data-aos="fade-up">
        <p className="text-xs uppercase tracking-[0.3em] text-yellow-400">{t("miniAccount.section3.badge")}</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">{t("miniAccount.section3.title")}</h2>
        <div className="mt-4 text-sm text-neutral-300">{t("miniAccount.section3.desc")}</div>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {journeySteps.map((step, index) => (
            <div
              key={step.title}
              className="relative rounded-2xl border border-neutral-700/40 bg-neutral-900/60 p-5"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-500/20 text-sm font-semibold text-yellow-300">
                  {index + 1}
                </span>
                <h3 className="text-base font-semibold text-white">{step.title}</h3>
              </div>
              <p className="mt-3 text-sm text-neutral-300">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-neutral-700/40 bg-neutral-900/40 p-8" data-aos="fade-up">
        <p className="text-xs uppercase tracking-[0.3em] text-yellow-400">{t("miniAccount.section4.badge")}</p>
        <h2 className="mt-3 text-2xl font-semibold text-white">{t("miniAccount.section4.title")}</h2>
        <p className="mt-3 text-sm text-neutral-300">{t("miniAccount.section4.desc")}</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {educationItems.map((item) => (
            <div key={item} className="rounded-xl border border-neutral-700/40 bg-neutral-900/60 p-5">
              <div className="relative aspect-video overflow-hidden rounded-lg border border-dashed border-neutral-700/80 bg-neutral-950/80">
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full border border-yellow-500/40 bg-neutral-900/80 px-4 py-2 text-xs text-yellow-300">
                    {t("miniAccount.section4.preview")}
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm font-semibold text-white">{item}</p>
              <p className="mt-2 text-xs text-neutral-400">{t("miniAccount.section4.cardDesc")}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-yellow-500/30 bg-gradient-to-r from-yellow-500/10 via-neutral-900/70 to-neutral-900/30 p-8" data-aos="fade-up">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-yellow-400">{t("miniAccount.section5.badge")}</p>
            <h2 className="mt-3 text-2xl font-semibold text-white">{t("miniAccount.section5.title")}</h2>
            <p className="mt-2 max-w-xl text-sm text-neutral-300">{t("miniAccount.section5.desc")}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs text-neutral-300">
              {[
                t("miniAccount.section5.chips.1"),
                t("miniAccount.section5.chips.2"),
                t("miniAccount.section5.chips.3"),
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-neutral-700/60 bg-neutral-900/60 px-3 py-1"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            <a className="btn-primary rounded-full px-6 py-3" href="/kontak">
              {t("miniAccount.section5.cta.primary")}
            </a>
            <a
              className="rounded-full border border-yellow-500/60 px-6 py-3 text-yellow-300 transition hover:border-yellow-400 hover:text-yellow-200"
              href="/edukasi"
            >
              {t("miniAccount.section5.cta.secondary")}
            </a>
          </div>
        </div>
      </section>
    </PageTemplates>
  );
}
