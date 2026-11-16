import type { AppLocale } from "./config";
import { enRegulerInfoPagesContent } from "./en/pages/reguler-info";
import { idRegulerInfoPagesContent } from "./id/pages/reguler-info";
import type { RegulerInfoPagesContent } from "./shared/reguler-info-pages";

export type {
  InfoBlock,
  InfoItem,
  InfoResult,
  RegulerInfoPage,
  RegulerInfoPageKey,
  RegulerInfoPagesContent,
} from "./shared/reguler-info-pages";

const regulerInfoPagesContent: Record<AppLocale, RegulerInfoPagesContent> = {
  id: idRegulerInfoPagesContent,
  en: enRegulerInfoPagesContent,
};

export function getRegulerInfoPagesContent(locale: AppLocale) {
  return regulerInfoPagesContent[locale];
}
