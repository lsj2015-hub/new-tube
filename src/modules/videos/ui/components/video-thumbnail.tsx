import Image from "next/image";

import { formattedDuration } from "@/lib/utils";

interface VideothumbnailProps {
  title: string;
  duration: number
  imageUrl?: string | null;
  previewUrl?: string | null;
}

export const Videothumbnail = ({
  title,
  duration,
  imageUrl,
  previewUrl
}: VideothumbnailProps) => {
  return (
    <div className="relative group">
      {/* Thumbnail wrapper */}
      <div className="relative w-full overflow-hidden rounded-xl aspect-video">
        <Image
          src={imageUrl ?? '/placeholder.svg'}
          alt={title}
          fill
          className="h-full w-full object-cover group-hover:opacity-0"
        />
        <Image
          unoptimized={!!previewUrl}
          src={previewUrl ?? '/placeholder.svg'}
          alt={title}
          fill
          className="h-full w-full object-cover opacity-0 group-hover:opacity-100"
        />
      </div>

      {/* video duration box */}
      
      <div className="absolute bottom-2 right-2 px-1 py-0.5 rounded bg-black/80 text-white text-xs font-medium">
        {formattedDuration(duration)}
      </div>
    </div>
  );
}