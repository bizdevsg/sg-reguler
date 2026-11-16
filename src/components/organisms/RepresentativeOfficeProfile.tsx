import { ExternalLink } from "lucide-react";

import type { AppMessages } from "@/locales";
import type { RepresentativeCategory } from "@/types/wakil-pialang";

type RepresentativeOfficeProfileProps = {
  category?: RepresentativeCategory;
  text: AppMessages["wakilPialangPage"];
};

export function RepresentativeOfficeProfile({
  category,
  text,
}: RepresentativeOfficeProfileProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-accent-strong/20 bg-gradient-to-br from-accent-strong/10 via-white/[0.04] to-transparent p-6 sm:p-10">
      <div aria-hidden="true" className="pointer-events-none absolute right-0 top-0 size-48 rounded-full bg-accent-strong/10 blur-3xl" />
      <div className="relative grid gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(16rem,0.5fr)] md:gap-16">
      <div>
        <p className="text-2xs font-semibold uppercase tracking-[0.18em] text-accent-strong">
          {text.officeProfile}
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-[-0.025em] text-white sm:text-3xl">
          {category?.nama_kategori ?? text.headOffice}
        </h2>
        {category?.alamat_kantor_cabang ? (
          <p className="mt-5 max-w-3xl text-sm leading-7 text-white/55">
            {category.alamat_kantor_cabang}
          </p>
        ) : null}
      </div>

      {category ? (
        <dl className="border-l border-white/10 pl-5 text-sm sm:pl-7">
          {category.telp ? (
            <div>
              <dt className="text-2xs uppercase tracking-[0.16em] text-white/30">
                {text.phone}
              </dt>
              <dd className="mt-1.5">
                <a
                  href={`tel:${category.telp.replace(/[^\d+]/g, "")}`}
                  className="text-white/75 hover:text-white"
                >
                  {category.telp}
                </a>
              </dd>
            </div>
          ) : null}
          {category.link_google_maps ? (
            <div className="mt-6">
              <dt className="text-2xs uppercase tracking-[0.16em] text-white/30">
                {text.address}
              </dt>
              <dd className="mt-1.5">
                <a
                  href={category.link_google_maps}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-accent-strong hover:text-white"
                >
                  {text.mapCta}
                  <ExternalLink aria-hidden="true" className="size-3.5" />
                </a>
              </dd>
            </div>
          ) : null}
        </dl>
      ) : null}
      </div>
    </div>
  );
}
