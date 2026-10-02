// components/TikTokEmbed.tsx
import React from "react";

interface TikTokEmbedProps {
    videoId: string;
    width?: number;  // opsional, default 325
    height?: number; // opsional, default 580
}

const TikTokEmbed: React.FC<TikTokEmbedProps> = ({
    videoId,
    width = "325",
    height = "750"
}) => {
    return (
        <iframe
            src={`https://www.tiktok.com/embed/${videoId}`}
            width={width}
            height={height}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="rounded-lg"
        ></iframe>
    );
};

export default TikTokEmbed;
