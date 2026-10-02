import React from "react";
import VideoCard from "@/components/molecules/VideoCard";
import { useI18n } from "@/i18n/useI18n";
import { videoUmumData } from "@/data/videoUmum";

type VideoUmumHomeProps = {
  hideHeader?: boolean;
  compact?: boolean;
  className?: string;
};

export default function VideoUmumHome({
  hideHeader = false,
  compact = false,
  className = "",
}: VideoUmumHomeProps) {
  const { t } = useI18n();
  const limit = compact ? 2 : 3;
  const videos = videoUmumData.slice(0, limit);

  const basePadding = compact ? (hideHeader ? "pt-2" : "pt-6") : "py-10";

  return (
    <div className={`${basePadding} ${className}`} data-aos="fade-up">
      {!hideHeader && (
        <div className={`text-center ${compact ? "mb-6" : "mb-10"}`}>
          {!compact && (
            <p className="text-yellow-500 font-semibold">
              {t("home.videoUmumLabel")}
            </p>
          )}
          <div className="flex justify-center">
            <span className="bg-neutral-800 px-4 py-2 rounded font-semibold text-yellow-500 w-fit">
              {t("home.videoUmumTitle")}
            </span>
          </div>
        </div>
      )}

      <div
        className={`grid gap-4 sm:gap-6 ${
          compact ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            title={video.title}
            date={video.date}
            description={video.description}
            videoUrl={video.videoUrl}
            showText={true}
            showMeta={!compact}
            titleClassName={compact ? "text-yellow-500" : ""}
          />
        ))}
      </div>

      {videos.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/60 px-6 py-10 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-neutral-800 text-yellow-500">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H9l-5 3v-3H6a2 2 0 0 1-2-2V5zm5 3v6l6-3-6-3z" />
            </svg>
          </div>
          <h3 className="text-base font-semibold text-gray-200">
            {t("home.videoUmumEmptyTitle")}
          </h3>
          <p className="text-sm text-gray-400">{t("home.videoUmumEmptyDesc")}</p>
        </div>
      )}
    </div>
  );
}
