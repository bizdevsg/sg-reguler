import { useCallback } from "react";
import { useRouter } from "next/router";
import { messages, Locale } from "./messages";

type Vars = Record<string, string | number>;

function interpolate(template: string, vars?: Vars) {
  if (!vars) return template;
  return Object.keys(vars).reduce(
    (acc, key) => acc.replaceAll(`{${key}}`, String(vars[key])),
    template
  );
}

export function useI18n() {
  const { locale } = useRouter();
  const activeLocale = (locale as Locale) || "id";
  const dict = messages[activeLocale] ?? messages.id;

  const t = useCallback(
    (key: string, vars?: Vars) => {
      const raw = dict[key] ?? messages.id[key] ?? key;
      return interpolate(raw, vars);
    },
    [dict]
  );

  return { t, locale: activeLocale };
}
