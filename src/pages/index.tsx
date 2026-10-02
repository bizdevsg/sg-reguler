import AutoModal from "@/components/moleculs/AutoModal";
import ProdukHome from "@/components/organism/ProdukHome";
import Watcher from "@/components/organism/Watcher";
import PageTemplates from "@/components/templates/PageTemplates";
import { useI18n } from "@/i18n/useI18n";

export default function Home() {
  const { t } = useI18n();
  return (
    <PageTemplates title={t("nav.home")}>
      <Banner />
      <ProdukHome />
      <Watcher />
      <AutoModal />
    </PageTemplates>
  );
}
import Banner from "@/components/organism/Banner";
