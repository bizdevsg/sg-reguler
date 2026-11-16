export {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  getLocaleConfig,
  isSupportedLocale,
  type AppLocale,
} from "./config";
export {
  formatLocaleArticleDateTime,
  formatLocaleDateTime,
  formatLocaleNumber,
  formatLocaleTime,
  formatLocaleYear,
} from "./formatters";
export { messages, type AppMessages } from "./messages";
export {
  getSolidGoldAppPageContent,
  type SolidGoldAppPageContent,
} from "./solid-gold-app-page";
export {
  getRegulerInfoPagesContent,
  type RegulerInfoPageKey,
  type RegulerInfoPagesContent,
} from "./reguler-info-pages";

import { DEFAULT_LOCALE, type AppLocale } from "./config";
import { messages } from "./messages";

export function getMessages(locale: AppLocale = DEFAULT_LOCALE) {
  return messages[locale];
}
