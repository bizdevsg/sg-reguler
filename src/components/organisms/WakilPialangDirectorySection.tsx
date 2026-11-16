import { CircleAlert, UserRoundCheck } from "lucide-react";

import { SectionContainer } from "@/components/atoms/SectionContainer";
import { RepresentativeRecordRow } from "@/components/molecules/RepresentativeRecordRow";
import { RepresentativeStatePanel } from "@/components/molecules/RepresentativeStatePanel";
import { RepresentativeOfficeProfile } from "@/components/organisms/RepresentativeOfficeProfile";
import type { AppMessages } from "@/locales";
import type { WakilPialangPageData } from "@/types/wakil-pialang";

type WakilPialangDirectorySectionProps = Pick<
  WakilPialangPageData,
  "representatives" | "selectedCategoryInfo"
> & {
  text: AppMessages["wakilPialangPage"];
};

export function WakilPialangDirectorySection({
  representatives,
  selectedCategoryInfo,
  text,
}: WakilPialangDirectorySectionProps) {
  return (
    <section className="pb-16">
      <SectionContainer>
        <div className="mx-auto max-w-6xl">
          {/* <RepresentativeOfficeProfile
            category={selectedCategoryInfo}
            text={text}
          /> */}

          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 pt-12">
            <div>
              <p className="text-2xs font-semibold uppercase tracking-[0.18em] text-accent-strong">
                {text.summary}
              </p>
            </div>

            {representatives !== null ? (
              <p className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/60">
                <span className="mr-2 font-semibold tabular-nums text-white">
                  {representatives.length}
                </span>

                {text.summary
                  .toLowerCase()
                  .replace(/\b\w/g, (char) => char.toUpperCase())}
              </p>
            ) : null}
          </div>

          {representatives === null ? (
            <RepresentativeStatePanel
              icon={<CircleAlert aria-hidden="true" className="size-6" />}
              title={text.errorTitle}
              body={text.errorBody}
            />
          ) : representatives.length === 0 ? (
            <RepresentativeStatePanel
              icon={<UserRoundCheck aria-hidden="true" className="size-6" />}
              title={text.emptyTitle}
              body={text.emptyBody}
            />
          ) : (
            <div>
              <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {representatives.map((representative, index) => (
                  <RepresentativeRecordRow
                    key={representative.id}
                    index={index}
                    representative={representative}
                    text={text}
                  />
                ))}
              </ol>
            </div>
          )}
        </div>
      </SectionContainer>
    </section>
  );
}
